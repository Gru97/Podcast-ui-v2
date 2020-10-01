<template>
  <div>
    <Sidebar></Sidebar>
    <v-main>
      <v-container>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <v-card class="mx-auto card-style pb-6" outlined>
          <v-list-item class=" mx-10">
            <v-list-item-content>
              <v-list-item-title class="headline mb-12 mr-7">
                <span>
                  <span>
                    <img :src="musicSrc" width="40" height="40" class="mt-10" />
                  </span>
                  <span class="pb-5 ">
                    {{ album.name }}
                  </span>
                </span>
              </v-list-item-title>
              <v-list-item-subtitle class="mt-5">
                <v-icon color="#FF1493" left>mdi-group</v-icon>
                {{ album.category }} 
              </v-list-item-subtitle>
              <v-list-item-subtitle class="mt-3">
                <v-icon color="#FF1493" left>mdi-information-outline</v-icon>
                توضیحات :
                {{ album.description }}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="mt-3">
                <v-icon color="#FF1493" left> mdi-account-alert</v-icon>
                گره سنی :
                {{ album.ageGroup }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar
              class="rounded-xl mt-12"
              size="300"
              rounded="true"
              color="grey"
              
            >
              <v-img
                height="300"
                width="300"
                style="border-radius: 12px"
                :src="imagepath(this.album.imageUrl)"
                :lazy-src="imagepath(this.album.imageUrl)"
                
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="#FF1493"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-list-item-avatar>
          </v-list-item>
          <v-card-action class="mr-10 ">
            <span text rounded @click="like()">
              <v-icon class="dynamic" color="gray" large>mdi-heart</v-icon>
              {{ album.likes }}
            </span>
            <span text rounded class="mr-5">
              <v-icon color="gray" >mdi-eye</v-icon> {{ album.views }}
            </span>
            <span text rounded class="mr-5">
              <v-icon color="gray" >mdi-calendar</v-icon> {{ album.createdAt }} 99/7/6
            </span>
            <v-spacer></v-spacer>
          </v-card-action>
        </v-card>
        <div style="text-align:center;" class="mt-7">
          <NewPodcast :currentAlbumID="albumlId"/>
          </div>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import NewPodcast from "@/views/Podcast/NewPodcast.vue";
export default {
  name: "albumDetail",
  components: {
    Sidebar,
    NewPodcast
  },
  data() {
    return {
      albumlId: null,
      album: null,
      musicSrc: require("@/assets/images/music.png"),
      liked: false,
    };
  },
  created() {
    this.albumlId = this.$route.params.id;
    this.$store.dispatch("GET_ALBUM_DETAIL", this.albumlId).then((res) => {
      this.album = res.data;

      
    });
  },

  methods: {
    imagepath(address) {
      return "http://86.106.142.11:40000/" + address;
    },
    like() {
      if (!this.liked) {
        this.album.likes++;
        document.querySelector(".dynamic").style.color = "red";
        this.liked = true;
      } else {
        this.album.likes--;
        document.querySelector(".dynamic").style.color = "gray";
        this.liked = false;
      }
    },
  },
};
</script>

<style scoped>
.image {
  background-color: cadetblue;
  width: 200px;
  height: 200px;
}
.content-image {
  margin-top: 50px;
  padding-top: 10px;
}
.content-albun {
  background-color: chartreuse;
  width: 90%;
}
.btn-content {
  margin-right: 100px;
  margin-top: 30px;
  text-align: center;
  width: 150px;
  height: 30px;
}
.card-style {
  border: 4px solid #4B0082;
  border-radius: 20px;
  width: 90%;
}
</style>>

