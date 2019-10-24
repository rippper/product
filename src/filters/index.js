import dateFilters from './dateFilter'
import filters from './filter'

const vueFiltersDate = {
  install: function (Vue, options) {
    Object.keys(dateFilters).forEach(name => {
      Vue.filter(name, dateFilters[name])
    })
    Object.keys(filters).forEach(name => {
      Vue.filter(name, filters[name])
    })
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vueFiltersDate)
}

export default vueFiltersDate
