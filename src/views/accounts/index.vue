<template>
  <div class="contain__login--account">
    <div class="form-login" v-if="currentPage === 0">
      <h1 class="text-center mb-7" style="font-size: 30px">Đăng nhập</h1>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        size="large"
        @keyup.enter="onLogin(ruleFormRef)"
      >
        <div class="input-group">
          <el-form-item prop="username" :required="true" :show-message="false">
            <el-input
              clearable
              v-model="ruleForm.username"
              placeholder="Vui lòng nhập username hoặc email"
              @input="handleInUserName"
            />
            <span
              slot="error"
              style="color: #f56c6c; font-size: 12px; line-height: 1"
              >{{ errorValidation.errorUserName }}</span
            >
          </el-form-item>
        </div>
        <div class="input-group">
          <el-form-item prop="password" :required="true" :show-message="false">
            <el-input
              clearable
              show-password
              v-model="ruleForm.password"
              placeholder="Mật khẩu"
              @input="handleInPass"
            />
            <span
              slot="error"
              style="color: #f56c6c; font-size: 12px; line-height: 1"
              >{{ errorValidation.errorPass }}</span
            >
          </el-form-item>
        </div>
        <el-form-item>
          <div
            class="w-full h-20px flex justify-between items-center"
            style="padding-top: 10px"
          >
            <el-checkbox v-model="checked"> Nhớ mật khẩu </el-checkbox>
          </div>
        </el-form-item>

        <div class="submit">
          <el-button
            class="w-full"
            size="default"
            :loading="loading"
            @click="onLogin(ruleFormRef)"
          >
            Đăng nhập
          </el-button>
        </div>
        <el-form-item>
          <div
            class="w-full h-20px flex justify-between items-center"
            style="padding-top: 10px"
          >
            <el-button class="resetPass" @click="onChangeForm('reset-pass')"
              >Quên mật khẩu</el-button
            >
          </div>
        </el-form-item>
        <el-divider>
          <el-icon>Hoặc</el-icon>
        </el-divider>
        <div class="option-login flex justify-around">
          <el-button @click="handleLoginOther('facebook')"
            ><p class="mr-2"><Icon icon="logos:facebook" /></p>
            Facebook</el-button
          >
          <el-button @click="handleLoginOther('google')"
            ><p class="mr-2"><Icon icon="devicon:google" /></p>
            Google</el-button
          >
        </div>
        <div class="ask">
          <p class="text-center">
            Bạn mới biết đến Nadover?
            <el-link @click="onChangeForm('register')" style="user-select: none"
              >Đăng ký</el-link
            >
          </p>
        </div>
      </el-form>
    </div>

    <!-- Form SignUp -->
    <div class="form-signup" v-if="currentPage === 1">
      <h1 class="text-center mb-7" style="font-size: 30px">Đăng ký</h1>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        size="large"
        @keyup.enter="onSignUp(ruleFormRef)"
      >
        <div class="input-group">
          <el-form-item prop="username" :required="true" :show-message="false">
            <el-input
              clearable
              v-model="ruleForm.username"
              placeholder="Vui lòng nhập username hoặc email"
              @input="handleInUserName"
            />
            <span
              slot="error"
              style="color: #f56c6c; font-size: 12px; line-height: 1"
              >{{ errorValidation.errorUserName }}</span
            >
          </el-form-item>
        </div>
        <div class="input-group">
          <el-form-item prop="password" :required="true" :show-message="false">
            <el-input
              clearable
              show-password
              v-model="ruleForm.password"
              placeholder="Mật khẩu"
              @input="handleInPass"
            />
            <span
              slot="error"
              style="color: #f56c6c; font-size: 12px; line-height: 1"
              >{{ errorValidation.errorPass }}</span
            >
          </el-form-item>
          <div class="input-group">
            <el-form-item
              prop="passwordAgain"
              :required="true"
              :show-message="false"
            >
              <el-input
                clearable
                show-password
                v-model="ruleForm.passwordAgain"
                placeholder="Nhập lại mật khẩu"
                @input="handlePassAgain"
              />
              <span
                slot="error"
                style="color: #f56c6c; font-size: 12px; line-height: 1"
                >{{ errorValidation.errorPassAgain }}</span
              >
            </el-form-item>
          </div>
        </div>
        <div class="submit">
          <el-button
            class="w-full"
            size="default"
            :loading="loading"
            @click="onSignUp(ruleFormRef)"
          >
            Đăng ký
          </el-button>
        </div>

        <el-divider>
          <el-icon>Hoặc</el-icon>
        </el-divider>
        <div class="option-login flex justify-around">
          <el-button @click="handleLoginOther('facebook')"
            ><p class="mr-2"><Icon icon="logos:facebook" /></p>
            Facebook</el-button
          >
          <el-button @click="handleLoginOther('google')"
            ><p class="mr-2"><Icon icon="devicon:google" /></p>
            Google</el-button
          >
        </div>
        <div class="ask">
          <p class="text-center">
            Bằng việc đăng kí, bạn đã đồng ý với Nadover về
          </p>

          <div class="text-center mb-5">
            <a href="#" style="color: orange">Điều khoản dịch vụ</a> &
            <a href="#" style="color: orange">Chính sách bảo mật</a>
          </div>

          <p class="text-center">
            Bạn đã có tài khoản?
            <el-link @click="onChangeForm('login')" style="user-select: none"
              >Đăng nhập</el-link
            >
          </p>
        </div>
      </el-form>
    </div>

    <!-- Form Reset Pass -->
    <div class="form-reset-pass" v-if="currentPage === 2">
      <h1 class="text-center mb-7" style="font-size: 30px">Quên mật khẩu</h1>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        size="large"
        @keyup.enter="onSignUp(ruleFormRef)"
      >
        <div class="input-group">
          <el-form-item prop="email" :required="true" :show-message="false">
            <el-input
              clearable
              v-model="ruleForm.email"
              placeholder="abc123@gmail.com"
              @input="handleInEmail"
            />
            <span
              slot="error"
              style="color: #f56c6c; font-size: 12px; line-height: 1"
              >{{ errorValidation.errorEmail }}</span
            >
          </el-form-item>
        </div>

        <div class="submit">
          <el-button
            class="w-full"
            size="default"
            :loading="loading"
            @click="onFormReset(ruleFormRef)"
          >
            Quên mật khẩu
          </el-button>
        </div>

        <el-divider>
          <el-icon>Hoặc</el-icon>
        </el-divider>
        <div class="option-login flex justify-around">
          <el-button @click="handleLoginOther('facebook')"
            ><p class="mr-2"><Icon icon="logos:facebook" /></p>
            Facebook</el-button
          >
          <el-button @click="handleLoginOther('google')"
            ><p class="mr-2"><Icon icon="devicon:google" /></p>
            Google</el-button
          >
        </div>
        <div class="ask">
          <p class="text-center">
            Bằng việc đăng kí, bạn đã đồng ý với Nadover về
          </p>

          <div class="text-center mb-5">
            <a href="#" style="color: orange">Điều khoản dịch vụ</a> &
            <a href="#" style="color: orange">Chính sách bảo mật</a>
          </div>

          <p class="text-center">
            Bạn đã có tài khoản?
            <el-link @click="onChangeForm('login')" style="user-select: none"
              >Đăng nhập</el-link
            >
          </p>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { googleTokenLogin, decodeCredential } from "vue3-google-login";
import axios from "axios";
import Cookies from "js-cookie";
import { Icon } from "@iconify/vue";
import { ElMessage, type FormInstance } from "element-plus";
import { useStore } from "@/stores";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";
import { generateStorageKey } from "@/utils/format";
import { APP_TOKEN_NAME } from "@/config/constants";

const authStore = useAuthStore();
const loading = ref(false);
const checked = ref(true); // Remember password
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  username: "",
  email: "",
  password: "",
  passwordAgain: "",
});
const errorValidation = reactive({
  errorUserName: "",
  errorEmail: "",
  errorPass: "",
  errorPassAgain: "",
});
const getUserLocalStorage = localStorage.getItem("userkh");
const getPassLocalStorage = localStorage.getItem("pass");

// computed
const currentPage = computed(() => {
  return useStore().currentPage;
});

/** Method */
// validate Field
function handleInUserName(valueUserName: string) {
  if (!ruleForm.username) {
    errorValidation.errorUserName = "Vui lòng nhập username hoặc email";
  } else {
    if (valueUserName.trim().length <= 0) {
      errorValidation.errorUserName = "Username hoặc email không hợp lệ";
    } else {
      errorValidation.errorUserName = "";
    }
  }
}

function handleInEmail(valueEmail: string) {
  const filter =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!filter.test(valueEmail)) {
    errorValidation.errorEmail = "Địa chỉ email không hợp lệ!";
    return false;
  } else {
    errorValidation.errorEmail = "";
  }
}

function handleInPass(valuePass: string) {
  if (!ruleForm.password) {
    errorValidation.errorPass = "Vui lòng nhập mật khẩu ";
  } else {
    if (valuePass.trim().length < 6) {
      errorValidation.errorPass = "Mật khẩu tối thiểu 6 kí tự";
    } else {
      errorValidation.errorPass = "";
    }
  }
}

function handlePassAgain(valuePassAgain: string) {
  if (!ruleForm.passwordAgain) {
    errorValidation.errorPassAgain = "Vui lòng nhập lại mật khẩu ";
  } else {
    if (valuePassAgain.trim().length <= 0) {
      errorValidation.errorPassAgain = "Vui lòng nhập lại mật khẩu";
    } else {
      if (valuePassAgain.trim() !== ruleForm.password.trim()) {
        errorValidation.errorPassAgain =
          "Mật khẩu không khớp vui lòng nhập lại !";
      } else {
        errorValidation.errorPassAgain = "";
      }
    }
  }
}

async function onLogin(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (errorValidation.errorUserName || errorValidation.errorPass) {
        ElMessage.error("Vui lòng kiểm lại một số trường không hợp lệ!");
        return;
      }
      const successCallback = (response: any) => {
        if (checked.value) {
          if (response?.data?.data?.email) {
            localStorage.setItem("userkh", response.data.data.email);
          } else {
            localStorage.setItem("userkh", response.data.data.username);
          }
          localStorage.setItem("pass", ruleForm.password);
        } else {
          if (getUserLocalStorage && getPassLocalStorage) {
            localStorage.removeItem("userkh");
            localStorage.removeItem("pass");
          }
        }
        Cookies.set(
          generateStorageKey(import.meta.env.VITE_APP_TOKEN_NAME_USER),
          response.data.data.accessToken
        );
        useStore().SET_ACCESS_TOKEN_USER(response.data.data);
        ElMessage.success(response.data.message);
        router.push({
          path: `${window.history.state.back}`,
        });
      };
      const errorCallback = (error: any) => {
        console.log("error", error);
        ElMessage.error(error.response.data.message);
      };
      const payload = {
        type: "buyer",
        data: {
          username: ruleForm.username
            ? ruleForm.username.trim()
            : ruleForm.email.trim(),
          password: ruleForm.password,
        },
        successCallback,
        errorCallback,
      };
      authStore.login(payload);
    } else {
      if (ruleForm.username.length <= 0) {
        errorValidation.errorUserName = "Vui lòng nhập username hoặc email";
      }
      if (ruleForm.password.length <= 0) {
        errorValidation.errorPass = "Vui lòng nhập mật khẩu";
      }
      return false;
    }
  });
}

async function onSignUp(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (
        errorValidation.errorUserName ||
        errorValidation.errorPass ||
        errorValidation.errorPassAgain
      ) {
        ElMessage.error("Vui lòng kiểm lại một số trường không hợp lệ!");
        return;
      }
      if (ruleForm.passwordAgain.trim() !== ruleForm.password.trim()) {
        ElMessage.error("Mật khẩu không khớp vui lòng nhập lại !");
        return;
      }
      ElMessage("coming soon!");
    } else {
      if (ruleForm.username.length <= 0) {
        errorValidation.errorUserName = "Vui lòng nhập username hoặc email";
      }
      if (ruleForm.password.length <= 0) {
        errorValidation.errorPass = "Vui lòng nhập mật khẩu";
      }
      if (ruleForm.passwordAgain.length <= 0) {
        errorValidation.errorPassAgain = "Vui lòng nhập lại mật khẩu";
      }
      console.log("error submit!");
      return false;
    }
  });
}

function handleLoginOther(typeLogin: "facebook" | "google") {
  if (typeLogin == "facebook") {
    ElMessage.warning("Coming soon");
  } else {
    // google
    googleTokenLogin().then(async (response) => {
      // Lưu access_token vào cookie với tên 'access_token' và thời gian sống (expires) theo ý muốn (ví dụ: 1 giờ)
      // Cookies.set("nado_token", response.access_token, { expires: 1 / 24 }); // expires được tính bằng giờ (1 giờ = 1/24)
      Cookies.set(
        generateStorageKey(import.meta.env.VITE_APP_TOKEN_NAME_USER),
        response.access_token
      );
      try {
        // Gửi yêu cầu GET tới API của Google để lấy thông tin người dùng từ access_token
        const responseInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        // Response sẽ chứa thông tin người dùng từ access_token
        const { sub, name, email, picture } = responseInfo.data;
        // Ở đây bạn có thể làm gì đó với thông tin người dùng như hiển thị lên giao diện hoặc lưu vào Vuex
        useStore().SET_ACCESS_TOKEN_USER({ sub, name, email, picture });
        router.push({
          path: `${window.history.state.back}`,
        });
      } catch (error) {
        console.error("Error fetching user info:", error.message);
      }
    });
  }
}

async function onFormReset(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (errorValidation.errorEmail) {
        ElMessage.error("Vui lòng kiểm lại một số trường không hợp lệ!");
        return;
      }
      ElMessage.success("coming soon!");
    } else {
      if (ruleForm.email.length <= 0) {
        errorValidation.errorEmail = "Vui lòng nhập email";
      }
    }
  });
}

function onChangeForm(type: string) {
  errorValidation.errorUserName =
    errorValidation.errorEmail =
    errorValidation.errorPass =
    errorValidation.errorPassAgain =
    ruleForm.username =
    ruleForm.password =
      "";
  switch (type) {
    case "login":
      useStore().SET_CURRENTPAGE(0);
      break;
    case "register":
      useStore().SET_CURRENTPAGE(1);
      break;
    case "reset-pass":
      useStore().SET_CURRENTPAGE(2);
      break;
  }
}

onMounted(() => {
  if (getUserLocalStorage && getPassLocalStorage) {
    ruleForm.username = getUserLocalStorage;
    ruleForm.password = getPassLocalStorage;
  }
});
</script>

<style scoped lang="scss">
.contain__login--account {
  display: flex;
  justify-content: center;
  background-color: #fdebe2;
  padding: 15px 0px;
  min-height: 539px;
  .form-login,
  .form-signup,
  .form-reset-pass {
    width: 500px;
    padding: 10px 20px;
    background-color: #ffffffd8;
    border-radius: 10px;
    box-shadow: 0px 5px 15px 5px #888888;
    margin: 100px 0px;
    .submit {
      .el-button {
        color: #fff;
        background-color: #ee4d2d;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.09);
        padding: 20px 0px;
        &:hover {
          background-color: #ef5e42;
        }
      }
    }

    .el-button.resetPass {
      border: unset;
      color: unset;
      border-color: var(--el-button-hover-border-color);
      background-color: unset;
      outline: 0;
      &:hover {
        color: rgb(82, 78, 78);
      }
    }
    .option-login {
      margin-bottom: 20px;
      .el-button {
        width: 80%;
      }
    }
  }
}
</style>
