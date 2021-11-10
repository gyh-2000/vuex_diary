<template>
  <div>
    <div class="wrapper">
      <el-image :src="avator" class="avator"></el-image>
      <div class="info">
        <p>{{ nickname }}</p>
        <div class="dec">{{ decription }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "OwnSpace",
  data() {
    return {};
  },
  props: {
    avator: String,
    nickname: String,
    decription: String,
  },
  mounted() {
    // this.nickname = localStorage.getItem("page_a");
  },
};
</script>
<style scoped>
.wrapper {
  width: 20%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.dec {
  font-size: 0.5rem;
  color: #777;
}
.avator {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-top: 10px;
}
p {
  color: black;
}
</style>
