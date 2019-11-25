<template>
    <div class="examresult">
        <header-fix>
            <i class="examR_goBack" slot="left"></i>
        </header-fix>
    </div>
</template>

<script>
import { headerFix } from '../components'
export default {
    name: 'examResult',
    data () {
        return {

        }
    },
    methods: {

    },
    components: {
        headerFix
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
    .examresult{
        position: relative;
        .examR_goBack{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: toRem(24px);
            height: toRem(42px);
            background: url('../assets/arti-rebackblank.png');
            background-size: 100%;
        }
    }
</style>
