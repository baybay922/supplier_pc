import axios from 'axios';

let base = '';

let headersCT = {headers: {'Content-Type': 'application/json;charset=UTF-8'}};
//登录
export const login = params => { return axios.post(`${base}/user/ucenter/login/pwd`, JSON.stringify(params), headersCT).then(res => res.data); };
//获取个人未审核列表
export const get2cUserList = params => { return axios.post(`${base}/user/manager/2cagentlist/get`, JSON.stringify(params), headersCT).then(res => res.data); };
//获取企业未审核列表
export const get2bUserList = params => { return axios.post(`${base}/user/manager/2bagentlist/get`, JSON.stringify(params), headersCT).then(res => res.data); };
//获取供应商未审核列表
export const get2pUserList = params => { return axios.post(`${base}/user/manager/2pagentlist/get`, JSON.stringify(params), headersCT).then(res => res.data); };
//供应商审核通过
export const supplierCheck = params => { return axios.post(`${base}/user/manager/supplier/check`, JSON.stringify(params), headersCT).then(res => res.data); };
//渠道商审核通过
export const checkPass = params => { return axios.post(`${base}/user/manager/agent/check`, JSON.stringify(params), headersCT).then(res => res.data); };
//渠道商升级大D
export const checkLevel = params => { return axios.post(`${base}/user/manager/2cinfo/update`, JSON.stringify(params), headersCT).then(res => res.data); };
//增加供应商信息
export const supplierAdd = params => { return axios.post(`${base}/user/manager/supplier/add`, JSON.stringify(params), headersCT).then(res => res.data); };
//获取供应商列表
export const getsuppliers = params => { return axios.post(`${base}/user/manager/orglist/get`, JSON.stringify(params), headersCT).then(res => res.data); };
//新增产品录入
export const productadd = params => { return axios.post(`${base}/product/manager/info/add`, JSON.stringify(params), headersCT).then(res => res.data); };
//获取产品大类
export const getproducttype = params => { return axios.post(`${base}/product/info/producttype/listquery`, JSON.stringify(params), headersCT).then(res => res.data); };
//获取待审核产品
export const getprolistdown = params => { return axios.post(`${base}/product/manager/productlist/supplierquery`, JSON.stringify(params), headersCT).then(res => res.data); };
//提交审核
export const onsubmitcheck = params => { return axios.get(`${base}/product/manager/detail/submit?productId=`+params, params).then(res => res.data); };
//待审核产品上架
export const dprocheckpass = params => { return axios.post(`${base}/product/manager/product/onsel`, JSON.stringify(params), headersCT).then(res => res.data); };
//获取产品详情
export const getproductinfo = params => { return axios.get(`${base}/product/manager/detail/query?productId=`+params, params).then(res => res.data); };
//修改产品详情
export const productupdate = params => { return axios.post(`${base}/product/manager/info/update`, JSON.stringify(params), headersCT).then(res => res.data); };
//订单列表查询
export const orderQuery = params => { return axios.post(`${base}/order/manager/list/query`, JSON.stringify(params), headersCT).then(res => res.data); };
//大B渠道商列表查询
export const orderallot = params => { return axios.post(`${base}/user/manager/Bagentlist/get`, JSON.stringify(params), headersCT).then(res => res.data); };
//分配选择大B关联订单
export const orderTypeUpdate = params => { return axios.post(`${base}/order/manager/ordertype/update`, JSON.stringify(params), headersCT).then(res => res.data); };
//冻结订单
export const frzOrder = params => { return axios.post(`${base}/order/manager/info/frz`, JSON.stringify(params), headersCT).then(res => res.data); };
//取消订单
export const cancelOrder = params => { return axios.post(`${base}/order/update/agent/cancel`, JSON.stringify(params), headersCT).then(res => res.data); };
//查询用户信息
export const getUserInfo = params => { return axios.post(`${base}/user/ucenter/userinfo/get`, JSON.stringify(params), headersCT).then(res => res.data); };
//获取短信验证码
export const getMessage = params => { return axios.post(`${base}/user/validate/smscode/suppliercreate`, JSON.stringify(params), headersCT).then(res => res.data); };
//验证码登录
export const supplierLogin = params => { return axios.post(`${base}/user/ucenter/login/suppliersms`, JSON.stringify(params), headersCT).then(res => res.data); };
//个别渠道商信息查询
export const channelInfo = params => { return axios.post(`${base}/user/manager/agentratelist/get`, JSON.stringify(params), headersCT).then(res => res.data); };
//添加渠道商分成
export const addPro = params => { return axios.post(`${base}/user/manager/agentrate/add`, JSON.stringify(params), headersCT).then(res => res.data); };
//修改渠道商分成
export const modifyProportion = params => { return axios.post(`${base}/user/manager/agentrate/update`, JSON.stringify(params), headersCT).then(res => res.data); };
//删除渠道商分成
export const removeProportion = params => { return axios.post(`${base}/user/manager/agentrate/remove`, JSON.stringify(params), headersCT).then(res => res.data); };

export const deleteproduct = params => { return axios.get(`${base}/product/manager/checkpending/delete?productId=`+params, params).then(res => res.data); };
//获取供应商详情
export const getorginfo = params => { return axios.get(`${base}/user/manager/detail/query?orgId=`+params, params).then(res => res.data); };
//修改供应商信息
export const supplierUpdate = params => { return axios.post(`${base}/user/manager/supplier/update`, JSON.stringify(params), headersCT).then(res => res.data); };
//export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

// export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };