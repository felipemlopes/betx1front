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
                  <label for="username" class="form-label text-white-50">Email</label>
                  <input
                    type="email"
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

                <div class="text-center">
                  <router-link :to="{ name: 'esquecisenha'}" class="">
                    Esqueci a senha
                  </router-link>
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

  methods: {
    login() {
      this.loading = true;

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
