<template>
  <div>
    <Sidebar />

    <v-main>
      <v-container style="padding-top: 50px">
        <v-form v-model="valid">
          <v-card width="100%" class="card-style">
            <v-card-title style="color: #4B0082"
              >مدیریت / ویرایش کانال
            </v-card-title>
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="8">
                    <v-text-field
                      label="    عنوان کانال  "
                      prepend-icon="mdi-bookmark-check"
                      v-model="name"
                      required
                      :rules="Rules"
                      outlined
                    ></v-text-field>

                    <v-textarea
                      style="padding-top: 50px"
                      filled:true
                      prepend-icon="mdi-information"
                      outlined
                      lable="توضیحات"
                      Rounded:true
                      placeholder="توضیحات"
                      shaped:true
                      v-model="description"
                    ></v-textarea>
                  </v-col>

                  <v-col cols="3">
                    <v-row>
                      <v-file-input
                        id="fileInput"
                        accept="image/*"
                        v-model="image"
                        placeholder="انتخاب تصویر"
                        multiple
                        prepend-icon="mdi-camera"
                        @change="handleImage(image)"
                        require
                        :rules="Rules"
                      >
                        <template v-slot:selection="{ text }">
                          <v-chip label color="#EF5554" outlined>
                            <v-icon left color="#EF5554">mdi-star</v-icon>
                            {{ text }}
                          </v-chip>
                        </template>
                      </v-file-input>
                    </v-row>
                    <v-row></v-row>
                    <img
                      v-bind:src="previewSrc"
                      width="270"
                      height="270"
                      style="position: absolute; cursor: pointer"
                      v-on:click="callFile"
                    />
                  </v-col>
                </v-row>
                <v-row style="height: 60px"></v-row>
                <v-row class="pt-12">
                  <v-col cols="12">
                    <v-btn
                      class="float-lg-left white--text"
                      color="#FF1493"
                      @click="addChannel()"
                      :loading="loading"
                      rounded
                      x-large
                    >
                      <v-icon color="white" left class="row-submit-btn"
                        >mdi-check-circle-outline</v-icon
                      >ثبت
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-form>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "NewChannel",
  components: {
    Sidebar,
  },

  data() {
    return {
      loading: false,
      name: null,
      description: null,
      imageFile: null,
      image: null,
      previewSrc: require("@/assets/images/album.png"),

      //validations:
      valid: false,
      Rules: [(v) => !!v || "این فیلد الزامیست!"],
    };
  },

  methods: {
    addChannel() {
      this.loading = true;
      let channelInfo = {
        name: this.name,
        description: this.description,
        imageFile: this.imageFile,
      };
      this.$store
        .dispatch("addChannel", channelInfo)
        .then(() => {
          this.$fire({
            title: "کانال با موفقیت ساخته شد...",
            type: "success",
            confirmButtonText: "باشه",
          });
          this.$router.push({ name: "ChannelsList" });
        })
        .catch(() => {
          this.$fire({
            title: "خطا !",
            text: "مشکلی رخ داده است. مجددا امتحان کنید...",
            type: "error",
            confirmButtonText: "دوباره تلاش می‌کنم",
          });
          this.loading = false;
        });
    },

    handleImage(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        let fileInfo = {
          name: file.name,
          base64: reader.result,
        };
        this.imageFile = fileInfo.base64;

        //preview pic:
        this.previewSrc = URL.createObjectURL(file[0]);
      };
    },
    callFile() {
      document.getElementById("fileInput").click();
    },
  },
};
</script>

<style scoped>
.card-style {
  border: 4px solid #FF1493;
  border-radius: 20px;
  width: 90%;
}
</style>