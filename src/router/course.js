// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/plugins/import.' + process.env.NODE_ENV)

const CourseCenter = _import('courseCenter.vue')
const CourseSearch = _import('courseSearch.vue')
const History = _import('history.vue')
const MyCourse = _import('myCourse.vue')
const PlayMp4 = _import('playMp4.vue')
const PlayJYAicc = _import('playJYAicc.vue')
const PlayH5 = _import('playH5.vue')

export default [
  // 课程中心
  {
    name: 'courseCenter',
    path: '/courseCenter',
    component: CourseCenter,
    meta: { title: '课程中心' }
  },
  // 课程搜索
  {
    name: 'courseSearch',
    path: '/courseSearch',
    component: CourseSearch,
    meta: { title: '课程搜索' }
  },
  // 历史记录
  {
    name: 'history',
    path: '/history',
    component: History,
    meta: { title: '历史记录' }
  },
  // 我的课程
  {
    name: 'myCourse',
    path: '/myCourse',
    component: MyCourse,
    meta: { title: '我的课程' }
  },
  // mp4播放
  {
    name: 'playMp4',
    path: '/playMp4',
    component: PlayMp4,
    meta: { title: '课程播放' }
  },
  // JYAicc播放页
  {
    name: 'playJYAicc',
    path: '/playJYAicc',
    component: PlayJYAicc,
    meta: { title: '精英课程播放' }
  },
  // h5播放
  {
    name: 'playH5',
    path: '/playH5',
    component: PlayH5,
    meta: { title: 'h5课程播放' }
  }
]
