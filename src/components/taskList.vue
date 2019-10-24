/**
* 任务列表
*/
<template>
  <div class="urgentTask-list">
    <ul>
      <li v-for="(item,index) in data" :key="item.Id" @click="goDetail(item)">
        <div class="urgentTask-list-num" :class="{'list-red':index<=3}">
          {{index>=9?(index+1):('0'+(index+1))}}
        </div>
        <div class="urgentTask-list-detail">
          <div class="urgentTask-list-dtitle">
            {{item.Name}}
          </div>
          <div class="urgentTask-list-dtime">
            <img src="../assets/hq-task-time.png" alt=""> {{item.StartDate | dateFilter}} ~ {{item.EndDate |
            dateFilter}}
          </div>
          <div class="urgentTask-list-dparty">
            <img src="../assets/hq-task-organization.png" alt=""> {{item.GroupName}}
          </div>
          <div class="urgentTask-list-lightNum" v-if="lightSum">
            <div class="lightNum-y">
              <img src="../assets/hq-task-count-yellow.png" alt=""> <span>黄灯{{item.RedSum}}次</span>
            </div>
            <div class="lightNum-r">
              <img src="../assets/hq-task-count-red.png" alt=""> <span>红灯{{item.YellowSum}}次</span>
            </div>
          </div>
        </div>
        <div v-if="isShowDetail">
          <div v-if="!isRelated">
            <div class="urgentTask-list-link" v-if="item.Status==1">
              查看详情
            </div>
            <div class="urgentTask-list-link" v-if="item.Status==2">
              编辑
            </div>
          </div>
          <div v-else>
            <div class="urgentTask-list-link">
              查看详情
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>

  export default {
    props: {
      data: Array,
      lightSum: Boolean,
      isRelated: { type: Boolean, default: false },
      isShowDetail: { type: Boolean, default: true },
      category: String
    },
    components: {},
    methods: {
      goDetail (item) {
        if (this.category == 'task') {
          if (item.Status == 1) {
            this.$router.push({ name: 'taskDetail', query: { Id: item.Id } })
          } else {
            this.$router.push({ name: 'taskPublish', query: { Id: item.Id } })
          }
        } else if (this.category == 'plan') {
          if (item.Status == 1) {
            this.$router.push({ name: 'actionPlanDetail', query: { Id: item.Id } })
          } else {
            this.$router.push({ name: 'actionPlanPublish', query: { Id: item.Id } })
          }
        }
        // this.$router.push({...this.link, Status: item.Status, query: {Id: item.Id}})
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .urgentTask-list {
    padding-top: toRem(40px);

    ul {
      li {
        background: #fff;
        padding: toRem(30px);
        margin-top: toRem(20px);
        @extend %clearFix;

        .urgentTask-list-num {
          color: #ff981b;;
          font-weight: bold;
          font-size: 12px;
          @extend %pull-left;
          width: toRem(45px);
          line-height: toRem(45px);
        }

        .list-red {
          color: #ea0009;
        }

        .urgentTask-list-detail {
          font-size: 12px;
          @extend %pull-left;
          width: toRem(485px);
          margin-left: toRem(15px);

          .urgentTask-list-dtitle {
            color: #333;
            line-height: toRem(45px);
            font-size: 14px;
          }

          .urgentTask-list-dtime {
            margin-top: toRem(10px);
            color: #999;

            img {
              width: toRem(24px);
              height: toRem(24px);
              margin-right: toRem(15px);
            }
          }

          .urgentTask-list-dparty {
            margin-top: toRem(10px);
            color: #999;

            img {
              width: toRem(25px);
              height: toRem(23px);
              margin-right: toRem(15px);
            }
          }

          .urgentTask-list-lightNum {
            @extend %clearFix;
            margin-top: toRem(30px);

            .lightNum-y {
              border: 2px solid #fd961f;
              @extend %pull-left;
              height: toRem(42px);
              line-height: toRem(42px);
              margin-right: toRem(40px);
              @extend %clearFix;

              img {
                width: toRem(38px);
                height: toRem(38px);
                @extend %pull-left;
              }

              span {
                color: #fd961f;
                @extend %pull-left;
                padding: 0 toRem(10px)
              }
            }

            .lightNum-r {
              border: 2px solid #dc1011;
              height: toRem(42px);
              line-height: toRem(42px);
              @extend %pull-left;
              @extend %clearFix;

              img {
                width: toRem(38px);
                height: toRem(38px);
                @extend %pull-left;
              }

              span {
                color: #dc1011;
                @extend %pull-left;
                padding: 0 toRem(10px)
              }
            }
          }
        }

        .urgentTask-list-link {
          @extend %pull-left;
          width: toRem(130px);
          height: toRem(56px);
          background: #fd961f;
          color: #fff;
          text-align: center;
          line-height: toRem(56px);
          margin-left: toRem(10px);
          margin-top: toRem(50px);
          border-radius: toRem(30px);
        }

      }
    }
  }

</style>
