<template>
  <v-app id="inspire">
    <Sidebar/>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="teal" dark flat>
                <v-toolbar-title>ورود به سایت</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="ایمیل"
                    v-model="email"
                    prepend-icon="mdi-email"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="رمز عبور"
                    v-model="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="teal" text @click="register">ثبت نام</v-btn>
                <v-btn color="teal" class="vbtn" :loading="loading" @click="login">ورود</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'Login',
  components: {
    Sidebar
  },

  data() {
    return {
      email: null,
      password: null,
      loading: false,
    };
  },
  props: {
    source: String,
  },
  methods: {
    login() {
      this.loading = true;
      let data = {
        email: this.email,
        password: this.password,
      };
      this.$store
        .dispatch("loginUser", data)
        .then((response) => {
          if(response.data.message){
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
            }
            else{
                this.$router.push("/");
                console.log(response)
            }

        })
        .catch(() => {
          this.$fire({
            title: "خطا !",
            text: "خطایی رخ داده است. پس از مدتی مجددا امتحان کنید.",
            type: "error",
            confirmButtonText: "دوباره تلاش می‌کنم",
            timer: 3000,
          }).then((r) => {
            console.log(r.value);
          });
          this.loading = false;
        });
    },
    register() {
      this.$router.push({ name: "Register" });
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