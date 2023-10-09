<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue";
import router from "@/router";
import { emitter } from "../utils/mitt";
import { useStore } from "@/stores";
import { formatAmount } from "@/utils/numbro";

interface RestaurantItem {
  value: string;
  link: string;
}

const storeUse = useStore();
const inputSearch = ref("");
const totalAmounts = ref<number>(0);
const restaurants = ref<RestaurantItem[]>([]);
const routerAll = router.options.routes;
const centerDialogVisible = ref(false);
const centerDialogSearch = ref(false);
const dialogMenu = ref(false);
const defaultActive = ref("");
const notificationItemCart = ref(0);
const randomGradient = ref("");

console.log("routerAll", routerAll);

const showRoutes = routerAll[0]?.children?.filter((item) => !item.props);

const arrayCart = computed(() => {
  return storeUse.itemsCart;
});

const myUserId = computed(() => {
  return storeUse.userLogin;
});

// method
function handleChange(itemShoe: any, quantity: number, amountOriginal: number) {
  totalAmounts.value = storeUse.incrementQuatity(
    itemShoe.name,
    itemShoe.size,
    quantity,
    amountOriginal
  );
}

function querySearch(queryString: string, cb: any) {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value;
  // call callback function to return suggestions
  cb(results);
}
function createFilter(queryString: string) {
  return (restaurant: RestaurantItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    );
  };
}

const loadAll = () => {
  return [
    { value: "vue", link: "https://github.com/vuejs/vue" },
    { value: "element", link: "https://github.com/ElemeFE/element" },
    { value: "cooking", link: "https://github.com/ElemeFE/cooking" },
    { value: "mint-ui", link: "https://github.com/ElemeFE/mint-ui" },
    { value: "vuex", link: "https://github.com/vuejs/vuex" },
    { value: "vue-router", link: "https://github.com/vuejs/vue-router" },
    { value: "babel", link: "https://github.com/babel/babel" },
  ];
};

function handleSelect(item: RestaurantItem) {
  console.log(item);
}

function onOpenCart() {
  centerDialogVisible.value = true;
  totalAmounts.value = arrayCart.value.reduce(
    (accumulator, item) => accumulator + item.amount,
    0
  );
}

function onOpenSearch() {
  centerDialogSearch.value = true;
}

function onOpenMenu() {
  dialogMenu.value = true;
}

function handleSelectMenu() {
  dialogMenu.value = false;
}
function logout() {
  storeUse.RESET_TOKEN_USER();
}

function deleteItemCart(value: any) {
  totalAmounts.value = storeUse.removeItem(value);
}

function handleCheckout() {
  router.replace("/checkout/cart");
  centerDialogVisible.value = false;
}

function generateRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

function generateRandomGradient() {
  const startColor = generateRandomColor();
  const endColor = generateRandomColor();
  randomGradient.value = `linear-gradient(to right, ${startColor}, ${endColor})`;
}

watch(
  () => arrayCart.value,
  (newArrayCart) => {
    notificationItemCart.value = newArrayCart.length;
  },
  { deep: true }
);

emitter.on("openCart", onOpenCart);

onMounted(() => {
  generateRandomGradient();
  notificationItemCart.value = arrayCart.value.length;
  restaurants.value = loadAll();
  defaultActive.value = window.location.pathname;
});
onBeforeUnmount(() => {
  emitter.off("openCart", onOpenCart);
});
</script>

<template>
  <div class="fixed-nav">
    <div class="screen-pc">
      <el-menu
        :default-active="defaultActive"
        class="flex items-center"
        mode="horizontal"
        :ellipsis="false"
      >
        <router-link to="/" class="flex items-center">
          <el-image src="/image/logo.png"> </el-image>
        </router-link>

        <div class="ml-2 flex flex-row items-center flex-grow">
          <div class="flex justify-end flex-1">
            <div v-for="item in showRoutes" :key="item.path">
              <el-menu-item v-if="!item.children" :index="item.path">
                <router-link class="nav-link" :to="item.path">
                  <span>{{ item.name }}</span>
                </router-link>
              </el-menu-item>
              <el-sub-menu v-else :index="item.path">
                <template #title>
                  <span style="font-size: 18px">{{ item.name }}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    v-for="child in item.children"
                    :key="child.path"
                    :index="child.path"
                    style="font-size: 16px"
                  >
                    <router-link
                      class="nav-link"
                      :to="child.path"
                      style="width: 100%"
                    >
                      <span>{{ child.name }}</span>
                    </router-link></el-menu-item
                  >
                </el-menu-item-group>
              </el-sub-menu>
            </div>
          </div>
          <div class="flex">
            <el-button @click="onOpenSearch"
              ><Icon icon="bi:search" />
            </el-button>
            <div class="flex items-center">
              <el-tooltip placement="bottom">
                <el-button><Icon icon="carbon:notification" /></el-button>
                <template #content>
                  <div>Hiiii</div>
                </template>
              </el-tooltip>
              <el-button @click="onOpenCart"
                ><Icon icon="bi:cart" />
                <span v-if="notificationItemCart > 0" class="item-number">{{
                  notificationItemCart
                }}</span>
              </el-button>
              <router-link v-if="!myUserId.userID" to="/buyer/login">
                <el-button><Icon icon="ph:user-bold" /> </el-button>
              </router-link>
              <div v-else style="padding-right: 15px">
                <el-dropdown>
                  <span class="body-dropdown">
                    <div class="flex items-center justify-center">
                      <el-avatar
                        v-if="myUserId.avatarUser"
                        size="small"
                        :src="myUserId.avatarUser"
                      />
                      <el-avatar
                        v-else
                        size="small"
                        :style="{ backgroundImage: randomGradient }"
                      />
                      <span
                        style="user-select: none; padding-left: 0.3125rem"
                        >{{ myUserId.nameUser }}</span
                      >
                    </div>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>Tài khoản của tôi</el-dropdown-item>
                      <el-dropdown-item>Đơn mua</el-dropdown-item>
                      <el-dropdown-item @click="logout"
                        >Đăng xuất</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
          </div>
        </div>
      </el-menu>
    </div>
    <!-- -------------------- -->
    <!-- Menu Mobile -->
    <div class="screen-mobile">
      <div class="flex justify-between">
        <div>
          <el-button @click="onOpenCart"
            ><Icon icon="bi:cart" />
            <span v-if="notificationItemCart > 0" class="item-number">{{
              notificationItemCart
            }}</span>
          </el-button>
        </div>
        <div>
          <router-link to="/" class="items-center">
            <el-image src="/image/logo.png" class="logo"> </el-image>
          </router-link>
        </div>
        <div class="side-menu flex justify-end">
          <el-button @click="onOpenMenu">
            <Icon
              style="font-size: 30px; font-weight: bold"
              icon="eva:menu-2-fill"
            />
          </el-button>
        </div>
      </div>
      <div class="input-search flex justify-center">
        <el-autocomplete
          v-model="inputSearch"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          placeholder="Tìm kiếm sản phẩm"
          style="width: 100%; max-width: 750px"
        />
      </div>

      <!-- dialog Menu -->
      <el-dialog v-model="dialogMenu" modal-class="menu-mobile">
        <template #header>
          <el-image src="/image/logo.png" class="logo"> </el-image>
        </template>
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          @select="handleSelectMenu"
        >
          <div v-for="item in showRoutes" :key="item.path">
            <el-menu-item v-if="!item.children" :index="item.path">
              <router-link class="nav-link" :to="item.path">
                <span>{{ item.name }}</span>
              </router-link>
            </el-menu-item>
            <el-sub-menu v-else :index="item.path">
              <template #title>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="child in item.children"
                  :key="child.path"
                  :index="child.path"
                >
                  <router-link class="nav-link" :to="child.path">
                    <span>{{ child.name }}</span>
                  </router-link></el-menu-item
                >
              </el-menu-item-group>
            </el-sub-menu>
          </div>
          <div>
            <li v-if="!myUserId.userID" class="el-menu-item">
              <router-link
                to="/buyer/login"
                class="nav-link"
                @click="handleSelectMenu"
              >
                <span>Đăng nhập</span>
              </router-link>
            </li>
            <div v-else>
              <el-dropdown>
                <span class="body-dropdown">
                  <div class="flex items-center justify-center">
                    <el-avatar
                      v-if="myUserId.avatarUser"
                      size="small"
                      :src="myUserId.avatarUser"
                    />
                    <el-avatar
                      v-else
                      size="small"
                      :style="{ backgroundImage: randomGradient }"
                    />
                    <span style="user-select: none; padding-left: 0.3125rem">{{
                      myUserId.nameUser
                    }}</span>
                  </div>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>Tài khoản của tôi</el-dropdown-item>
                    <el-dropdown-item>Đơn mua</el-dropdown-item>
                    <el-dropdown-item @click="logout"
                      >Đăng xuất</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </el-menu>
      </el-dialog>
    </div>

    <!-- dialog cart -->
    <el-dialog
      v-model="centerDialogVisible"
      title="Giỏ Hàng"
      modal-class="carts"
    >
      <div class="cart-body h-full">
        <div v-if="arrayCart.length > 0">
          <div
            v-for="item in arrayCart"
            :key="item.name"
            class="cart-item mb-5"
          >
            <el-image :src="item.image" style="max-width: 100px" />
            <div class="info-product px-2">
              <p>{{ item.name }}</p>
              <p class="py-3">Size : {{ item.size }}</p>
              <div class="flex justify-between items-center">
                <el-input-number
                  v-model.number="item.numQuatity"
                  :min="1"
                  :max="10"
                  :value-on-clear="1"
                  @change="
                    handleChange(item, item.numQuatity, item.priceOriginal)
                  "
                />
                <span>{{ formatAmount(item.amount) }}₫</span>
              </div>
            </div>
            <el-button
              @click="deleteItemCart(item)"
              class="bg-red-600 text-white delete-cart"
              ><Icon icon="mi:delete"
            /></el-button>
          </div>
        </div>
        <div
          v-else
          class="flex justify-center items-center flex-col h-full"
          style="user-select: none"
        >
          <el-image src="/image/cart-empty.png"></el-image>
          <h1 style="font-size: 18px">Chưa có sản phẩm</h1>
        </div>
      </div>
      <template #footer>
        <div v-if="arrayCart.length > 0">
          <div class="flex justify-between py-5" style="font-size: 16px">
            <p class="text-total">Tổng số tiền:</p>
            <p class="number-total">
              {{ formatAmount(Number(totalAmounts)) }}₫
            </p>
          </div>
          <span class="dialog-footer">
            <el-button @click="handleCheckout">Thanh toán</el-button>
          </span>
        </div>
      </template>
    </el-dialog>

    <!-- dialog search -->
    <el-dialog
      v-model="centerDialogSearch"
      title="Tìm kiếm"
      modal-class="modal-search"
    >
      <div class="modal-search-body h-full">
        <div class="input-search flex items-center">
          <el-autocomplete
            v-model="inputSearch"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            class="inline-input w-full"
            placeholder="Tìm kiếm sản phẩm"
          />
          <el-button class="submit-search">Tìm kiếm</el-button>
        </div>
        <div class="suggest-search mt-14">
          <b>TÌM KIẾM PHỔ BIẾN NHẤT:</b>
          <ul>
            <li v-for="item in 5">
              <router-link to="/">
                {{ item }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.fixed-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;

  .el-menu {
    .el-sub-menu__title {
      font-size: 18px;
    }
  }
  .el-menu-item {
    &:hover,
    &:focus {
      background-color: unset;
    }
  }

  .el-button {
    outline: none;
    border: none;
    font-size: 20px;
    margin-left: 0px;
    &:hover,
    &:focus {
      background-color: unset;
    }
  }

  .item-number {
    color: #ffffff;
    font-size: 12px;
    width: 25px;
    background: #e7244e;
    border-radius: 50%;
    position: relative;
    top: -10px;
    height: 25px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cart-body {
    .cart-item {
      display: flex;
      align-items: center;
      .delete-cart {
        &:hover,
        &:focus {
          background-color: rgb(235, 77, 77);
          color: #ffff;
        }
      }
    }
  }
  .body-dropdown {
    &:focus-visible {
      outline: none;
      border: none;
    }
  }
  .el-image {
    min-width: 120px;
  }
}
:deep(.el-input__wrapper) {
  border-radius: 8px;
}
@media screen and (min-width: 969px) {
  .fixed-nav {
    .screen-mobile {
      display: none;
    }
  }
}
@media screen and (max-width: 968px) {
  .fixed-nav {
    .screen-pc {
      display: none;
    }
    .screen-mobile {
      display: block;
      background-color: #ffff;
      padding: 10px;
      .input-search {
        margin-top: 10px;
      }
    }

    .el-dropdown {
      display: flex;
      justify-content: center;
      font-size: 17px;
    }
  }
}
@media screen and (max-width: 500px) {
  .fixed-nav {
    .logo {
      width: 150px;
    }
  }
}
</style>
<style lang="scss">
.carts,
.menu-mobile {
  .el-dialog {
    right: 0px;
    position: fixed;
    bottom: 0px;
    top: 0px;
    margin: 0;
    width: 100%;
    max-width: 460px;
    .el-dialog__body {
      height: calc(100% - 54px - 150px);
      overflow-y: auto;
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #f5f5f5;
        border-radius: 10px;
      }
      &::-webkit-scrollbar {
        width: 10px;
        background-color: #f5f5f5;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-image: -webkit-gradient(
          linear,
          left bottom,
          left top,
          color-stop(0.44, rgb(122, 153, 217)),
          color-stop(0.72, rgb(73, 125, 189)),
          color-stop(0.86, rgb(28, 58, 148))
        );
      }
    }
    .el-dialog__footer {
      text-align: center;
      .dialog-footer {
        display: block;
        background-color: #fb6e2e;
        padding: 10px;
        width: 100%;
        border-radius: 10px;
        transition: all 0.3s ease-out;
        & span {
          color: #ffff;
        }
        &:hover {
          background-color: #ff8953;
        }
        .el-button {
          width: 100%;
        }
      }
    }
    .el-input-number {
      width: auto;
      .el-input-number__decrease:hover
        ~ .el-input:not(.is-disabled)
        .el-input__wrapper,
      .el-input-number__increase:hover
        ~ .el-input:not(.is-disabled)
        .el-input__wrapper {
        box-shadow: none;
      }

      .el-input__wrapper {
        border-radius: 5px;
      }
    }
  }
}
.menu-mobile .el-dialog__body {
  overflow-y: visible !important;
  height: auto !important;
  padding: 0px 10px;
}

.fixed-nav {
  .el-menu {
    .el-menu-item {
      .nav-link {
        width: 100%;
        & span {
          font-size: 18px;
          font-weight: 600;
        }
        & p {
          font-size: 16px;
        }
      }
    }
    .el-sub-menu__title {
      font-size: 18px;
      font-weight: 600;
    }

    .el-menu-item-group__title {
      display: none;
    }
  }
}
.modal-search {
  .el-dialog {
    right: 0px;
    left: 0;
    position: fixed;
    top: 0;
    margin: 0;
    width: 100%;
    height: 50%;
    .el-dialog__body {
      width: 1024px;
      margin: 0 auto;
    }
    .el-input__wrapper {
      padding: 5px;
      border-radius: 0px;
    }
    .submit-search {
      overflow: visible;
      min-height: 100%;
      height: 40px;
      font-size: initial;
      padding: 15px;
      color: #fff;
      text-transform: uppercase;
      background-color: #333;
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.3);
      &:hover {
        background-color: #444444;
      }
      &:focus {
        background-color: #333;
      }
    }
  }
}
</style>
