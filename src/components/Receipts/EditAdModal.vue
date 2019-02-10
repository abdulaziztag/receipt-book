<template>
  <v-dialog width="400px" v-model="modal">
    <v-btn class="warning" slot="activator">Изменить</v-btn>
    <v-card>
      <v-container>
        <v-layout>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">dsd</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                v-model="editedTitle"
                type="text"
                label="Название блюда"
                color="success"
                name="title"
              ></v-text-field>
              <v-text-field
                v-model="editedIngred"
                type="text"
                label="Ингредиенты"
                color="success"
                name="ingredients"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click="onCancel">Отмена</v-btn>
              <v-btn flat @click="onSave" color="success">Сохранить</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['receipt'],
    data () {
      return {
        modal: false,
        editedIngred: this.receipt.ingred.join('.'),
        editedTitle: this.receipt.title
      }
    },
    methods: {
      onCancel () {
        this.modal = false
        this.editedIngred = this.receipt.ingred
        this.editedTitle = this.receipt.title
      },
      onSave () {

      }
    }
  }
</script>

<style scoped>

</style>
