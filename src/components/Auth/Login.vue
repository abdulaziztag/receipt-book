<template>
  <v-container grid-list-lg>
    <v-layout wrap fill-height align-center justify-center>
      <v-flex xs12 md6>
        <p class="display-2" style="text-align: center">Войдя вы получите...</p>
        <v-container>
          <v-expansion-panel dark popout>
            <v-expansion-panel-content
              v-for="(item,i) in panelItems"
              :key="i.item"
              style="background: #FFC107"
            >
              <div slot="header" class="text">{{ item.title }}</div>
              <v-divider></v-divider>
              <v-card>
                <v-card-text class="text">{{ item.text }}</v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-container>
      </v-flex>
      <v-flex xs12 sm8 md6>
        <h1 class="h1">Войти</h1>
          <v-form v-model="valid" ref="form">
            <v-text-field
              v-model="email"
              type="email"
              prepend-icon="person"
              label="Адрес эл. почты*"
              color="success"
              :rules="emailRules"
            ></v-text-field>
            <v-layout style="margin-left: 1px;">
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Пароль"
                :type="passIcon ? 'password' : 'text'"
                :counter="6"
                color="success"
                :rules="passwordRules"
                v-model="password"
              ></v-text-field>
              <v-btn
                @click="passIcon = !passIcon"
                flat
                icon
              >
                <transition
                  name="icon-anim"
                  mode="out-in"
                >
                  <v-icon
                    v-if="passIcon"
                    key="first"
                  >mdi-eye</v-icon>
                  <v-icon
                    v-else
                    key="second"
                  >mdi-eye-off</v-icon>
                </transition>
              </v-btn>
            </v-layout>
          </v-form>
        <v-card-actions>
          <v-btn
            color="warning"
            to="/registration"
          >Регистрация</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            :loading="loading"
            @click="onSubmit"
            :disabled="!valid || loading"
          >Войти</v-btn>
        </v-card-actions>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        passIcon: true,
        password: '',
        valid: false,
        emailRules: [
          v => !!v || 'Введите адрес',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Неправильный вид адреса'
        ],
        passwordRules: [
          v => !!v || 'Введите пароль',
          v => (v && v.length >= 6) || 'Пароль должен быть не меньше 6 символов'
        ],
        panelItems: [
          {
            title: 'Море знаний и опыта',
            text: 'Войдя вы получите новые рецепты из кулинарии разных наций'
          },
          {
            title: 'Доступ',
            text: 'Вы получите полный доступ ко всем рецептам сайта'
          },
          {
            title: 'Любовь и уважение',
            text: 'Нередко говорят, что еда это ключ к сердцу мужчин. Приготовьте любимому человеку достойную еду'
          },
          {
            title: 'Деление опытом',
            text: 'Поделиться это хорошо. Делитесь опытом с другими, опубликуя новые рецепты'
          }
        ]
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      isUserLoggedIn () {
        return this.$store.getters.isUserLoggedIn
      }
    },
    methods: {
      onSubmit () {
        if (this.$refs.form.validate()) {
          const user = {
            email: this.email,
            password: this.password
          }
          this.$store.dispatch('loginUser', user)
            .then(() => {
              this.$router.push('/')
            })
            .catch(() => {
            })
        }
      }
    },
    created () {
      if (this.$route.query['loginError']) {
        this.$store.dispatch('setError', 'Войдите в систему или зарегистрируйтесь, чтобы продолжить')
      }
      if (this.isUserLoggedIn) {
        this.$router.push('/')
      }
    },
    name: 'Login'
  }
</script>

<style scoped>
  .h1 {
    font-family: Calibri,serif;
    font-size: 35px;
    font-weight: lighter;
  }
  .icon-anim-leave-active {
    animation: icon-animation 0.3s forwards;
  }
  @keyframes icon-animation {
    from {
      transform: rotateZ(0);
      opacity: 1;
    }
    to {
      transform: rotateZ(45deg);
      opacity: 0;
    }
  }
  .icon-anim-enter-active {
    animation: icon-animation-enter 0.3s forwards;
  }
  @keyframes icon-animation-enter {
    from {
      transform: rotateZ(45deg);
      opacity: 0;
    }
    to {
      transform: rotateZ(0);
      opacity: 1;
    }
  }
  .text {
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    color: white;
  }
</style>
