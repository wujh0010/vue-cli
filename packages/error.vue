<template>
  <section class="error-page">
    404错误
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component({
  components: {

  }
})
export default class Error extends Vue {
  @Prop({ type: String, default: '' }) readonly title!: never;
}
</script>

<style scoped lang="less">
.error-page {
  width: 100%;
}
</style>
