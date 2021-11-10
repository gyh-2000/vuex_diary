const Mock = require("mockjs");
export const j = Mock.mock("http://localhost:8080/getData", {
  code: 1,
  msg: "请求接口成功",
  data: [
    {
      id: 1,
      name: "英语",
      createTime: "2019-01-01T21:18:02.000+0000",
      updateTime: "2019-01-01T21:18:07.000+0000",
      ordinal: 1,
    },
    {
      id: 2,
      name: "数学",
      createTime: "2019-01-01T21:18:02.000+0000",
      updateTime: "2019-01-01T21:18:07.000+0000",
      ordinal: 1,
    },
    {
      id: 3,
      name: "语文",
      createTime: "2019-01-01T21:18:02.000+0000",
      updateTime: "2019-01-01T21:18:07.000+0000",
      ordinal: 1,
    },
  ],
});
