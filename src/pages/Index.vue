<template>
  <div>
    <el-image
      :src="require('@/assets/image/plane.webp')"
      class="plane"
    ></el-image>
    <write-diary></write-diary>
  </div>
</template>
<script>
import WriteDiary from "../components/WriteDiary.vue";
export default {
  name: "Index",
  components: {
    WriteDiary,
  },
  data() {
    return {
      log: "",
      oldornew: true,
    };
  },
  computed: {
    key() {
      return this.$router.activeMenuName;
    },
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped>
.plane {
  width: 4.5rem;
  height: 4.5rem;
  object-fit: cover;
  background: chartreuse;
  position: absolute;
  /* 设置飞机背景图片为透明 */
  /* background-color: rgba(0, 0, 0, 0); */
  opacity: 0.5;
  animation: fly 5s ease-in -1s infinite alternate forwards;
 }
@keyframes fly {
  0% {
    right: 30rem;
    top: 3rem;
  }
  100% {
    right: 0;
    top: 0;
  }
}
</style>
