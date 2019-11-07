// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/plugins/import.' + process.env.NODE_ENV)

const ExamType = _import('examType.vue')
const ExamTitleList = _import('examTitleList.vue')

export default [
  {
    name: 'examtype',
    path: '/examtype',
    component: ExamType,
    meta: { title: '考试类型' }
  },
  {
    name: 'examtitlelist',
    path: '/examtitlelist',
    component: ExamTitleList,
    meta: { title: '考试选择' }
  }

]
