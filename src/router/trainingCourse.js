const _import = require('@/plugins/import.' + process.env.NODE_ENV)

const TrainingCourse = _import('trainingCourse.vue')
const TrainingDetails = _import('trainingDetails.vue')
const TrainingSearch = _import('trainingSearch.vue')

export default [
    {
        name: 'trainingcourse',
        path: '/trainingcourse',
        component: TrainingCourse,
        meta: { title: '培训班' }
    },
    {
        name: 'trainingdetails',
        path: '/trainingdetails',
        component: TrainingDetails,
        meta: { title: '培训班详情' }
    },
    {
        name: 'trainingsearch',
        path: '/trainingsearch',
        component: TrainingSearch,
        meta: { title: '培训班搜索' }
    }
]
