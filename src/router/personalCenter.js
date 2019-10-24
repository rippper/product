// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/plugins/import.' + process.env.NODE_ENV)

const PersonalCenter = _import('personalCenter.vue')
const RankList = _import('rankList.vue')
const Advise = _import('advise.vue')
const Setting = _import('setting.vue')
const EmailEdit = _import('emailEdit.vue')
const UserInfoEdit = _import('userInfoEdit.vue')
const ChangeMobile = _import('changeMobile.vue')
const ChangePwd = _import('changePwd.vue')
const MyCollect = _import('myCollect.vue')

export default [
  // 个人中心
  {
    name: 'personalCenter',
    path: '/personalCenter',
    component: PersonalCenter,
    meta: { title: '个人中心' }
  },
  // 排行榜
  {
    name: 'rankList',
    path: '/rankList',
    component: RankList,
    meta: { title: '排行榜' }
  },
  // 反馈中心
  {
    name: 'advise',
    path: 'advise',
    component: Advise,
    meta: { title: '反馈中心' }
  },
  // 设置中心
  {
    name: 'setting',
    path: 'setting',
    component: Setting,
    meta: { title: '设置' }
  },
  // 个人信息修改
  {
    name: 'userInfoEdit',
    path: 'userInfoEdit',
    component: UserInfoEdit,
    meta: { title: '个人信息修改' }
  },
  // 个人邮箱修改
  {
    name: 'emailEdit',
    path: 'emailEdit',
    component: EmailEdit,
    meta: { title: '个人邮箱修改' }
  },
  // 修改手机号码
  {
    name: 'changeMobile',
    path: 'changeMobile',
    component: ChangeMobile,
    meta: { title: '修改手机号码' }
  },
  // 修改密码
  {
    name: 'changePwd',
    path: 'changePwd',
    component: ChangePwd,
    meta: { title: '修改密码' }
  },
  // 我的收藏
  {
    name: 'myCollect',
    path: 'myCollect',
    component: MyCollect,
    meta: { title: '我的收藏' }
  }
]
