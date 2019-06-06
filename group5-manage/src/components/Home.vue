<template>
  <div class="container">
    <div style="height:100px;display:flex; align-items: center;justify-content: space-between;">
      <div>
        <el-button type="danger" icon="el-icon-delete" @click="deleteList">批量删除</el-button>
      </div>
       <el-input
        style="width:400px;"
        placeholder="名称、标题、身份"
        prefix-icon="el-icon-search"
        v-model="searchWord"
      ></el-input>
    </div>
    <div class="list-box">
      <el-table
        ref="multipleTable"
        border
        :data="demandVOs"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="供应列表">
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column prop="nickname" label="昵称" width="200px"></el-table-column>
          <el-table-column prop="identity" label="身份" width="160px"></el-table-column>
          <el-table-column prop="title" label="标题" show-overflow-tooltip width="200px"></el-table-column>
					<el-table-column prop="univalent" label="单价" show-overflow-tooltip width="80px"></el-table-column>
					<el-table-column prop="num" label="供应数量" show-overflow-tooltip width="80px"></el-table-column>
					<el-table-column prop="contact" label="联系人" show-overflow-tooltip width="300px"></el-table-column>
					<el-table-column prop="phone" label="联系电话" show-overflow-tooltip width="200px"></el-table-column>
					<el-table-column label="状态" show-overflow-tooltip width="150px">
            <template slot-scope="scope">
              <el-tag
                size="medium"
                v-if="scope.row.status===1"
                type="success"
                disable-transitions
              >正常</el-tag>
              <el-tag
                size="medium"
                v-if="scope.row.status===0"
                type="warning"
                disable-transitions
              >已过期</el-tag>
              <el-tag
                size="medium"
                v-if="scope.row.status===2"
                type="danger"
                disable-transitions
              >已售完</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="有效期至" show-overflow-tooltip width="300px">
            <template slot-scope="scope">{{handleTime(scope.row.validity)}}</template>
          </el-table-column>
          <el-table-column label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="deleteDemand(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="pagesize"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pagesize: 10,
      currentPage: 1,
      Loading: false,
      totalCount: 0,
      multipleTable: [],
      searchWord:'',
      demandVOs: [],
      multipleSelection: [],
      multipleSelection1: [],
      id: ""
    };
  },
  created() {
    this.getAllDemands();
  },
  watch: {
    searchWord: function(newMsg, oldMsg) {
      var _this = this;
      if (newMsg !== "") {
        _this.getSearchFarm();
      }
      if (newMsg === "") {
        _this.currentPage = 1;
        _this.getAllDemands();
      }
    }
  },
  methods: {
     getSearchFarm: function() {
      var _this = this;
      _this.currentPage = 1;
      _this.getSearchAccount();
    },
    getSearchAccount: function() {
      var _this = this;
      _this.Loading = true;
      this.$http({
        method: "GET",
        url: _this.apiServer + "/search/supply",
        params: {
          pageNo: _this.currentPage,
          pageSize: _this.pagesize,
          searchWord: _this.searchWord
        }
      }).then(function(res) {
        _this.farm = res.data.data.supplyVOS;
        _this.totalCount = res.data.data.totalCount;
        _this.Loading = false;
      });
    },
    getAllDemands: function() {
      console.log("222");
      var _this = this;
      _this.Loading = true;
      this.$http({
        method: "GET",
        url: _this.apiServer + "/demand/pageChat",
        params: {
          pageNo: _this.currentPage,
          pageSize: _this.pagesize
        }
      }).then(function(res) {
        _this.demandVOs = res.data.data.demandVOList;
        _this.totalCount = res.data.data.totalCount;
        _this.Loading = false;
      });
    },
  deleteList: function() {
      var _this = this;
      this.$confirm("是否删除选中项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        for (var i = 0; i < _this.multipleSelection.length; i++) {
          _this
            .$http({
              method: "DELETE",
              url: _this.apiServer + "/demand/delete",
              params: {
                id: _this.multipleSelection[i].id
              }
            })
            .then(function() {
              _this.getAllDemands();
            });
        }
        _this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    },
    deleteDemand(row) {
      var _this = this;
      var id = row.__ob__.value.id;
      _this
        .$confirm("是否删除该供应?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
        .then(() => {
          _this
            .$http({
              method: "DELETE",
              url: _this.apiServer + "/demand/delete",
              params: {
                id: id
              }
            })
            .then(function(res) {
              console.log("删除成功");
              _this.getAllDemands();
            });
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSelectionChange1(val) {
      this.multipleSelection1 = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      var _this = this;
      _this.currentPage = val;
      console.log(_this.currentPage);
      _this.getAllDemands();
    },
    handleTime: function(date) {
      var d = new Date(date);
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate() < 10 ? "0" + d.getDate() : "" + d.getDate();
      var hour = d.getHours() < 10 ? "0" + d.getHours() : "" + d.getHours();
      var minutes =
        d.getMinutes() < 10 ? "0" + d.getMinutes() : "" + d.getMinutes();
      var seconds =
        d.getSeconds() < 10 ? "0" + d.getSeconds() : "" + d.getSeconds();
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minutes +
        ":" +
        seconds
      );
    }
  }
};
</script>
<style></style>
