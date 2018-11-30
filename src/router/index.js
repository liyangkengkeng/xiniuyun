import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 登录模块
const loginIndex = r => require.ensure([], () => r(require('@/page/login/index')), 'loginIndex');
const login = r => require.ensure([], () => r(require('@/page/login/login')), 'login');
const register = r => require.ensure([], () => r(require('@/page/login/register')), 'register');
const modifyPas = r => require.ensure([], () => r(require('@/page/login/modify_pas')), 'modify_pas');
const invite = r => require.ensure([], () => r(require('@/page/login/invite')), 'invite');//邀请页面

// 首页
const index = r => require.ensure([], () => r(require('@/page/index')), 'index');
// 开发者中心首页
const developerIndex = r => require.ensure([], () => r(require('@/page/developer/developerIndex')), 'developerIndex');


// 开发者中心首页
const myProduct = r => require.ensure([], () => r(require('@/page/myProduct/myProduct')), 'myProduct');//我的产品
const foundProduct = r => require.ensure([], () => r(require('@/page/myProduct/found-product')), 'foundProduct');

// 产品中心
const personal = r => require.ensure([], () => r(require('@/page/personal-developer/index')), 'personal');
const overview = r => require.ensure([], () => r(require('@/page/personal-developer/overview')), 'overview');
const file = r => require.ensure([], () => r(require('@/page/personal-developer/file')), 'file');
const dataPoint = r => require.ensure([], () => r(require('@/page/personal-developer/data-point')), 'dataPoint');


// 企业开发者
const project = r => require.ensure([], () => r(require('@/page/project/index')), 'project');
const projectData = r => require.ensure([], () => r(require('@/page/project/projectData')), 'projectData');
	const project_basic_data = r => require.ensure([], () => r(require('@/page/project/project_basic_data')), 'project_basic_data');
	const project_product_data = r => require.ensure([], () => r(require('@/page/project/project_product_data')), 'project_product_data');
	const project_device_data_index = r => require.ensure([], () => r(require('@/page/project/project_device_data/index')), 'project_device_data_index');
		const project_device_data_list = r => require.ensure([], () => r(require('@/page/project/project_device_data/project_device_data_list')), 'project_device_data_list');
		const project_device_data_details_index = r => require.ensure([], () => r(require('@/page/project/project_device_data/project_device_data_details_index')), 'project_device_data_details_index');
			const project_device_data_details = r => require.ensure([], () => r(require('@/page/project/project_device_data/project_device_data_details')), 'project_device_data_details');
			const trend = r => require.ensure([], () => r(require('@/page/project/project_device_data/trend')), 'trend');
		const project_device_data_add = r => require.ensure([], () => r(require('@/page/project/project_device_data/project_device_data_add')), 'project_device_data_add');
		const add_operation= r => require.ensure([], () => r(require('@/page/project/project_device_data/add_operation')), 'add_operation');

	const trigger = r => require.ensure([], () => r(require('@/page/project/trigger/index')), 'trigger');
		const configureTrigger = r => require.ensure([], () => r(require('@/page/project/trigger/configure-trigger')), 'configureTrigger');
		const foundTrigger = r => require.ensure([], () => r(require('@/page/project/trigger/found')), 'foundTrigger');

	const project_file = r => require.ensure([], () => r(require('@/page/project/project_file')), 'project_file');
const projectConfigure = r => require.ensure([], () => r(require('@/page/project/projectConfigure')), 'projectConfigure');
	// const configureApplications = r => require.ensure([], () => r(require('@/page/project/applications')), 'configureApplications');
	const configureToken = r => require.ensure([], () => r(require('@/page/project/token')), 'configureToken');


	const configureDataPoint = r => require.ensure([], () => r(require('@/page/project/configure-data-point')), 'configureDataPoint');
	const configureThirdParty = r => require.ensure([], () => r(require('@/page/project/configure-third-party')), 'configureThirdParty');
	const configureEvent = r => require.ensure([], () => r(require('@/page/project/configure-event')), 'configureEvent');
	const configureUse = r => require.ensure([], () => r(require('@/page/project/configure-Use')), 'configureUse');
const projectCount = r => require.ensure([], () => r(require('@/page/project/projectCount')), 'projectCount');
	const count = r => require.ensure([], () => r(require('@/page/project/count')), 'count');
const projectMember = r => require.ensure([], () => r(require('@/page/project/projectMember')), 'projectMember');
	const projectMemberData = r => require.ensure([], () => r(require('@/page/project/project-member-data')), 'projectMemberData');
const countData = r => require.ensure([], () => r(require('@/page/project/count/index')), 'countData');//历史记录
const history = r => require.ensure([], () => r(require('@/page/project/count/history')), 'history');//历史记录
const give_an_alarm = r => require.ensure([], () => r(require('@/page/project/count/give_an_alarm')), 'give_an_alarm');//报警记录



/*个人中心*/
const memberCenter = r => require.ensure([], () => r(require('@/page/member-center/index')), 'memberCenter');
const personalData = r => require.ensure([], () => r(require('@/page/member-center/personal-data')), 'personalData');
const enterpriseData = r => require.ensure([], () => r(require('@/page/member-center/enterprise-data')), 'enterpriseData');
	const editEnterpriseData= r => require.ensure([], () => r(require('@/page/member-center/edit-enterprise-data')), 'editEnterpriseData');
const team = r => require.ensure([], () => r(require('@/page/member-center/team')), 'team');
const applicationsIndex= r => require.ensure([], () => r(require('@/page/member-center/applicationsIndex')), 'applicationsIndex');
const applications = r => require.ensure([], () => r(require('@/page/member-center/applications')), 'applications');
const token = r => require.ensure([], () => r(require('@/page/member-center/token')), 'token');



const network = r => require.ensure([], () => r(require('@/page/505')), 'network');

// 配置升级
const configuration = r => require.ensure([], () => r(require('@/page/configuration-upgrade')), 'configuration');
const configure = r => require.ensure([], () => r(require('@/page/configuration-upgrade/configure')), 'configure');

// icon
let icon_overview =require('@/assets/img/overview.png');
let icon_file = require('@/assets/img/file.png');
let icon_dataPoint =require('@/assets/img/data-point.png');
let icon_personalData = require('@/assets/img/personalData-icon.png');
let icon_enterpriseData = require('@/assets/img/enterpriseData-icon.png');
let icon_team =require('@/assets/img/team-icon.png');
let icon_user =require('@/assets/img/user-icon.png');
let icon_visit =require('@/assets/img/visit-icon.png');
let icon_decice =require('@/assets/img/device-icon.png');

let icon_overview_11 =require('@/assets/img/overview-11.png');
let icon_decice_11 =require('@/assets/img/device-icon-11.png');
let icon_dataPoint_11 =require('@/assets/img/data-point-11.png');
let icon_personalData_11 = require('@/assets/img/personalData-icon-11.png');
let icon_file_11 = require('@/assets/img/file-11.png'); 

let icon_enterpriseData_11 = require('@/assets/img/enterpriseData-icon-11.png');
let icon_team_11 =require('@/assets/img/team-icon-11.png');
let icon_user_11 =require('@/assets/img/user-icon-11.png');//用户应用 个人中心
let icon_visit_11 =require('@/assets/img/visit-icon-11.png');//访问凭证 个人中心


const routes = [
	{//开发者中心首页
		path: '/developerIndex',
		component: developerIndex,
		meta: {title:'',hidden:true},
	},
	{
		path: '/',
		component:loginIndex ,
		name:'loginIndex',
		meta: {auth: true},
		children:[
			{
				path: '/login',
				component: login,
			},
			{
				path: '/register',
				component: register,
			},
			{
				path: '/Forgot-password',
				component: modifyPas,
			},
			{
				path: '/invite',
				component: invite,
			}
		],redirect:'login'
	},
	{
		path: '/index',
		component: index,
		name: '',
		meta:{title:'navbar.Homepage_of_developer_center',hidden:true},
		children: [
			{//开发者中心总控制台
				path: '/myProduct',
				component: myProduct,
				meta: {title: 'navbar.Console_of_developer_center'},
			},
			{//创建产品
				path: '/foundProduct',
				component: foundProduct,
				meta: {title: 'navbar.Create_product'},
			},
		],redirect:'developerIndex'
	},
	{
		path: '/product/my',
		component: personal,
		name: 'product',
		meta:{title:'navbar.Product_details'},
		children:[
			{
				path: '/product/:name/my/page/:userid',
				component: overview,
				meta: {title: 'navbar.Product_layout',icon:icon_overview,icon_hover:icon_overview_11},
			},
			{
				path: '/product/:name/my/file/:userid',
				component: file,
				meta: {title: 'navbar.Relevant_files',icon:icon_file,icon_hover:icon_file_11},	
			},
			{
				path: '/product/:name/my/data-point/:userid',
				component: dataPoint,
				meta: {title: 'navbar.Product_data_point',icon:icon_dataPoint,icon_hover:icon_dataPoint_11},	
			},
		],redirect:'/product/:name/my/page/:userid'
	},
	{
		path: '/project',
		component: project,
		meta:{title:'navbar.Company_Developer'},
		redirect:'/project/projectDevice/project_device_data/project_device_data_list',//默认页面
		children:[
			{
				path: '/project/projectDevice/project_device_data/project_device_data_list',
				component: projectData,
				meta: {title: 'navbar.Device_management',icon:icon_decice,icon_hover:icon_decice_11},
				children:[{
						path: '/project/projectDevice/project_device_data/project_device_data_list',
						component: project_device_data_index,
						meta: {title: 'navbar.Device_information',icon:icon_file},
						children:[
							{
								path: '/project/projectDevice/project_device_data/project_device_data_details',
								component: project_device_data_details_index,
								meta: {title: 'navbar.Device_details',icon:icon_file},	
								children:[
									{
										path: '/project/projectDevice/project_device_data/project_device_data_details',
										component: project_device_data_details,
										meta: {title: 'navbar.Details',icon:icon_file},	
									},
									{
										path: '/project/projectDevice/project_device_data/project_device_data_details/trend',
										component: trend,
										meta: {title: 'navbar.Data',icon:icon_file},	
									}
								]
							},
							{
								path: '/project/projectDevice/project_device_data/project_device_data_add',
								component: project_device_data_add,
								meta: {title: 'navbar.Add_devcie',icon:icon_file},	
							},
							{
								path: '/project/projectDevice/project_device_data/add_operation',
								component: add_operation,
								meta: {title: 'navbar.Add_devcie',icon:icon_file},	
							},
							{
								path: '/project/projectDevice/project_device_data/project_device_data_list',
								component: project_device_data_list,
								meta: {title: 'navbar.Device_list',icon:icon_file},	
							},
						]
					},
					{
						path: '/project/projectDevice/trigger/configureTrigger',
						component: trigger,
						meta: {title: 'navbar.Trigger',icon:icon_file},	
						children:[
							{
								path: '/project/projectDevice/trigger/configureTrigger',
								component: configureTrigger,
								meta: {title: 'navbar.Create_trigger',icon:icon_file}
							},	
							{
								path: '/project/projectDevice/trigger/foundTrigger',
								component: foundTrigger,
								meta: {title: 'navbar.Create_trigger',icon:icon_file}
							}	
						]
					},
				]
			},
			{
				path: '/project/projectData/project_basic_data',
				component: projectData,
				meta: {title: 'navbar.Project_information',icon:icon_overview,icon_hover:icon_overview_11},
				children:[
					{
						path: '/project/projectData/project_basic_data',
						component: project_basic_data,
						meta: {title: 'navbar.Product_information',icon:icon_file},	
					},
					// {
					// 	path: '/project/projectData/project_product_data',
					// 	component: project_product_data,
					// 	meta: {title: '产品信息',icon:icon_file},	
					// },
					
					{
						path: '/project/projectData/project_file',
						component: project_file,
						meta: {title: 'navbar.File',icon:icon_file},	
					},
				]
			},
			{
				path: '/project/projectConfigure/configureToken',
				component: projectConfigure,
				meta: {title: 'navbar.Project_setup',icon:icon_file,icon_hover:icon_file_11},
				// redirect:'/project/projectConfigure/configureDataPoint',//默认页面	
				children:[
					// {
					// 	path: '/project/projectConfigure/configureApplications',
					// 	component: configureApplications,
					// 	meta: {title: '访问凭证',icon:icon_file},	
					// },
					{
						path: '/project/projectConfigure/configureToken',
						component: configureToken,
						meta: {title: 'navbar.Visit_Voucher',icon:icon_file},	
					},
					{
						path: '/project/projectConfigure/configureDataPoint',
						component: configureDataPoint,
						meta: {title: 'navbar.Data_point',icon:icon_file},	
					},
					{
						path: '/project/projectConfigure/configureThirdParty',
						component: configureThirdParty,
						meta: {title: 'navbar.a36',icon:icon_file},	
					},
					{
						path: '/project/projectConfigure/configureEvent',
						component: configureEvent,
						meta: {title: 'navbar.Event_Push',icon:icon_file},	
					},
				]
			},
			{
				path: '/project/projectMember/projectMemberData',
				component: projectMember,
				meta: {title: 'navbar.Project_member',icon:icon_team,icon_hover:icon_team_11},	
				children:[
					{
						path: '/project/projectMember/projectMemberData',
						component: projectMemberData,
						meta: {title: 'navbar.Member_profile',icon:icon_file},	
					},
				]
			},
			// {
			// 	path: '/project/count/history',
			// 	component: countData,
			// 	meta: {title: '统计',icon:icon_file},	
			// 	children:[{
			// 		path: '/project/count/history',
			// 		component: history,
			// 		meta: {title: '历史记录',icon:icon_file},	
			// 	},
			// 	{
			// 		path: '/project/count/give_an_alarm',
			// 		component: give_an_alarm,
			// 		meta: {title: '告警记录',icon:icon_file},	
			// 	}]
			// },
		]
	},
	{
		path: '/personal/company',
		component: memberCenter,
		name: '',
		meta:{title:'navbar.Personal_center'},
		children:[
			{
				path: '/personal/company/my/:userid',
				component: personalData,
				meta: {title: 'navbar.Personal_information',icon:icon_personalData,icon_hover:icon_personalData_11},
			},
			{
				path: '/personal/company/authority/:userid',
				component: enterpriseData,
				meta: {title: 'navbar.Company_information',icon:icon_enterpriseData,icon_hover:icon_enterpriseData_11},	
			},
			{
				path: '/personal/company/member/:userid',
				component: team,
				meta: {title: 'navbar.Team_member',icon:icon_team,icon_hover:icon_team_11},	
			},
			{
				path: '/personal/company/User-application/:userid',
				component: applicationsIndex,
				meta: {title: 'navbar.User_application',icon:icon_user,icon_hover:icon_user_11},
				children:[
					{
						path: '/personal/company/User-application/:userid',
						component: applications,
						meta: {title: 'navbar.User_application',icon:icon_user,icon_hover:icon_user_11},
					},
					{
						path: '/personal/company/voucher/:userid',
						component: token,
						meta: {title: 'navbar.Visit_Voucher',icon:icon_visit,icon_hover:icon_visit_11},	
					}
				],redirect:'/personal/company/User-application/:userid'
			},
			// {
			// 	path: '/personal/company/voucher/:userid',
			// 	component: token,
			// 	meta: {title: 'navbar.Visit_Voucher',icon:icon_visit,icon_hover:icon_visit_11},	
			// },
		],redirect:'/personal/company/my/:userid'
	},
	{
		path: '/configuration',
		component: configuration,
		meta: {title:'配置和升级'},
		children:[
			{
				path: 'configure',
				component: configure,
				name:'configure',
				meta: {title:'参数配置'},
			}
		],redirect:'/configuration/configure'
	},
	{
		path: '/network',
		component: network,
		meta: {title:'',hidden:true},
	},
	{
        path: '/404',
        component: resolve => require(['@/page/404.vue'], resolve)
    },
	{
		path: '*',
		redirect: '/404'
	},
]

export default new Router({
	mode:"history",
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
