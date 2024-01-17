<template>
  <div>
    <div class="container-fluid">
      <div class="row mt-3">
        <div class="col-md-12">
          <div class="card border-0" style="background:transparent;">
            <div class="card-body">
              <ul class="nav nav-pills navtab-bg nav-justified">
                <li class="nav-item">
                  <NuxtLink :to="{ name:'cassino-conta'}" data-toggle="tab" aria-expanded="false" class="nav-link">
                    <span class="d-none d-sm-block">Perfil</span>
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink :to="{ name:'cassino-conta-historico'}" data-toggle="tab" aria-expanded="false" class="nav-link">
                    <span class="d-none d-sm-block">Histórico</span>
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink :to="{ name:'cassino-conta-transacoes-depositos'}" data-toggle="tab" aria-expanded="false" class="nav-link">
                    <span class="d-none d-sm-block">Transações</span>
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink :to="{ name:'cassino-conta-senha'}" data-toggle="tab" aria-expanded="false" class="nav-link active">
                    <span class="d-none d-sm-block">Senha</span>
                  </NuxtLink>
                </li>
              </ul>

              <div class="tab-content text-muted">
                <div class="tab-pane active">
                  <div class="row mt-3">
                    <div class="col-md-12">
                      <div class="card border-0 bg-dark" style="background-color: #303841 !important;">
                        <div class="card-body">
                          <h3 class="text-white">Senha</h3>
                          <form method="post" @submit.prevent="send" class="mt-15">
                            <div class="form-group">
                              <label for="">Senha atual:</label>
                              <input
                                type="text"
                                class="form-control"
                                :class="{'is-invalid' : error.password}"
                                id="password"
                                v-model="form.password"
                                autocomplete="off"
                                :disabled="loading"
                                placeholder=""
                                style="background-color: #131521; border: 1px solid #131521;"
                              />
                              <div class="invalid-feedback" v-show="error.password">{{ error.password }}</div>
                            </div>

                            <div class="form-group">
                              <label for="">Nova senha:</label>
                              <input
                                type="text"
                                class="form-control"
                                :class="{'is-invalid' : error.new_password}"
                                id="new_password"
                                v-model="form.new_password"
                                autocomplete="off"
                                :disabled="loading"
                                placeholder=""
                                style="background-color: #131521; border: 1px solid #131521;"
                              />
                              <div class="invalid-feedback" v-show="error.new_password">{{ error.new_password }}</div>
                            </div>

                            <div class="form-group">
                              <label for="">Confirmação de nova senha:</label>
                              <input
                                type="text"
                                class="form-control"
                                :class="{'is-invalid' : error.new_password_confirmation}"
                                id="new_password_confirmation"
                                v-model="form.new_password_confirmation"
                                autocomplete="off"
                                :disabled="loading"
                                placeholder=""
                                style="background-color: #131521; border: 1px solid #131521;"
                              />
                              <div class="invalid-feedback" v-show="error.new_password_confirmation">{{ error.new_password_confirmation }}</div>
                            </div>

                            <div class="text-center mt-3">
                              <button class="btn btn-primary pl-65 pr-65">Enviar</button>
                            </div>

                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'defaultcassino',

  data() {
    return {
      loading: false,
      form: {
        password: null,
        new_password: null,
        new_password_confirmation: null,
      },
      error: {
        password: null,
        new_password: null,
        new_password_confirmation: null,
      },

    }
  },

  methods: {
    async send() {
      await this.$axios.post("/laravel/api/account/profile/password", this.form)
        .then(res => {

          this.loading = false
          this.clearErrors()
          this.$cookies.remove('tokenauth')
          this.$store.commit('auth/setToken', res.data)
          this.$cookies.set('tokenauth', res.data,{ maxAge: 60 * 60 * 24 * 7});
          this.$toast.success('Atualizado com sucesso!',{duration:600})
          this.$router.go(0)
        }).catch(err => {
        const code = err
        this.setErrors(code.response.data.errors)

      });

      this.loading = false;

    },
    setErrors(errors) {
      this.error.password = errors.password ? errors.password[0] : null;
      this.error.new_password = errors.new_password ? errors.new_password[0] : null;
    },
    clearErrors() {
      this.error.password = null;
      this.error.new_password = null;
    }
  },

  mounted() {

  }
}
</script>
