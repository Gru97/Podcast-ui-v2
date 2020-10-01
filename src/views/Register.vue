<template>
  <v-app id="inspire">
    <Sidebar />
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-card class="elevation-12 mx-auto" width="50%" outlined>
            <v-toolbar  dark >
              <template v-slot:img="{ props }">
                <v-img
                  v-bind="props"
                  gradient="to top right, #4B0082, #FF1493"
                ></v-img>
              </template>
              <v-toolbar-title>عضویت در سایت</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-list-item two-line>
              <v-list-item-content class="mx-10">
                <v-form>
                  <v-text-field
                    label="آدرس ایمیل"
                    v-model="email"
                    prepend-icon="mdi-email"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    label="نام کاربری"
                    v-model="username"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    label="رمز عبور"
                    v-model="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                  <v-text-field
                    label="تکرار رمز عبور"
                    v-model="confirmPassword"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-list-item-content>
              <v-list-item-avatar tile size="250" color="grey">
                <v-img
                  height="300"
                  width="300"
                  :src="img"
                ></v-img>
              </v-list-item-avatar>
            </v-list-item>
            <v-card-text> </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
             
              <v-btn
                color="#FF1493"
                class="vbtn"
                :loading="loading"
                @click="register"
              >
                <v-icon left>mdi-account-check</v-icon>ثبت نام</v-btn
              >
               <v-btn color="#FF1493" text @click="login">ورود</v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "Register",
  components: {
    Sidebar,
  },

  data() {
    return {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      loading: false,
      img: require("@/assets/images/logoo.png"),

    };
  },
  methods: {
    login() {
      this.$router.push({ name: "Login" });
    },
    register() {
      this.loading = true;
      let data = {
        email: this.email,
        username: this.username,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };
      this.$store
        .dispatch("registerUser", data)
        .then((response) => {
          if (response.data.message) {
            this.$fire({
              title: "خطا !",
              text: response.data.message,
              type: "error",
              confirmButtonText: "دوباره تلاش می‌کنم",
              timer: 3000,
            }).then((r) => {
              console.log(r.value);
            });
            this.loading = false;
          } else {
            this.$fire({
              title: "ثبت نام انجام شد",
              text: "برای ورود ایمیل و رمز عبور خود را وارد نمایید",
              type: "success",
              confirmButtonText: "باشه",
            }).then((r) => {
              console.log(r.value);
            });
            this.$router.push("login");
          }
        })

        .catch(() => {
          this.$fire({
            title: "خطا !",
            text: "خطایی رخ داده است. پس از مدتی مجددا امتحان کنید..",
            type: "error",
            confirmButtonText: "دوباره تلاش می‌کنم",
          }).then((r) => {
            console.log(r.value);
          });
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.v-input .v-input__prepend-outer .v-input__icon .theme--light.v-icon {
  color: rgba(0, 0, 0, 0.54) !important;
}
.v-toolbar__title {
  color: #fff !important;
}
.vbtn {
  color: #fff !important;
}
</style>