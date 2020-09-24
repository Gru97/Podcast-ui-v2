<template>
  <div>
    <Sidebar></Sidebar>
    <v-main>
      <v-container class="text-center"> 
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <v-card class="mx-auto" max-width="800" outlined>
          <v-list-item two-line>
            <v-list-item-content>
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
              <v-list-item-subtitle>{{channel.description}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="200" color="grey">
              <v-img
                height="200"
                width="200"
                src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
              ></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      
      <v-btn class="btn-content" color="#EF5554" rounded outlined 
      @click="createNewAlbum(channel.id)"
       >
        <v-icon color="#EF5554" left>mdi-plus-circle-outline</v-icon>آلبوم جدید
      </v-btn>
      </v-container>
    </v-main>
   
    <v-div class="content-album">
      <AlbumsList :currentAlbum="channel.albums"></AlbumsList>
    </v-div>
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
  width: 400px;
  height: 50px;
}
</style>>

