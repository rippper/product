// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/plugins/import.' + process.env.NODE_ENV)

const Ebook = _import('ebook.vue')
const EbookSearch = _import('ebookSearch.vue')
const EbookChapterList = _import('ebookChapterList.vue')
const EbookDetail = _import('ebookDetail.vue')

export default [
  // 电子书
  {
    name: 'ebook',
    path: '/ebook',
    component: Ebook,
    meta: { title: '电子书' }
  },
  // 电子书搜索
  {
    name: 'ebookSearch',
    path: '/ebookSearch',
    component: EbookSearch,
    meta: { title: '电子书搜索' }
  },
  // 电子书章节
  {
    name: 'ebookChapterList',
    path: '/ebookChapterList',
    component: EbookChapterList,
    meta: { title: '电子书章节' }
  },
  // 电子书章节内容
  {
    name: 'ebookDetail',
    path: 'ebookDetail',
    component: EbookDetail,
    meta: { title: '内容' }
  }
]
