<template>
  <div class="container-checkout">
    <div class="header-checkout">
      <div class="header-outline"></div>
      <div class="header-row">
        <div class="maps">
          <span><Icon icon="bxs:map" /></span>
          <h1>Địa Chỉ Nhận Hàng</h1>
        </div>
        <div class="flex items-center">
          <div v-if="nameAndNumberPhone && textMixAddr" class="addr-all">
            <div class="name-sdt">{{ nameAndNumberPhone }}</div>
            <div class="addr">
              {{ textMixAddr }}
            </div>
            <div class="default">Mặc định</div>
          </div>
          <el-button @click="openAddr">Thay đổi</el-button>
        </div>
      </div>
    </div>
    <div class="container-product">
      <div class="title flex items-center">
        <h1 style="flex: 4">Sản phẩm</h1>
        <h1 class="flex-1 text-center">Size</h1>
        <h1 class="flex-1 text-center">Đơn giá</h1>
        <h1 class="flex-1 text-center">Số lượng</h1>
        <h1 class="flex-1 text-center">Thành tiền</h1>
      </div>
      <div class="row-cart">
        <div
          v-for="item in tableData"
          :key="item.name"
          class="flex items-center"
        >
          <div class="column flex justify-start items-center" style="flex: 4">
            <el-image style="width: 50px" :src="item.image"></el-image>
            <div class="name-sp">
              <span>
                {{ item.name }}
              </span>
            </div>
          </div>
          <div class="column flex-1 text-center">{{ item.size }}</div>
          <div class="column flex-1 text-center">
            ₫{{ formatAmount(item.priceOriginal) }}
          </div>
          <div class="column flex-1 text-center">{{ item.numQuatity }}</div>
          <div class="column flex-1 text-center">
            ₫{{ formatAmount(item.amount) }}
          </div>
        </div>
      </div>
    </div>
    <div class="note">
      <p>Lời nhắn:</p>
      <el-input v-model="note" placeholder="Lưu ý cho người bán..."></el-input>
    </div>
    <div class="footer-checkout">
      <div class="text-right text-red-400">
        Lưu ý : Nội thành miễn phí ship, ngoại thành phí ship 35.000đ
      </div>
      <div class="method-checkout">
        <h1>Phương thức thanh toán</h1>
        <div class="options-checkout">
          <el-radio-group v-model="optionCheckout">
            <el-radio label="Chuyển khoản">Thẻ tín dụng/ ghi nợ</el-radio>
            <el-radio label="Thanh toán khi nhận hàng"
              >Thanh toán khi nhận hàng</el-radio
            >
          </el-radio-group>
        </div>
      </div>
      <div class="total-checkout">
        <div class="flex-col">
          <div class="total-share">
            <p class="title-amout">Tổng tiền hàng</p>
            <p>₫{{ formatAmount(Number(totalAmounts)) }}</p>
          </div>
          <div class="total-share">
            <p class="title-amout">Phí vận chuyển</p>
            <p>₫{{ formatAmount(transportFee) }}</p>
          </div>
          <div class="total-share">
            <p class="title-amout">Tổng thanh toán</p>
            <p class="font-bold text-orange-500">
              ₫{{ formatAmount(totalOrder) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="order-cart">
      <p class="temp">
        Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo
        <a href="#" style="color: #05a">Điều khoản Nadover</a>
      </p>
      <el-button @click="handleOrder">Đặt hàng</el-button>
    </div>
    <!-- địa chỉ -->
    <el-dialog v-model="dialogAddress" title="Địa chỉ mới" draggable>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="Họ và tên"
            @input="handleInputName"
          />
        </el-form-item>
        <el-form-item prop="phone">
          <el-input
            v-model="ruleForm.phone"
            placeholder="Số điện thoại"
            @change="handleInputPhone"
          />
        </el-form-item>
        <div class="options-addr flex">
          <el-form-item prop="addrCity">
            <el-select
              v-model="ruleForm.addrCity"
              placeholder="Tỉnh/ Thành Phố"
              @change="changeCity"
            >
              <el-option
                v-for="citied in apiAddr.city"
                :key="citied.name"
                :value="citied.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item class="op-district" prop="addrDistrict">
            <el-select
              v-model="ruleForm.addrDistrict"
              placeholder="Quận/ Huyện"
              @change="changeDistrict"
            >
              <el-option
                v-for="district in apiAddr.district"
                :key="district.name"
                :value="district.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="addrWard">
            <el-select v-model="ruleForm.addrWard" placeholder="Phường/ Xã">
              <el-option
                v-for="ward in apiAddr.ward"
                :key="ward.name"
                :value="ward.name"
              />
            </el-select>
          </el-form-item>
        </div>

        <el-form-item prop="inputAddr">
          <el-input
            v-model="ruleForm.inputAddr"
            placeholder="Địa chỉ cụ thể"
            @input="handleInputAddr"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel(ruleFormRef)">Trở lại</el-button>
          <el-button @click="submitForm(ruleFormRef)"> Hoàn thành </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { formatAmount } from "@/utils/numbro";
import axios from "axios";
import { useStore } from "@/stores";

interface RuleForm {
  name: string;
  phone: string;
  addrCity: string;
  addrDistrict: string;
  addrWard: string;
  inputAddr: string;
}
const storeUse = useStore();
const ruleFormRef = ref<FormInstance>();
const hostProvinces = "https://provinces.open-api.vn/api/";
const nameAndNumberPhone = ref("");
const textMixAddr = ref("");
const note = ref("");
const transportFee = ref(0);
const totalOrder = ref(0);
const optionCheckout = ref("");
const dialogAddress = ref(false);
const isFormInputPhone = ref(false);
const tableData = computed(() => {
  return storeUse.itemsCart;
});
const apiAddr = reactive({
  city: [] as any[],
  district: [] as any[],
  ward: [] as any[],
});
const ruleForm = reactive<RuleForm>({
  name: "",
  phone: "",
  addrCity: "",
  addrDistrict: "",
  addrWard: "",
  inputAddr: "",
});
const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: "Vui lòng nhập tên", trigger: "blur" }],
  phone: [
    {
      required: true,
      message: "Vui lòng nhập số điện thoại",
      trigger: "blur",
    },
  ],
  inputAddr: [
    {
      required: true,
      message: "Vui lòng nhập địa chỉ cụ thể",
      trigger: "blur",
    },
  ],
  addrCity: [
    {
      required: true,
      message: "Vui lòng chọn tỉnh/ thành phố",
      trigger: "change",
    },
  ],
  addrDistrict: [
    {
      required: true,
      message: "Vui lòng chọn quận/ huyện",
      trigger: "change",
    },
  ],
  addrWard: [
    {
      required: true,
      message: "Vui lòng chọn phường/ xã",
      trigger: "change",
    },
  ],
});

// computed
const totalAmounts = computed(() => {
  if (tableData.value.length > 0) {
    const result = tableData.value.reduce(
      (accumulator, item) => accumulator + item.amount,
      0
    );
    totalOrder.value = result + transportFee.value;
    return result;
  } else {
    totalOrder.value = 0;
    return 0;
  }
});

function openAddr() {
  dialogAddress.value = true;
}

function handleInputName(value: string) {
  if (value.trim().length <= 0) return;
  const formatText = value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  ruleForm.name = formatText;
}

function handleInputPhone(value: string) {
  if (value.trim().length <= 0) return;
  const regexPhoneNumber = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
  const isNumberPhone = value.match(regexPhoneNumber) ? true : false;
  if (isNumberPhone) {
    ruleForm.phone = value.replace(/^0/, "(+84) ");
    isFormInputPhone.value = true;
  } else {
    ElMessage.error("Số điện thoại không hợp lệ");
    isFormInputPhone.value = false;
  }
}

function handleInputAddr(value: string) {
  if (value.trim().length <= 0) return;
  const formatText = value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  ruleForm.inputAddr = formatText;
}
async function callAPI(api: string) {
  const response = await axios.get(api).catch(() => {});
  if (response) {
    apiAddr.city = response.data;
  }
}
async function callApiDistrict(api: string) {
  const response = await axios.get(api).catch(() => {});
  if (response) {
    apiAddr.district = response.data.districts;
  }
}
async function callApiWard(api: string) {
  const response = await axios.get(api).catch(() => {});
  if (response) {
    apiAddr.ward = response.data.wards;
  }
}
function changeCity(value: string) {
  const findCodeDistrict = apiAddr.city.find(
    (item) => item.name.toLowerCase() === value.toLowerCase()
  );
  if (!findCodeDistrict) return;

  callApiDistrict(hostProvinces + "p/" + findCodeDistrict.code + "?depth=2");
}
function changeDistrict(value: string) {
  const findCodeWard = apiAddr.district.find(
    (item) => item.name.toLowerCase() === value.toLowerCase()
  );
  if (!findCodeWard) return;
  callApiWard(hostProvinces + "d/" + findCodeWard.code + "?depth=2");
}

async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (
        ruleForm.name.trim().length <= 0 ||
        ruleForm.phone.trim().length <= 0 ||
        ruleForm.inputAddr.trim().length <= 0
      ) {
        ElMessage.error("Một số trường nhập không hợp lệ");
        return;
      }
      if (isFormInputPhone.value === false) {
        ElMessage.error("Một số trường nhập không hợp lệ");
        return;
      }

      ruleForm.addrCity !== "Thành phố Hà Nội"
        ? (transportFee.value = 35000)
        : (transportFee.value = 0);
      totalOrder.value = totalAmounts.value + transportFee.value;
      nameAndNumberPhone.value = `${ruleForm.name} ${ruleForm.phone}`;
      textMixAddr.value = `${ruleForm.inputAddr}, ${ruleForm.addrWard}, ${ruleForm.addrDistrict}, ${ruleForm.addrCity}`;
      dialogAddress.value = false;
      formEl.resetFields();
    } else {
      console.log("error submit!", fields);
    }
  });
}

function handleCancel(formEl: FormInstance) {
  dialogAddress.value = false;
  formEl.resetFields();
}

function handleOrder() {
  if (totalAmounts.value === 0) {
    ElMessage.warning("Chưa có đơn hàng để thanh toán !");
    return;
  }
  if (!textMixAddr.value) {
    openAddr();
  } else {
    if (!optionCheckout.value) {
      ElMessage.warning("Vui lòng chọn phương thức thanh toán");
    } else {
      ElMessage.success("Coming soon");
    }
  }
}

onMounted(() => {
  callAPI("https://provinces.open-api.vn/api/?depth=1");
});
</script>

<style lang="scss" scoped>
.container-checkout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0px 10px 30px 10px;

  .header-checkout {
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
    background: #fff;
    .header-outline {
      height: 3px;
      width: 100%;
      background-position-x: -30px;
      background-size: 116px 3px;
      background-image: repeating-linear-gradient(
        45deg,
        #6fa6d6,
        #6fa6d6 33px,
        transparent 0,
        transparent 41px,
        #f18d9b 0,
        #f18d9b 74px,
        transparent 0,
        transparent 82px
      );
    }
    .header-row {
      padding: 30px 5px;
      .maps {
        display: flex;
        align-items: center;
        font-size: 1.125rem;
        color: #ee4d2d;
        margin-bottom: 20px;
        text-transform: capitalize;
        flex: 1 1 auto;
        span {
          display: flex;
          margin-right: 9px;
        }
      }
      .addr-all {
        display: flex;
        align-items: center;
        font-size: 1rem;
        word-break: break-word;
        .name-sdt {
          font-weight: 700;
          color: #222;
        }
        .addr {
          margin-left: 20px;
          word-break: break-word;
        }
        .default {
          padding: 2px 5px;
          margin-left: 1.5em;
          color: #ee4d2d;
          border-radius: 1px;
          border: 0.5px solid;
          font-size: 10px;
          text-transform: capitalize;
          flex-shrink: 0;
        }
      }
      .el-button {
        color: #4080ee;
        text-transform: capitalize;
        margin-left: 2.5rem;
        border: none;
        background-color: #ffff;
        &:hover {
          color: #4080eeb7;
        }
      }
    }
  }
  .container-product {
    margin-top: 12px;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
    border-radius: 3px;

    .title {
      color: #bbb;
      padding-bottom: 20px;
    }
    .row-cart {
      height: 200px;
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
          color-stop(0.44, rgb(59, 63, 71)),
          color-stop(0.72, rgb(93, 106, 122)),
          color-stop(0.86, rgb(51, 56, 72))
        );
      }
      .column {
        border-bottom: 1px dashed rgba(0, 0, 0, 0.09);
        padding-bottom: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #222;
        min-height: 55px;
        .name-sp {
          margin: 0 15px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
  .note {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 320px;
    p {
      min-width: 70px;
      margin: 20px 10px 20px 0px;
    }
  }
  .footer-checkout {
    margin-bottom: 12px;
    border-radius: 3px;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.05);
    .method-checkout {
      margin: 20px 0px;
      background: #fff;
      display: flex;
      align-items: center;
      .options-checkout {
        margin-left: 10px;
      }
    }
    .total-checkout {
      display: flex;
      justify-content: flex-end;
      .total-share {
        display: flex;
        padding-bottom: 30px;
      }
      .title-amout {
        flex: 1;
        margin-right: 50px;
      }
    }
  }
  .order-cart {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .temp {
      padding: 10px;
    }
    .el-button {
      padding: 20px 70px;
      background-color: #f05d40;
      display: flex;
      align-items: center;
      justify-content: center;
      align-self: flex-start;
      color: #ffff;
      border: 1px solid rgba(0, 0, 0, 0.09);
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.03);
      border-radius: 5px;
      text-transform: capitalize;
      outline: none;
      &:hover {
        background-color: #f05d40b2;
      }
    }
  }
}
@media screen and (max-width: 683px) {
  .container-checkout {
    .header-checkout {
      .header-row {
        .addr-all {
          display: block;
          .addr {
            margin-left: 0px;
            padding: 10px 0px;
          }
          .default {
            margin-left: 0px;
            display: inline-block;
          }
        }
        .el-button {
          margin-left: 5px;
        }
      }
    }
    .order-cart {
      justify-content: center;
      flex-wrap: wrap;
      .temp {
        text-align: center;
      }
      .el-button {
        margin-top: 12px;
      }
    }
  }
}
</style>
<style lang="scss">
.container-checkout {
  .footer-checkout {
    .method-checkout {
      .options-checkout {
        .el-radio__label {
          font-size: 16px;
        }
      }
    }
  }
  .el-dialog {
    width: 100%;
    max-width: 600px;
    .options-addr {
      .op-district {
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
}
@media screen and (max-width: 580px) {
  .container-checkout {
    .el-dialog {
      .options-addr {
        display: block;
        .op-district {
          margin-left: 0px;
          margin-right: 0px;
        }
        .el-select {
          width: 100%;
        }
      }
    }
  }
}
</style>
