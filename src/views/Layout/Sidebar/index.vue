<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"

      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <div v-for="(item, index) in userMenus" :key="index">
        <el-menu-item :index="item.path" v-if="item.children.length==0" @click="acChange(item.id, item.id)">
          <i :class="item.icon"></i>
          <span class="item_t" >{{item.label}}</span>
        </el-menu-item>

        <el-submenu :index="index+''" v-else>
          <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title" class="item_t">{{item.label}}</span>
            </template>
          <template v-for="(child, index) in item.children">
              <el-menu-item :index="child.path" @click="acChange(child.id, item.id)">
                <span class="item_son" >{{child.label}}</span>
              </el-menu-item>
            </template>
        </el-submenu>

      </div>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'userMenus',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {
    console.log(this.userMenus);
  }
}
</script>
