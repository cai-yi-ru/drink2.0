<template>
    <Loading :active="isLoading"></Loading>
  <!-- Masthead-->
  <header class="masthead">
    <div class="container px-4 px-lg-5 h-100">
      <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
        <div class="col-lg-8 align-self-end">
          <h1 class="text-white font-weight-bold">
            <font-awesome-icon :icon="['fas', 'cocktail']" class="me-1 py-1" />今天喝蝦咪？
          </h1>
        </div>
        <div class="col-lg-8 mt-3 align-self-baseline">
          <a class="btn btn-primary btn-xl" @click="about()">查看更多</a>
        </div>
      </div>
    </div>
  </header>
  <!-- About-->
  <section class="page-section bg-light" id="about">
    <div class="container px-4 px-lg-5">
      <div class="row gx-4 gx-lg-5 justify-content-center">
        <div class="col-lg-9 text-center mb-5">
          <h2 class="text-dark mt-0">飲料店~ 所有品牌!</h2>
          <hr class="divider divider-light" />

          <ul class="list-group row list-group-horizontal-sm">
            <a type="button" class="list-group-item col-3 px-1 my-1"
            v-for="(shop, index) in shops" :key="index"
            @click.prevent="chooseShop(shop)"
            >
              <i class="bi bi-cup-straw me-3"></i><span class="h5">{{ shop.title }}</span>
            </a>
          </ul>
        </div>
        <div class="col-lg-9 text-center mt-5">
          <p>這麼多飲料店不知道要喝哪一間嗎？沒關係!可以隨機選一間幫你解決選擇障礙!!</p>
          <a class="btn btn-dark btn-xl mb-4" href="#"
          @click.prevent="getOneShop()">隨機GO!</a>
        </div>
      </div>
    </div>
  </section>
  <!-- Call to action-->
  <section class="page-section" v-show="tempShop.title !== undefined" id="list">
    <div class="container px-4 px-lg-5">
        <div class="text-end">
        <button class="btn btn-dark mb-1" type="button" @click.prevent="getOneShop()" >換一間</button>
      </div>
      <div class="card" >
        <div class="card-body">
          <h1 class="card-title text-center">{{ tempShop.title }}</h1>
          <h5 class="card-title mt-3">電話： {{tempShop.phone}}</h5>
          <h5 class="card-title mt-3">營業時間： {{tempShop.opentime}}</h5>
          <h5 class="card-title mt-3">地址： {{tempShop.add}}</h5>
          <div class="text-center" v-for="imageUrl in tempShop.imagesUrls" :key="imageUrl.id">
            <img
              :src="imageUrl"
              onerror="(this.src = 'https://i.imgur.com/xmiTQFW.png')"
              class="img-fluid my-4   "
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      shops: [],
      shopLength: '',
      tempShop: {},
    };
  },
  methods: {
    about() {
      document.querySelector('#about').scrollIntoView(true);
    },
    /* 取得所有商店 */
    getShops() {
      this.isLoading = true;
      const api = 'https://agile-tundra-50101.herokuapp.com/api/shops';
      this.$http.get(api).then((res) => {
        this.shops = res.data.result;
        this.shopLength = this.shops.length;
        this.isLoading = false;
      });
    },
    chooseShop(shop) {
      this.tempShop = shop;
      document.querySelector('#list').scrollIntoView(true);
    },
    getOneShop() {
      const digital = Math.floor(Math.random() * this.shopLength);
      this.tempShop = this.shops[digital];
      document.querySelector('#list').scrollIntoView(true);
    },
  },
  created() {
    this.getShops();
  },
};
</script>

<style>
header.masthead {
  padding-top: 10rem;
  padding-bottom: calc(10rem - 4.5rem);
  background: linear-gradient(to bottom, rgba(92, 77, 66, 0.8) 0%, rgba(92, 77, 66, 0.8) 100%),
    url("../assets/drinkBG.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-size: cover;
}
header.masthead h1,
header.masthead .h1 {
  font-size: 2.25rem;
}
@media (min-width: 992px) {
  header.masthead {
    height: 100vh;
    min-height: 40rem;
    padding-top: 4.5rem;
    padding-bottom: 0;
  }
  header.masthead p {
    font-size: 1.15rem;
  }
  header.masthead h1,
  header.masthead .h1 {
    font-size: 3rem;
  }
}
@media (min-width: 1200px) {
  header.masthead h1,
  header.masthead .h1 {
    font-size: 3.5rem;
  }
}
.page-section {
  padding: 8rem 0;
}
</style>
