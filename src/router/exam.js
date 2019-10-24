// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/plugins/import.' + process.env.NODE_ENV)

const ExamCenter = _import('examCenter.vue')
const examCenterOld = _import('examCenterOld.vue')
const Exam = _import('exam.vue')
const ExamResult = _import('examResult.vue')
const ExamSearch = _import('examSearch.vue')
const ExamRank = _import('examRank.vue')
const ExamAnswer = _import('examAnswer.vue')
const ExamInformation = _import('examInformation.vue')
const ExamHistory = _import('examHistory.vue')

export default [
  // 考试中心
  {
    name: 'examCenter',
    path: '/examCenter',
    component: ExamCenter,
    meta: { title: '考试中心' }
  },
  // 考试中心老版
  {
    name: 'examCenterOld',
    path: '/examCenterOld',
    component: examCenterOld,
    meta: { title: '考试中心老版' }
  },
  // 考试 examAnswer
  {
    name: 'exam',
    path: '/exam',
    component: Exam,
    meta: { title: '考试' }
  },
  // 考试结果
  {
    name: 'examResult',
    path: '/examResult',
    component: ExamResult,
    meta: { title: '考试结果' }
  },
  // 我的考试排行榜
  {
    name: 'examRank',
    path: '/examRank',
    component: ExamRank,
    meta: { title: '我的排行' }
  },
  // 搜索考试
  {
    name: 'examSearch',
    path: '/examSearch',
    component: ExamSearch,
    meta: { title: '搜索考试' }
  },
  // 考试答案 examAnswer
  {
    name: 'examAnswer',
    path: '/examAnswer',
    component: ExamAnswer,
    meta: { title: '考试' }
  },
  // 考试信息
  {
    name: 'examInformation',
    path: '/examInformation',
    component: ExamInformation,
    meta: { title: '考试信息' }
  },
  // 考试记录
  {
    name: 'examHistory',
    path: 'examHistory',
    component: ExamHistory,
    meta: { title: '考试记录' }
  }
]
