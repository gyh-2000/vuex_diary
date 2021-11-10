<template>
  <div class="pages">
    <own-info
      :avator="require('@/assets/image/avator.jpeg')"
      nickname="杞暖"
      decription="海鸟与鱼相爱"
    ></own-info>
    <div class="main">
      <div class="title">所有日记</div>
    </div>
    <diary-list></diary-list>
  </div>
</template>
<script>
import DiaryList from "../components/DiaryList.vue";
import OwnInfo from "../components/OwnInfo.vue";
export default {
  name: "SubjectDetail",
  data() {
    return {
      diary: "",
    };
  },
  components: {
    OwnInfo,
    DiaryList,
  },
  mounted() {
    /**
     *
     * element ui 的 el-image 图片不能使用相对路径引入
     * 解决办法
     * 1： 使用绝对路径 例如 https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg
     * 2： 使用require('相对路径') 当然 要v-bind绑定
     * 3： 也可用import 把图片先引进来
     * */
    //跨页面拿到父路由的数据
    this.diary = localStorage.getItem("page_a");
  },
};
</script>
<style scoped>
.pages {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  background-image: linear-gradient(#aaa, white);
  border-radius: 20px;
}
.main {
  width: 95%;
  margin: 0 auto;
}
.title {
  float: left;
  width: 300px;
  height: 50px;
  font-size: 1.5rem;
  font-family: cursive;
  background-image: url(https://img2.baidu.com/it/u=4173398259,3070128561&fm=26&fmt=auto);
  border-radius: 20px;
  text-align: center;
  line-height: 50px;
}
</style>
