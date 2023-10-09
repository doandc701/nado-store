<script setup lang="ts">
import { onMounted } from "vue";
import type { GoogleLogin, CallbackTypes } from "vue3-google-login";
import {
  googleOneTap,
  googleLogout,
  decodeCredential,
} from "vue3-google-login";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(
  "488752129889-s838g4d5o37j1vlc5bgn592hfq6daicg.apps.googleusercontent.com"
);

const callback = (response: any) => {
  console.log(response);
  if (response.credential) {
    console.log("Call the endpoint which validates JWT credential string");
  } else {
    console.log("Call the endpoint which validates authorization code");
  }
  const userData = decodeCredential(response.credential);
  console.log("Handle the userData", userData);
};
const yourLogoutFunction = () => {
  // your logout logics
  googleLogout();
};
onMounted(() => {
  googleOneTap()
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->

    <GoogleLogin :callback="callback" prompt auto-login />
    <el-button>Login</el-button>
    <div>One-Tap prompt will be shown once this component is mounted</div>
  </main>
</template>
