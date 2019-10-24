/**
* 党费缴纳列表
*/
<template>
  <ul>
    <li v-for="item in data" :key=item.Id>
      <div class="payment-list">
        <div class="payment-list-hd">
          <div class="payment-list-hd1" v-if="!unPaid">
            <img src="../assets/feiyong@2x.png" alt="">
            <p>{{item.Money}}</p>
          </div>
          <div class="payment-list-hd2" v-else>
            <img src="../assets/feiyong_2@2x.png" alt="">
            <p>{{item.Money}}</p>
          </div>
        </div>
        <div class="payment-list-bd">
          <div class="payment-list-bd1" v-if="!subFee">
            <div class="title">
              {{item.Title}}
            </div>
            <div class="time">
              缴费时间:{{item.StartTime | dateFilter('yyyy年MM月dd日')}}-{{item.EndTime | dateFilter('yyyy年MM月dd日')}}
            </div>
            <div class="handle" v-if="handle">
              <div class="handle1">
                <router-link v-if="item.PayForFlag" slot="left" class="handle-substitute"
                             :to="{path:'/partyPaySub',query:{Id:item.Id,payFlag:1}}">
                  <p>立即代缴</p>
                </router-link>
                <router-link slot="right" class="handle-payfees"
                             :to="{path:'/partyPaySub',query:{Id:item.Id,payFlag:0}}">
                  <p>立即缴费</p>
                </router-link>
              </div>
            </div>
          </div>
          <div class="payment-list-bd2" v-else>
            <div class="title">
              {{item.Title}}
            </div>
            <div class="view-details" @click.stop="goDetail(item.Id)">
              查看详情
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>

</template>

<script>

  export default ({
    name: 'payMentList',
    props: {
      data: Array,
      unPaid: { type: Boolean, default: false },
      subFee: { type: Boolean, default: false },
      handle: { type: Boolean, default: false }
    },
    components: {},
    methods: {
      goDetail (Id) {
        this.$router.push({ path: 'partyPaySub', query: { Id: Id, payFlag: 2 } })
      }
    }
  })
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .payment-list {
    margin-left: toRem(30px);
    padding: toRem(30px) 0 toRem(20px) 0;
    @extend %clearFix;
    border-bottom: 1px solid #dddddd;

    .payment-list-hd {
      @extend %pull-left;
      width: toRem(60px);
      text-align: center;

      img {
        width: toRem(28px);
        height: toRem(28px);
      }

      .payment-list-hd1 {
        p {
          color: #db1011;
          font-size: 14px;
          margin-top: toRem(10px);
        }
      }

      .payment-list-hd2 {
        p {
          color: #989898;
          font-size: 14px;
          margin-top: toRem(10px);
        }
      }
    }

    .payment-list-bd {
      @extend %pull-left;

      .payment-list-bd1 {
        margin-left: toRem(15px);
        width: toRem(640px);
        @extend %pull-right;

        .title {
          font-size: 16px;
          color: #333;
          line-height: toRem(45px);
          @include ellipsis_two(2);
          width: toRem(610px);
        }

        .time {
          margin-top: toRem(10px);
          color: #989898;
        }

        .handle {
          @extend %clearFix;
          margin-top: toRem(30px);
          width: toRem(610px);

          .handle-substitute {
            display: block;
            width: toRem(130px);
            height: toRem(56px);
            background: #db1101;
            line-height: toRem(56px);
            text-align: center;
            border-radius: toRem(30px);
            font-size: 12px;
            color: #fff;
            @extend %pull-left;
            margin-left: toRem(20px);
          }

          .handle-payfees {
            display: block;
            width: toRem(130px);
            height: toRem(56px);
            color: #fff;
            font-size: 12px;
            background: #fd961f;
            line-height: toRem(56px);
            text-align: center;
            border-radius: toRem(30px);
            @extend %pull-right;
            margin-right: toRem(20px);
          }
        }
      }

      .payment-list-bd2 {
        margin-left: toRem(15px);
        @extend %clearFix;

        .title {
          font-size: 16px;
          color: #333;
          line-height: toRem(45px);
          @include ellipsis_two(2);
          width: toRem(470px);
          @extend %pull-left;
        }

        .view-details {
          width: toRem(130px);
          height: toRem(56px);
          line-height: toRem(56px);
          background: #fd961f;
          color: #fff;
          text-align: center;
          font-size: 14px;
          border-radius: toRem(30px);
          @extend %pull-left;
        }
      }
    }
  }

</style>
