import { defineStore } from "pinia";
import Cookies from "js-cookie";
import axios from "axios";
import { generateStorageKey } from "@/utils/format";

let dataLocal: any = null;
const access_token = Cookies.get(
  generateStorageKey(import.meta.env.VITE_APP_TOKEN_NAME_USER)
);

(function getDateLocalstorage() {
  const result = localStorage.getItem("myCarts");
  if (!result) return;
  dataLocal = JSON.parse(result);
})();

if (access_token) {
  getUserInfoFromAccessToken(access_token);
} else {
  localStorage.setItem(
    "myCarts",
    JSON.stringify({ userInfor: {}, itemCarts: [] })
  );
}

async function getUserInfoFromAccessToken(access_token: string) {
  try {
    // Gửi yêu cầu GET tới API của Google để lấy thông tin người dùng từ access_token
    const response = await axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .catch(() => {});
    if (!response) return;
    const { sub, name, email, picture } = response.data;
    useStore().SET_ACCESS_TOKEN_USER({ sub, name, email, picture });
  } catch (error: any) {
    console.error("Error fetching user info:", error.message);
  }
}

export const useStore = defineStore("store", {
  state: () => {
    return {
      rawItems: [] as any[],
      currentPage: 0, // Đăng nhập thành phần hiển thị phán đoán 0: Đăng nhập 1: Đăng ký 2: Quên mật khẩu , mặc định 0: Đăng nhập
      access_token: access_token,
      userLogin: {
        userID: dataLocal?.userInfor?.id,
        nameUser: dataLocal?.userInfor?.name,
        emailUser: dataLocal?.userInfor?.email,
        avatarUser: dataLocal?.userInfor?.avatar,
      },
    };
  },
  getters: {
    itemsCart: (state) => {
      if (!dataLocal || !dataLocal.itemCarts) {
        return state.rawItems;
      } else {
        state.rawItems = dataLocal.itemCarts;
        return state.rawItems;
      }
    },
  },
  actions: {
    addItemToCart(
      name: string,
      image: string,
      radioSize: number,
      numQuatity: number,
      amount: number
    ) {
      const divOneAmount = amount / numQuatity;
      if (dataLocal.itemCarts.length <= 0) {
        dataLocal.itemCarts.push({
          name: name,
          image: image,
          size: radioSize,
          numQuatity: numQuatity,
          amount: amount,
          priceOriginal: divOneAmount,
        });
        useStore().UPDATE_LOCALSTORAGE_CART(dataLocal);
      } else {
        const targetItemIndex = dataLocal.itemCarts.findIndex(
          (item: any) =>
            item.name.toString().toLowerCase() ===
              name.toString().toLowerCase() && item.size === radioSize
        );
        if (targetItemIndex !== -1) {
          dataLocal.itemCarts[targetItemIndex].numQuatity += numQuatity;
          dataLocal.itemCarts[targetItemIndex].amount += amount;
          useStore().UPDATE_LOCALSTORAGE_CART(dataLocal);
        } else {
          dataLocal.itemCarts.push({
            name: name,
            image: image,
            size: radioSize,
            numQuatity: numQuatity,
            amount: amount,
            priceOriginal: divOneAmount,
          });
          useStore().UPDATE_LOCALSTORAGE_CART(dataLocal);
        }
      }
    },
    removeItem(paramsDelete: any) {
      const targetDeleteIndex = dataLocal.itemCarts.findIndex(
        (item: any) =>
          item.name.toString().toLowerCase() ===
            paramsDelete.name.toString().toLowerCase() &&
          item.size === paramsDelete.size
      );
      if (targetDeleteIndex !== -1) {
        dataLocal.itemCarts.splice(targetDeleteIndex, 1);
      }
      const totalAmounts: number = dataLocal.itemCarts.reduce(
        (accumulator: any, item: any) => accumulator + item.amount,
        0
      );
      useStore().UPDATE_LOCALSTORAGE_CART(dataLocal);
      return totalAmounts;
    },
    // tăng giảm số lượng trong giỏ hàng
    incrementQuatity(
      name: string,
      size: number,
      numQuatity: number,
      amountOriginal: number
    ) {
      const quatityItems = dataLocal.itemCarts.filter(
        (item: any) =>
          item.name.toString().toLowerCase() === name.toString().toLowerCase()
      );
      for (let i = 0; i < quatityItems.length; i++) {
        if (quatityItems[i].size === size) {
          quatityItems[i].numQuatity = numQuatity;
          quatityItems[i].amount = numQuatity * amountOriginal;
        }
      }
      const totalAmounts: number = dataLocal.itemCarts.reduce(
        (accumulator: any, item: any) => accumulator + item.amount,
        0
      );
      useStore().UPDATE_LOCALSTORAGE_CART(dataLocal);
      return totalAmounts;
    },
    SET_CURRENTPAGE(value: any) {
      this.currentPage = value;
    },
    SET_ACCESS_TOKEN_USER(info: any) {
      console.log("response.data.data", info);
      this.userLogin.userID = info.sub ? info.sub : info.id;
      this.userLogin.nameUser = info.name ? info.name : info.username;
      this.userLogin.emailUser = info.email;
      this.userLogin.avatarUser = info.picture ? info.picture : "";
      this.SET_LOCALSTORAGE_OTHER({
        id: this.userLogin.userID,
        name: this.userLogin.nameUser,
        email: this.userLogin.emailUser,
        avatar: this.userLogin.avatarUser,
      });
    },
    SET_LOCALSTORAGE_OTHER(params: any) {
      localStorage.setItem(
        "myCarts",
        JSON.stringify({ userInfor: params, itemCarts: [] })
      );
    },
    UPDATE_LOCALSTORAGE_CART(itemCart: any) {
      this.rawItems = [];
      this.rawItems.push(itemCart);
      const updatedData = JSON.stringify(itemCart);
      localStorage.setItem("myCarts", updatedData);
    },
    RESET_TOKEN_USER() {
      this.userLogin.userID = "";
      Cookies.set(
        generateStorageKey(import.meta.env.VITE_APP_TOKEN_NAME_USER),
        ""
      );
      localStorage.setItem(
        "myCarts",
        JSON.stringify({ userInfor: {}, itemCarts: [] })
      );
    },
  },
});
