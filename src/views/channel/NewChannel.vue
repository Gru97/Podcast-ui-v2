<template>
    <div>
        <Sidebar/>
        <v-main>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>ایجاد کانال جدید</v-card-title>
              <v-form>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="7">
                      <v-text-field
                        label="نام کانال"
                        prepend-icon="mdi-folder-open"
                        v-model="name"
                        require
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="7">
                      <v-file-input
                        accept="image/png, image/jpeg, image/bmp"
                        placeholder="انتخاب فایل"
                        prepend-icon="mdi-camera"
                        v-model="image"
                        require
                        @change="handleImage(image)"
                      ></v-file-input>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="7">
                      <v-textarea
                        label="توضیحات"
                        prepend-icon="mdi-comment"
                        v-model="description"
                        require
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-btn
                        class="float-lg-left"
                        style="color: #fff;"
                        color="#EF5554"
                        @click="addChannel"
                        :loading="loading"
                      >ثبت</v-btn>
                      
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
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
      loading: false,
      name: null,
      description: null,
      imageFile: null,
      image: null
    }
  },

  methods: {
    handleImage(file){
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        let fileInfo = {
          name: file.name,
          base64: reader.result,
        }
        this.imageFile = fileInfo.base64
      }
    },
    addChannel() {
      this.loading = true;
      let channelInfo = {
        name : this.name,
        description : this.description,
        imageFile : this.imageFile
       }
      this.$store.dispatch("addChannel", channelInfo)
      .then(() => {
        this.$fire({
          title: "کانال با موفقیت ساخته شد...",
          type: "success",
          confirmButtonText: "باشه",
        })
        this.$router.push({ name: "ChannelsList" });
      })
      .catch(() => {
        this.$fire({
          title: "خطا !",
          text: "مشکلی رخ داده است. مجددا امتحان کنید...",
          type: "error",
          confirmButtonText: "دوباره تلاش می‌کنم",
        })
        this.loading = false;
      });
    },
  },
}
</script>