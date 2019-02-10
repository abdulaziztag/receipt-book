<template>
  <v-app class="background" v-touch="swipe">
    <v-navigation-drawer color="red" temporary app v-model="drawer">
      <img src="@/images/drawerimg.jpg" style=" width: 100%">
      <v-container v-if="isUserLoggedIn">
        <v-menu
          offset-y
          color="red"
          origin="top right 0"
          transition="scale-transition"
        >
          <v-text-field
            slot="activator"
            box
            color="error"
            append-icon="search"
            style="width: 265px;"
            v-model="mod"
          ></v-text-field>
          <v-list>
            <v-list-tile
              @click=""
              v-for="name in findel"
              :key="findel.id"
            >
                <img src='@/images/drawerimg.jpg' height="40px" style="border-radius: 100%" width="40px">
              <v-list-tile-content
                style="
                  font-family: Calibri,serif;
                  font-size: 20px"
                class="mt-3 ml-3"
              >
                  <p>{{ name }}</p>
              </v-list-tile-content>
              <v-spacer></v-spacer>
              <v-btn icon large>
                <v-icon flat color="error" large>keyboard_arrow_right</v-icon>
              </v-btn>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-divider v-if="isUserLoggedIn"></v-divider>
      </v-container>
      <v-list>
        <v-list-tile
          ripple
          @click="drawer = false"
          v-for="link in links"
          :to="link.url"
          :key="link.id"
        >
          <v-list-tile-action>
            <v-icon left>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content
            style="
                  font-family: Calibri,serif;
                  font-size: 20px"
          >
            {{ link.title }}
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group
          v-if="!isUserLoggedIn"
          prepend-icon="account_circle"
        >
          <v-list-tile slot="activator">
            <v-list-tile-content
              ripple
              style="
                  font-family: Calibri,serif;
                  font-size: 20px"
            >
              Аккаунт
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/login" ripple>
            <v-list-tile-action></v-list-tile-action>
            <v-list-tile-content
              style="
                  font-family: Calibri,serif;
                  font-size: 20px"
            >
              Войти
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/registration" ripple>
            <v-list-tile-action></v-list-tile-action>
            <v-list-tile-content
              ripple
              style="
                  font-family: Calibri,serif;
                  font-size: 20px"
            >
              Регистрация
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile @click="onLogout" v-if="isUserLoggedIn">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content
            style="
                  font-family: Calibri,serif;
                  font-size: 20px"
          >Выйти</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark app color="error">
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
      <router-link
        tag="v-toolbar-title"
        to="/"
        style="font-size: 25px;"
        class="pointer text">
        Receipt book
      </router-link>
      <v-spacer></v-spacer>
      <v-text-field
        solo
        v-if="isUserLoggedIn"
        color="error"
        light
        class="hidden-sm-and-down ml-5 mr-5 mt-2"
        height="10"
        label="Search"
        append-icon="search"
      >
      </v-text-field>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          flat
          v-for="link in links"
          :key="link.id"
          style="font-family: Calibri,serif"
          :to="link.url"
        >
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
        <v-menu
          v-model="menu"
          offset-y
          transition="fade-transition"
          origin="top right"
        >
          <v-btn flat slot="activator">
            <v-icon>person</v-icon>
            <v-icon>keyboard_arrow_down</v-icon>
          </v-btn>
          <v-card>
            <v-container>
              <v-card-actions>
                <v-btn v-if="!isUserLoggedIn" to="/login" color="error">Войти</v-btn>
                <v-btn v-if="!isUserLoggedIn" to="/registration" color="error">Регистрация</v-btn>
                <v-btn v-if="isUserLoggedIn" @click="onLogout" color="error"><v-icon>exit_to_app</v-icon>Выйти</v-btn>
              </v-card-actions>
            </v-container>
          </v-card>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <transition name="ma" mode="out-in">
        <router-view/>
      </transition>
    </v-content>
    <template v-if="error">
      <v-snackbar
        :timeout="5000"
        color="error"
        :multi-line="true"
        @input="closeError"
        :value="true"
        class="text"
      >
        {{ error }}
        <v-btn class="text6" flat dark color="white" @click.native="closeError">Закрыть</v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      menu: '',
      swipeDirection: 'None',
      mod: '',
      ss: ['qwefafafasfddafsarty', 'asdfg', 'zxcvb']
    }
  },
  computed: {
    links () {
      if (this.isUserLoggedIn) {
        return [
          {url: '/', icon: 'restaurant_menu', title: 'Рецепты'},
          {url: '/new', icon: 'add_box', title: 'Новый рецепт'}
        ]
      }
    },
    findel () {
      return this.ss.filter(name => {
        return name.indexOf(this.mod) !== -1
      })
    },
    error () {
      return this.$store.getters.error
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    },
    swipe (direction) {
      this.swipeDirection = direction
      if (this.swipeDirection === 'right') {
        this.drawer = true
      } else if (this.swipeDirection === 'left') {
        this.drawer = false
      }
    }
  },
  name: 'App'
}
</script>

<style scoped>
  .text {
    font-family: 'Roboto', sans-serif;
  font-size: 17px;
  }
  .text6 {
    font-family: 'Roboto', sans-serif;
    font-size: 10px;
  }
  .background {
    background-image: url("./images/background68.png");
  }
  .ma-enter {
    opacity: 0;
  }
  .ma-enter-active {
    animation: 0.5s mo-slide forwards;
    transition: opacity 0.5s;
  }
  .ma-leave-active {
    animation: 0.5s ma-slide forwards;
    transition: opacity 0.5s;
  }
  .ma-leave-to {
    opacity: 0;
  }
  @keyframes ma-slide {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-30px);
    }
  }
  @keyframes mo-slide {
    from {
      transform: translateY(-30px);
    }
    to {
      transform: translateY(0px);
    }
  }
  .pointer {
    cursor: pointer;
  }
</style>
