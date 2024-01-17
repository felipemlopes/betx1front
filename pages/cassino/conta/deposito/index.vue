<template>
  <div>
    <div class="container">
      <h1 class="text-center">
        Depósito
      </h1>
      <div class="col-md-12 text-center mt-5" v-show="codecopy===null">
        <a class="btn btn-outline-success mr-1 btn-lg optvalor" v-on:click="setAmount(120)">
          R$120
        </a>
        <a class="btn btn-outline-success mr-1 btn-lg optvalor" v-on:click="setAmount(240)">
          R$240
        </a>
        <a class="btn btn-outline-success btn-lg optvalor" v-on:click="setAmount(600)">
          R$600
        </a>
      </div>

      <div class="form" v-show="codecopy===null">
        <form @submit.prevent="deposit">
          <div class="col-md-12 mb-3 pb-3">
            <div class="row justify-content-center">
              <div class="col-md-5">
                <div class="form-group text-white">
                  <label for="">Valor</label>
                  <input type="text" id="amount" name="amount"class="form-control" v-mask="['######']" v-model="form.amount" autocomplete="off">
                  <div class="invalid-feedback d-block" v-show="error.amount">{{ error.amount }}</div>
                  <div class="text-info text-center mt-2">*Valor mínimo R$10.</div>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center">
            <button class="btn btn-primary">Enviar</button>
          </div>
        </form>
      </div>

      <div v-show="codecopy!==null">
        <div class="pt-2 text-center">
          <img :src="imageQRCode" style="max-width:100%; height: 200px;" />
        </div>

        <div class="row justify-content-center">
          <div class="col-md-5 mt-2 text-center text-white">
            Você deve pagar escolhendo a opção
            <strong>Pix copia e cola</strong> no seu aplicativo
            de pagamento ou Internet Banking (banco online). Neste caso
            copie e cole clicando no botão abaixo:
            <br>
            <a class="pointer btn btn-primary mt-3" v-on:click="copyPixCode">
              <i class="uil uil-copy"></i> Copiar
            </a>
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
      min_amount: false,
      codecopy: null,
      imageQRCode: "",
      form: {
        amount: null,
      },
      error: {
        amount: null,
      },
    };
  },

  mounted() {
    //this.getSettings()
  },

  methods: {
    setErrors(errors) {
      this.error.amount = errors.amount ? errors.amount[0] : null;
    },
    clearErrors() {
      this.error.amount = null;
    },
    setAmount(value) {
      this.form.amount = value
    },
    async getSettings() {
      await this.$axios.get("/laravel/api/settings")
        .then(res => {
          this.min_amount = res.data.data.min_amount;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
    async deposit() {
      this.loading = true;
      await this.$axios.post('/laravel/api/deposit', {
        amount: this.form.amount,
      })
        .then(res => {
          console.log(res.data.data.code)
          this.codecopy = res.data.data.code
          this.imageQRCode = 'https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl='+res.data.data.code
        }).catch(err => {
        const code = err
        console.log(code.response.data.error.message)
        this.error.amount = code.response.data.error.message
        //this.setErrors(code.response.data.errors)
      });
    },
    copyPixCode() {
      navigator.clipboard.writeText(this.codecopy)
      this.$toast.success('Código Copiado!',{duration:600})
    }
  },
}
</script>
