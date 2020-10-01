<template>
  <div>
    <v-navigation-drawer v-model="drawer" app right>
      <v-list>
        <v-img
          :aspect-ratio="16 / 9"
          :src="img"
          class="py-12"
        >
         <!--
          <v-row align="end" class="lightbox white--text pa-2 fill-height">
            <v-col>
              <div class="body-1">ourpodcast.ir</div>
            </v-col>
          </v-row>
          -->
        </v-img>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon color="#FF1493">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content @click="gotothelink(item.url)">
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

     

    <v-app-bar app dark class="navButton" height="100">
    <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, #4B0082, #FF1493"
        ></v-img>
      </template>
      <v-toolbar-title class="">
        <router-link :to="{ name: 'Login' }"
          ><span style="color: #fff">

            <v-icon color="#FF1493" x-large left>mdi-account-circle</v-icon>
            ثبت نام/ورود</span
          ></router-link
        >
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
    img:require("@/assets/images/ourpodcast.jpg"),
    items: [
      { icon: "mdi-home", text: "صفحه اصلی", url: "Home" },
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
        icon: "mdi-star",
        text: "برترین کانال ها",
        url: "",
      },
      {
        icon: "mdi-cloud-upload",
        text: "آپلود فایل",
        url: "ChannelsList",
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
.navButton {
  direction: ltr;
}
.aaa{
    color: darkred;
background-image:
    linear-gradient(
      to right, 
      #800080, 
      #FF1493 85%
      
    );
}
</style>