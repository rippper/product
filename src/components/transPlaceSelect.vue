/*
  培训班筛选列表
*/
<template>
    <div class="selectPlace">
        <dl>
            <dt>
                <span v-text="Type"></span>
            </dt>
            <dd>
                <ul>
                    <li
                        v-for="(item, index) in typeList"
                        :key="index"
                        v-text="item"
                        @click="typeSelect(index)"
                        ref="Option"
                    >
                    </li>
                </ul>
            </dd>
        </dl>
    </div>
</template>

<script>
export default {
    name: 'transTypeSelect',
    props: {
        Type: String,
        typeList: Array
    },
    mounted () {

    },
    methods: {
        typeSelect (index) {
            this.$refs.Option.forEach((item) => {
                item.style.color = ''
                item.style.background = ''
            })
            this.$refs.Option[index].style.color = '#fff'
            this.$refs.Option[index].style.background = '#4374df'
        }
    }
}
</script>

<style lang="scss">
    @import "../style/mixin";
    .selectPlace{
        -webkit-font-smoothing:antialiased;
        padding-top: toRem(43px);
        dl{
            display: flex;
            dt{
                width: toRem(125px);
                padding-left: toRem(30px);
                span{
                    font-size: toRem(28px);
                    line-height: toRem(52px);
                    font-weight: 600;
                }
            }
            dd{
                ul{
                    display: flex;
                    flex-wrap: wrap;
                    li{
                        font-size: toRem(26px);
                        margin-right: toRem(15px);
                        padding-left: toRem(25px);
                        padding-right: toRem(25px);
                        height: toRem(52px);
                        line-height: toRem(52px);
                        border-radius: toRem(52px);
                        color: #4a608c;
                    }
                }
            }
        }
    }
</style>
