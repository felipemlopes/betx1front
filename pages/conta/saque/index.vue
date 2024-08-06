<template>
  <div>
    <div class="container">
      <h1 class="text-center">
        Saque
      </h1>
      <div class="col-md-12 text-center mt-5">
        <div class="row justify-content-center" v-if="this.sended===false">
          <div class="col-md-5">
            <p class="text-white">
              Antes de fazer um saque Pix, certifique-se de ter registrado seu CPF como chave Pix no seu aplicativo bancário.
            </p>

            <ol class="text-white-50" style="text-align: left;">
              <li>Abra o aplicativo bancário</li>
              <li>Vá para a seção Pix do aplicativo bancário</li>
              <li>Selecione "Minhas Chaves"</li>
              <li> Selecione a opção "Registrar Chave," e registre seu CPF</li>
              <li>Assim que seu banco confirmar que a chave está registrada, você poderá receber saques via Pix</li>
            </ol>
          </div>

        </div>

      </div>

      <div class="col-md-12 mb-3 pb-3" v-if="this.sended===false">
        <div class="row justify-content-center">
          <div class="col-md-5">

            <div class="form-group text-white">
              <label for="">Valor</label>
              <input type="text" id="amount" name="amount"class="form-control" v-mask="['######']" v-model="form.amount">
              <div class="text-danger" v-show="error.amount">{{ error.amount }}</div>
            </div>

            <div class="form-group mt-30 text-white mt-3">
              <label class="form-label">Saldo disponível para saque: R$</label>
              <span>{{ this.available_amount }}</span>
            </div>

            <div class="text-danger" v-show="error.message">{{ error.message }}</div>

            <a class="pointer btn btn-primary mt-3" v-on:click="saque" :disabled="loading">
              <span v-show="loading">Enviando</span>
              <span v-show="!loading">Enviar</span>
            </a>

          </div>

        </div>
      </div>
      <div v-else>
        <div class="row justify-content-center">
          <div class="col-md-5 mt-5">


            <p class="text-center">
              <fa-icon :icon="faCheck" class="fs-24 text-success"/>
            </p>

            <p class="text-center text-success fs-3"> Enviado com sucesso!</p>


          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {faCheck} from '@fortawesome/free-solid-svg-icons'
export default {
  layout: 'conta',

  data() {
    return {
      loading: false,
      sended: false,
      min_amount: false,
      available_amount: 0.00,
      form: {
        amount: null,
        pixkeytype: "",
        pixkey: null,
      },
      error: {
        amount: null,
        pixkeytype: null,
        pixkey: null,
        message: null,
      },
    };
  },
  computed: {
    faCheck () {
      return faCheck
    },
  },
  mounted() {
    //this.getSettings()
    this.getAvailableAmount()
  },

  methods: {
    setErrors(errors) {
      this.error.amount = errors.amount ? errors.amount[0] : null;
      this.error.pixkeytype = errors.pixkeytype ? errors.pixkeytype[0] : null;
      this.error.pixkey = errors.pixkey ? errors.pixkey[0] : null;
    },
    clearErrors() {
      this.error.amount = null;
      this.error.pixkeytype = null;
      this.error.pixkey = null;
      this.error.message = null;
    },
    async getSettings() {
      await this.$axios.get("/laravel/api/settings")
        .then(res => {
          this.withdraw_min_amount = res.data.data.withdraw_min_amount;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
    async getAvailableAmount() {
      await this.$axios.get("/laravel/api/user/balance/available")
        .then(res => {
          this.available_amount = res.data.data.amount;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
    async saque() {
      this.clearErrors()
      this.loading = true;
      await this.$axios.post('/laravel/api/account/withdrawals', {
        amount: this.form.amount,
        pixkeytype: this.form.pixkeytype,
        pixkey: this.form.pixkey,
      })
        .then(res => {
          console.log(res)
          this.$toast.success("Solicitado com sucesso",{duration:600})
          this.sended = true
          this.loading = false;
        }).catch(err => {
          const code = err
          if(code.response.data.errors){
            this.setErrors(code.response.data.errors)
          }else if(code.response.data.error){
            this.error.message = code.response.data.error.message
          }
          this.loading = false;
        });
    },
  },
}
</script>
