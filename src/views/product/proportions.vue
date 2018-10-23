<template>
    <div class="content">
        <h1>分成比例个别设置</h1>
        <el-form :model="formInline" class="search-container">            
            <el-input v-model="formInline.name" placeholder="请输入渠道商姓名" class="userName"></el-input><el-button type="primary" @click="searchCannel">搜索</el-button>
        </el-form>
        <div class="searchResult" v-if="showRes" style="width:50%">
            <el-table :data="searchRes">
                <el-table-column prop="leaderName" width="120"></el-table-column>
                <el-table-column prop="leaderPhone" width="120"></el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-input v-model="defaultPro" class="Percentage"></el-input>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" >
                    <template slot-scope="scope">
                        <el-button type="primary" @click="addProportion(scope.row.orgId)">添加</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <h1>现有个别设置（默认分成比例为70%）</h1>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="phone" label="手机号码"></el-table-column>
            <el-table-column label="分成比例(%)">
                <template slot-scope="scope">
                    <el-input v-model='scope.row.returnRate' @blur="getPercebtage(scope.row.returnRate)" class="Percentage"></el-input>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="preservation(scope.row.agentOrgId)">保存</el-button>
                    <el-button type="text" size="small" @click="removeList(scope.row.agentOrgId)">移除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>   
</template>
<script>
import '../../common/uptooss/style.css';
import { channelInfo, get2bUserList, addPro, modifyProportion, removeProportion} from "../../api/api"
export default {
    data () {
        return {
            defaultPro:70,
            showRes:true,
            productId:this.$route.query.productId,
            returnRate:"",
            tableData:[],
            searchRes:[],
            formInline:{
                name:"",
                Percentage:""
            }
        }
    },
    methods: {
        removeList(orgId){
             let para = {
                productId: this.productId,
                orgId: orgId,
                returnRate: this.returnRate,
                groupBuyingRate: 3
            }
            
            removeProportion(para).then((res) =>{
                if(res.flag == 20000){
                     this.$message({
                        message: '保存成功!',
                        type: 'success'                        
                    }); 
                    this.getData()
                }
            })
        },
        getPercebtage(returnRate){
           this.returnRate = returnRate
        },
        preservation(orgId){//保存        
            let para = {
                productId: this.productId,
                orgId: orgId,
                returnRate: this.returnRate,
                groupBuyingRate: 3
            }
            
            modifyProportion(para).then((res) =>{
                if(res.flag == 20000){
                     this.$message({
                        message: '保存成功!',
                        type: 'success'
                        
                    }); 
                }
            })
        },
        addProportion(orgId){//添加
            let para = {
                productId: this.productId,
                orgId: orgId,
                returnRate: this.defaultPro,
                groupBuyingRate: 3
            }
            addPro(para).then((res) =>{
                console.log(res)
                if(res.flag == 20000){
                    this.getData()
                }else{
                    this.showRes = false
                    this.$message({
                        type: 'error',
                        message: res.msg
                    }); 
                }
            })
        },
        searchCannel(){//点点击查询         
            
            if(this.formInline.name == ""){
                this.$message({
                    type: 'error',
                    message: "请输入您要查找的渠道商"
                });
            }else{
                let para = {
					pageNo: 1,
                    pageSize: 10,
                    orgName: this.formInline.name,
                    status: 1
                };
                get2bUserList(para).then((res) => {
                    this.searchRes = res.data.list
                    this.showRes = true
                });
            }
        },
        getData(){
            this.showRes = false
            let para = {
                productId: this.productId,
                pageNo: 1,
                pageSize: 10
            }
            channelInfo(para).then((res) =>{
                if(res.flag == 20000){
                    this.tableData = res.data.list
                    console.log(res)
                }else{
                    this.$message({
                        type: 'error',
                        message: res.msg
                    });
                }
            })
        }
    },
    mounted (){
        this.getData()
    }
}
</script>
<style lang="scss" scoped>
.content{
    width:100%;
}

h1{
    font-weight: normal;
    font-size:16px;
}
.userName{
    width: 400px;
    margin-right:20px;
}
.searchResult{
    margin-top:0px;
}
.Percentage{
    width:200px;
}
</style>


