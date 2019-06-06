<template>

	  <el-table
    :data="techSort"
     style="width: 70%;margin: auto;">
    <el-table-column
      label="日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="bottom">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.id }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.icon }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="delSort(scope.row.id)">删除</el-button>
					  
      </template>
    </el-table-column>
  </el-table>

</template>

<script>
  export default {
    data() {
      return {
				techSort: []
      }
    },
		mounted: function() {
			this.getTechSort();
		},
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
			getTechSort: function() {
				var _this = this;
				_this.$http({
					methods: 'GET',
					url: 'http://47.101.51.245:8888/api/news/farmingTechnologySort',
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.techSort = res.data.data;
					} else {
						alert('数据加载失败！');
					}
				})
			},
			delSort:function(id){
					var _this = this;
				_this.$http({
					methods: 'GET',
					url: 'http://47.101.51.245:8888/news/delTechnoSortById/'+id,
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data == 0) {
						alert('成功！');
						_this.getTechSort();
					} else {
						alert('数据加载失败！');
					}
				})
			},
			
		
    }
  }
</script>