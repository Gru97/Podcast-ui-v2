<template>
  <div>
    <v-navigation-drawer v-model="drawer" app right>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon color="teal">{{ item.icon }}</v-icon>
          </v-list-item-icon>
            
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    

    <v-app-bar app color="teal" dark>
      <v-spacer></v-spacer>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title></v-toolbar-title>
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
    drawer: null,
    items: [
      { icon: "mdi-home",
        text: "صفحه اصلی",
        url: "Home"
      },
      {
        icon: "mdi-music",
        text: "برترین پادکست ها",
        type: 1,
        url: "",
      },
      {
        icon: "mdi-music-box-multiple",
        text: "برترین آلبوم ها",
        type: 1,
        url: "",
      },
      {
        icon: "mdi-folder-open",
        text: "برترین کانال ها",
        type: 1,
        url: "",
      },
    ],
  }),
  methods: {
    gotothelink(type, url) {
        this.$router.push({ name: url });
    },
    
  },
};
</script>

<style scoped>

</style>