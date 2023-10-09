<template>
  <div class="details-container">
    <div class="paths">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Nadover</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/products' }"
          >Giày</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/shoes/nike' }"
          >Giày Nike</el-breadcrumb-item
        >
        <el-breadcrumb-item
          >Giày Nike Air Jordan 1 Mid ‘Lucky Green’ GS
          DQ8423-301</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="content-product">
      <div class="image-product">
        <div class="flex flex-col">
          <el-image class="h-[500px]" :src="selectImage" fit="contain" lazy>
            <template #placeholder>
              <div class="posti-load"><div class="loaderType3" /></div>
            </template>
          </el-image>
          <div class="my-2 flex justify-center">
            <el-radio-group
              v-model="selectImage"
              @change="handleSelectThumbnail"
            >
              <el-radio-button
                class="px-3"
                v-for="item in detailsProduct.imagesProduct"
                :key="item.id"
                :label="item.src"
                ><el-image :src="item.src" class="w-[40px]"></el-image
              ></el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </div>
      <div class="info-product">
        <h1 class="text-[30px]">
          {{ detailsProduct.name }}
        </h1>
        <div class="info-add">
          <el-rate
            class="flex-1 show-rate"
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
          />
          <div class="show-evaluate flex-1">
            <a href="#"> {{ formatThoundsand(10) }} Đánh Giá </a>
          </div>
          <div class="show-sell flex-1">
            {{ formatThoundsand(10000) }} Đã Bán
          </div>
        </div>
        <div class="py-3 flex items-center">
          <p class="price-original">
            {{ formatAmount(detailsProduct.priceOrginal) }}₫
          </p>
          <p class="price-sale text-[18px] font-bold px-2 mr-2">
            {{ formatAmount(detailsProduct.priceNew) }}₫
          </p>
          <p class="sale-percent">{{ Math.floor(totalPercent) }}% Giảm</p>
        </div>
        <div class="sizes flex items-center">
          <h1 class="text-[18px]">Size</h1>
          <div class="option-size">
            <el-radio-group v-model="radioSize" @change="handleCheckRadio">
              <el-radio :label="35">35</el-radio>
              <el-radio :label="36">36</el-radio>
              <el-radio :label="37">37</el-radio>
              <el-radio :label="38">38</el-radio>
              <el-radio :label="39">39</el-radio>
              <el-radio :label="40">40</el-radio>
              <el-radio :label="41">41</el-radio>
              <el-radio :label="42">42</el-radio>
              <el-radio :label="43">43</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="quatity-order">
          <el-input-number
            v-model="numQuatity"
            :min="1"
            :max="10"
            :value-on-clear="numClear"
          />
          <span
            v-if="radioSize !== 0"
            class="ml-5"
            :class="{ stocking: isOrder, 'out-of-stock': !isOrder }"
            >{{
              detailsProduct.numberQuantity > 0 ? "Còn hàng" : "Hết hàng"
            }}</span
          >
        </div>
        <div class="btns">
          <el-button class="addCart" @click="addToCart"
            >Thêm vào giỏ hàng</el-button
          >
          <el-button class="buyCart" @click="handleBuy">Mua ngay</el-button>
        </div>
      </div>
    </div>
    <div class="line-full"></div>
    <div class="session-product">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <div class="content-tab">
          <el-tab-pane label="Mô tả" name="first">{{
            detailsProduct.description
          }}</el-tab-pane>
          <el-tab-pane label="Đánh giá" name="second">Đánh giá</el-tab-pane>
        </div>
      </el-tabs>
    </div>
    <div class="product-same">
      <h1 class="text-[30px]">Sản phẩm tương tự</h1>
      <el-row :gutter="20" style="overflow: hidden">
        <el-col
          class="col-custom"
          v-for="same in listProductSame"
          :key="same.name"
        >
          <router-link :to="same.path" class="block">
            <el-image :src="same.src" :alt="same.name" />
            <div class="flex flex-col">
              <span class="text-center mb-5 mt-2 short-text">
                {{ same.name }}</span
              >
              <span class="mb-5 mt-2 font-bold text-[#ee4d2d]">
                {{ formatAmount(same.price) }}₫</span
              >
            </div>
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { ElNotification, type TabsPaneContext } from "element-plus";
import { emitter } from "@/utils/mitt";
import { useStore } from "@/stores";
import { formatAmount, formatThoundsand } from "@/utils/numbro";
import Cookies from "js-cookie";
import router from "@/router";
import { generateStorageKey } from "@/utils/format";

const storeUse = useStore();
const route: any = router;

const paramsProduct: string = route.currentRoute._rawValue.params.name;
const radioSize = ref(0);
const numQuatity = ref(1);
const numClear = ref(1);
const value = ref(3.7);
const activeName = ref("first");
const isOrder = ref(true);
const selectImage = ref("");
const access_token = Cookies.get(
  generateStorageKey(import.meta.env.VITE_APP_TOKEN_NAME_USER)
);
const detailsProduct = {
  name: "Giày Nike Air Jordan 1 Mid ‘Lucky Green’ GS DQ8423-301",
  thumbnail:
    "https://sneakerdaily.vn/wp-content/uploads/2023/07/main-square_317b722a-1e59-404f-9.jpg",
  imagesProduct: [
    {
      id: 0,
      src: "https://sneakerdaily.vn/wp-content/uploads/2023/07/1_ca20ee9a-deee-4026-9abe-bbd072.jpg.webp",
    },
    {
      id: 1,
      src: "https://sneakerdaily.vn/wp-content/uploads/2023/07/3_2a6524a8-2ce6-472c-920e-2ab873.jpg.webp",
    },
    {
      id: 2,
      src: "https://down-vn.img.susercontent.com/file/545b380eedcee1a5d17a8b2b3aeaa60b",
    },
    {
      id: 3,
      src: "https://sneakerdaily.vn/wp-content/uploads/2023/08/giay-nike-air-max-1-on-air-tokyo-maze-ci1505-001-2.png.webp",
    },
  ],
  priceOrginal: 4529000,
  priceNew: 3632000,
  numberQuantity: 20,
  description:
    " Giày Nike Air Jordan Mid ‘Lucky Green’ là một phiên bản mới nhất của dòng giày Air Jordan 1, được thiết kế đặc biệt cho giới trẻ. Đôi giày này mang lại vẻ ngoài độc đáo và phong cách đầy cá tính.Với màu sắc chủ đạo là xanh lá cây, đôi giày này tạo nên sự tươi sáng và nổi bật. Chất lượng vật liệu chủ yếu là da tổng hợp và vải, mang đến sự thoải mái và bền bỉ cho người sử dụng.Air Jordan 1 Mid ‘Lucky Green’ đồng thời sở hữu những chi tiết đặc trưng của dòng Air Jordan, bao gồm viền mũi giày vuông vắn, logo Jordan Wings ở mắt giày và hệ thống dây buộc nổi bật. Điều này tạo nên sự phối hợp hoàn hảo giữa phong cách thể thao. Giày Nike Air Jordan 1 Mid ‘Lucky Green’ hiện đã có sẵn tại Sneaker Daily Shop với mức giá hấp dẫn, đừng bỏ lỡ cơ hội của mình nhé! Cập nhật nhanh nhất lịch ra mắt của các mẫu giày mới nhất và tin tức thời trang trong nước và trên thế giới bằng cách theo dõi Sneaker Daily trên Facebook hoặc Instagram.",
};
const listProductSame = [
  {
    name: "Giày Air Jordan 1 Low GS ‘Mystic Green’ 553560-113",
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/07/main-square_317b722a-1e59-404f-9.jpg",
    path: "/shop/air-jordan-553560-113",
    price: 4890000,
  },
  {
    name: "Giày Air Jordan 1 Retro Low ‘Obsidian Ember Glow’ 553558-481",
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/07/main-square_a23b9da8-23d5-4683-a.jpg",
    path: "/shop/air-jordan-553560-481",
    price: 4490000,
  },
  {
    name: "Giày Nike Air Jordan 1 Mid ‘Lucky Green’ GS DQ8423-301",
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/07/main-square_8a011823-5d4a-4ea2-b.jpg",
    path: "/shop/nike-dunk-DQ8423-301",
    price: 4290000,
  },
  {
    name: "Giày Nike Air Jordan 1 Retro High OG ‘UNC Toe’ DZ5485-400",
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/07/giay-nike-air-jordan-1-retro-high-og-unc-toe-dz5485-400.jpg",
    path: "shop/nike-air-DZ5485-400",
    price: 12290000,
  },
];

const totalPercent = computed(() => {
  return (
    ((detailsProduct.priceOrginal - detailsProduct.priceNew) /
      detailsProduct.priceOrginal) *
    100
  );
});
// method

function handleClick(tab: TabsPaneContext, event: Event) {
  console.log(tab, event);
}
function handleCheckRadio(value: any) {
  detailsProduct.numberQuantity <= 0
    ? (isOrder.value = false)
    : (isOrder.value = true);
}

function handleSelectThumbnail(value: any) {
  selectImage.value = value;
}

function addToCart() {
  if (access_token) {
    // Đã tồn tại access_token, bạn có thể sử dụng nó ở đây
    if (radioSize.value === 0) {
      ElNotification({
        title: "Warning",
        message: "Vui lòng chọn size",
        type: "warning",
        showClose: false,
      });
    } else {
      if (detailsProduct.numberQuantity > 0) {
        let amount = numQuatity.value * detailsProduct.priceNew;
        if (amount === 0) {
          numQuatity.value = numClear.value;
          amount = numQuatity.value * detailsProduct.priceNew;
        }
        storeUse.addItemToCart(
          detailsProduct.name,
          detailsProduct.thumbnail,
          radioSize.value,
          numQuatity.value,
          amount
        );
      } else {
        ElNotification({
          title: "Warning",
          message: "Sản phẩm đã hết hàng",
          type: "warning",
          showClose: false,
        });
      }
    }
  } else {
    router.push("/buyer/login");
  }
}
function handleBuy() {
  if (access_token) {
    // Đã tồn tại access_token, bạn có thể sử dụng nó ở đây
    if (radioSize.value === 0) {
      ElNotification({
        title: "Warning",
        message: "Vui lòng chọn size",
        type: "warning",
        showClose: false,
      });
    } else {
      if (detailsProduct.numberQuantity > 0) {
        // const params = router.params;
        router.push(`/checkout/${paramsProduct}`);
      } else {
        ElNotification({
          title: "Warning",
          message: "Sản phẩm đã hết hàng",
          type: "warning",
          showClose: false,
        });
      }
    }
  } else {
    router.push("/buyer/login");
  }
}

onMounted(() => {
  selectImage.value = detailsProduct.thumbnail;
});
onBeforeUnmount(() => {});
</script>

<style lang="scss" scoped>
.details-container {
  padding: 0px 10px;
  .paths {
    max-width: 1200px;
    margin: 0px auto;
    .el-breadcrumb {
      padding: 20px 0px;
    }
  }
  .content-product {
    max-width: 1200px;
    margin: 0px auto;
    display: flex;
    justify-content: center;
    .image-product {
      .el-carousel {
        position: relative;
      }
      width: 500px;
      flex-shrink: 0;
    }
    .info-product {
      padding-left: 20px;
      .price-original {
        text-decoration: line-through;
        color: #929292;
        margin-right: 10px;
      }
      .price-sale {
        color: #d0011b;
      }
      .sale-percent {
        font-size: 0.75rem;
        color: #fff;
        text-transform: uppercase;
        background: #d0011b;
        border-radius: 4px;
        padding: 4px;
        font-weight: 600;
        white-space: nowrap;
      }
      .info-add {
        padding: 10px 0px;
        display: flex;
        align-items: center;
        .show-rate {
          margin-right: 10px;
        }
        .show-evaluate,
        .show-sell {
          padding-left: 5px;
          border-left-width: 2px;
        }
      }
      .quatity-order {
        & span {
          display: inline-block;
          line-height: 1;
          padding: 4px 10px;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          border-radius: 50px;
          margin-bottom: 10px;
          user-select: none;
        }

        & span.stocking {
          color: #7cc0a6;
          border: 1px solid #7cc0a6;
        }
        & span.out-of-stock {
          color: #d2360e;
          border: 1px solid #d2360e;
        }
      }
      .option-size {
        width: 100%;
        max-width: 440px;
        padding: 10px 0px 10px 15px;
      }
      .btns {
        margin-top: 30px;
        .addCart {
          background-color: #feeee9;
          padding: 20px 20px;
          border: 1px solid #ee4d2d;
          color: #ee4d2d;
          font-size: 16px;
          &:hover {
            background-color: #f9f3f3;
          }
        }
        .buyCart {
          background-color: #ee4d2d;
          padding: 20px 20px;
          border: 1px solid #ee4d2d;
          color: #ffff;
          font-size: 16px;
          &:hover {
            background-color: #f25f41;
          }
        }
      }
    }
  }
  .line-full {
    border-top: 1px solid #e5e5e5;
    margin: 20px 0px;
  }
  .session-product {
    .content-tab {
      max-width: 1200px;
      margin: 15px auto;
      font-size: 16px;
    }
  }
  .product-same {
    max-width: 1200px;
    margin: 0px auto;
    margin-bottom: 15px;
    .col-custom {
      max-width: 25%;
      flex: 0 0 25%;
    }
    .el-image {
      transition: all 0.5s ease-in-out;
      &:hover {
        transform: translateY(-15px);
      }
    }
    span {
      transition: all 0.5s ease-in-out;
      &:hover {
        opacity: 0.5;
      }
    }
  }
}
:deep(.el-tabs__header) {
  display: flex;
  justify-content: center;
}
:deep(.el-carousel__container) {
  height: 500px;
}
:deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
  background-color: #ffff;
}
:deep(.el-radio-button:first-child .el-radio-button__inner) {
  padding: 5px;
}

:deep(.el-rate__text) {
  color: #e4732a;
  font-weight: 700;
  text-decoration: underline;
}
@media screen and (max-width: 968px) {
  .details-container {
    .content-product {
      flex-direction: column;
      align-items: start;
      .image-product {
        min-width: 0;
        width: 100%;
      }
      .info-product {
        padding: 20px 0px 0px 0px;
      }
    }
  }
}

@media screen and (max-width: 735px) {
  .details-container {
    .product-same {
      .col-custom {
        max-width: 33.3333333333%;
        flex: 0 0 33.3333333333%;
      }
    }
  }
}
@media screen and (max-width: 550px) {
  .details-container {
    .product-same {
      .col-custom {
        max-width: 50%;
        flex: 0 0 50%;
      }
    }
    .content-product {
      .info-product {
        .info-add {
          flex-direction: column;
          align-items: flex-start;
          .show-evaluate {
            padding: 10px 0px;
          }
          .show-evaluate,
          .show-sell {
            padding-left: 0px;
            border-left-width: 0px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 330px) {
  .details-container {
    .content-product {
      .info-product {
        .btns {
          display: flex;
          justify-content: center;
        }
      }
    }
  }
}
</style>
