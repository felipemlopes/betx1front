<template>
  <div>

    <div class="navbar-custom">
      <div class="container-fluid">
        <ul class="list-unstyled topnav-menu float-end mb-0">

          <li class="dropdown notification-list px-2 py-2" v-show="!this.$cookies.get('tokenauth')">
            <a class="nav-link right-bar-toggle fw-bold fs-5 pointer" v-on:click="openModalRegister">
              Registre-se
            </a>
          </li>
          <li class="dropdown notification-list px-2 py-2" v-show="!this.$cookies.get('tokenauth')">
            <a class="nav-link right-bar-toggle btn btn-primary text-uppercase fw-bold fs-5" v-on:click="openModalLogin">
              Entrar
            </a>
          </li>

          <li class="dropdown notification-list px-2 py-2 username-text" v-show="this.$cookies.get('tokenauth')">
            <p class="text-white py-2">Bem-vindo {{ username }}!</p>
          </li>

          <li class="dropdown notification-list px-2 py-2" v-show="this.$cookies.get('tokenauth')" v-click-outside="externalClick">
            <div class="dropdown">
              <div class="text-white px-1 py-2">
                <fa-icon :icon="faGear" class="pr-5 pointer" v-on:click="toggleUserMenu" />
              </div>
              <ul class="dropdown-menu" :class="{ 'show': usermenushow }">
                <li>
                  <NuxtLink :to="{ name:'cassino-conta'}" class="dropdown-item">
                    <fa-icon :icon="faUserAlt" style="margin-right: 10px;"/>
                    Conta
                  </NuxtLink>
                  <NuxtLink :to="{ name:'cassino-conta-deposito'}" class="dropdown-item">
                    <fa-icon :icon="faPlusSquare" style="margin-right: 10px;"/>
                    Depositar
                  </NuxtLink>
                  <NuxtLink :to="{ name:'cassino-conta-saque'}" class="dropdown-item">
                    <fa-icon :icon="faMinusSquare" style="margin-right: 10px;"/>
                    Sacar
                  </NuxtLink>
                  <a class="dropdown-item" v-on:click="openModalAffiliate">
                    <fa-icon :icon="faUserPlus" style="margin-right: 10px;"/>
                    Indique Um Amigo
                  </a>

                  <NuxtLink :to="{ name:'cassino-conta-transacoes'}" class="dropdown-item">
                    <fa-icon :icon="faReceipt" style="margin-right: 10px;"/>
                    Transações
                  </NuxtLink>
                  <NuxtLink :to="{ name:'cassino-conta-historico'}" class="dropdown-item">
                    <fa-icon :icon="faClock" style="margin-right: 10px;"/>
                    Histórico
                  </NuxtLink>
                  <!--<NuxtLink :to="{ name:'cassino-conta-bonus'}" class="dropdown-item">
                    <fa-icon :icon="faGift" style="margin-right: 10px;"/>
                    Bônus
                  </NuxtLink>
                  <NuxtLink :to="{ name:'cassino-conta-preferencias'}" class="dropdown-item">
                    <fa-icon :icon="faGear" style="margin-right: 10px;"/>
                    Preferêcias
                  </NuxtLink>
                  <NuxtLink :to="{ name:'cassino-conta-recompensas'}" class="dropdown-item">
                    <fa-icon :icon="faMedal" style="margin-right: 10px;"/>
                    Recompensas
                  </NuxtLink>-->
                  <hr class="dropdown-divider">
                  <a class="dropdown-item" v-on:click="dologout">
                    <fa-icon :icon="faDoorClosed" style="margin-right: 10px;"/>
                    Sair
                  </a>
                </li>

              </ul>
            </div>

          </li>

          <li class="dropdown notification-list px-2 py-2" v-show="this.$cookies.get('tokenauth')">
            <div class="text-white px-1" style="border-radius:5px;padding-top:0.5rem;padding-bottom:0.5rem;border: 2px solid #323b45;width:135px;">
              R$ {{this.$store.state.user.totalbalance}}
            </div>
          </li>
          <li class="dropdown notification-list px-2 py-2" v-show="this.$cookies.get('tokenauth')">
            <NuxtLink :to="{ name:'cassino-conta-deposito'}" class="nav-link right-bar-toggle btn btn-primary text-uppercase fw-bold fs-5 ">
              <fa-icon :icon="faMoneyBill" class="pr-5 deposit-icon" />
              <span class="deposit-text">Depositar</span>
            </NuxtLink>
          </li>

        </ul>

        <!-- LOGO -->
        <div class="logo-box">

          <ul class="list-unstyled list-inline">
            <li class="list-inline-item py-2 category-active">
              <NuxtLink :to="{ name:'cassino'  }" class="text-white " style="font-size: 18px;">
                <fa-icon :icon="faDice" class="pr-5" />
                Cassino
              </NuxtLink>
            </li>
            <li class="list-inline-item py-3">

              <NuxtLink :to="{ name:'apostas'  }" class="text-white" style="font-size: 18px;">
                <fa-icon :icon="faFutbol" class="pr-5" />
                Esportes
              </NuxtLink>
            </li>
          </ul>

        </div>

        <ul class="list-unstyled topnav-menu topnav-menu-left m-0">
          <li>
            <button class="button-menu-mobile" v-on:click="toggleSidebar">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </li>

          <li>
            <!-- Mobile menu toggle (Horizontal Layout)-->
            <a class="navbar-toggle nav-link" data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
              <div class="lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </a>
            <!-- End mobile menu toggle-->
          </li>

        </ul>
        <div class="clearfix"></div>
      </div>
    </div>

    <div class="modal fade show" :class="{'d-block': modallogin }" tabindex="-1" aria-modal="true" >
      <div class="modal-dialog" >
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" v-on:click="closeModalLogin"></button>
          </div>
          <div class="modal-body">
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
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade show" :class="{'d-block': modalregister }" tabindex="-1" aria-modal="true" >
      <div class="modal-dialog modal-dialog-scrollable" >
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" v-on:click="closeModalRegister"></button>
          </div>
          <div class="modal-body">
            <div class="card">
              <div class="card-body" style="height: 60vh;">
                <h1 class="text-center text-wite pb-2 mb-2 fs-3">Cadastre-se</h1>

                <div class="form">
                  <form @submit.prevent="register">

                    <div class="mb-3">
                      <label for="document" class="form-label text-white-50">CPF</label>
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
                        v-on:change="consultcpf"
                      />
                      <div class="invalid-feedback" v-show="error.document">{{ error.document }}</div>
                    </div>

                    <div class="mb-3">
                      <label for="document" class="form-label text-white-50">Data de nascimento</label>
                      <input
                        type="text"
                        class="form-control"
                        :class="{'is-invalid' : error.birth}"
                        id="birth"
                        v-model="form.birth"
                        autocomplete="off"
                        disabled
                        placeholder=""
                        v-mask="['##/##/####']"
                      />
                      <div class="invalid-feedback" v-show="error.birth">{{ error.birth }}</div>
                    </div>

                    <div class="mb-3">
                      <label for="name" class="form-label text-white-50">Nome</label>
                      <input
                        type="text"
                        class="form-control"
                        :class="{'is-invalid' : error.name}"
                        id="name"
                        v-model="form.name"
                        autocomplete="off"
                        disabled
                        placeholder=""
                      />
                      <div class="invalid-feedback" v-show="error.name">{{ error.name }}</div>
                    </div>

                    <div class="mb-3">
                      <label for="name" class="form-label text-white-50">Usuário</label>
                      <input
                        type="text"
                        class="form-control"
                        :class="{'is-invalid' : error.username}"
                        id="username"
                        v-model="form.username"
                        autocomplete="off"
                        :disabled="loading"
                        placeholder=""
                      />
                      <div class="invalid-feedback" v-show="error.username">{{ error.username }}</div>
                    </div>

                    <div class="form-group">
                      <label for="" class="form-label text-white-50">Telefone</label>
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
                        <span v-show="loading">Enviando</span>
                        <span v-show="!loading">Enviar</span>
                      </button>
                    </div>

                    <div class="text-center">

                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade show" :class="{'d-block': modalaffiliate }" tabindex="-1" aria-modal="true" >
      <div class="modal-dialog" >
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" v-on:click="closeModalAffiliate"></button>
          </div>
          <div class="modal-body">
            <div class="card">
              <div class="card-body">
                <h1 class="text-center text-warning pb-2 mb-2 fs-3">Indique um Amigo</h1>


                <p class="fw-bold fs-5 text-center text-white">
                  Convide Amigos, <span class="text-success">Ganhe Dinheiro</span>
                </p>

                <p class="text-center text-white">
                  Receba saldo em dinheiro para todos os amigos que você indicar
                </p>

                <div class="form">
                  <p class="text-center fw-bold text-white">Compartilhe seu link de convite</p>

                  <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" v-model="affiliatelink">
                    <button class="btn btn-outline-secondary" type="button" id="button-addon1" v-on:click="copyLinkAffiliate">Copiar</button>
                  </div>

                </div>

              </div>
            </div>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade show" :class="{'d-block': modalsuporte }" tabindex="-1" aria-modal="true" >
      <div class="modal-dialog" >
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" v-on:click="closeModalSuporte"></button>
          </div>
          <div class="modal-body">
            <div class="card">
              <div class="card-body">
                <h1 class="text-center text-warning pb-2 mb-2 fs-3">Suporte</h1>


                <p class="fw-bold fs-5 text-center text-white">
                  Entre em contato através do Telegram
                </p>

                <p class="text-center text-white">
                  <a :href="getTelegramLink()" target="_blank">Iniciar</a>
                </p>

              </div>
            </div>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { faGift } from '@fortawesome/free-solid-svg-icons'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { faMedal } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faReceipt } from '@fortawesome/free-solid-svg-icons'
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons'
import { faFutbol } from '@fortawesome/free-solid-svg-icons'
import { faDice } from '@fortawesome/free-solid-svg-icons'
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import vClickOutside from 'v-click-outside'
export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      user_id: null,
      username: null,
      link_indication: "",
      balance: 0.00,
      usermenushow: false,
      modallogin: false,
      modalregister: false,
      modalaffiliate: false,
      modalsuporte: false,
      loading: false,
      form: {
        name: null,
        username: null,
        document: null,
        email: null,
        password: null,
        password_confirmation: null,
        phone: null,
        indicatedby: null,
        birth: null,
      },
      error: {
        name: null,
        username: null,
        document: null,
        email: null,
        password: null,
        password_confirmation: null,
        phone: null,
        birth: null,
      },
    };
  },
  computed: {
    affiliatelink () {
      return this.link_indication+this.user_id
    },
    faMoneyBill () {
      return faMoneyBill
    },
    faUserAlt () {
      return faUserAlt
    },
    faGift () {
      return faGift
    },
    faPlusSquare () {
      return faPlusSquare
    },
    faMinusSquare () {
      return faMinusSquare
    },
    faGear () {
      return faGear
    },
    faClock () {
      return faClock
    },
    faMedal () {
      return faMedal
    },
    faUserPlus () {
      return faUserPlus
    },
    faReceipt () {
      return faReceipt
    },
    faDoorClosed () {
      return faDoorClosed
    },
    faFutbol () {
      return faFutbol
    },
    faDice () {
      return faDice
    },
  },
  created() {
    this.$nuxt.$on('openlogin', () => {
      this.modallogin = true
    })
    this.$nuxt.$on('openAffiliateModal', () => {
      this.modalaffiliate = !this.modalaffiliate;
    })
    this.$nuxt.$on('opensupport', () => {
      console.log('recebeu 2')
      this.modalsuporte = true;
    })
  },
  async mounted() {
    await this.$axios.$get("/laravel/sanctum/csrf-cookie");
    this.link_indication = window.location.host+"?ref="
    await this.getUser()
    this.form.indicatedby = this.$cookies.get("tokenaffiliate")
  },
  methods: {
    getTelegramLink(){
      return "https://t.me/"+ this.$store.state.settings.telegram
    },
    esquecisenha(){
      this.modallogin = false
      this.$router.push('/auth/esqueci/senha')
    },
    async dologout(){
      await this.$axios.$get("/laravel/api/logout");
      this.user_id = null
      this.username = null
      await this.$cookies.remove('tokenauth')
      await this.$cookies.remove('jogosbr_session')
      //this.$store.commit('auth/logout')
      this.$router.push('/')
      //this.$router.go(0)
    },
    async consultcpf() {
      if(this.form.document.length===14){
        this.loading = true;
        await this.$axios.get('/laravel/api/consulta/cpf?cpf='+this.form.document).then(res => {
          this.form.name = res.data.nome;
          this.form.birth = res.data.dtnasc;
          this.loading = false;
        }).catch(err => {
          const code = err
          this.loading = false;
          (code.response.data.errors)
            ? this.setErrors(code.response.data.errors)
            : this.clearErrors();
          (code.response.data.message==="Credentials not match")
            ? this.$toast.error('Email e/ou senha não conferem',{duration:600})
            : null;
        });
        this.loading = false;
      }
    },
    async login() {
      this.loading = true;
      await this.$axios.post('/laravel/api/login', {
        email: this.form.email,
        password: this.form.password,
      })
        .then(res => {
          this.$store.commit('auth/setToken', res.data)
          this.$cookies.set('tokenauth', res.data,{ maxAge: 60 * 60});
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
    async register() {
      await this.$axios.$get("/laravel/sanctum/csrf-cookie");
      this.loading = true;
      await this.$axios.post('/laravel/api/register', {
        name: this.form.name,
        username: this.form.username,
        document: this.form.document,
        email: this.form.email,
        password: this.form.password,
        password_confirmation: this.form.password_confirmation,
        phone: this.form.phone,
        birth: this.form.birth,
        indicatedby: this.form.indicatedby,
      })
        .then(res => {
          this.$axios.post('/laravel/api/login', {
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

        }).catch(err => {
          const code = err
          console.log(code.response.data)
          this.loading = false;
          (code.response.data.errors)
            ? this.setErrors(code.response.data.errors)
            : this.clearErrors();
          (code.response.data.message==="minor")
            ? this.$toast.error('CPF de pessoa menor de idade! Tente novamente.',{duration:600})
            : null;
        });
    },
    setErrors(errors) {
      this.error.name = errors.name ? errors.name[0] : null;
      this.error.username = errors.username ? errors.username[0] : null;
      this.error.document = errors.document ? errors.document[0] : null;
      this.error.email = errors.email ? errors.email[0] : null;
      this.error.password = errors.password ? errors.password[0] : null;
      this.error.password_confirmation = errors.password_confirmation ? errors.password_confirmation[0] : null;
      this.error.phone = errors.phone ? errors.phone[0] : null;
      this.error.birth = errors.birth ? errors.birth[0] : null;
    },
    clearErrors() {
      this.error.name = null;
      this.error.username = null;
      this.error.document = null;
      this.error.email = null;
      this.error.password = null;
      this.error.password_confirmation = null;
      this.error.phone = null;
      this.error.birth = null;
    },
    toggleSidebar() {
      this.$store.commit('sidebar/toggleSidebarcassino')
    },
    openModalLogin() {
      this.modallogin = !this.modallogin;
    },
    openModalRegister() {
      this.modalregister = !this.modalregister;
    },
    openModalAffiliate() {
      this.modalaffiliate = !this.modalaffiliate;
    },
    toggleUserMenu() {
      this.usermenushow = !this.usermenushow;
    },
    externalClick (event) {
      this.usermenushow = false
    },
    closeModalLogin (event) {
      this.modallogin = false
    },
    closeModalRegister (event) {
      this.modalregister = false
    },
    closeModalAffiliate (event) {
      this.modalaffiliate = false
    },
    closeModalSuporte (event) {
      this.modalsuporte = false
    },
    copyLinkAffiliate() {
      navigator.clipboard.writeText(this.link_indication+this.user_id)
      //navigator.clipboard.writeText(this.link_indication)
      this.$toast.success('Link Copiado!',{duration:600})
    },
    async getUser() {
      if(await this.$cookies.get("tokenauth")){
        await this.$axios.get("/laravel/api/user")
          .then(res => {
            this.user_id = res.data.data.id;
            this.username = res.data.data.username;
          })
          .catch(err => {
            this.$toast.error('Erro!',{duration:600})
          });
      }
    },
  },

};
</script>

<style scoped>
  .category-active{
    border-bottom: 3px solid #ffee59
  }
</style>
