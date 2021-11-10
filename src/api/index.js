// import axios from 'axios'

// const getSubjectList = axios.get("http://localhost:8080/getData")
// export default getSubjectList

export const fetchDiaryList = (params) => {
   new Promise((resolve) => {
    // setTimeout(() => {
      const diaryString = JSON.parse(window.localStorage.getItem("history"));
      console.log(diaryString);
      //如果有日记存在
      if (diaryString.length !== 0) {
          console.log(1);
        try {
            console.log(2);
          const diaryData = JSON.stringify(diaryString);
          diaryData.push(params);
        //   window.localStorage.setItem("history", diaryData);
        } catch {
            console.log(3);
        //   reject(false);
        }
      } else {
        window.localStorage.setItem("history", params);
      }
      resolve(true);
    // }, 500);
  });
};
