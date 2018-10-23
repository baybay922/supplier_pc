<template>
	<el-form ref="form" :model="form" label-width="85px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="供应商名称">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
    <el-form-item label="供应商图标">
			<img v-bind:src="form.logo" width="100px" height="100px" @click="uploadimg"><div id="ossfile">加载上传插件失败!请刷新页面</div>
		</el-form-item>
    <el-form-item label="供应商介绍">
			<quill-editor
      v-model="form.content"
      ref="myQuillEditor"
      :options="editorOption">
      <div id="toolbar" slot="toolbar">
        <span class="ql-formats"><button type="button" class="ql-bold"></button></span>
        <span class="ql-formats">
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
      <span class="ql-formats"><button type="button" @click="ediimgup">
        <svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect> <circle class="ql-fill" cx="6" cy="7" r="1"></circle> <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>
      </button></span>
      </div>
      </quill-editor>
		</el-form-item>
    <el-form-item label="信用分">
			{{ form.creditRate }} + <span style="color: red;">{{ form.manualScore }}</span> = {{ parseInt(form.creditRate)+parseInt(form.manualScore) }}
      <span style="margin-left: 30px;">加权分<el-input v-model="form.manualScore" type="number" style="width: 120px;"></el-input></span>
		</el-form-item>
    <el-form-item label="平台推荐">
			<el-checkbox v-model="isRecommendbool">勾选此项会在供应商页面显示“多+指定优质供应商”</el-checkbox>
		</el-form-item>
    <el-form-item label="联系电话">
			<el-input v-model="form.phone" placeholder="请输入联系电话，方便渠道商联系"></el-input>
		</el-form-item>
    <el-form-item>
			<el-button type="primary" @click="onSubmit">立即创建</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>


    <!-- 上传图片oss -->
    <div style="display:none">
      <div id="container"><a id="selectfiles" href="javascript:void(0);" class='btn'>上传营业执照照片</a></div>
      <form name=theform>
        <input type="radio" name="myradio" value="local_name"/>
        <input type="radio" name="myradio" value="random_name" checked=true/>
        <br/>
        <input type="text" id='dirname' placeholder="如果不填，默认是上传到根目录" size=50>
      </form>
      <br/>
      <div id="container">
      </div>
      <pre id="console"></pre>
      <p>&nbsp;</p>
    </div>
    <!--  -->
	</el-form>
</template>
<script>
import '../../common/uptooss/style.css';
import Quill from 'quill';
import { supplierAdd } from '../../api/api';
	export default {
		data() {
			return {
        imgstatus: 1,
        imgUrl: '',
        isRecommendbool: false,
				form: {
					name: '',
          logo: 'https://img-video.oss-cn-beijing.aliyuncs.com/ZM7PRPNNfC.jpeg',
          content: '',
          creditRate: '0',
          manualScore: '0',
          isRecommend: 0,
          phone: ''
				},
				editorOption: {
          modules: {
            toolbar: '#toolbar'
          }
        },
			}
		},
		methods: {
      uploadimg() {
        this.imgstatus = 1;
        let obj = document.getElementById('selectfiles');
        obj.click();
      },
      ediimgup(){
        this.imgstatus = 2;
        let obj = document.getElementById('selectfiles');
        obj.click();
      },
      imports() {//渲染dom后引入上传插件方法
        require("!!script-loader!../../common/uptooss/lib/crypto1/crypto/crypto.js")
        require("!!script-loader!../../common/uptooss/lib/crypto1/hmac/hmac.js")
        require("!!script-loader!../../common/uptooss/lib/crypto1/sha1/sha1.js")
        require("!!script-loader!../../common/uptooss/lib/base64.js")
        require("!!script-loader!../../common/uptooss/lib/plupload-2.1.2/js/plupload.full.min.js")
        require("!!script-loader!../../common/uptooss/upload.js")
      },
			onSubmit() {
        this.form.isRecommend = this.isRecommendbool == true ? 1 : 0;
				supplierAdd(this.form).then((res) => {
          if(res.flag == 20000){
            this.$message({
							message: '操作成功',
							type: 'success'
            });
          }else{
            this.$message({
							message: res.msg,
							type: 'error'
            });
          }
        });
			}
		},
		computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
		},
		mounted() {
      this.imports();
      var self = this;
      var uploader = new plupload.Uploader({
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
          },

          FileUploaded: function(up, file, info) {
                  var url = host + '/' + get_uploaded_object_name(file.name);
                  if (info.status == 200)
                  {
                    if(self.imgstatus == 1) {
                      self.form.logo = url;
                    }else if(self.imgstatus == 2) {
                      self.editor.insertEmbed(self.editor.getSelection().index, 'image', url);
                    }
                  }
                  else
                  {
                      document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
                  } 
          },

          Error: function(up, err) {
            document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
          }
        }
      });

      uploader.init();
    }
	}

</script>