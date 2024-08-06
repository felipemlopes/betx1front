<template>
  <div>

    <div class="navbar-custom">
      <div class="container-fluid">
        <div class="logo-box">

          <NuxtLink :to="{ name:'index'  }" class="text-white d-block" style="font-size: 18px;width: 100%;text-align: center;margin-top: 15px;">
            <img src="/logo.png" style="height: 30px;"/>
          </NuxtLink>

        </div>

        <div class="clearfix"></div>
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
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
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
        birth: null
      },
      error: {
        name: null,
        username: null,
        document: null,
        email: null,
        password: null,
        password_confirmation: null,
        phone: null,
        birth: null
      },
    };
  },
  computed: {
    affiliatelink () {
      return this.link_indication+this.user_id
    },
    faArrowRightFromBracket () {
      return faArrowRightFromBracket
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
  async mounted() {

  },
  created() {

  },
  methods: {
    esquecisenha(){
      this.modallogin = false
      this.$router.push('/auth/esqueci/senha')
    },
    async dologout(){
      try {
        await this.$axios.$get("/laravel/api/logout");
        this.user_id = null
        this.username = null
        await this.$cookies.remove('tokenauth')
        await this.$cookies.remove('jogosbr_session')
        //this.$store.commit('auth/logout')
        this.$router.push('/')
        //this.$router.go(0)
      }catch (e){
        console.log("fail", e)
      }
    },
    async consultcpf() {
      if(this.form.document.length===14){
        this.loading = true;
        try {
          await this.$axios.get('/laravel/api/consulta/cpf?cpf='+this.form.document).then(res => {
            //console.log(res.data)
            this.form.name = res.data.nome;
            this.form.birth = res.data.dtnasc;
            this.loading = false;
          }).catch(err => {
            const code = err
            //console.log(code.response.data)
            this.loading = false;
            (code.response.data.errors)
              ? this.setErrors(code.response.data.errors)
              : this.clearErrors();
            (code.response.data.message==="Credentials not match")
              ? this.$toast.error('Email e/ou senha não conferem',{duration:600})
              : null;
          });
          this.loading = false;
        }catch (e){
          console.log("fail", e)
        }

      }
    },
    async login() {
      this.loading = true;
      try {
        await this.$axios.post('/laravel/api/login', {
          email: this.form.email,
          password: this.form.password,
        })
          .then(res => {
            this.$cookies.set('tokenauth', res.data,{ maxAge: 60 * 60});
            this.$toast.success('Logado com sucesso!',{duration:600})
            this.$router.go(0)
          }).catch(err => {
            const code = err
            //console.log(code.response.data)
            this.loading = false;
            (code.response.data.errors)
              ? this.setErrors(code.response.data.errors)
              : this.clearErrors();
            (code.response.data.message==="Credentials not match")
              ? this.$toast.error('Email e/ou senha não conferem',{duration:600})
              : null;

          });
      }catch (e){
        console.log("fail", e)
      }
    },
    async register() {
      try {
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
              //console.log(code.response.data.message.message)
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
            //console.log(code.response.data)
            this.loading = false;
            (code.response.data.errors)
              ? this.setErrors(code.response.data.errors)
              : this.clearErrors();
            (code.response.data.message==="minor")
              ? this.$toast.error('CPF de pessoa menor de idade! Tente novamente.',{duration:600})
              : null;
          });
      }catch (e){
        console.log("fail", e)
      }
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
      //this.$store.commit('sidebar/toggleSidebar')
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
    copyLinkAffiliate() {
      navigator.clipboard.writeText(this.link_indication+this.user_id)
      //navigator.clipboard.writeText(this.link_indication)
      this.$toast.success('Link Copiado!',{duration:600})
    },
    async getUser() {
      try {
        if(await this.$cookies.get("tokenauth")){
          await this.$axios.get("/laravel/api/user")
            .then(res => {
              this.user_id = res.data.data.id;
              this.username = res.data.data.username;
            })
            .catch(err => {
              this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
            });
        }
      }catch (e){
        console.log("fail", e)
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
