<template>
  <div class="listMain">
    <div v-for="list in diaryList" :key="list.id" class="diary_item">
      <p>{{ list.text }}</p>
      <p class="time">{{ list.createTime }}</p>
      <div class="btn">
        <el-button type="primary" @click="editDiary(list)" class="edit"
          >编辑</el-button
        >
        <el-button type="danger" @click="deleteDiary(list.id)" class="edit"
          >删除</el-button
        >
      </div>
    </div>
    <div class="bottom">共有{{ count }}条日记</div>
    <el-dialog :visible="isEdit">
      <p>随心所欲的改吧 嘻嘻嘻</p>
      <el-input type="textarea" :rows="4" v-model="oldDiaryContent"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isEdit = false">取 消</el-button>
        <el-button type="primary" @click="saveAgain">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import dayjs from "dayjs";
// import { fetchDiaryList } from '@/api/index'
// import moment from 'moment'
export default {
  name: "DiaryList",
  data() {
    return {
      count: 0,
      diaryList: [],
      isEdit: false,
      oldDiaryContent: "",
      oldText: "",
    };
  },
  computed: {
    ...mapState(["content", "history"]),
    ...mapGetters(["getADiarySize"]),
  },
  mounted() {
    if (JSON.parse(window.localStorage.getItem("history"))) {
      for (let item of JSON.parse(window.localStorage.getItem("history"))) {
        item.createTime = dayjs(item.createTime).format("YYYY-MM-DD HH:mm:ss");
        this.diaryList.push(item);
        this.count++;
      }
    } else {
      if (this.$store.state.content && this.$store.state.content.length < 1) {
        this.diaryList = [];
        this.count = 0;
      } else {
        this.$store.state.content.forEach((element, index) => {
          if (element.text.length === 0) {
            this.$store.state.content.splice(index, 1);
          }
          element.createTime = dayjs(element.createTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        });
        this.diaryList = this.$store.state.content;
        this.count = this.$store.state.content.length;
      }
    }
    //触发GET_A_DIARY_SIZE action
    // 将this GET_A_DIARY_SIZE 映射为 this.$store.dispatch('GET_A_DIARY_SIZE')
    // this.$store.dispatch("controlDiary");
  },
  methods: {
    //必须写在这里 否则会报错
    ...mapActions([
      "controlDiary",
      "controlHistory",
      "deleteDiary",
      "deleteHistory",
    ]),
    editDiary(index) {
      this.isEdit = true;
      this.oldDiaryContent = index.text;
      this.oldText = index.text;
    },
    deleteDiary(id) {
      console.log(id, this.$store.state.history);
      this.$store.state.history.forEach((ele, index) => {
        console.log(ele.id);
        if (ele.id === id) {
          console.log(1);
          this.$store.state.history.splice(index, 1);
        }
      });
      location.reload();
      // this.$store.dispatch('deleteAHistory',)
      console.log("delete");
    },
    handleClose(done) {
      done();
    },
    saveAgain() {
      this.isEdit = false;
      //保存更改日记信息
      console.log(this.oldText);
      let index = this.$store.state.content.findIndex(
        (data) => data.text === this.oldText
      );

      console.log(index);
      console.log(typeof this.$store.state.content);
      let newDiaryInfo = {
        text: this.oldDiaryContent,
        createTime: new Date(),
        // id: this.$store.state.content[index].id
      };
      console.log(newDiaryInfo);
      this.$store.dispatch("controlDiary", newDiaryInfo);
      this.$notify({
        title: "修改日记",
        message: "修改日记成功",
        type: "success",
      });
      this.$store.dispatch("controlHistory", newDiaryInfo);
      this.$store.dispatch("deleteADiary", newDiaryInfo);
      this.$store.dispatch("deleteAHiatory", newDiaryInfo);
      location.reload();
    },
  },
};
</script>
<style scoped>
.listMain {
  margin-top: 5rem;
  margin-left: 3.9rem;
}
.diary_item {
  font-family: monospace;
  position: relative;
  width: 95%;
  height: auto;
  background: white;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 20px;
}
.diary_item:hover {
  box-shadow: 5px 5px 5px 5px #aaa;
  opacity: 0.8;
}
.diary_item:hover .btn {
  display: block;
}
.btn {
  position: absolute;
  right: 1rem;
  bottom: 0.5rem;
  display: none;
}
.edit {
  border-radius: 50%;
}
.bottom {
  width: 50%;
  /* margin-left: 2rem; */
  margin: 0 auto;
  /* background: rosybrown; */
}
</style>
