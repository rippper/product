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
                        v-text="item.text"
                        @click="typeSelect(index, item.id)"
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
        this.selectAll()
    },
    methods: {
        selectAll () {
            if (this.typeList.length > 1) {
                this.$refs.Option[0].style.color = '#fff'
                this.$refs.Option[0].style.background = '#4374df'
            }
        },
        typeSelect (index, Id) {
            this.$refs.Option.forEach((item) => {
                item.style.color = ''
                item.style.background = ''
            })
            this.$refs.Option[index].style.color = '#fff'
            this.$refs.Option[index].style.background = '#4374df'
            this.$emit('rebackMsg', { type: this.Type, item: Id })
        }
    }
}
</script>

<style lang="scss">
    @import "../style/mixin";
    .selectPlace{
        -webkit-font-smoothing:antialiased;
        padding-top: toRem(15px);
        dl{
            display: flex;
            dt{
                width: toRem(130px);
                padding-left: toRem(30px);
                span{
                    font-size: toRem(28px);
                    line-height: toRem(52px);
                    font-weight: 600;
                }
            }
            dd{
                width: toRem(790px);
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
