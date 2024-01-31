<template>

  <div>
    <div class="row justify-content-center mt-5">

      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h1 class="text-center text-wite pb-2 mb-2 fs-3">Faça login em sua conta</h1>

            <div class="form">
              <form @submit.prevent="login">

                <div class="mb-3">
                  <label for="username" class="form-label text-white-50">Email ou Usuário</label>
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

                <div class="mt-4 mb-4">
                  <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                    <span v-show="loading">Entrando</span>
                    <span v-show="!loading">Entrar</span>
                  </button>
                </div>

                <a class="pointer text-white" v-on:click="esquecisenha">
                  Esqueci a senha
                </a>
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
  name: 'index',
  layout: 'default',

  middleware: ['visitante'],
  data() {
    return {
      loading: false,
      form: {
        email: null,
        password: null
      },
      error: {
        email: null,
        password: null
      },
    }
  },
  mounted() {
    this.$axios.$get("/laravel/sanctum/csrf-cookie");
  },
  methods: {
    esquecisenha(){
      this.$router.push('/auth/esqueci/senha')
    },
    async login() {
      this.loading = true;
      await this.$axios.post('/laravel/api/login', {
        email: this.form.email,
        password: this.form.password,
      })
        .then(res => {
          //this.$store.commit('auth/setToken', res.data)
          this.$cookies.set('tokenauth', res.data,{ maxAge: 60 * 60 * 24 * 7});
          this.$toast.success('Logado com sucesso!',{duration:600})
          this.$router.go(0)
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
      this.error.email = errors.email ? errors.email[0] : null;
      this.error.password = errors.password ? errors.password[0] : null;
    },
    clearErrors() {
      this.error.email = null;
      this.error.password = null;
    }
  }
}
</script>
