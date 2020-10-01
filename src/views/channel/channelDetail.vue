<template>
  <div>
    <Sidebar></Sidebar>
    <v-main>
      <v-container class="text-center">
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <v-card class="mx-auto card-style" outlined>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-10">
                <span>
                  <span>
                    <img :src="musicSrc" width="40" height="40" class="mt-10" />
                  </span>
                  <span class="pb-5">
                    {{ channel.name }}
                  </span>
                </span>
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-icon color="#FF1493" left>mdi-human-greeting</v-icon>
                {{ channel.followers }} دنبال کننده
              </v-list-item-subtitle>
              <v-list-item-subtitle>{{
                channel.description
              }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar
              class="rounded-xl"
              size="300"
              rounded="true"
              color="grey"
            >
              <v-img
                height="300"
                width="300"
                style="border-radius: 12px"
                :src="imagepath(channel.imageUrl)"
                :lazy-src="imagepath(channel.imageUrl)"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="red"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-list-item-avatar>
          </v-list-item>
          <v-card-actions>
            <v-btn
              small
              color="#FF1493"
              rounded
              class="white--text"
              @click="createNewAlbum(channel.id)"
            >
              <v-icon color="white" left>mdi-plus-circle-outline</v-icon>آلبوم
              جدید
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>

    <div class="content-album">
      <AlbumsList :currentAlbum="channel.albums"></AlbumsList>
    </div>
    <div style="text-align: center" class="mb-12">
      <v-btn
        class="btn-content"
        color="#4B0082"
        rounded
        outlined
        block
        @click="createNewAlbum(channel.id)"
      >
        <v-icon color="#4B0082" left>mdi-plus-circle-outline</v-icon>آلبوم جدید
      </v-btn>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import AlbumsList from "@/views/Album/albumsList.vue";
export default {
  name: "channelDetail",
  components: {
    Sidebar,
    AlbumsList,
  },
  data() {
    return {
      channelId: null,
      channel: null,
      albumList: [],
      musicSrc: require("@/assets/images/music.png"),
    };
  },
  created() {
    this.channelId = this.$route.params.id;
    this.$store.dispatch("getChannelDetail", this.channelId).then((res) => {
      this.channel = res.data;
    });
  },
  methods: {
    createNewAlbum(channelID) {
      this.$router.push({ name: "NewAlbum", params: { cid: channelID } });
    },

    imagepath(address) {
      return "http://86.106.142.11:40000/" + address;
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

