<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.phone" placeholder="请输入渠道商手机号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="name" label="姓名" width="120">
			</el-table-column>
			<el-table-column prop="phone" label="手机号码" width="100">
			</el-table-column>
			<el-table-column prop="idCardNo" label="身份证号" width="180">
			</el-table-column>
			<el-table-column prop="email" label="电子邮箱" width="120">
			</el-table-column>
			<el-table-column prop="inviterName" label="推荐人姓名" min-width="120">
			</el-table-column>
      <el-table-column prop="inviterPhone" label="推荐人手机号" min-width="100">
			</el-table-column>
			<el-table-column label="操作" width="200">
				<!-- <template scope="scope">
					<el-button size="small" @click="showpasswindow(scope.row.orgId)">审核通过</el-button>
					<el-button type="danger" size="small">审核拒绝</el-button>
				</template> -->
                   <template scope="scope">
                    <div v-if="scope.row.clientType == 'b'">
					    <el-button type="danger" size="small" @click="gochecklevel(scope.row.phone)">升级</el-button>
					</div>
					<div v-if="scope.row.clientType == 'B'">
                        <el-button type="danger" size="small" @click="updownlevel(scope.row.phone)">降级</el-button>
                    </div>
				</template>
			</el-table-column>
		</el-table>


		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

    <!-- 审核通过 -->
    <el-dialog title="审核通过" :visible.sync="passwindow" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" ref="editForm">
        <el-form-item label="操作描述">
          <el-input type="textarea" v-model="editForm.optRemark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
				<el-button @click.native="passwindow = false">取消</el-button>
				<el-button type="primary" @click="checkSubmit">确定</el-button>
			</div>
    </el-dialog>
		
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import { get2cUserList, checkPass ,checkLevel } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					phone: ''
				},
				users: [],
				pageSize: 10,
        pageNo: 1,
        total: 0,
        status: 1,
        listLoading: false,
        passwindow: false,
        editForm: {
          optRemark: '',
          orgId: ''
        }
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.pageNo = val;
				this.getUsers();
      },
      //升级大B开始
      gochecklevel(phone) {
              this.$confirm('此操作将升级用户为大B, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.checkLevel(phone);
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消升级'
                });
              });
            },
      checkLevel(phone) {
              this.listLoading = true;
              let para = {};
              para.userPhone = phone;
              para.userLevel = 'B';
              checkLevel(para).then((res) => {
                if(res.flag == 20000) {
                  this.$message({
                    type: 'success',
                    message: '用户升级成功!'
                  });
                  this.getUsers();
                  this.listLoading = false;
                }else{
                  this.$message({
                    type: 'error',
                    message: res.msg
                  });
                  this.listLoading = false;
                }
              })
            },
       //升级大B结束
       //降级小b开始
     updownlevel(phone) {
             this.$confirm('此操作将降级用户为小b, 是否继续?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
             }).then(() => {
               this.updown(phone);
             }).catch(() => {
               this.$message({
                 type: 'info',
                 message: '已取消升级'
               });
             });
           },
     updown(phone) {
             this.listLoading = true;
             let para = {};
             para.userPhone = phone;
             para.userLevel = 'b';
             checkLevel(para).then((res) => {
               if(res.flag == 20000) {
                 this.$message({
                   type: 'success',
                   message: '用户降级成功!'
                 });
                 this.getUsers();
                 this.listLoading = false;
               }else{
                 this.$message({
                   type: 'error',
                   message: res.msg
                 });
                 this.listLoading = false;
               }
             })
           },
      //降级小b结束
      //审核通过
      checkSubmit() {
        let para = this.editForm
        checkPass(para).then((res) => {
          if(res.flag == 20000) {
            this.$message({
							message: '操作成功',
							type: 'success'
            });
            this.passwindow = false;
            this.getUsers();
          } else {
            this.$message({
							message: res.msg,
							type: 'error'
						});
          }
        });
      },
      showpasswindow(orgId) {
        this.passwindow = !this.passwindow;
        this.editForm.orgId = orgId;
      },
			//获取用户列表
			getUsers() {
				let para = {
					pageNo: this.pageNo,
          pageSize: this.pageSize,
          phone: this.filters.phone,
          status: this.status
				};
        this.listLoading = true;
				get2cUserList(para).then((res) => {
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