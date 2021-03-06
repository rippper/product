const _import = require('@/plugins/import.' + process.env.NODE_ENV)

const ArticleDetail = _import('articleDetail.vue')
const Notification = _import('notification.vue')
const ArticleType = _import('articleType.vue')

export default [
    {
        name: 'articletype',
        path: '/articletype',
        component: ArticleType,
        meta: { title: '文章分类' }
    },
    {
        name: 'articledetail',
        path: '/articledetail',
        component: ArticleDetail,
        meta: { title: '文章详情' }
    },
    {
        name: 'notification',
        path: '/notification',
        component: Notification,
        meta: { title: '通知公告' }
    }
]
