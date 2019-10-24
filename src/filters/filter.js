import { formatDate } from '../plugins/utils'

/**
 * 文字字数限制，超出部分以...结尾
 * @param value {string}
 * @param num {number}
 * @return {string}
 */
const wordLimit = (value, num) => {
  if (!value) return ''
  return value.length > num ? value.substring(0, num) + '...' : value
}

const dateFilter = (value, format = 'yyyy.MM.dd') => {
  if (!value) return ''
  let timeNum = value.replace(' ', 'T')
  let date = new Date(timeNum)
  return formatDate(date, format)
}
const dateFilter2 = (value, format = 'yyyy.MM.dd') => {
  if (!value) return ''
  let timeNum = value.replace(/[^0-9-]/ig, '')
  let date = new Date(Number(timeNum))
  return formatDate(date, format)
}
const formatTime = (a) => {
  let mm = parseInt(a / 60)
  if (mm < 10) mm = '0' + mm
  let ss = parseInt((a - mm * 60) % 60)
  if (ss < 10) ss = '0' + ss
  let length = mm + ':' + ss
  return a > 0 ? length : 'NaN'
}

export default {
  wordLimit,
  dateFilter,
  dateFilter2,
  formatTime
}
