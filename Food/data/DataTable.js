import mockjs, { Random } from "mockjs";

export default class DataTable {
  static generateColumns() {
    return mockjs.mock({
      columns: [
        {
          title: "Name",
          dataIndex: "name",
          width: 140
        },
        {
          title: "Age",
          dataIndex: "age"
        },
        {
          title: "Gender",
          dataIndex: "gender",
          width: 80
        },
        {
          title: "Mobile",
          dataIndex: "mobile",
          width: 130
        }
      ]
    });
  }
  static generateData() {
    return mockjs.mock({
      // "data|1-20": [
      //   {
      //     "name|1": "@first @last",
      //     "age|18-80": 1,
      //     "mobile|12300000000-12399999999": 1,
      //     "gender|1": () => Random.pick(["male", "female"])
      //   }
      // ]
      data: [
        {
          name: "Nguyễn Đăng Tỉnh",
          age: 23,
          mobile: "0763463294",
          gender: "Nam"
        },
        {
          name: "Lê Thanh Minh",
          age: 20,
          mobile: "0438532543",
          gender: "Nam"
        },
        {
          name: "Trần Thị Hồng",
          age: 25,
          mobile: "05368349745",
          gender: "Nữ"
        }
      ]
    });
  }
}
