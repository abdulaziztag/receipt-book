<!--suppress ALL -->
<template>
  <div v-scroll="onScroll" id="f">
    <transition name="homeAnimation" mode="out-in">
      <div v-if="!loading" key="content">
        <swiper-app v-if="!loading3"></swiper-app>
        <v-container v-if="loading3">
          <v-layout
            fill-height
            align-center
            justify-center
          >
            <v-flex xs12 class="text-xs-center">
              <v-progress-circular
                indeterminate
                :size="90"
                :width="7"
                color="error"
              ></v-progress-circular>
            </v-flex>
          </v-layout>
        </v-container>
          <v-subheader class="display-2">Свежие рецепты</v-subheader>
        <v-container>
          <v-divider></v-divider>
        </v-container>
        <v-container wrap fill-height grid-list-lg>
          <v-layout wrap>
            <v-flex xs12 md6 lg4 xl3 v-for="receipt in receipts" :key="receipt.id">
              <v-card>
                <v-img
                  :src="receipt.imageSrc"
                  aspect-ratio="2"
                ></v-img>
                <v-card-title style="font-family: Calibri,serif; font-size: 25px">
                  {{ receipt.title }}
                </v-card-title>
                <v-card-actions>
                  <v-container grid-list-lg>
                    <v-layout wrap>
                      <v-spacer></v-spacer>
                      <v-flex class="text-xs-right" xs12 sm6>
                        <v-btn color="error" :to="'/receipt/' + receipt.id">Приготовление</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container key="loading" v-if="loading2">
          <v-layout
            fill-height
            align-center
            justify-center
          >
            <v-flex xs12 class="text-xs-center">
              <v-progress-circular
                indeterminate
                :size="90"
                :width="7"
                color="error"
              ></v-progress-circular>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container key="loading" v-if="!flag">
          <transition
            fill-height
            align-center
            justify-center
            tag="v-layout"
            name="homeAnimation"
            mode="out-in"
          >
            <v-flex xs12 class="text-xs-center" v-if="!isUserLoggedIn" key="first">
              Пока что все, войдите, чтобы добавьте рецепт
              <br>
              <v-btn outline color="success" to="/login">Войти</v-btn>
            </v-flex>
            <v-flex xs12 class="text-xs-center" v-else key="second">
              Пока что все, добавьте что-нибудь интересного
              <br>
              <v-btn outline color="success" to="/new">Добавить</v-btn>
            </v-flex>
          </transition>
        </v-container>
      </div>
      <v-container key="loading" v-else class="mt-5">
        <v-layout
          fill-height
          align-center
          justify-center
          class="mt-5"
        >
          <v-flex xs12 class="text-xs-center">
            <v-progress-circular
              indeterminate
              :size="200"
              :width="10"
              color="error"
            ></v-progress-circular>
          </v-flex>
        </v-layout>
      </v-container>
    </transition>
  </div>
</template>

<script>
  import swiper from './Receipts/swiper'

  export default {
    data () {
      return {
        counter: 0,
        scrolling: 0,
        windowH: 0
      }
    },
    computed: {
      receipts () {
        return this.$store.getters.receipts
      },
      loading () {
        return this.$store.getters.loading
      },
      loading2 () {
        return this.$store.getters.loading2
      },
      flag () {
        return this.$store.getters.flag
      },
      isUserLoggedIn () {
        return this.$store.getters.isUserLoggedIn
      },
      loading3 () {
        return this.$store.getters.loading3
      }
    },
    methods: {
      onScroll (e) {
        this.scrolling = document.getElementById('f').getBoundingClientRect().top
        this.windowH = document.getElementById('f').offsetHeight - window.innerHeight
        if (this.scrolling + this.windowH === 0 && this.loading2 === false) {
          this.$store.dispatch('loopDownload')
        }
      }
    },
    components: {
      swiperApp: swiper
    },
    name: 'Home'
  }
</script>

<style scoped>
  .homeAnimation-enter {
    opacity: 0;
  }
  .homeAnimation-enter-active {
    transition: opacity 1s;
  }
  .homeAnimation-enter-to {}
  .homeAnimation-leave {}
  .homeAnimation-leave-active {
    transition: opacity 1s;
  }
  .homeAnimation-leave-to {
    opacity: 1;
  }
</style>
