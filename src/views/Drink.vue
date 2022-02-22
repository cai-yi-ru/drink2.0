<template>
  <div>
    <Loading :active="isLoading"></Loading>
    <div class="text-end m-2">
      <button class="btn btn-primary" @click="$refs.shopModal.showModal()">
        <i class="bi bi-shop-window me-1"></i>建立新店家
      </button>
    </div>
    <div class="container mt-5">
      <div class="card mt-5">
        <div class="card-body">
          <h1 class="card-title text-center mb-5">飲料店列表</h1>
          <table class="table text-center">
            <thead>
              <tr>
                <th scope="col">店名</th>
                <th scope="col">電話</th>
                <th scope="col">營業時間</th>
                <th scope="col">地址</th>
                <th scope="col">備註</th>
                <th scope="col">編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="shop in shops" :key="shop.id">
                <td>{{shop.title}}</td>
                <td>{{shop.phone}}</td>
                <td>{{shop.opentime}}</td>
                <td>{{shop.add}}</td>
                <td>{{shop.ps}}</td>
                <td><button type="button" class="btn btn-outline-danger"
                @click.prevent="delShop(shop)">刪除</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <ShopModal ref="shopModal" :shop="tempShop" @update-shop="updateShop"></ShopModal>
  </div>
</template>
<script>
import ShopModal from '../components/ShopModal.vue';

export default {
  components: {
    ShopModal,
  },
  data() {
    return {
      shops: [],
      shopLength: '',
      randomShop: {},
      isLoading: false,
      tempShop: {
        imagesUrls: [],
      },
    };
  },
  methods: {
    openModal() {
      this.tempShop = {};
      const shopComponent = this.$refs.shopModal;
      shopComponent.showModal();
    },
    closeModal() {
      this.tempShop = {};
      const shopComponent = this.$refs.shopModal;
      shopComponent.hideModal();
    },
    getShops() {
      this.isLoading = true;
      const api = 'https://agile-tundra-50101.herokuapp.com/api/shops';
      this.$http.get(api).then((res) => {
        this.shops = res.data.result;
        this.shopLength = this.shops.length;
        this.isLoading = false;
      });
    },
    getOneShop() {
      const digital = Math.floor(Math.random() * this.shopLength);
      this.randomShop = this.shop[digital];
    },
    updateShop(item) {
      const api = 'https://agile-tundra-50101.herokuapp.com/api/shops';
      this.$http
        .post(api, item)
        .then(() => {
          this.closeModal();
          this.getShops();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    delShop(item) {
      const api = `https://agile-tundra-50101.herokuapp.com/api/shops/${item.id}`;
      this.$http
        .delete(api)
        .then(() => {
          this.getShops();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.getShops();
  },
};
</script>

<style>
img {
  max-width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  margin: auto;
}
</style>
