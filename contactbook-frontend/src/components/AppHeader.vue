<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <a href="/" class="navbar-brand">Ứng dụng Quản lý danh bạ</a>
    <div class="me-auto navbar-nav" v-if="isLoggedIn">
      <li class="nav-item">
        <router-link :to="{ name: 'contactbook' }" class="nav-link">
          Danh bạ
          <i class="fa-solid fa-address-book"></i>
        </router-link>
      </li>
    </div>
    <div class="navbar-nav ms-auto" v-if="isLoggedIn">
      <li class="nav-item">
        <span class="nav-link text-light">
          <i class="fa-solid fa-user"></i> {{ user?.username }}
        </span>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link" @click.prevent="handleLogout">
          <i class="fa-solid fa-sign-out-alt"></i> Đăng xuất
        </a>
      </li>
    </div>
  </nav>
</template>

<script>
import authService from "@/services/auth.service";

export default {
  data() {
    return {
      isLoggedIn: authService.isLoggedIn(),
      user: authService.getUser(),
    };
  },
  watch: {
    $route() {
      this.isLoggedIn = authService.isLoggedIn();
      this.user = authService.getUser();
    },
  },
  methods: {
    handleLogout() {
      authService.logout();
      this.isLoggedIn = false;
      this.user = null;
      this.$router.push({ name: "login" });
    },
  },
};
</script>
