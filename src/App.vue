<template>
  <div id="prime-component-entry">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class App extends Vue {
  mounted(): void {
    console.log(process);
    console.log(process.env);
    console.log(process.env.API);
  }
}
</script>

<style lang="less">

</style>
