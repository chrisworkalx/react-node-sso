<template>
  <div>
    <img :src="userInfo.headImg" alt="" />
  </div>
  <div>
    姓名： <span>{{ userInfo.username }}</span> | 性别：<span>{{
      userInfo.sex
    }}</span>
  </div>
</template>

<script setup name="Home">
import { computed } from "vue";

const userInfo = computed(() => ({
  username: localStorage.getItem("nickname"),
  sex: localStorage.getItem("sex") == 0 ? "男" : "女",
  headImg: localStorage.getItem("headimgurl"),
}));
</script>

<style lang="scss" scoped></style>
