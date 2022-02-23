<template>
  <nav class="navbar navbar-expand-lg navbar-dark sticky-top"
  style="background-color: #7b7b7b">
    <div class="container">
      <a class="navbar-brand" type="button" @click="$router.push('/')">
        <font-awesome-icon :icon="['fas', 'cocktail']" class="me-1 py-1" />
        <span class="h4">今天喝蝦咪2.0</span>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto">
          <a class="nav-item nav-link" type="button" @click="$router.push('/drink')"
            ><span class="h5" style="color:#7b7b7b">店家名單管理</span></a
          >
        </div>
      </div>
    </div>
  </nav>
  <router-view />
</template>
<script>
import 'bootstrap/dist/js/bootstrap.bundle';

export default {};
</script>

<style lang="scss">
@import "./assets/all";
body {
  background-color: rgba(205, 179, 128, 1);
}
</style>
