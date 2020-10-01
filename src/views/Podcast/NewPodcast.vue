<template>
  <div>
    <v-btn color="#FF1493" class="white--text" rounded @click="callModal()" large>
      <v-icon left large>mdi-cloud-upload</v-icon> ...آپلود فایل جدید...</v-btn
    >
    <v-dialog v-model="showDialog" width="80%">
      <v-card class="card-style" style="overflow: hidden">
        <v-row class="mt-5 mx-10">
          <div style="color: #FF1493" class="mt-5">
            شما میتوانید درکنار فایل صوتی خود،جزییات دیگری هم ذخیره کنید.(پرکردن
            این فیلدها اختیاریست)
          </div>
        </v-row>
        <v-row style="text-align: center" class="mt-8">
          <v-col cols="1"></v-col>
          <v-col cols="7">
            <v-row>
              <v-text-field
                prepend-icon="mdi-bookmark-music"
                v-model="name"
                label="  عنوان فایل صوتی"
              ></v-text-field
            ></v-row>
          </v-col>
          <v-col cols="3">
            <v-row
              ><v-checkbox
                v-model="enabledPodcaster"
                hide-details
                class="shrink mr-2 mt-0"
                color="#FF1493"
              ></v-checkbox>
              <v-text-field
                label=" خواننده/گوینده"
                v-model="podcaster"
                :disabled="!enabledPodcaster"
              ></v-text-field
            ></v-row>
          </v-col>
        </v-row>
        <v-row style="text-align: center">
          <v-col cols="1"></v-col>
          <v-col cols="7">
            <v-row>
              <v-checkbox
                v-model="enableDescription"
                hide-details
                class="shrink mr-2 mt-0"
                color="#FF1493"
              ></v-checkbox>
              <v-textarea
                v-model="description"
                filled:true
                outlined
                lable="توضیحات"
                Rounded:true
                placeholder="در صورت تمایل میتوانید توضیح مختصری درباره فایل خود یادداشت کنید"
                shaped:true
                :disabled="!enableDescription"
              ></v-textarea
            ></v-row>
          </v-col>
          <v-col cols="1"></v-col>
          <v-col cols="2" style="text-align: center">
            <ul class="ks-cboxtags">
              <li>
                <input
                  type="checkbox"
                  id="checkboxOne"
                  value=""
                /><label for="checkboxOne">قابلیت دانلود </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="checkboxTwo"
                  value=""
                  checked
                /><label for="checkboxTwo">دسترسی رایگان</label>
              </li>
            </ul>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4"></v-col>
          <v-col cols="6">
            <div class="dropzone">
              <p v-if="!uploaded" class="p-dd">Drag & Drop File Here !</p>
              <p
                v-if="uploaded"
                style="outline: 2px dot gray"
                class="p-dd pt-12"
              >
                {{ this.file.name }}
              </p>

              <input
                type="file"
                accept=".mp3"
                class="input-file"
                @change="selectFile()"
                ref="file"
              />
            </div>
          </v-col>
          <v-col cols="2"></v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn
              class="white--text"
              width="250px"
              color="blue"
              @click="sendFile()"
              >ثبت</v-btn
            >
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
//import axios from "axios";
export default {
  name: "NewPodcast",
  data() {
    return {
      showDialog: false,
      enabledName: false,
      enabledPodcaster: false,
      enableDescription: false,
      uploadingfileName: "",
      uploaded: false,
      name: null,
      description: null,
      podcaster: null,
      audioFile:null,
      loading: false,
    };
  },
  props: ["currentAlbumID"],
  created() {
    // alert(this.currentAlbumID)
  },

  methods: {
    sendFile() {
      this.loading = true;

      let currentUploadingFile = {
        name: this.name != null ? this.name : this.uploadingfileName,
        description: this.description,
        imageFile: "null",
        tags: ["aa", "vv"],
        topics: ["aa", "vv"],
        podcaster: this.podcaster,
        streamOnly: true,
        freeAccess: true,
        ageGroup: 0,
        albumId: this.currentAlbumID,
      };

      //Url: /api/podcast
      /* axios
        .post("http://86.106.142.11:40000/api/podcast", currentUploadingFile)
        .then((res) => {
          console.log("res.data : " + res.data);

          
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });  */

      this.$store
        .dispatch("ADD_PODCAST", currentUploadingFile)
        .then((/*res*/) => {
          //call function-streemFile()
         /* this.handleFile()  */
          //mk new obj & dispatch("_UPLOAD_FILE") for Url:"api/podcast/upload"
           
             /* let currentFileInfo={
                 id:res.data,
                 audioFile:this.audioFile,
                 category:0
                }
*/
              //call action from store
              //......

        })
        .catch(() => {

        });
    },

    selectFile() {
      this.file = null;
      this.file = this.$refs.file.files[0];
      this.uploadingfileName = this.file.name;
      this.uploaded = true;
    },

     handleFile() {
      let reader = new FileReader();
      let file=this.$refs.file.files[0]
      reader.readAsDataURL(file);
      reader.onload = () => {
        let fileInfo = {
          name: file.name,
          base64: reader.result,
        };
        this.audioFile = fileInfo.base64;

      };
    },
    callModal() {
      this.showDialog = true;
    },
  },
};
</script>

<style scoped>
.card-style {
  border: 3px solid  #FF1493;
  text-align: center;
  height: initial;
}

ul.ks-cboxtags {
  list-style: none;
  padding: 20px;
}
ul.ks-cboxtags li {
  display: inline;
}
ul.ks-cboxtags li label {
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(139, 139, 139, 0.3);
  color: #adadad;
  border-radius: 25px;
  white-space: nowrap;
  margin: 3px 0px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.2s;
}

ul.ks-cboxtags li label {
  padding: 8px 12px;
  cursor: pointer;
}

ul.ks-cboxtags li label::before {
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  font-size: 12px;
  padding: 2px 6px 2px 2px;
  content: "\f067";
  transition: transform 0.3s ease-in-out;
}

ul.ks-cboxtags li input[type="checkbox"]:checked + label::before {
  content: "\f00c";
  transform: rotate(-360deg);
  transition: transform 0.3s ease-in-out;
}

ul.ks-cboxtags li input[type="checkbox"]:checked + label {
  border: 3px solid #FF1493;
  background-color:#FFC0CB;
  color:  #FF1493;
  transition: all 0.2s;
}

ul.ks-cboxtags li input[type="checkbox"] {
  display: absolute;
}
ul.ks-cboxtags li input[type="checkbox"] {
  position: absolute;
  opacity: 0;
}
ul.ks-cboxtags li input[type="checkbox"]:focus + label {
  border: 2px solid #e9a1ff;
}

.dropzone {
  height: 200px;
  width: 450px;
  background-color: #FFC0CB;
  cursor: pointer;
  padding: 10px 10px;
  outline: 6px dashed #FF1493;
  outline-offset: -10px;
}
.input-file {
  position: relative;
  height: 145px;
  width: 100%;
  opacity: 0;
  cursor: pointer;
  margin-right: 0px;
  padding-top: 0px;
}
.dropzone .p-dd {
  text-align: center;
  padding-top: 10px;
  padding-bottom: 0px;
  margin-bottom: 0px;
}
</style>