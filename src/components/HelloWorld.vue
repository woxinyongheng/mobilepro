<template>
  <div class="hello">
    <tabbar>
      <tabbar-item>
        <!--<img slot="icon" src="../assets/demo/icon_nav_button.png">-->
        <span slot="label">Wechat</span>
      </tabbar-item>
      <tabbar-item show-dot>
        <!--<img slot="icon" src="../assets/demo/icon_nav_msg.png">-->
        <span slot="label">Message</span>
      </tabbar-item>
      <tabbar-item selected link="/component/demo">
        <!--<img slot="icon" src="../assets/demo/icon_nav_article.png">-->
        <span slot="label">Explore</span>
      </tabbar-item>
      <tabbar-item badge="2">
        <!--<img slot="icon" src="../assets/demo/icon_nav_cell.png">-->
        <span slot="label">News</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vux'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }

  },
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
