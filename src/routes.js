import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Uclist from './views/user/Uclist.vue'
import Uclistp from './views/user/Uclistp.vue'
import Ublist from './views/user/Ublist.vue'
import Ublistp from './views/user/Ublistp.vue'
import suplierp from './views/user/suplierp'
import supliernp from './views/user/supliernp'
import supplierAdd from './views/user/supplierAdd.vue'
import productaAdd from './views/product/productadd.vue'
import prolistDown from './views/product/prolistdown'
import prolistDownp from './views/product/prolistdownp'
import proportions from './views/product/proportions'
import Form from './views/nav1/Form.vue'
import ordermanager from './views/order/ordermanager.vue'
import orderallot from './views/order/orderallot.vue'
import changeInfo from './views/changeInfo'
// import user from './views/nav1/user.vue'
// import Page4 from './views/nav2/Page4.vue'
// import Page5 from './views/nav2/Page5.vue'
// import Page6 from './views/nav3/Page6.vue'
// import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/main',
        component: Home,
        name: '用户管理',
        iconCls: 'el-icon-message',//图标样式class
        hidden: true,
        children: [
            //{ path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/uclist', component: Uclist, name: '待审核个人渠道商' },
            { path: '/uclistp', component: Uclistp, name: '已审核个人渠道商' },
            { path: '/ublist', component: Ublist, name: '待审核企业渠道商' },
            { path: '/ublistp', component: Ublistp, name: '已审核企业渠道商' },
            { path: '/suplierp', component: suplierp, name: '已审核供应商' },
            { path: '/supliernp', component: supliernp, name: '待审核供应商' },
            { path: '/supplierAdd', component: supplierAdd, name: '新供应商资料录入' }/*,
            { path: '/ordermanager', component: ordermanager, name: '订单管理' },*/
            // { path: '/table', component: Table, name: 'Table' },
            //{ path: '/form', component: Form, name: 'Form' }
            // { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/main',
        component: Home,
        name: '产品管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/prolistdownp', component: prolistDownp, name: '上架产品' },
            { path: '/prolistdown', component: prolistDown, name: '下架产品' },           
            { path: '/productadd', component: productaAdd, name: '新产品资料录入' },
            { path: '/proportions', component: proportions, name: '' ,hidden: true}
        ]
    },
    {
        path: '/main',
        component: Home,
        name: '订单管理',
        iconCls: 'el-icon-message',//图标样式class
        hidden: true,
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/ordermanager', component: ordermanager, name: '进行中的订单' },
            { path: '/orderallot', component: orderallot, name: 'B渠道商列表',hidden: true }
            // { path: '/ordermanager', component: ordermanager, name: '已冻结的订单' },
            // { path: '/ordermanager', component: ordermanager, name: '已结束的订单' }
        ]
    },
    {
        path: '/main',
        component: Home,
        name: '我的',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/changeInfo', component: changeInfo, name: '修改我的资料' },
            //{ path: '/orderallot', component: orderallot, name: 'B渠道商列表',hidden: true }
            // { path: '/ordermanager', component: ordermanager, name: '已冻结的订单' },
            // { path: '/ordermanager', component: ordermanager, name: '已结束的订单' }
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航二',
    //     iconCls: 'fa fa-id-card-o',
    //     children: [
    //         { path: '/page4', component: Page4, name: '页面4' },
    //         { path: '/page5', component: Page5, name: '页面5' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/page6', component: Page6, name: '导航三' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;