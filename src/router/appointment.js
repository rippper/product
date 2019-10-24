// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/plugins/import.' + process.env.NODE_ENV)

const MyAppointment = _import('myAppointment.vue')
const AppointmentDetail = _import('appointmentDetail.vue')

export default [
  // 我的预约
  {
    name: 'myAppointment',
    path: '/myAppointment',
    component: MyAppointment,
    meta: { title: '我的预约' }
  },
  // 预约详情
  {
    name: 'appointmentDetail',
    path: '/appointmentDetail',
    component: AppointmentDetail,
    meta: { title: '预约详情' }
  }
]
