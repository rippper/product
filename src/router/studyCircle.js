const _import = require('@/plugins/import.' + process.env.NODE_ENV)

const StudyCircleCenter = _import('studyCircleCenter.vue')
const StudyCircleStage = _import('studyCircleStage.vue')
const StudyCircleStageDetail = _import('studyCircleStageDetail.vue')
const StudyCircleCreate = _import('studyCircleCreate.vue')
const StudyCirclePublish = _import('studyCirclePublish.vue')
export default [
    {
        name: 'studyCircleCenter',
        path: '/studyCircleCenter',
        component: StudyCircleCenter,
        meta: { title: '学习圈中心' }
    },
    {
        name: 'studyCircleStage',
        path: '/studyCircleStage',
        component: StudyCircleStage,
        meta: { title: '学习圈圈子页面' }
    },
    {
        name: 'studyCircleStageDetail',
        path: '/studyCircleStageDetail',
        component: StudyCircleStageDetail,
        meta: { title: '学习圈帖子详情页面' }
    },
    {
        name: 'studyCirclePublish',
        path: '/studyCirclePublish',
        component: StudyCirclePublish,
        meta: { title: '学习圈发布动态' }
    },
    {
        name: 'studyCircleCreate',
        path: '/studyCircleCreate',
        component: StudyCircleCreate,
        meta: { title: '学习圈创建圈子' }
    }
]
