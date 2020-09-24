<template>
  <div>
    <Sidebar></Sidebar>
    <v-main>
      <v-card class="mx-auto mt-4" max-width="90%">
        <v-card-text>
          <v-row>
            <h3 class="text--primary mr-3">
              <v-icon color="#EF5554" left>mdi-folder-open</v-icon>لیست کانال ها
            </h3>
            <div class="mr-auto ml-3">
              <v-btn color="#EF5554" dark>
                <v-icon color="#fff" left>mdi-plus</v-icon>
                <router-link :to="{name : 'NewChannel'}" style="color: #fff!important;">
                  <div>افزودن کانال جدید</div>
                </router-link>
              </v-btn>
            </div>
          </v-row>

          <v-spacer></v-spacer>
        </v-card-text>
      </v-card>

      <v-container>
        <v-row v-for="channel in channels" :key="channel.id" class="mb-5">
          <v-card class="mx-auto" width="90%" outlined>
            <v-list-item two-line>
              <v-list-item-content class="mx-10">
                <v-list-item-title class="headline mb-1">
                  <span class="overline mb-4">
                    <v-icon color="#EF5554" left>mdi-checkbox-multiple-marked-circle-outline</v-icon>
                  </span>
                  {{channel.name}}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-icon color="#EF5554" left>mdi-human-greeting</v-icon>
                  {{channel.followers}} دنبال کننده
                </v-list-item-subtitle>
                <v-list-item-subtitle class="mt-12">* {{channel.description}}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar tile size="250" color="grey">
                <v-img
                  height="300"
                  width="300"
                  src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
                ></v-img>
              </v-list-item-avatar>
            </v-list-item>
            <v-card-actions>
              <v-btn color="#EF5554" text @click="channelDetail(channel.id)">
                <v-icon color="#EF5554" right>mdi-information-outline</v-icon>مشاهده
              </v-btn>
              <v-btn color="#EF5554" text>
                <v-icon color="#EF5554" right>mdi-pencil</v-icon>ویرایش
              </v-btn>
              <v-btn color="#EF5554" text>
                <v-icon color="#EF5554" right>mdi-delete</v-icon>حذف
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "Home",
  components: {
    Sidebar,
  },

  data() {
    return {
      page: 0,
      channels: [],
    };
  },

  computed: {
    // imagepath(address) {
    //   return 'http://86.106.142.11:40000/' + address
    // },
  },

  created() {
    this.$store.dispatch("getChannls", this.page).then((res) => {
      this.channels = res.data.items;
      // console.log(this.channels)
    });
  },
  methods: {
    channelDetail(channelID) {
      //console.log("channelID")
      this.$router.push({ name: "channelDetail", params: { id: channelID } });
    },
  },
};
</script>

<style>
</style>