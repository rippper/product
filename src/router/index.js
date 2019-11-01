/* 路由 */
import App from '../App.vue'
import exam from './exam' // 考试
import ebook from './ebook' // 电子书
import personalCenter from './personalCenter' // 个人中心
import course from './course' // 课程相关
import trainingCourse from './trainingCourse' // 培训班
import article from './article' //文章

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/plugins/import.' + process.env.NODE_ENV)

const Home = _import('home.vue')
const Login = _import('login.vue')
const Login1 = _import('login1.vue')
const Error = _import('error.vue')
const Message = _import('message.vue')
const MessageDetail = _import('messageDetail.vue')
const NewsCenter = _import('newsCenter.vue')
const NewsSearch = _import('newsSearch.vue')
const NewsDetails = _import('newsDetails.vue')
const MyCredit = _import('myCredit.vue')
const Register = _import('register.vue')
const Notice = _import('notice.vue')
const OpenApp = _import('openApp.vue')
const NotesDetail = _import('notesDetail.vue')
const NoticeDetail = _import('noticeDetail.vue')
const MyExam = _import('myExam.vue')

const routes = [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        redirect: '/home',
        meta: { title: '首页', isSkip: true } // isSkip配置为不检查登录状态
      },
      // 登陆
      {
        name: 'login',
        path: '/login',
        component: Login,
        meta: { title: '登陆', isSkip: true }
      },
      // 登陆
      {
        name: 'login1',
        path: '/login1',
        component: Login1,
        meta: { title: '登陆', isSkip: true }
      },
      // 首页
      {
        name: 'home',
        path: '/home',
        component: Home,
        meta: { title: '首页', isSkip: true }
      },
      // 消息中心
      {
        name: 'message',
        path: '/message',
        component: Message,
        meta: { title: '消息中心' }
      },
      // 通知内容
      {
        name: 'messageDetail',
        path: '/messageDetail',
        component: MessageDetail,
        meta: { title: '通知内容' }
      },
      // 新闻中心
      {
        name: 'newsCenter',
        path: '/newsCenter',
        component: NewsCenter,
        meta: { title: '新闻中心' }
      },
      // 新闻搜索
      {
        name: 'newsSearch',
        path: '/newsSearch',
        component: NewsSearch,
        meta: { title: '新闻搜索' }
      },
      // 新闻详情
      {
        name: 'newsDetails',
        path: '/newsDetails',
        component: NewsDetails,
        meta: { title: '新闻详情' }
      },
      // 站内信
      {
        name: 'notice',
        path: '/notice',
        component: Notice,
        meta: { title: '站内信' }
      },
      // 我的学分
      {
        name: 'myCredit',
        path: 'myCredit',
        component: MyCredit,
        meta: { title: '我的学分' }
      },
      // 注册
      {
        name: 'register',
        path: 'register',
        component: Register,
        meta: { title: '注册', isSkip: true }
      },
      // 打开app
      {
        name: 'openApp',
        path: 'openApp',
        component: OpenApp,
        meta: { title: '打开App' }
      },
      // 笔记详情
      {
        name: 'notesDetail',
        path: 'notesDetail',
        component: NotesDetail,
        meta: { title: '笔记详情' }
      },
      // 通知详情
      {
        name: 'noticeDetail',
        path: 'noticeDetail',
        component: NoticeDetail,
        meta: { title: '通知详情' }
      },
      // error
      {
        name: 'error',
        path: '/error',
        component: Error,
        meta: { title: 'error' }
      },
      // 我的考试
      {
        name: 'myExam',
        path: '/myExam',
        component: MyExam,
        meta: { title: '我的考试' }
      },
      // 考试相关路由
      ...exam,
      // 电子书相关路由
      ...ebook,
      // 个人中心相关路由
      ...personalCenter,
      // 课程相关路由
      ...course,
      // 培训班相关路由
      ...trainingCourse,
      // 文章相关页面
      ...article
    ]
  },
  { path: '*', redirect: '/error' }
]
export default routes
