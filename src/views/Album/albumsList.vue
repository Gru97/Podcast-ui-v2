<template>
  <div>
    <v-main>
      <v-container>
        
        <v-flex d-flex>
          <v-layout wrap>
            <v-flex md4 v-for="item in currentAlbum" :key="item.id" class="mb-5">
              <v-card class="mx-8 mb-5" max-width="400">
                <v-img
                  height="200"
                  
                  :src="imagePath(item.imageUrl)"
                  :lazy-src="imagePath(item.imageUrl)"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>

                <v-card-text class="pb-0">item-name</v-card-text>

                <v-card-subtitle class="text--primary">
                  <div>*****</div>
                  <div>{{item.description}}</div>
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn color="#EF5554" text @click="albumDetail(item.id)">مشاهده</v-btn>

                  <v-btn color="#EF5554" text @click="deleteAlbum(item.id)" >حذف</v-btn>
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
    currentAlbum: null,
  },

  data() {
    return {
      page: 0,
    };
  },

  created() {
   
  },
  methods:{
    albumDetail(id){
      this.$router.push({ name: "albumDetail", params: { id: id } });
    },
     imagePath(path){
        return 'http://86.106.142.11:40000/'+ path
    }
    ,
    deleteAlbum(id){
       this.$store.dispatch("DELETE_ALBUM",id)
      .then(() => {
        this.$fire({
          title: "کانال با موفقیت حذف شد...",
          type: "success",
          confirmButtonText: "باشه",
        })
        //delete album from the list displaying
        var  index = this.currentAlbum.findIndex(item => item.id == id)
      this.currentAlbum.splice(index,1)

      })
      .catch(() => {
        this.$fire({
          title: "خطا !",
          text: "مشکلی رخ داده است. مجددا امتحان کنید...",
          type: "error",
          confirmButtonText: "دوباره تلاش می‌کنم",
        })
       // this.loading = false;
      });
    },
    
    
    },


   
  
};
</script>

<style>
</style>