<template lang="html">
  <sidebar></sidebar>
</template>

<script>
import Sidebar from "./Sidebar/index"
export default {
  components: {
    Sidebar
  },
  created() {
    //do something after creating vue instance
    console.log(this.$router, this.$route);

  }
}
</script>

<style lang="css">

</style>
