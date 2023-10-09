<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const slider = [
  {
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/05/5.png",
  },
  {
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/05/7.png",
  },
  {
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/05/10.png",
  },
];
const InforStore = [
  {
    title: "Đổi mẫu, đổi size miễn phí",
    src: "https://sneakerdaily.vn/wp-content/uploads/2022/09/doi-mau-doi-size-mien-phi.jpg",
  },
  {
    title: "Mua trước, trả sau miễn lãi",
    src: "https://sneakerdaily.vn/wp-content/uploads/2022/09/mua-truoc-tra-sau-mien-lai.jpg",
  },
  {
    title: "Giao hàng, đổi trả tận nhà",
    src: "https://sneakerdaily.vn/wp-content/uploads/2022/09/giao-hang-doi-tra-tan-nha.jpg",
  },
  {
    title: "Hàng giả, đền tiền gấp đôi",
    src: "https://sneakerdaily.vn/wp-content/uploads/2022/09/hang-gia-den-tien-gap-doi.jpg",
  },
];

const listCategory = [
  {
    name: "MUA AIR JORDAN 1",
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/07/mua-jordan.jpg.webp",
    alias: "air-jordan-1",
  },
  {
    name: "MUA AIR FORCE 1",
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/07/mua-air-force-1.jpg.webp",
    alias: "air-force-1",
  },
  {
    name: "MUA NIKE DUNK",
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/07/mua-nike-dunk.jpg.webp",
    alias: "nike-dunk",
  },
  {
    name: "MUA QUẦN ÁO ADIDAS",
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/07/mua-kinh-thoi-trang-1.jpg.webp",
    alias: "quan-ao-adidas",
  },
  {
    name: "MUA MLB LINER",
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/07/mua-sprayground.jpg.webp",
    alias: "mlb-liner",
  },
  {
    name: "MUA ADIDAS FORUM",
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/07/mua-giay-bong-ro-nike.jpg.webp",
    alias: "adidas-forum",
  },
];
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
const listPopular = [
  {
    name: "Giày Nike Air Force 1 Low ’07 LV8 Tartan Plaid ‘White University Red’ DV0789-100",
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/06/giay-nike-air-force-1-low-07-lv8-tartan-plaid-white-university-red-dv0789-100.jpg",
    path: "air-jordan-1",
    price: "2.890.000₫",
  },
  {
    name: "Giày Nike Air Force 1 Low Classics ’50 Years Of Hip-Hop’ DV7183-100",
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/07/main-square_a23b9da8-23d5-4683-a.jpg",
    path: "air-force-1",
    price: " 3.990.000₫",
  },
  {
    name: "Giày Spider-Man × Nike Air Jordan 1 Retro High OG SP ‘Next Chapter’ DV1748-601",
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/05/Giay-Spider-Man-%C3%97-Nike-Air-Jordan-1-Retro-High-OG-SP-Next-Chapter-DV1748-601.jpg",
    path: "nike-dunk",
    price: "6.890.000₫",
  },
  {
    name: "Giày nam Air Jordan 1 Low ‘Smoke Grey V3’ 553558-040",
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/03/Giay-nam-Air-Jordan-1-Low-Smoke-Grey-V3-553558-040.jpg",
    path: "mlb-liner",
    price: "4.890.000₫",
  },
  {
    name: "Giày adiFOM Superstar ‘Core White’ HQ8750",
    src: "https://sneakerdaily.vn/wp-content/uploads/2023/01/giay-adifom-superstar-core-white-hq8750-13.png",
    path: "quan-ao-adidas",
    price: "3.390.000₫",
  },
  {
    name: "Giày Nike Air Force 1 Low Triple White 315122-111 / CW2288-111 / DD8959-100",
    src: "https://sneakerdaily.vn/wp-content/uploads/2022/09/Giay-Nike-Air-Force-1-Low-Triple-White-315122-111-CW2288-111-DD8959-100.jpg",
    path: "adidas-forum",
    price: "2.790.000₫",
    rate: "3",
  },
  {
    name: "Giày Air Jordan 1 Low ‘White Wolf Grey’ DC0774-105",
    src: "https://sneakerdaily.vn/wp-content/uploads/2021/07/Giay-Air-Jordan-1-Low-White-Wolf-Grey-DC0774-105.jpg",
    path: "adidas-forum",
    price: "5.490.000₫",
    rate: "5",
  },
  {
    name: "Giày nam Air Jordan 1 Low Light Smoke Grey Red 553558-030",
    src: "https://sneakerdaily.vn/wp-content/uploads/2020/11/Giay-nam-Air-Jordan-1-Low-Light-Smoke-Grey-Red-553558-030.jpg",
    path: "adidas-forum",
    price: "4.290.000₫",
    rate: "5",
  },
];

onMounted(() => {});
onBeforeUnmount(() => {});
</script>

<template>
  <main>
    <div class="show-slider">
      <el-carousel class="slider" :interval="5000" arrow="always">
        <el-carousel-item v-for="item in slider" :key="item.src">
          <el-image
            :src="item.src"
            style="width: 100%; max-width: 100%; height: 100%"
          ></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="row-infor">
      <div class="list-infor flex flex-wrap">
        <div
          class="list-items flex items-center justify-center"
          v-for="item in InforStore"
          :key="item.title"
        >
          <el-image :src="item.src"></el-image>
          <span class="ml-1">{{ item.title }}</span>
        </div>
      </div>
      <div class="contain-category">
        <div class="list-category">
          <el-row :gutter="12">
            <el-col
              class="col-custom"
              v-for="categories in listCategory"
              :key="categories.name"
            >
              <router-link :to="categories.alias" class="block">
                <el-image :src="categories.src" :alt="categories.name" />
                <span class="flex justify-center mb-5 mt-2">
                  {{ categories.name }}</span
                >
              </router-link>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="contain-products">
        <div class="session-jordan">
          <h1 class="text-center text-3xl pt-4">AIR JORDAN 1</h1>
          <div class="list-jordan">
            <el-row :gutter="20">
              <el-col
                class="col-custom"
                v-for="airItem in listAirJodan1"
                :key="airItem.name"
              >
                <router-link :to="'/shop/' + airItem.alias" class="block">
                  <el-image :src="airItem.src" :alt="airItem.name" />
                  <div class="flex flex-col">
                    <span class="mb-5 mt-2 short-text">
                      {{ airItem.name }}</span
                    >
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
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="session-popular">
          <h1 class="text-center text-3xl pt-4">TOP POPULAR</h1>
          <div class="list-popular">
            <el-row :gutter="20">
              <el-col
                class="col-custom"
                v-for="itemPopular in listPopular"
                :key="itemPopular.name"
              >
                <router-link :to="'/shop/' + itemPopular.path" class="block">
                  <el-image :src="itemPopular.src" :alt="itemPopular.name" />
                  <div class="flex flex-col">
                    <span class="text-center mb-5 mt-2 short-text">
                      {{ itemPopular.name }}</span
                    >
                    <div class="prices flex items-center justify-between">
                      <span class="mb-5 mt-2 flex-1 text-[#ee4d2d] font-bold">
                        {{ itemPopular.price }}</span
                      >
                      <span
                        class="numberOrders mb-5 mt-2 px-2 text-[14px] text-[#0000008a] flex-1 text-right"
                        >Đã bán 10</span
                      >
                    </div>
                  </div>
                </router-link>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped lang="scss">
.show-slider {
  .el-carousel__item .el-image {
    display: inline;
  }
  .slider {
    .el-carousel__container {
      height: 800px;
    }
  }
}
.row-infor {
  padding: 0px 10px;
  .list-infor {
    .list-items {
      padding: 20px 10px;
      vertical-align: middle;
      width: 25%;
      text-align: center;
      float: left;
      display: inherit;
      color: #000;
      .el-image {
        & img {
          width: 55px;
        }
      }
    }
  }
  .contain-category {
    max-width: 1000px;
    margin: 0px auto;
    .list-category {
      .col-custom {
        max-width: 33.3333333333%;
        flex: 0 0 33.3333333333%;
      }
      .el-image {
        transition: all 0.5s ease-in-out;
        &:hover {
          transform: scale(0.9);
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
  .contain-products {
    max-width: 1400px;
    margin: 0px auto;

    .col-custom {
      max-width: 25%;
      flex: 0 0 25%;
      .numberOrders {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .session-jordan,
    .session-popular {
      border-top: 3px solid #ebebeb;
      .list-jordan,
      .list-popular {
        overflow: hidden;

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
  }
}

@media screen and (max-width: 735px) {
  .row-infor {
    .list-infor {
      .list-items {
        width: 50%;
      }
    }
    .contain-products .col-custom {
      max-width: 33.3333333333%;
      flex: 0 0 33.3333333333%;
    }
  }
}
@media screen and (max-width: 550px) {
  .row-infor {
    .contain-products,
    .contain-category .list-category {
      .col-custom {
        max-width: 50%;
        flex: 0 0 50%;
      }
    }
  }
}
@media screen and (max-width: 400px) {
  .row-infor {
    .list-infor {
      .list-items {
        width: 100%;
        padding: 10px 0px;

        & span {
          flex: 1;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.show-slider {
  overflow: hidden;
  .slider {
    .el-carousel__container {
      min-height: 100%;
      height: 800px;
    }
  }
  @media screen and (max-width: 1200px) {
    .slider {
      .el-carousel__container {
        height: 600px;
      }
    }
  }
  @media screen and (max-width: 960px) {
    .slider {
      .el-carousel__container {
        height: 400px;
      }
    }
  }
  @media screen and (max-width: 600px) {
    .slider {
      .el-carousel__container {
        height: 320px;
      }
    }
  }
  @media screen and (max-width: 490px) {
    .slider {
      .el-carousel__container {
        height: 250px;
      }
    }
  }
  @media screen and (max-width: 400px) {
    .slider {
      .el-carousel__container {
        height: 200px;
      }
    }
  }
}
</style>
