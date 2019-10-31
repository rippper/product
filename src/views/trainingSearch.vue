<template>
    <div class="trainSearch">
        <mt-search v-model="searchValue"></mt-search>
        <div>
            <ul>
                <li>
                    <!-- <trainingCourseItem></trainingCourseItem> -->
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { Search } from 'mint-ui'
import { trainingCourseItem } from '../components'

Vue.component(Search.name, Search)

export default {
    name: 'trainingSearch',
    data () {
        return {
            searchValue: ''
        }
    },
    methods: {

    },
    computed: {

    },
    components: {
        trainingCourseItem
    }
}
</script>

<style lang="scss">

</style>
