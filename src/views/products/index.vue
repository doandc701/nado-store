<template>
  <div class="content__products">
    <h1 class="text-center text-[48px] text-[#282828]">Sneaker</h1>
    <div class="flex">
      <!-- side--bar__filter -->
      <div class="mr-2 flex-1 mt-[25px] max-w-[220px] max-[969px]:hidden">
        <div>
          <h1 class="mb-2">Lọc theo giá</h1>
          <el-radio-group class="flex" v-model="radioFilterPrice">
            <el-radio :label="0" class="w-full">0₫ - 1.000.000₫</el-radio>
            <el-radio :label="1" class="w-full"
              >1.000.000₫ - 3.000.000₫</el-radio
            >
            <el-radio :label="2" class="w-full"
              >3.000.000₫ - 5.000.000₫</el-radio
            >
            <el-radio :label="3" class="w-full"
              >5.000.000₫ - 7.000.000₫</el-radio
            >
            <el-radio :label="4" class="w-full"
              >7.000.000₫ - 10.000.000₫</el-radio
            >
            <el-radio :label="5" class="w-full"
              >10.000.000₫ - 20.000.000₫</el-radio
            >
          </el-radio-group>
        </div>
        <div class="mt-2">
          <h1 class="mb-2">Lọc theo thương hiệu</h1>
          <el-checkbox-group v-model="checkFilterBrand">
            <el-checkbox class="w-full" label="adidas"> Adidas </el-checkbox>
            <el-checkbox class="w-full" label="converse">
              Converse
            </el-checkbox>
            <el-checkbox class="w-full" label="jordan">Jordan</el-checkbox>
            <el-checkbox class="w-full" label="vans">Vans</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="box__product">
        <div class="paths">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">Nadover</el-breadcrumb-item>
            <el-breadcrumb-item>Sneaker</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <!-- sort -->
        <div class="flex justify-end items-center">
          <div class="max-[969px]:block min-[970px]:hidden">
            <el-button @click="dialogFilterVisible = true"
              ><Icon icon="mi:filter" :rotate="3" class="mr-1" />Bộ
              lọc</el-button
            >
          </div>
          <el-select v-model="valueSort" class="m-2" placeholder="Select">
            <el-option
              v-for="item in optionSort"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div
          class="p-2 grid grid-cols-2 gap-[1rem] md:grid-cols-3 lg:grid-cols-4"
        >
          <div class="" v-for="airItem in listAirJodan1" :key="airItem.name">
            <router-link :to="'/shop/' + airItem.alias" class="block">
              <el-image :src="airItem.src" :alt="airItem.name" />
              <div class="flex flex-col">
                <span class="mb-5 mt-2 short-text"> {{ airItem.name }}</span>
                <div class="prices flex items-center justify-between">
                  <span class="mb-5 mt-2 flex-1 text-[#ee4d2d] font-bold">
                    {{ airItem.price }}</span
                  >
                  <span
                    class="numberOrders mb-5 mt-2 px-2 text-[14px] text-[#0000008a] flex-1 text-right"
                    >Đã bán {{ airItem.numberOrders }}</span
                  >
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- modal filter -->
    <el-dialog
      v-model="dialogFilterVisible"
      title="Bộ lọc"
      class="w-full max-w-[400px]"
      draggable
    >
      <div class="side--bar__filter flex-1 mt-[25px] max-w-[220px]">
        <div>
          <h1 class="mb-2">Lọc theo giá</h1>
          <el-radio-group class="flex" v-model="radioFilterPrice">
            <el-radio :label="0" class="w-full">0₫ - 1.000.000₫</el-radio>
            <el-radio :label="1" class="w-full"
              >1.000.000₫ - 3.000.000₫</el-radio
            >
            <el-radio :label="2" class="w-full"
              >3.000.000₫ - 5.000.000₫</el-radio
            >
            <el-radio :label="3" class="w-full"
              >5.000.000₫ - 7.000.000₫</el-radio
            >
            <el-radio :label="4" class="w-full"
              >7.000.000₫ - 10.000.000₫</el-radio
            >
            <el-radio :label="5" class="w-full"
              >10.000.000₫ - 20.000.000₫</el-radio
            >
          </el-radio-group>
        </div>
        <div class="mt-2">
          <h1 class="mb-2">Lọc theo thương hiệu</h1>
          <el-checkbox-group v-model="checkFilterBrand">
            <el-checkbox class="w-full" label="adidas"> Adidas </el-checkbox>
            <el-checkbox class="w-full" label="converse">
              Converse
            </el-checkbox>
            <el-checkbox class="w-full" label="jordan">Jordan</el-checkbox>
            <el-checkbox class="w-full" label="vans">Vans</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleFilter"> Xác nhận </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
const radioFilterPrice = ref();
const checkFilterBrand = ref([]);

const valueSort = ref("new");
const dialogFilterVisible = ref(false);
const listAirJodan1 = [
  {
    name: "Giày Air Jordan 1 Low GS ‘Mystic Green’ 553560-113",
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/07/main-square_317b722a-1e59-404f-9.jpg",
    alias: "air-jordan-553560-113",
    price: "4.890.000₫",
    numberOrders: 10,
  },
  {
    name: "Giày Air Jordan 1 Retro Low ‘Obsidian Ember Glow’ 553558-481",
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/07/main-square_a23b9da8-23d5-4683-a.jpg",
    alias: "air-jordan-553560-481",
    price: "4.490.000₫",
    numberOrders: 15,
  },
  {
    name: "Giày Nike Air Jordan 1 Mid ‘Lucky Green’ GS DQ8423-301",
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/07/main-square_8a011823-5d4a-4ea2-b.jpg",
    alias: "nike-dunk-DQ8423-301",
    price: "4.290.000₫",
    numberOrders: 18,
  },
  {
    name: "Giày Nike Air Jordan 1 Retro High OG ‘UNC Toe’ DZ5485-400",
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/07/giay-nike-air-jordan-1-retro-high-og-unc-toe-dz5485-400.jpg",
    alias: "nike-air-DZ5485-400",
    price: "12.290.000₫",
    numberOrders: 20,
  },
  {
    name: "Giày Nike Air Jordan 1 Low ‘Quai 54’ (2023) FQ6703-100",
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/07/giay-nike-air-jordan-1-low-quai-54-2023-fq6703-100.jpg",
    alias: "nike-air-FQ6703-100",
    price: "6.890.000₫",
    numberOrders: 31,
  },
  {
    name: "Giày Nike Air Jordan 1 Retro High OG ‘Craft Vibrations Of Naija’ FD8631-100",
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/06/giay-nike-air-jordan-1-retro-high-og-craft-vibrations-of-naija-fd8631-100.jpg",
    alias: "nike-air-FD8631-100",
    price: "6.690.000₫",
    numberOrders: 50,
  },
  {
    name: "Giày Nike Air Jordan 1 Low SE ‘Brown Elephant’ DZ4130-201",
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/06/giay-nike-air-jordan-1-low-se-brown-elephant-dz4130-201-7.jpg",
    alias: "nike-air-DZ4130-201",
    price: "4.390.000₫",
    numberOrders: 100,
  },
  {
    name: "Giày Nike Air Jordan 1 Low ‘Shadow Brown’ (W) DC0774-200",
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/06/giay-nike-air-jordan-1-low-shadow-brown-w-dc0774-200-7.jpg",
    alias: "nike-air-DC0774-200",
    price: "4.890.000₫",
    numberOrders: 112,
  },
];
const optionSort = [
  {
    value: "new",
    label: "Mới nhất",
  },
  {
    value: "asc",
    label: "Giá thấp đến cao",
  },
  {
    value: "desc",
    label: "Giá cao xuống thấp",
  },
];

// method
function handleFilter() {
  dialogFilterVisible.value = false;
}
</script>

<style lang="scss">
.content__products {
  max-width: 1400px;
  margin: 0px auto;
  padding: 0px 10px;
  .el-dialog__body {
    padding-top: 0px;
  }
  .el-checkbox__label,
  .el-radio__label {
    font-size: 16px;
  }
}
</style>
