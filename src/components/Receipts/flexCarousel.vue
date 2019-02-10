<template>
  <div class="slider">
    <div class="item item-1"><span>Готовить</span></div>
    <div class="item item-2"><span>Это</span></div>
    <div class="item item-3"><span>Очень</span></div>
    <div class="item item-4"><span>Круто</span></div>
  </div>
</template>

<script>

</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  .slider {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 30px
  }
  .item {
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
    height: 100vh;
    background-color: #aeaeae;
    flex-basis: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .2s;
  }
  .item:hover {
    flex-basis: 100%;
  }
  .item-1 {
    background: url("https://cdn.lifehacker.ru/wp-content/uploads/2014/11/shutterstock_219458758-1140x761.jpg") no-repeat 70% center;
    background-size: cover;
    color: black;
  }
  .item-2 {
    background: url("https://mir24.tv/uploaded/images/2018/April/98ca9b9bbaaf5a7fdda73857fa8c1daccc567224a97c99cf3cceeeba81ef009c.jpg") no-repeat 60% center;
    background-size: cover;
  }
  .item-3 {
    background: url("https://st2.depositphotos.com/4758989/11646/v/950/depositphotos_116466050-stock-illustration-food-ingredients-collection-cap-cook.jpg") no-repeat center center;
    background-size: cover;
    color: black;
  }
  .item-4 {
    background: url("https://vse-kursy.com/uploads/posts/2018-04/1523527203_woman-1979272_1280.jpg") no-repeat center center;
    background-size: cover;
  }
  @media (max-width: 640px) {
    .slider {
      flex-flow: column;
      height: 100vh;
    }
    .item {
      width: 100%;
    }
    .item:hover {
      flex-grow: 30%;
    }
  }
</style>
