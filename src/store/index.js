export default {
  state: {
    content: [
      {
        text: [],
        createTime: [],
        id: 0,
      },
    ],
    history: [],
  },
  //将this.content 映射为 store.state.content mapState返回的是对象
  //可以用对象的扩展运算符将它与外部的对象混合 ...mapState()
  //   computed: mapState(["content"]),
  getters: {
    //可以认为是state的计算属性
    getADiarySize(state) {
      return () => state.content.length;
    },
  },
  mutations: {
    //变更状态
    //增加一个日记
    addDiary(state, payLoad) {
      state.content.push(payLoad);
      console.log(state.content);
      window.localStorage.setItem("content", JSON.stringify(state.content));
    },
    //删除一个日记
    deleteDiary(state, payLoad) {
      state.content.forEach((element, index) => {
        if (element.id === payLoad.id) {
          state.content.splice(index, 1);
        }
      });
    },
    addHistory(state, payLoad) {
      state.history.push(payLoad);
      window.localStorage.setItem("history", JSON.stringify(state.history));
    },
    deleteHistory(state, payLoad) {
      if (state.history) {
        let index = state.history.findIndex((data) => data === payLoad);
        state.history.splice(index, 1);
      }
    },
  },
  //提交mutation
  actions: {
    // 通过store.dispatch('某个mutation')触发
    // 或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用
    controlDiary(context, payLoad) {
      context.commit("addDiary", payLoad);
    },
    controlHistory(context, payLoad) {
      context.commit("addHistory", payLoad);
    },
    deleteADiary(context, payLoad) {
      context.commit("deleteDiary", payLoad);
    },
    deleteAHistory(context, payLoad) {
      context.commit("deleteHistory", payLoad);
    },
  },
};
