<template>
  <div>
    <v-navigation-drawer v-model="drawer" app right>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon color="teal">{{ item.icon }}</v-icon>
          </v-list-item-icon>
            
          <v-list-item-content @click="gotothelink(item.url)">
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    

    <v-app-bar app color="teal" dark class="navButton">
      <v-toolbar-title class="">
        <router-link :to="{name : 'Login'}"><span style="color:#fff">ثبت نام/ورود</span></router-link>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      


    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    source: String,
  },
  data: () => ({
    drawer: true,
    items: [
      { icon: "mdi-home",
        text: "صفحه اصلی",
        url: "Home"
      },
      {
        icon: "mdi-music",
        text: "برترین پادکست ها",
        url: "",
      },
      {
        icon: "mdi-music-box-multiple",
        text: "برترین آلبوم ها",
        url: "",
      },
      {
        icon: "mdi-folder-open",
        text: "برترین کانال ها",
        url: "",
      },
      {
        icon: "mdi-folder-open",
        text: "آپلود فایل",
        url: "Channel",
      },
    ],
  }),
  methods: {
    gotothelink(url) {
      this.$router.push({ name: url });
    },
    
  },
};
</script>

<style scoped>
.navButton{
  direction: ltr;
}
</style>