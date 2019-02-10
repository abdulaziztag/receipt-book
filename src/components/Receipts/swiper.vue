<template>
  <v-container class="text-align-center">
    <swiper :options="swiperOption">
      <swiper-slide v-for="item in loadImg" :key="item.id">
        <div align="center">
          <v-img height="100%" width="100%" :src="item.imageUrl"></v-img>
          <v-container>
            <v-layout column style="bottom: 40%;left: 10%;">
              <v-flex>
                <div class="diver"><h1 class="font-weight-thin">{{ item.title }}</h1></div></v-flex>
            </v-layout>
          </v-container>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        swiperOption: {
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
          },
          pagination: {
            el: '.swiper-pagination'
          }
        }
      }
    },
    computed: {
      swiper () {
        return this.$refs.mySwiper.swiper
      },
      loadImg () {
        return this.$store.getters.loadImages
      }
    }
  }
</script>

<style scoped>
  .h1 {
    font-family: Calibri,serif;
    font-size: 40px;
    font-weight: lighter;
    color: #F4511E
  }
  .btn {
    color: white;
    font-family: Calibri,serif;
    font-weight: lighter;
  }
  .diver {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 1vmin);
  }
</style>
