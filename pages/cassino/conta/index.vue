<template>
  <div>
    <div class="container-fluid">

      <div class="row mt-3">
        <div class="col-md-12">
          <div class="card border-0" style="background:transparent;">
            <div class="card-body">


              <ul class="nav nav-pills navtab-bg nav-justified">
                <li class="nav-item">
                  <NuxtLink :to="{ name:'cassino-conta'}" data-toggle="tab" aria-expanded="false" class="nav-link active">
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
                  <NuxtLink :to="{ name:'cassino-conta-senha'}" data-toggle="tab" aria-expanded="false" class="nav-link">
                    <span class="d-none d-sm-block">Senha</span>
                  </NuxtLink>
                </li>
              </ul>
              <div class="tab-content text-muted">
                <div class="tab-pane active" id="profile">

                  <div class="row mt-3">
                    <div class="col-md-12">
                      <div class="card border-0 bg-dark" style="background-color: #303841 !important;">
                        <div class="card-body">
                          <h3 class="text-white">Informações da conta</h3>

                          <form @submit.prevent="send">
                            <div class="row">
                              <div class="col-md-6">
                                <div class="form-group">
                                  <label for="">Nome</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    :class="{'is-invalid' : error.name}"
                                    id="name"
                                    v-model="form.name"
                                    autocomplete="off"
                                    :disabled="loading"
                                    placeholder=""
                                    style="background-color: #131521; border: 1px solid #131521;"
                                  />
                                  <div class="invalid-feedback" v-show="error.name">{{ error.name }}</div>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="form-group">
                                  <label for="">CPF</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    :class="{'is-invalid' : error.document}"
                                    id="document"
                                    v-model="form.document"
                                    autocomplete="off"
                                    :disabled="loading"
                                    placeholder=""
                                    v-mask="['###.###.###-##']"
                                    style="background-color: #131521; border: 1px solid #131521;"
                                  />
                                  <div class="invalid-feedback" v-show="error.document">{{ error.document }}</div>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="form-group">
                                  <label for="">Telefone</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    :class="{'is-invalid' : error.phone}"
                                    id="phone"
                                    v-model="form.phone"
                                    autocomplete="off"
                                    :disabled="loading"
                                    placeholder=""
                                    v-mask="['(##)#####-####']"
                                    style="background-color: #131521; border: 1px solid #131521;"
                                  />
                                  <div class="invalid-feedback" v-show="error.phone">{{ error.phone }}</div>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="form-group">
                                  <label for="">Email</label>
                                  <input
                                    type="email"
                                    class="form-control"
                                    :class="{'is-invalid' : error.email}"
                                    id="email"
                                    v-model="form.email"
                                    autocomplete="off"
                                    :disabled="loading"
                                    placeholder=""
                                    style="background-color: #131521; border: 1px solid #131521;"
                                  />
                                  <div class="invalid-feedback" v-show="error.email">{{ error.email }}</div>
                                </div>
                              </div>

                              <div class="col-md-12 justify-content-center mt-3">
                                <button class="btn btn-primary">Salvar</button>
                              </div>
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
  data(){
    return {
      loading: false,
      form: {
        name: null,
        document: null,
        email: null,
        phone: null,
      },
      error: {
        name: null,
        document: null,
        email: null,
        phone: null,
      }
    };
  },
  mounted() {
    this.getUser();
    this.$axios.$get("/laravel/sanctum/csrf-cookie");
  },
  methods: {
    send() {
      this.loading = true;
      this.$axios.post('/laravel/api/account/profile/info', {
        email: this.form.email,
        document: this.form.document,
        name: this.form.name,
        phone: this.form.phone,
      })
        .then(res => {
          this.$toast.success('Atualizado com sucesso!',{duration:800})
          this.$router.go(0)
        }).catch(err => {
        const code = err
        this.setErrors(code.response.data.errors)
      });
    },
    async getUser() {
      this.$axios.get("/laravel/api/user/")
        .then(res => {
          this.form.name = res.data.data.name;
          this.form.document = res.data.data.document;
          this.form.email = res.data.data.email;
          this.form.phone = res.data.data.phone;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
    setErrors(errors) {
      this.error.name = errors.name ? errors.name[0] : null;
      this.error.document = errors.document ? errors.document[0] : null;
      this.error.email = errors.email ? errors.email[0] : null;
      this.error.phone = errors.phone ? errors.phone[0] : null;
    },
    clearErrors() {
      this.error.name = null;
      this.error.document = null;
      this.error.email = null;
      this.error.phone = null;
    },
  },
}
</script>
