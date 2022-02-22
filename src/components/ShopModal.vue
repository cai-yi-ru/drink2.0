<template>
<div>
    <Loading :active="isLoading"></Loading>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">新增店家</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-12 mb-3">
              <div class="form-group">
                <label for="title"><h4>飲料店店名</h4></label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="tempShop.title"
                  placeholder="請輸入店名"
                />
              </div>
            </div>
            <div class="col-sm-12 mb-3">
              <div class="form-group">
                <label for="add"><h4>地址</h4></label>
                <input
                  type="text"
                  class="form-control"
                  id="add"
                  v-model="tempShop.add"
                  placeholder="請輸入地址"
                />
              </div>
            </div>
            <div class="row col-sm-12 mb-3">
                <div class="col-sm-6 mb-3">
                    <div class="form-group">
                        <label for="phone"><h4>電話</h4></label>
                        <input
                        type="text"
                        class="form-control"
                        id="phone"
                        v-model="tempShop.phone"
                        placeholder="請輸入電話"
                        />
                    </div>
                </div>
                <div class="col-sm-6 mb-3">
                    <div class="form-group">
                        <label for="opentime"><h4>營業時間</h4></label>
                        <input
                        type="text"
                        class="form-control"
                        id="opentime"
                        v-model="tempShop.opentime"
                        placeholder="請輸入營業時間"
                        />
                    </div>
                </div>
            </div>
            <div class="col-sm-12 mb-3">
              <div class="form-group">
                <label for="ps"><h4>備註</h4></label>
                <textarea
                  type="text"
                  class="form-control"
                  id="ps"
                  v-model="tempShop.ps"
                  placeholder="備註"
                />
              </div>
            </div>
            <hr class="my-3">
            <div><button type="button" class="btn btn-primary mb-2"
            @click="tempShop.imagesUrls.push('')">新增圖片</button></div>
            <div class="col-md-3 col-sm-6 mb-3"
                  v-for="(item, index) in tempShop.imagesUrls" :key="item.id">
                    <label :for="`otherImg${index}`" class="form-label w-100 mb-0">
                      <div class="mask-fill cursor-pointer border border-1 border-primary">
                        <img :src="item" onerror="(this.src = 'https://i.imgur.com/xmiTQFW.png')"
                        class="d-inline-block" />
                      </div>
                    </label>

                    <div class="input-group">
                      <!-- 本地上傳 -->
                      <div class="flex-grow-1">
                        <label :for="`otherImg${index}`"
                        class="text-secondary form-label btn btn-outline-primary w-100 mb-0">
                        上傳圖片</label>
                        <input @change="uploadFile($event.target, index)" type="file"
                        class="form-control d-none"
                        :id="`otherImg${index}`" ref="clearFile" name="file-to-upload" />
                      </div>
                      <a
                        href="#"
                        @click.prevent="delImage(index)"
                        class="btn btn-outline-primary"
                        ><i class="bi bi-trash"></i></a>
                    </div>
                  </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary"
          @click="$emit('update-shop',tempShop)">確認</button>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

const token = '396b98fb66a04ab2860189cdf265253ab7a075d5'; // 填入 token
const album = 's0mzuE8'; // 若要指定傳到某個相簿，就填入相簿的 ID

export default {
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    shop() {
      this.tempShop = this.shop;
      this.tempShop.imagesUrls = [];
    },
  },
  data() {
    return {
      isLoading: false,
      modal: {},
      tempShop: {
        title: '',
        imagesUrls: [],
      },
      album, // 若要指定傳到某個相簿，就填入相簿的 ID
      file: null, // 準備拿 input type="file" 的值
      fs: {
        name: '', // input的圖檔名稱
        thumbnail: null, // input的圖片縮圖
        size: null, // input的圖片大小
      },
      title: '', // 圖片標題
      des: '', // 圖片描述
      link: '',
    };
  },
  methods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    uploadFile(target, index) {
      this.file = target.files[0]; // input type="file" 的值
      this.fs.name = this.file.name; // input的圖檔名稱
      this.fs.size = `${Math.floor(this.file.size * 0.001)}KB`; // input的圖片大小
      this.fs.thumbnail = window.URL.createObjectURL(this.file); // input的圖片縮圖
      this.title = this.fs.name.split('.')[0]; // 預設 input 的圖檔名稱為圖片上傳時的圖片標題
      this.isLoading = true;
      const formData = new FormData();
      formData.append('image', this.file);
      formData.append('title', this.title);
      // formData.append('description', this.des);
      formData.append('album', album); // 有要指定的相簿就加這行
      this.$http({
        method: 'POST',
        url: 'https://api.imgur.com/3/image',
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mimeType: 'multipart/form-data',
      })
        .then((res) => {
          this.tempShop.imagesUrls[index] = res.data.data.link;
          this.link = res.data.data.link;
          this.$refs.clearFile.value = '';
          this.isLoading = false;
        //   console.log(this.tempShop.imagesUrl);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>
