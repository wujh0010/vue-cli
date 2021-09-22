<template>
  <section class="index-page">
    <div>{{ $config().name }}</div>
    <div>{{ $config().lang }}</div>
    <div>{{ $config().api }}</div>
    <div>{{ $t('common.btnMsg.submit') }}</div>
    <div>{{ $t('product.confirmText', {phone: message.phone}) }}</div>
    <div class="test-less">
      {{ $t('product.testText') }}
      {{ $t('product.testText') }}
      {{ $t('product.testText') }}
    </div>

    <error />
    <div>123</div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

interface Message {
  id?: number,
  name?: string,
  phone?: number | string
}

@Component({
  components: {}
})
export default class Index extends Vue {
  @Prop({type: Boolean, default: true}) readonly editable!: boolean;

  private message: Message = {
    id: 1,
    name: '测试',
    phone: '13333333330'
  };

  mounted(): void {
    console.log(12);
  }
}
</script>

<style scoped lang="less">
@import "../assets/style/mixin.less";

.index-page {
  .test-less {
    width: 200px;
    .hidden-ell(2);
  }
}
</style>
