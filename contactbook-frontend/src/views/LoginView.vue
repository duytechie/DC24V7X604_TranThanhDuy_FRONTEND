<template>
  <div class="login-wrapper">
    <div class="login-card card shadow">
      <div class="card-body p-4">
        <div class="text-center mb-4">
          <i class="fa-solid fa-address-book fa-3x text-primary"></i>
          <h3 class="mt-2">Đăng nhập</h3>
          <p class="text-muted">Quản lý danh bạ liên hệ</p>
        </div>

        <div v-if="error" class="alert alert-danger" role="alert">
          {{ error }}
        </div>

        <form @submit.prevent="handleLogin">
          <div class="form-group mb-3">
            <label for="username">Tên đăng nhập</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa-solid fa-user"></i>
                </span>
              </div>
              <input
                id="username"
                v-model="username"
                type="text"
                class="form-control"
                placeholder="Nhập tên đăng nhập"
                required
                :disabled="loading"
              />
            </div>
          </div>

          <div class="form-group mb-4">
            <label for="password">Mật khẩu</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa-solid fa-lock"></i>
                </span>
              </div>
              <input
                id="password"
                v-model="password"
                type="password"
                class="form-control"
                placeholder="Nhập mật khẩu"
                required
                :disabled="loading"
              />
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary btn-block w-100"
            :disabled="loading"
          >
            <span v-if="loading">
              <i class="fa-solid fa-spinner fa-spin"></i> Đang xử lý...
            </span>
            <span v-else>
              <i class="fa-solid fa-sign-in-alt"></i> Đăng nhập
            </span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import authService from "@/services/auth.service";

export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
      loading: false,
    };
  },
  methods: {
    async handleLogin() {
      this.error = "";
      this.loading = true;
      try {
        await authService.login(this.username, this.password);
        this.$router.push({ name: "contactbook" });
      } catch (err) {
        this.error =
          err.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
}
.login-card {
  width: 100%;
  max-width: 420px;
  border-radius: 10px;
}
.input-group-text {
  width: 42px;
  justify-content: center;
}
</style>
