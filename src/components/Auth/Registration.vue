<template>
  <v-container grid-list-lg>
    <v-layout wrap fill-height align-center justify-center>
      <v-flex xs12 md6>
        <p class="display-2" style="text-align: center">Регистрируясь вы получите...</p>
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
        <h1 class="h1">Регистрация</h1>
        <v-text-field
          prepend-icon="person"
          v-model="email"
          type="email"
          label="Адрес эл. почты*"
          color="success"
        ></v-text-field>
        <v-text-field
          prepend-icon="lock"
          v-model="password"
          type="password"
          label="Пароль*"
          color="success"
        ></v-text-field>
        <v-text-field
          prepend-icon="lock"
          v-model="passworddbl"
          type="password"
          label="Повторите пароль*"
          color="success"
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :loading="loading"
            :disabled="loading"
            @click="onSubmit"
            color="success"
            align="center"
          >Зарегистрироваться
          </v-btn>
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
          password: '',
          passworddbl: '',
          panelItems: [
            {
              title: 'Море знаний и опыта',
              text: 'Регистрируясь вы получите новые рецепты из кулинарии разных наций'
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
        }
      },
      methods: {
        onSubmit () {
          const user = {
            email: this.email,
            password: this.password
          }
          this.$store.dispatch('registerUser', user)
            .then(() => {
              this.$router.push('/')
            })
            .catch(() => {})
        }
      },
      name: 'Registration'
    }
</script>

<style scoped>
  .h1 {
    font-family: Calibri,serif;
    font-size: 35px;
    font-weight: lighter;
  }
  .text {
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    color: white;
  }
</style>
