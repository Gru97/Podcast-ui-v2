<template>
  <div>
    <Sidebar />
    <v-main>
      <v-container>
        <v-form v-model="valid">
          <v-row>
            <v-col>
              <v-card>
                <v-card-title style="color:#EF5554;">مدیریت / ویرایش آلبوم</v-card-title>
                <v-form>
                  <v-container>
                    <v-row>
                      <v-col cols="8">
                        <v-text-field
                          label="  عنوان  "
                          prepend-icon="mdi-bookmark-check"
                          v-model="name"
                          required
                          :rules="Rules"
                          outlined
                        ></v-text-field>

                        <v-textarea
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
                      <v-col cols="1"></v-col>
                      <v-col cols="2">
                        <v-row>
                          <v-file-input
                            id="fileInput"
                            accept="image/*"
                            v-model="image"
                            placeholder="نمایه آلبوم"
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
                          width="150"
                          height="135"
                          style="position: absolute;cursor: pointer;"
                          v-on:click="callFile"
                        />
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="6"></v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="5">
                        <v-icon color="#EF5554" right>mdi-checkbox-multiple-marked-circle-outline</v-icon>
                        <v-select
                          :items="ages"
                          label="رده سنی"
                          item-text="name"
                          item-value="value"
                          v-model="ageGroup"
                          standard
                          required
                          :rules="Rules"
                        ></v-select>
                      </v-col>
                      <v-col cols="1"></v-col>
                      <v-col cols="5">
                        <v-icon color="#EF5554" right>mdi-checkbox-multiple-marked-circle-outline</v-icon>
                        <v-select
                          :items="categories"
                          item-text="name"
                          item-value="value"
                          v-model="category"
                          label="دسته بندی"
                          standard
                          required
                          :rules="Rules"
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row></v-row>

                    <v-row>
                      <v-col cols="7" class="col-input">
                        <v-text-field
                          label="  برچسب  "
                          v-model="currenttag"
                          id="tagInputText"
                          required
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="1" class="col-add-tag">
                        <v-btn small fab color="#EF5554" @click="addTag()">
                          <v-icon color="white">mdi-plus</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>

                    <v-row id="myTags" class="content-tags">
                      <ul>
                        <li v-for="(item , index) in this.tags" :key="index" :id="index">
                          <v-btn @click="deleteTag(index)" rounded color="#EF5554">
                            {{item}}
                            <v-icon right>mdi-close</v-icon>
                          </v-btn>
                        </li>
                      </ul>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-btn
                          class="float-lg-left white--text"
                          color="#EF5554"
                          @click="addAlbum"
                          :loading="loading"
                        >
                          <v-icon color="white" left>mdi-check-circle-outline</v-icon>ثبت
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "NewAlbum",
  components: {
    Sidebar,
  },

  data() {
    return {
      channelId: null,
      loading: false,
      name: null,
      description: null,
      imageFile: null,
      image: null,
      ageGroup: null,
      ages: [
        {
          value: 1,
          name: "جوان",
        },
        {
          value: 2,
          name: " بزرگسال",
        },
        {
          value: 3,
          name: " میانسال ",
        },
      ],
      category: null,
      categories: [
        { value: 2, name: "کتاب صوتی" },
        { value: 3, name: "موسیقی" },
        { value: 1, name: "پادکست" },
        { value: 4, name: "تصویر" },
      ],
      currenttag: null,
      tags: [],
      previewSrc: require("@/assets/images/album.png"),

      //validations:
      valid: false,
      Rules: [
        (v) => !!v || "این فیلد الزامیست!",
      ],
    };
  },
  created() {
    this.channelId = this.$route.params.cid;
  },
  methods: {
    addTag() {
      var t = document.getElementById("tagInputText").value;
      if (t) {
        this.tags.push(t);
        this.currenttag = "";
      }
    },

    deleteTag: function (id) {
      this.tags.splice(id, 1);
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
    addAlbum() {
      this.loading = true;
      let albumInfo = {
        channelId: this.channelId,
        name: this.name,
        description: this.description,
        category: this.category,
        tags: this.tags,
        ageGroup: this.ageGroup,
        imageFile: this.imageFile,
        //free access ?!
        freeAccess: true,
      };
      console.log("Album info is:");
      console.log(albumInfo);
      this.$store
        .dispatch("ADD_ALBUM", albumInfo)
        .then(() => {
          this.$fire({
            title: "آلبوم با موفقیت ساخته شد...",
            type: "success",
            confirmButtonText: " (:  باشه",
          });
          this.$router.push({
            name: "channelDetail",
            params: { id: this.channelId },
          });
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
  },
};
</script>
<style>
.col-add-tag {
  text-align: right;
  padding-top: 35px;
  padding-left: 0px;
  padding-right: 0px;
  margin: 0px;
}
.col-input {
  padding-top: 30px;
  margin-right: 220px;
}
.content-tags {
  margin-right: 150px;
  margin-top: 0px;
  width: 70%;
}
li {
  display: inline-block;
}
</style>