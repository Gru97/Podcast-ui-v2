<template>
  <div>
    <v-main>
      <v-container>
        <v-flex d-flex>
          <v-layout wrap>
            <v-flex md4 v-for="item in currentAlbum" :key="item.id" class="mb-5">
              <v-card class="mx-8 mb-5" max-width="400">
                <v-img
                  class="white--text align-end"
                  height="200px"
                  src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                ></v-img>

                <v-card-text class="pb-0">item-name</v-card-text>

                <v-card-subtitle class="text--primary">
                  <div>*****</div>
                  <div>{{item.description}}</div>
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn color="#EF5554" text>مشاهده</v-btn>

                  <v-btn color="#EF5554" text >حذف</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  name: "AlbumsList",
  components: {},
  props: {
    currentAlbum: [],
  },

  data() {
    return {
      page: 0,
    };
  },

  created() {
    // this.Albums=this.channel.albums
    // console.log("this album is :"+this.Albums)
  },
};
</script>

<style>
</style>