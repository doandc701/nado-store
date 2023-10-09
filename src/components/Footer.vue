<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { Icon } from "@iconify/vue";
const date = new Date().getFullYear();
const formRef = ref<FormInstance>();

const numberValidateForm = reactive({
  email: "",
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<template>
  <div class="footer">
    <!-- <div class="container"> -->
    <div class="site-footer__inner flex">
      <div class="flex-1 p-10 col1">
        <div class="footer__about text-center">
          <p>
            "Với kinh nghiệm lâu năm làm thời trang chúng tôi NADOVER tự tin
            mang đến cho bạn sản phẩm tốt nhất gía cả hấp dẫn với nhiều ưu đãi
            khủng"
          </p>
          <ul class="social-media flex">
            <li>
              <a target="_blank" href="https://www.facebook.com/nguyenxunadona/"
                ><Icon icon="logos:facebook"
              /></a>
            </li>
            <li>
              <a target="_blank" href="https://www.instagram.com/doan_g09/"
                ><Icon icon="skill-icons:instagram"
              /></a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.tiktok.com/@doandc09?lang=vi-VN"
                ><Icon icon="logos:tiktok-icon"
              /></a>
            </li>
            <li>
              <a href="https://www.youtube.com/channel/UCqSv0iJY9uzaBbKA4U812iQ"
                ><Icon icon="logos:youtube"
              /></a>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex-1 contain">
        <div class="footer__widget">
          <h6 class="title">HỖ TRỢ KHÁCH HÀNG</h6>
          <ul class="footer__support">
            <li><a href="">Đổi trả 45 ngày</a></li>
            <li><a href="">Chính sách bảo hành</a></li>
            <li><a href="">Chính sách vận chuyển</a></li>
            <li><a href="">Phương thức thanh toán</a></li>
            <li><a href="">Điều khoản dịch vụ</a></li>
          </ul>
        </div>
      </div>
      <div class="flex-1 contain">
        <div class="footer__widget">
          <h6 class="title">NADOVER.COM</h6>
          <ul class="footer__support">
            <li>
              <a href="https://goo.gl/maps/tKRYxMgq4r2niybGA"
                >Địa chỉ: 126 Mễ Trì Hạ,Nam Từ Liêm, Hà Nội</a
              >
            </li>
            <li style="color: #fff">
              <a href="tel:0382795561">Hotline: 0382795561</a>
            </li>
            <li style="color: #ffffff8a">Zalo: Nguyễn Xuân Đoàn</li>
          </ul>
        </div>
      </div>
      <div class="flex-1 contain">
        <div class="footer__widget">
          <h6 class="title">NEWLETTER</h6>
          <div class="footer__newslatter">
            <p>Đăng ký ngay để nhận thông tin khuyến mãi</p>
            <el-form
              ref="formRef"
              :model="numberValidateForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item
                prop="email"
                :rules="[
                  { required: true, message: 'Vui lòng nhập email' },
                  { type: 'email', message: 'Email không hợp lệ' },
                ]"
              >
                <el-input
                  v-model="numberValidateForm.email"
                  type="text"
                  autocomplete="off"
                  placeholder="example123@gmail.com"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm(formRef)"
                  >Submit</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div class="row p-5">
      <div class="col-lg-12 text-center">
        <div class="footer__copyright__text">
          <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
          <p>
            Copyright © {{ date }} NADOVER.com . Mua giày, đến Sneaker NADOVER -
            Uy tín làm nên thương hiệu !
          </p>
          <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<style lang="scss" scoped>
.footer {
  padding-right: 0;
  padding-left: 0;
  background-color: #000;
  color: #fff;
  padding: 20px;
  font-size: 16px;
  .site-footer__inner {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .social-media {
      justify-content: center;
      & li {
        padding: 10px 10px;
        font-size: 20px;
      }
    }
    .contain {
      min-width: 200px;
      & ul li {
        padding: 10px 0px;
      }
      .footer__widget {
        padding: 0px 10px;
        .title {
          font-weight: 700;
        }
        .demo-ruleForm {
          min-width: 200px;
        }
      }
      .footer__newslatter p {
        padding: 10px 0px;
      }
    }
  }
}

@media screen and (max-width: 700px) {
  .footer {
    .site-footer__inner {
      .col1 {
        width: 100%;
      }
    }
  }
}
@media screen and (max-width: 440px) {
  .footer {
    .footer__widget {
      .title {
        text-align: center;
      }
    }
  }
}
</style>
<style>
.el-form-item__content {
  margin-left: 0px !important;
}
</style>
