<template>
  <div class="mbChecklist" @change="$emit('change', currentValue)">
    <div class="checkList" v-for="(option,index) in options" :key="index"
         :class="{
           checklist_checked :isInArray(option.ThemeItemFlag),
           checklist_checked2 :isInArray(option.ItemFlag)
         }"
         @click.prevent="pushValue(option)">
      <label :for="'checkbox'+option.ThemeItemFlag || option.ItemFlag" class="mint-checklist-label">
        <span class="mint-checkbox">
          <input
            class="mint-checkbox-input"
            type="checkbox"
            :id="'checkbox'+option.ThemeItemFlag || option.ItemFlag"
            :checked="currentValue"
            :disabled="isDisabled||option.disabled"
            :name="option.ThemeItemTitle || option.ItemTitle"
            :value="option.ThemeItemFlag || option || option.ItemFlag"/>
          <!--<span class="mint-checkbox-core"></span>-->
        </span>
        <!--&nbsp;&nbsp;{{option.ThemeItemFlag+'.'+option.ThemeItemTitle}}-->
        <span class="mint-checkbox-label" v-text="(option.ThemeItemFlag || option.ItemFlag)+'.'"></span>
        <span class="mint-checkbox-label label_title" v-text="option.ThemeItemTitle || option.Name"></span>
      </label>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Checklist } from 'mint-ui'

  Vue.component(Checklist.name, Checklist)
  export default {
    data () {
      return {
        currentValue: this.value
      }
    },
    props: {
      options: {
        required: true
      },
      isDisabled: {
        default: false,
        type: Boolean,
        required: false
      },
      value: {
        default: ''
      }
    },
    computed: {},
    methods: {
      pushValue (option) {
        if (!(this.currentValue instanceof Array)) {
          this.currentValue = []
        }
        if (this.isInArray(option.ThemeItemFlag || option.ItemFlag)) {
          let index = this.currentValue.indexOf(option.ThemeItemFlag || option.ThemeItemFlag)
          this.currentValue.splice(index, 1)
          return
        }
        this.currentValue.push(option.ThemeItemFlag || option.ThemeItemFlag)
      },
      isInArray (value) {
        for (var i = 0; i < this.currentValue.length; i++) {
          if (value === this.currentValue[i]) {
            return true
          }
        }
        return false
      }
    },
    watch: {
      value (val) {
        this.currentValue = val
      },
      currentValue (val) {
        this.$emit('input', val)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../style/mixin';

  .mbChecklist {
    .checkList {
      @extend %border-base;
      @include borderRadius(10px);
      background-color: $fill-grey;
      margin-bottom: toRem(30px);

      .checklist-input:focus {
        outline: none;
      }

      .mint-checklist-label {
        display: block;
        padding: toRem(21px) toRem(20px);
        font-size: 15px;
      }

      padding: 0 toRem(20px);
    }

    .checklist_checked {
      border: 1px solid $brand-primary;
      background-color: $fill-base;
      color: $brand-primary;
    }

    .checklist_checked2 {
      border: 1px solid #0dc57e;
      background-color: #0dc57e;
      color: #fff;
    }

    .label_title {
      margin-left: toRem(50px);
    }
  }
</style>
