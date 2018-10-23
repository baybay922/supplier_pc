<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.orgName" placeholder="请输入供应商名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="orgName" label="名称">
			</el-table-column>
			<el-table-column prop="leaderName" label="负责人姓名">
			</el-table-column>
			<el-table-column prop="leaderPhone" label="负责人手机号">
			</el-table-column>
			<el-table-column prop="createtime" label="注册日期">
			</el-table-column>
			<el-table-column label="操作" width="200">
				<!-- <template scope="scope">
					<el-button size="small" @click="showpasswindow(scope.row.orgId)">审核通过</el-button>
					<el-button type="danger" size="small">审核拒绝</el-button>
				</template> -->
				<el-button size="small" @click="toediproduct(scope.row.orgId)">查看</el-button>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import { getsuppliers } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					orgName: ''
				},
        users: [],
        orgRoleType: '1',
				pageSize: 10,
        pageNo: 1,
        total: 0,
        listLoading: false,
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.pageNo = val;
				this.getUsers();
      },
       toediproduct(orgId) {
              let path = {path: '/supplierAdd', query: {orgId: orgId}};
              this.$router.push(path);
            },
			//获取用户列表
			getUsers() {
				let para = {
					pageNo: this.pageNo,
          pageSize: this.pageSize,
          orgName: this.filters.orgName,
          orgRoleType: this.orgRoleType,
          status:1
				};
        this.listLoading = true;
				getsuppliers(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.list;
					this.listLoading = false;
				});
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>

</style>