<template>
  <div></div>
</template>

<script setup name="User">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const getUrlParam = (name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};

onMounted(() => {
  let code = getUrlParam("code");
  console.log("code", code);
  if (code !== null) {
    //如果是微信登陆
    //根据code获取access_token
    // console.log(code, "===code---web");
    fetch(`/api/getWechatUserInfo?code=${code}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        Object.entries(JSON.parse(res)).map(([k, v]) => {
          localStorage.setItem(k, v);
        });
        router.push("/");
      });
  }
});
</script>

<style lang="scss" scoped></style>
