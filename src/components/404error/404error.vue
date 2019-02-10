<template>
  <v-container grid-list-lg>
    <v-layout fill-height justify-center align-center>
      <v-flex xs12 class="text-xs-center">
        <p class="error--text err">Ошибка 404</p>
        <p>
          Вы открыли не существующую страницу.
          <br>
          Может вам нравиться это?
        </p>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex xs12 md6 lg4 xl3 v-for="receipt in myReceipts" :key="receipt.id">
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
</template>

<script>
    export default {
      computed: {
        myReceipts () {
          return this.$store.getters.allReceipts
        }
      }
    }
</script>

<style scoped>
  .err {
    font-size: 100px;
    font-weight: lighter;
    font-family: Calibri,serif;
  }
</style>
