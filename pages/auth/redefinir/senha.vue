<template>

  <div>
    <div class="row justify-content-center mt-5">

      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h1 class="text-center text-wite pb-2 mb-2 fs-3">Redefinir Senha</h1>

            <div class="form">
              <form @submit.prevent="esqueciSenha">


                <div class="mb-3">
                  <label for="username" class="form-label text-white-50">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{'is-invalid' : error.email}"
                    id="email"
                    v-model="form.email"
                    autocomplete="off"
                    :disabled="loading"
                    placeholder=""
                  />
                  <div class="invalid-feedback" v-show="error.email">{{ error.email }}</div>
                </div>
                <div class="mb-3">
                  <label for="username" class="form-label text-white-50">Código</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{'is-invalid' : error.token}"
                    id="email"
                    v-model="form.token"
                    autocomplete="off"
                    :disabled="loading"
                    placeholder=""
                  />
                  <div class="invalid-feedback" v-show="error.token">{{ error.token }}</div>
                </div>
                <div class="mb-3">
                  <label class="form-label text-white-50" for="password-input">Senha</label>
                  <input
                    type="password"
                    class="form-control"
                    :class="{'is-invalid' : error.password}"
                    id="password"
                    v-model="form.password"
                    :disabled="loading"
                    placeholder=""
                  />
                  <div class="invalid-feedback" v-show="error.password">{{ error.password }}</div>
                </div>

                <div class="mb-3">
                  <label class="form-label text-white-50" for="password-input">Confmar senha</label>
                  <input
                    type="password"
                    class="form-control"
                    :class="{'is-invalid' : error.password_confirmation}"
                    id="password"
                    v-model="form.password_confirmation"
                    :disabled="loading"
                    placeholder=""
                  />
                  <div class="invalid-feedback" v-show="error.password_confirmation">{{ error.password_confirmation }}</div>
                </div>

                <div class="mt-4 mb-4">
                  <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                    <span v-show="loading">Entrando</span>
                    <span v-show="!loading">Entrar</span>
                  </button>
                </div>

              </form>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
export default {
  layout: 'default',
  middleware: ['visitante'],
  data() {
    return {
      loading: false,
      form: {
        email: null,
        password: null,
        token: null,
        password_confirmation: null,
      },
      error: {
        email: null,
        password: null,
        token: null,
        password_confirmation: null,
      },
    }
  },
  mounted() {
    this.$axios.get("/laravel/sanctum/csrf-cookie");
  },
  methods: {
    async esqueciSenha() {
      this.loading = true;
      await this.$axios.post('/laravel/api/redefinir/senha', {
        token: this.form.token,
        email: this.form.email,
        password: this.form.password,
        password_confirmation: this.form.password_confirmation,
      })
        .then(res => {
          this.$toast.success('Senha redefinida com sucesso!',{duration:600})
          this.$cookies.set('tokenauth', res.data,{ maxAge: 60 * 60 * 24 * 7});
          this.$router.go(0)
          //this.$router.push('/login')
        }).catch(err => {
          const code = err
          console.log(code.response.data)
          this.loading = false;
          (code.response.data.errors)
            ? this.setErrors(code.response.data.errors)
            : this.clearErrors();
          (code.response.data.message==="Credentials not match")
            ? this.$toast.error('Email e/ou senha não conferem',{duration:600})
            : null;
      });
    },
    setErrors(errors) {
      this.error.token = errors.token ? errors.token[0] : null;
      this.error.email = errors.email ? errors.email[0] : null;
      this.error.password = errors.password ? errors.password[0] : null;
      this.error.password_confirmation = errors.password_confirmation ? errors.password_confirmation[0] : null;
    },
    clearErrors() {
      this.error.token = null;
      this.error.email = null;
      this.error.password = null;
      this.error.password_confirmation = null;
    }
  }
}
</script>
