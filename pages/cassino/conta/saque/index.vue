<template>
  <div>
    <div class="container">
      <h1 class="text-center">
        Saque
      </h1>
      <div class="col-md-12 text-center mt-5">

      </div>

      <div class="col-md-12 mb-3 pb-3">
        <div class="row justify-content-center">
          <div class="col-md-5">
            <div class="form-group">
              <label class="">Tipo de Chave pix</label>
              <select class="form-control" name="pix_key_type" id="pix_key_type" v-model="form.pixkeytype">
                <option value="">-- Tipo de chave --</option>
                <option value="document">CPF</option>
                <option value="phoneNumber">Telefone</option>
                <option value="email">Email</option>
                <option value="randomKey">Aleatória</option>
              </select>
            </div>

            <div class="form-group text-white">
              <label for="">Chave pix</label>
              <input type="text" id="amount" name="amount"class="form-control" v-model="form.pixkey">
            </div>

            <div class="form-group text-white">
              <label for="">Valor</label>
              <input type="text" id="amount" name="amount"class="form-control" v-mask="['######']" v-model="form.amount">
            </div>

            <div class="form-group mt-30 text-white mt-3">
              <label class="form-label">Saldo disponível para saque: R$</label>
              <span>{{ this.$store.state.user.balance }}</span>
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
      min_amount: false,
      form: {
        amount: null,
        pixkeytype: "",
        pixkey: null,
      },
      error: {
        amount: null,
        pixkeytype: null,
        pixkey: null,
      },
    };
  },

  mounted() {
    //this.getSettings()
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
    },
    async getSettings() {
      this.$axios.get("/laravel/api/settings/")
        .then(res => {
          this.withdraw_min_amount = res.data.data.withdraw_min_amount;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
    async saque() {
      this.loading = true;
      this.$axios.post('/laravel/api/deposit', {
        amount: this.form.amount,
        pixkeytype: this.form.pixkeytype,
        pixkey: this.form.pixkey,
      })
        .then(res => {
          console.log(res)
        }).catch(err => {
        const code = err
        this.setErrors(code.response.data.errors)
      });
    },
  },
}
</script>
