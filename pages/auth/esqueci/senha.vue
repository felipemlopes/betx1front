<template>

  <div>
    <div class="row justify-content-center mt-5">

      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h1 class="text-center text-wite pb-2 mb-2 fs-3">Esqueci Senha</h1>

            <div class="form">
              <form @submit.prevent="sendResetLink">

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

                <div class="mt-4 mb-4">
                  <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                    <span v-show="loading">Enviando</span>
                    <span v-show="!loading">Enviar</span>
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
  name: 'index',
  layout: 'default',

  middleware: ['visitante'],
  data() {
    return {
      loading: false,
      form: {
        email: null,
      },
      error: {
        email: null,
      },
    }
  },
  mounted() {
    this.$axios.$get("/laravel/sanctum/csrf-cookie");
  },
  methods: {
    sendResetLink() {
      this.loading = true;
      this.$axios.post('/laravel/api/forgotpassword', {
        email: this.form.email,
      })
        .then(res => {
          this.$toast.success('Email enviado com sucesso!',{duration:600})
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
    },
    clearErrors() {
      this.error.email = null;
    }
  }
}
</script>
