<template>
  <div class="wrapper">
    <div class="title">
      <p v-if="oldornew">在这里 写下你的第一篇日记吧</p>
      <p v-if="!oldornew">欢迎回到你的小世界 开始记录你的生活吧</p>
    </div>
    <div class="contain">
      <el-input
        type="textarea"
        v-model="log"
        class="diary"
        :rows="15"
        placeholder="writing something like moods or minds..."
      ></el-input>
      <el-button type="info" @click="saveDiary"
        >把你这次的日记保存一下吧</el-button
      >
      <el-button type="primary" @click="enterMySpace"
        >进去看看过去的你叭</el-button
      >
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Index",
  data() {
    return {
      log: "",
      oldornew: true,
    };
  },
  mounted() {},
  methods: {
    ...mapActions(["controlDiary", "controlHistory"]),
    saveDiary() {
      let historyDiary = {
        text: this.log,
        createTime: new Date(),
        id: Math.ceil(Math.random()*10)
      };
      //触发一次添加历史
      this.$store.dispatch("controlDiary", historyDiary);
      this.$notify({
        title: "保存日记",
        message: "保存日记成功",
        type: "success",
      });
      this.log = "";
      this.$store.dispatch("controlHistory", historyDiary);
    },
    enterMySpace() {
      /**
       * 跨页面通信的方法
       * 1 使用localStorage
       *
       */
      this.$router.push({ path: "/index/detail" });
      const data = this.log;
      localStorage.setItem("page_a", data);
      //跳转路由
    },
  },
};
</script>
<style scoped>
.title {
  margin-top: 2rem;
  border-radius: 35%;
  height: 6rem;
  color: purple;
  font-size: 2rem;
  float: left;
  font-family: cursive;
  position: absolute;
  top: 0.8rem;
  left: 2rem;
  background-image: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploadfile.bizhizu.cn%2F2015%2F0519%2F20150519015235365.jpg.source.jpg&refer=http%3A%2F%2Fuploadfile.bizhizu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639043845&t=2a54fe3c230a37357ffaaa7471498779);
}
.wrapper {
  margin-top: 10rem;
}
.contain {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-image: linear-gradient(#aaa, white);
  border-radius: 20px;
}
.diary {
  width: 50%;
  font-size: 1.5rem;
}
.diary:hover {
  box-shadow: 5px 5px 5px #888888;
}
p {
}
</style>
