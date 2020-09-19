<template>
    <div>
        <Sidebar></Sidebar>
        <v-main>
          <v-card
          class="mx-auto mt-4"
          max-width="90%"
          >
            <v-card-text>
              <v-row>
                <h3 class="text--primary mr-3">
                  <v-icon color="teal">mdi-folder-open</v-icon> لیست کانال ها
                </h3>
                <div class="mr-auto ml-3">
                  <v-btn color="teal" dark>
                    <v-icon color="#fff">mdi-plus</v-icon>
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
            <v-row
              v-for="channel in channels"
              :key="channel.id"
              class="mb-5"
            >
              <v-card
                class="mx-auto"
                outlined
                width="90%"
              >
                <v-list-item>
                  <!-- <img class="card-img-top" :src="imagepath(channel.imageUrl)" alt=""> -->
                  <v-list-item-avatar
                    tile
                    size="150"
                    color="grey"
                  ></v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="headline mb-1">{{channel.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{channel.followers}} دنبال کننده </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-card-text>{{channel.description}}</v-card-text>

                <v-card-actions class="float-left">
                  <v-btn color="error" dark>
                    <v-icon color="#fff">mdi-delete</v-icon> حذف
                  </v-btn>
                  <v-btn color="warning" dark>
                    <v-icon color="#fff">mdi-pencil</v-icon> ویرایش
                  </v-btn>
                  <v-btn color="teal" dark>
                    <v-icon color="#fff">mdi-information-outline</v-icon> مشاهده
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-row>
          </v-container>
            <div class="">
              <v-flex justify-center>
                <v-btn color="teal" dark>
                  مشاهده بیشتر
                </v-btn>
            </v-flex>
            </div>
        </v-main>      
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'Home',
  components: {
    Sidebar
  },
  
  data() {
    return {
      page : 0,
      channels: [],
    }
  },

  computed:{
    // imagepath(address) {
    //   return 'http://86.106.142.11:40000/' + address
    // },

  },

  created() {
    this.$store.dispatch("getChannls" , this.page).then((res) => {
      this.channels = res.data.items
    });
  },

}
</script>

<style>

</style>