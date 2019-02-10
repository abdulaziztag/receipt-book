<template>
  <v-container>
    <transition name="homeAnimation" mode="out-in">
      <v-layout key="first" v-if="!loading">
        <v-flex xs12>
          <v-card>
            <v-responsive>
              <v-img :src="receipt.imageSrc"></v-img>
              <v-card-text class="text">
                <p>{{ receipt.title }}</p>
                <span style="font-weight: bolder">Ингредиенты:</span>
                <ol>
                  <li v-for="receip in receipt.ingred" class="text">{{ receip }}</li>
                </ol>
              </v-card-text>
              <v-card-title class="text">
                <ol>
                  <li v-for="receip in receipt.meth">{{ receip }}</li>
                </ol>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <app-edit-modal v-if="isOwner" :receipt="receipt"></app-edit-modal>
              </v-card-actions>
            </v-responsive>
          </v-card>
        </v-flex>
        <v-flex>
          <v-card>

          </v-card>
        </v-flex>
      </v-layout>
    </transition>
  </v-container>
</template>

<script>
  import EditAdModal from './EditAdModal'

  export default {
    props: ['id'],
    computed: {
      receipt () {
        const id = this.id
        return this.$store.getters.adById(id)
      },
      loading () {
        return this.$store.getters.loading
      },
      isOwner () {
        return this.receipt.ownerId === this.$store.getters.user.id
      }
    },
    components: {
      appEditModal: EditAdModal
    }
  }
</script>

<style>
  .text {
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
  }
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
