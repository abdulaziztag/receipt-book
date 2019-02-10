<template>
  <v-container grid-list-lg>
    <v-layout wrap>
      <v-flex xs12 md6>
        <v-form>
          <h1 class="h1">Добавить рецепт</h1>
          <p class="p">Делитесь своим исскуством с другими</p>
          <v-layout fill-height align-center justify-center wrap>
            <v-flex sm12 class="text-xs-center">
              <v-text-field v-model="rtitle" label="Название рецепта"></v-text-field>
            </v-flex>
            <v-flex sm12 class="text-xs-center">
              <v-btn color="info" flat outline @click="triggerUpload"><v-icon left>add</v-icon>Фото</v-btn>
              <input
                type="file"
                accept="image/*"
                style="display: none;"
                ref="fileInput"
                @change="onFileChange"
              >
            </v-flex>
          </v-layout>
          <v-card
            v-if="imageSrc"
            style="
              border-radius: 10px"
            class="mb-5"
          >
            <v-parallax
              :src="imageSrc"
              style="
                border-radius: 10px;"
            ></v-parallax>
          </v-card>
          <p class="p1" style="font-size: 25px">У каждого блюда свои особенные ингредиенты</p>
          <v-textarea v-model="ingred" outline label="Ингредиенты"></v-textarea>
          <v-alert :value="true" icon="new_releases" type="warning" dismissible transition="scale-transition">
            Пишите ингредиенты через запятую.
          </v-alert>
          <br>
          <p class="p1">Способы разные и каждый эффективен</p>
          <v-textarea v-model="meth" outline label="Способ приготовления">
          </v-textarea>
          <v-alert :value="true" icon="new_releases" type="warning" dismissible transition="scale-transition">
            Пункты разделяйте через запятую!
          </v-alert>
          <br>
          <p class="p1">Немного интересного нам не помешает</p>
          <v-textarea v-model="interest" label="Напишите немного о блюде))" outline></v-textarea>
          <v-btn
            color="success"
            @click="createReceipt"
            :disabled="loading"
            :loading="loading"
          >
            <v-icon left>add</v-icon>
            Добавить рецепт
          </v-btn>
        </v-form>
      </v-flex>
      <v-flex xs12 md6>
        <flex-carousel></flex-carousel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import flexCarousel from './flexCarousel'

  export default {
    data () {
      return {
        interest: '',
        meth: '',
        rtitle: '',
        ingred: '',
        image: null,
        imageSrc: ''
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      createReceipt () {
        const ing = this.ingred.split(',')
        const method = this.meth.split(',')
        const receipt = {
          title: this.rtitle,
          ingred: ing,
          interest: method,
          meth: this.interest,
          image: this.image
        }

        this.$store.dispatch('createReceipt', receipt)
          .then(() => {
            this.$router.push('/')
          })
          .catch(() => {})
      },
      triggerUpload () {
        this.$refs.fileInput.click()
      },
      onFileChange (event) {
        const file = event.target.files[0]

        const reader = new FileReader()

        reader.onload = e => {
          this.imageSrc = reader.result
        }
        reader.readAsDataURL(file)
        this.image = file
      }
    },
    components: {
      flexCarousel: flexCarousel
    },
    name: 'newreceipt'
  }
</script>

<style scoped>
  .p {
    opacity: .6;
    font-size: 20px;
    font-family: Calibri,serif;
  }
  .p1 {
    opacity: .6;
    font-size: 17px;
    font-family: Calibri,serif;
  }
  .h1 {
    font-family: Calibri,serif;
    font-size: 35px;
    font-weight: lighter;
  }
</style>
