const _import = require('@/plugins/import.' + process.env.NODE_ENV)

const TrainingCourse = _import('trainingCourse.vue')
const TrainingDetails = _import('trainingDetails.vue')

export default [
    {
        name: 'trainingcourse',
        path: '/trainingcourse',
        component: TrainingCourse,
        meta: { title: '培训班', isSkip: true }
    },
    {
        name: 'trainingdetails',
        path: '/trainingdetails',
        component: TrainingDetails,
        meta: { title: '培训班详情', isSkip: true }
    }
]
