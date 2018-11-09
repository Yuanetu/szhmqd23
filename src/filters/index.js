import Vue from 'vue'
import moment from 'moment'

Vue.filter('dateFmt',(el,formatStr='YYYY-MM-DD')=>{
    return moment(el).format(formatStr)
})