<template>
	<el-form ref="form" :model="form" label-width="120px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item :label="orgTypeValue == '医生'? '医生姓名':'机构名称'">
			<el-input  ref="inputBox" v-model="form.name"></el-input>
		</el-form-item>
        <el-form-item label="服务地区">  
            <el-select size="small" style="width: 100px"  
                        v-model="form.selectProv"  
                        placeholder="请选择省份"  
                        v-on:change="getProv($event)">  
                <el-option  
                        v-for="item in provs"  
                        :key="item.value"
                        :label="item.label"  
                        :value="item.value">  
                </el-option>  
            </el-select>  
            <el-select size="small" style="width: 100px"  
                        v-if="selectProv!=''"  
                        v-model="form.selectCity"  
                        placeholder="请选择城市"  
                        v-on:change="getCity($event)">  
                <el-option  
                        v-for="item in citys"  
                        :key="item.value"
                        :label="item.label"  
                        :value="item.value">  
                </el-option>  
            </el-select>  
        </el-form-item>
        <el-form-item label="联系人电话">
            <el-input ref="inputBox" v-model="form.phone" style="width:200px;" placeholder="请输入联系电话，方便渠道商联系" disabled></el-input>
        </el-form-item>
        <el-form-item :label="orgTypeValue == '医生'? '医生照片':'机构图标'">
			<div class="doctor" style="display:inline-block;">
                <img :src="form.logo" width="100px" height="100px" class="upimgbg" @click="form.logo == ''? uploadimg():''"/><div id="ossfile">加载上传插件失败!请刷新页面</div>
                <div class="mark" v-if="form.logo !== ''">
                    <el-button class="enlarge" @click="enlarge()">放大</el-button>
                    <el-button class="modify" @click="uploadimg">修改</el-button>
                    <el-button class="del" @click="delImg()">删除</el-button>
                </div>
            </div>
		</el-form-item>
        <el-form-item label="营业执照照片" v-if="orgTypeValue =='机构'">
			<img v-bind:src="form.BusLicense" width="100px" height="100px">
		</el-form-item>
        <el-form-item label="资质证明照片">
            <el-col v-for="(item, index) in form.qualific" :key="index" class="aptitude" :span="3" style="margin-right:10px;position:relative;">
                <img :src="item" width="100px" height="100px" class="upimgbg" >
                <!-- <div class="mark" v-if="form.qualific[index] !== undefined ">
                    <el-button class="enlarge" @click="enlarge(index)">放大</el-button>
                    <el-button class="modify" @click="isModify ?  modifyFn(index): ''">修改</el-button>
                </div> -->
            </el-col>
		</el-form-item>

        <el-form-item :label="orgTypeValue == '医生'? '医生介绍':'机构介绍'">
            <quill-editor
                v-model="form.content"
                ref="myQuillEditor"
                :options="editorOption">
                <div id="toolbar" slot="toolbar">
                    <span class="ql-formats"><button type="button" class="ql-bold"></button></span>
                    <span class="ql-formats" style="margin-bottom: 11px;">
                        <select class="ql-color">
                            <option selected="selected"></option>
                            <option value="#e60000"></option>
                            <option value="#ff9900"></option>
                            <option value="#ffff00"></option>
                            <option value="#008a00"></option>
                            <option value="#0066cc"></option>
                            <option value="#9933ff"></option>
                            <option value="#ffffff"></option>
                            <option value="#facccc"></option>
                            <option value="#ffebcc"></option>
                            <option value="#ffffcc"></option>
                            <option value="#cce8cc"></option>
                            <option value="#cce0f5"></option>
                            <option value="#ebd6ff"></option>
                            <option value="#bbbbbb"></option>
                            <option value="#f06666"></option>
                            <option value="#ffc266"></option>
                            <option value="#ffff66"></option>
                            <option value="#66b966"></option>
                            <option value="#66a3e0"></option>
                            <option value="#c285ff"></option>
                            <option value="#888888"></option>
                            <option value="#a10000"></option>
                            <option value="#b26b00"></option>
                            <option value="#b2b200"></option>
                            <option value="#006100"></option>
                            <option value="#0047b2"></option>
                            <option value="#6b24b2"></option>
                            <option value="#444444"></option>
                            <option value="#5c0000"></option>
                            <option value="#663d00"></option>
                            <option value="#666600"></option>
                            <option value="#003700"></option>
                            <option value="#002966"></option>
                            <option value="#3d1466"></option>
                        </select>
                    </span>
                    <!--图片按钮点击事件-->
                    <span class="ql-formats">
                        <button type="button" @click="ediimgup">
                            <svg viewBox="0 0 18 18"> 
                                <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect> 
                                <circle class="ql-fill" cx="6" cy="7" r="1"></circle> <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> 
                            </svg>
                        </button>
                    </span>
                </div>
            </quill-editor>
        </el-form-item>
        <!-- <el-form-item label="分成">
                <el-select v-model="value" placeholder="30%">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item> -->
        

        <el-form-item label="收账银行卡号">
            <el-input ref="inputBox" v-model="form.bankCardId" style="width:200px;" placeholder="请输入收账用的银行卡号" disabled></el-input>
        </el-form-item>
        <el-form-item label="持卡人姓名">
            <el-input ref="inputBox" v-model="form.bankCardName" style="width:200px;" placeholder="请输入持卡人姓名" disabled></el-input>
        </el-form-item>
        <el-form-item label="持卡人身份证号">
            <el-input ref="inputBox" v-model="form.cardId" style="width:200px;" placeholder="请输入持卡人身份证号" disabled></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在修改，请稍后" v-if="orgTypeValue =='机构'">提交审核</el-button>
            <el-button type="primary" @click="onSubmit" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在注册，请稍后" v-else>保存</el-button>
            <el-button @click.native.prevent>取消</el-button>
        </el-form-item>

        <!-- 上传图片oss000 -->
        <div style="display:none;z-index:8888">
            <div id="container"><a id="selectfiles" href="javascript:void(0);" class='btn'>上传营业执照照片</a></div>
            <form name=theform>
                <input type="radio" name="myradio" value="local_name"/>
                <input type="radio" name="myradio" value="random_name" checked=true/>
                <br/>
                <input type="text" id='dirname' placeholder="如果不填，默认是上传到根目录" size=50>
            </form>
            <br/>
            <div id="container"></div>
            <pre id="console"></pre>
            <p>&nbsp;</p>
        </div>
        
        <!-- 图片放大遮罩 -->
        <div class="imgMark" v-if="markShow" @click="markHide()" style="z-index:8888">
            <img :src="markUrl" alt="">
        </div>
	</el-form>
</template>
<script>
import '../common/uptooss/style.css';
import Quill from 'quill';
import { supplierAdd,supplierUpdate,getorginfo,getUserInfo } from '../api/api.js';
import allCity from '../assets/city.json'
	export default {
		data() {
			return {
                WhetherModify:true,                
                fullscreenLoading: false,
                account:'',
                imgstatus: 1,
                imgUrl: '',
                isRecommendbool: false,
                modify:'',
                markUrl:"",
                markShow:false,
                form: {
                    name: "",
                    contactPerson: "后台添加",
                    logo: "",
                    content: "",
                    creditRate: "0",
                    manualScore: "0",
                    sellNum: "0",
                    manualSellNum: "0",
                    isRecommend: "0",
                    phone: "",
                    accountPeriod: "0",
                    bankCardId: "",
                    bankCardName: "",
                    cardId: "",
                    bankPhone: "",
                    orgRemark:"",
                    type:"供应商",
                    selectProv: '',  
                    selectCity: '',
                    BusLicense:'',
                    qualific:[],
                    orgId:'',
                },
                editorOption: {
                    modules: {
                        toolbar: '#toolbar'
                    },
                },
                orgTypeOptions: [{
                    value: '供应商',
                    label: 'P'
                    },{
                    value: '医生',
                    label: 'D'
                    }],
                orgTypeValue: '',
                provs:[{label:"北京市",value:"北京市"},  
                        {label:"天津市",value:"天津市"},  
                        {label:"河北省",value:"河北省"},  
                        {label:"山西省",value:"山西省"},  
                        {label:"内蒙古自治区",value:"内蒙古自治区"},  
                        {label:"辽宁省",value:"辽宁省"},  
                        {label:"吉林省",value:"吉林省"},  
                        {label:"黑龙江省",value:"黑龙江省"},  
                        {label:"上海市",value:"上海市"},  
                        {label:"江苏省",value:"江苏省"},  
                        {label:"浙江省",value:"浙江省"},  
                        {label:"安徽省",value:"安徽省"},  
                        {label:"福建省",value:"福建省"},  
                        {label:"江西省",value:"江西省"},  
                        {label:"山东省",value:"山东省"},  
                        {label:"河南省",value:"河南省"},  
                        {label:"湖北省",value:"湖北省"},  
                        {label:"湖南省",value:"湖南省"},  
                        {label:"广东省",value:"广东省"},  
                        {label:"广西壮族自治区",value:"广西壮族自治区"},  
                        {label:"海南省",value:"海南省"},  
                        {label:"重庆市",value:"重庆市"},  
                        {label:"四川省",value:"四川省"},  
                        {label:"贵州省",value:"贵州省"},  
                        {label:"云南省",value:"云南省"},  
                        {label:"西藏自治区",value:"西藏自治区"},  
                        {label:"陕西省",value:"陕西省"},  
                        {label:"甘肃省",value:"甘肃省"},  
                        {label:"青海省",value:"青海省"},  
                        {label:"宁夏回族自治区",value:"宁夏回族自治区"},  
                        {label:"新疆维吾尔自治区",value:"新疆维吾尔自治区"},  
                        {label:"台湾省",value:"台湾省"},  
                        {label:"香港特别行政区",value:"香港特别行政区"},  
                        {label:"澳门特别行政区",value:"澳门特别行政区"},
                        {label:"海外",value:"海外"}] ,  
                citys: [],  
                selectProv: this.selectProv,  
                selectCity: this.selectCity,
                isModify:false //是否可修改
			}
		},
		methods: {
            /*二级联动选择地区*/  
            getProv: function (prov) {  
                let tempCity=[];                
                this.citys=[];  
                this.selectCity=''; 
                //   this.allCity = allCity                
                for (var val of allCity){  
                    if (prov == val.prov){  
                        tempCity.push({label: val.label, value: val.label})  
                    }  
                }  
                this.citys = tempCity;  
                this.form.selectCity = this.citys[0].value
            },  
            //删除图片
            delImg(){
                this.form.logo = ""
            },
            getCity: function (city) {  
            },
            selectGet(value){//这个vId也就是value值
                if(value == "医生"){
                this.form.type = "D"
                }else{
                this.form.type = "P"
                }
            },
            uploadimg() {
                this.imgstatus = 1;
                let obj = document.getElementById('selectfiles');
                obj.click();
            },
            //医生介绍
            ediimgup(){
                this.imgstatus = 2;
                let obj = document.getElementById('selectfiles');
                obj.click();
            },
            imports() {//渲染dom后引入上传插件方法
                require("!!script-loader!../common/uptooss/lib/crypto1/crypto/crypto.js")
                require("!!script-loader!../common/uptooss/lib/crypto1/hmac/hmac.js")
                require("!!script-loader!../common/uptooss/lib/crypto1/sha1/sha1.js")
                require("!!script-loader!../common/uptooss/lib/base64.js")
                require("!!script-loader!../common/uptooss/lib/plupload-2.1.2/js/plupload.full.min.js")
                require("!!script-loader!../common/uptooss/upload.js")
            },
            //提交资料
			onSubmit() {    
                //信息是否完善
                this.form.isRecommend = this.isRecommendbool == true ? 1 : 0;
                let curForm = {
                    orgId: this.form.orgId,
                    name: this.form.name,
                    contactPerson: this.form.contactPerson,
                    logo: this.form.logo,
                    content: this.form.content,
                    creditRate: this.form.creditRate,
                    manualScore: this.form.manualScore,
                    sellNum: this.form.sellNum,
                    manualSellNum: this.form.manualSellNum,
                    isRecommend: this.form.isRecommend,
                    phone: this.form.phone,
                    accountPeriod: this.form.accountPeriod,
                    bankCardId: this.form.bankCardId,
                    bankCardName: this.form.bankCardName,
                    cardId: this.form.cardId,
                    bankPhone: this.form.bankPhone,
                    orgRemark:this.form.orgRemark,
                    type: this.form.type,
                    selectProv: this.form.selectProv,  
                    selectCity: this.form.selectCity
                }
                if(this.form.orgId){ 
                    this.fullscreenLoading = true;
                                            
                    supplierUpdate(curForm).then((res) => {
                        if(res.flag == 20000){
                            this.fullscreenLoading = false;
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                            // let path = {path:'/suplierp',query:{}}
                            // this.$router.push(path)
                        }else{
                            this.fullscreenLoading = false;
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    });
                }else{
                    //添加信息
                    this.fullscreenLoading = true;
                    supplierAdd(curForm).then((res) => {
                        
                        if(res.flag == 20000){
                            this.fullscreenLoading = false;
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                            // let path = {path:'/suplierp',query:{}}
                            // this.$router.push(path)
                        }else{
                            this.fullscreenLoading = false;
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    });
                }			
			},
            //获取供应商详细信息
            getOrdId(){
                getUserInfo().then( r =>{
                    if(r.flag == 20000){
                      this.form.orgId = parseInt(r.data.orgId);
                        getorginfo(r.data.orgId).then((res) =>{
                            console.log(res)
                            if(res.flag == 20000){
                                if(res.data.supplierType == "D"){
                                    this.orgTypeValue = "医生"
                                }else{
                                    this.orgTypeValue = "机构"
                                }
                                //this.form.qualific = res.data.orgImgUrls
                                // for(var i=0;i<this.form.qualific.length;i++){
                                //     console.log(res.data.orgImgUrls[i])
                                //     this.form.qualific.splice(i,1,res.data.orgImgUrls[i])
                                // }
                                this.form.qualific = res.data.orgImgUrls;
                                this.form.BusLicense=res.data.orgImg
                                this.form.name = res.data.name
                                this.form.contactPerson = res.data.contactPerson
                                this.form.logo = res.data.logo
                                this.form.content = res.data.content
                                this.form.creditRate = res.data.creditRate
                                this.form.manualScore = res.data.manualScore
                                this.form.sellNum = res.data.sellNum
                                this.form.manualSellNum = res.data.manualSellNum
                                if(res.data.isRecommend == "1"){
                                    this.isRecommendbool = true
                                }else{
                                    this.isRecommendbool = false
                                }
                                
                                this.form.phone = res.data.phone
                                this.form.accountPeriod = res.data.accountPeriod
                                this.form.bankCardId = res.data.bankCardId
                                this.form.bankCardName = res.data.bankCardName
                                this.form.cardId = res.data.cardId
                                this.form.bankPhone = res.data.bankPhone    
                                this.form.orgRemark = res.data.orgRemark      
                                this.form.selectProv = res.data.supplierProvince
                                this.form.selectCity  = res.data.supplierCity
                            }else{
                                this.$message({
                                    message: res.msg,
                                    type: 'error'
                                });
                            }
                        })  
                    }else{
                        this.$message({
                            message: r.msg,
                            type: 'error'
                        })
                    }
                        
                })
            },
            //图片放大
            enlarge(ind){
                this.markShow = true;
                if(ind !== undefined){
                     this.markUrl = this.form.qualific[ind];
                }else{
                    this.markUrl = this.form.logo
                }
            },
            //修改资质照片
            modifyFn(ind){
                this.modify = ind;
                this.imgstatus = 3;
                let dom = document.getElementById('selectfiles');
                dom.click();
            },
            //隐藏放大的图片
            markHide(){
                this.markShow = false;
            }
		},
		computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
		},
		mounted() {     
            //获取供应商详细信息       
            this.getOrdId();            
           
            this.$nextTick(function(){
                this.imports(); 
                var self = this;
                var uploader = new plupload.Uploader({//上传图片...
                    runtimes : 'html5,flash,silverlight,html4',
                    browse_button : 'selectfiles', 
                        //multi_selection: false,
                    container: document.getElementById('container'),
                    flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
                    silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
                    url : 'http://oss.aliyuncs.com',

                    init: {
                        
                        PostInit: function() {
                            document.getElementById('ossfile').innerHTML = '';
                        },

                        FilesAdded: function(up, files) {
                            if(up.total.queued == 2){
                                return;
                            }
                            plupload.each(files, function(file) {
                                document.getElementById('ossfile').innerHTML = '<div id="' + file.id + '"><b></b>'
                                +'</div>';
                            });
                            up.start();
                        },

                        BeforeUpload: function(up, file) {
                            check_object_radio();
                            get_dirname();
                            set_upload_param(up, file.name, true);
                        },

                        UploadProgress: function(up, file) {
                            var d = document.getElementById(file.id);
                            console.log(file)
                        },

                        FileUploaded: function(up, file, info) {
                            var url = host + '/' + get_uploaded_object_name(file.name);
                            if (info.status == 200){
                                if(self.imgstatus == 1) {
                                    self.form.logo = url;
                                }else if(self.imgstatus == 2) {
                                    self.editor.insertEmbed(self.editor.getContents().index, 'image', url);
                                }else if(self.imgstatus == 3){
                                    self.form.qualific.splice(self.modify,1,url);
                                }
                            }else{
                                document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
                            } 
                        },

                        Error: function(up, err) {
                            document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
                        }
                    }
                });

                uploader.init();
            })
            
        }
	}

</script>
<style scoped>
.orgType{
  margin-bottom: 20px;
  margin-left: 10px;
}
aptitude{
    display:inline-block;
    width:100px;
    height:100px;
    margin-right:10px;
    position:relative;
}
.upimgbg{
  background-image: url('https://duojia-video.oss-cn-hangzhou.aliyuncs.com/iPhone%208.png');
  background-repeat: no-repeat;
  background-size: 100%;  
 
}

.aptitude:hover .mark{
    display:block;
}
.mark{
    position: absolute;
    background: rgba(0,0,0,0.5);
    width: 100px;
    height: 100px;
    top: 0;
    left:0;
    display:none;
}
.mark button{
    padding: 4px 20px;
    display: block;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 7px;
}

.imgMark{
    width:100%;
    height:100%;
    position: fixed;
    top:0;
    left:0;
    background: rgba(0,0,0,0.8);
    z-index: 1;
    display:flex;
    justify-content: center;
    align-items: center;
}
.imgMark>img{
    max-width: 100%;
    max-height:100%;
}
.doctor{
    position: relative;
}
.doctor .mark{
    position: absolute;
    top:0;
    left:0;
}
.doctor:hover .mark{
    display: block;
}

</style>
