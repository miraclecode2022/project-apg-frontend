<template>
  <div class="ui grid column">
    <div class="ui wide column center">
      <div class="ui inverted segment">
        <div class="ui inverted form">
          <div class="two fields">
            <div class="field">
              <label>Mã nhân viên:</label>
              <input :value="maNV" type="text" readonly />
            </div>
            <div class="field">
              <label>Họ và tên:</label>
              <input placeholder="Nhập họ và tên" type="text" v-model="name" />
            </div>
          </div>

          <div class="two fields">
            <div class="field">
              <label>Ngày sinh</label>
              <input
                placeholder="01/12/2020"
                type="text"
                v-model="dayOfBirth"
              />
            </div>
            <div class="field">
              <label>Phòng Ban</label>
              <input placeholder="Nhân sự" type="text" v-model="department" />
            </div>
          </div>

          <div class="ui right blue ui button" @click="handleButton">
            {{ buttonName }}
          </div>

          <div class="ui right green ui button" @click="refresh">
            Refresh
          </div>
        </div>
      </div>
      <div
        class="ui wide column center"
        :key="componentKeyTable"
        v-if="listData.length > 0"
      >
        <table class="ui green table">
          <thead>
            <tr>
              <th>Mã NV</th>
              <th>Họ và Tên</th>
              <th>Ngày Sinh</th>
              <th>Phòng Ban</th>
            </tr>
          </thead>
          <tbody v-for="item in listData" :key="item.id">
            <tr @dblclick="updateItem(item.id)">
              <td>{{ item.code }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.dayOfBirth }}</td>
              <td>{{ item.department }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="ui wide column center" v-else>
        <label>Chưa có dữ liệu</label>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      componentKeyTable: 0,
      maNV: "Mã nhân viên sẽ tự động tạo",
      listData: [],
      name: null,
      dayOfBirth: null,
      department: null,
      buttonName: "Lưu",
      isUpdate: false,
      idUpdate: null
    };
  },
  created() {
    this.getEmployees();
  },
  methods: {
    async getEmployees() {
      const { data } = await axios.get("http://localhost:3000/employees");
      this.listData = data;
    },

    async handleButton() {
      if (
        this.name === null ||
        this.dayOfBirth === null ||
        this.department === null
      ) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Vui lòng nhập đầy đủ thông tin cần thiết"
        });
      }

      let body = {
        name: this.name,
        dayOfBirth: this.dayOfBirth,
        department: this.department
      };

      try {
        if (this.isUpdate === false) {
          this.createEmployee(body);
        } else {
          this.updateEmployee(body);
        }
      } catch (err) {
        return Swal.fire({
          icon: "error",
          title: "Oops... Có lỗi xảy ra!",
          text: `Vui lòng thử lại`
        });
      }
    },

    async createEmployee(body) {
      let { data } = await axios.post(`http://localhost:3000/employees`, body);
      console.log(data);
      return Swal.fire({
        icon: "success",
        title: "Tạo mới thành công!",
        text: `Nhân viên ${data.name} vừa được tạo thành công`
      });
    },

    async updateEmployee(body) {
      let { data } = await axios.patch(
        `http://localhost:3000/employees/${this.idUpdate}`,
        body
      );
      return Swal.fire({
        icon: "success",
        title: "Cập nhật thành công!",
        text: `Nhân viên ${body.name} vừa được cập nhật`
      });
    },

    updateItem(id) {
      let item = this.listData.find(item => item.id === id);
      this.name = item.name;
      this.maNV = item.code;
      this.dayOfBirth = item.dayOfBirth;
      this.department = item.department;
      this.buttonName = "Update";
      this.isUpdate = true;
      this.idUpdate = id;
    },

    refresh() {
      this.name = null;
      this.maNV = "Mã nhân viên sẽ tự động tạo";
      this.dayOfBirth = null;
      this.department = null;
      this.buttonName = "Lưu";
      this.isUpdate = false;
      this.idUpdate = null;
    }
  }
};
</script>

<style></style>
