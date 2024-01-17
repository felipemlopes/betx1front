<template>

  <div class="">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6">

            <div class="card bg-dark mt-5" style="background-color: rgb(48, 56, 65) !important;">
              <div class="card-body">
                <h4 class="fw-bold text-white">Verificação do email</h4>

                <p class="text-white-50">
                  Para sua segurança pedimos para confirmar o endereço de e-mail cadastrado (E necessário confirmar para poder usar a nossa plataforma!)! Clique no botão abaixo "Solicitar E-mail" em seguida vá na sua caixa de entrada (caso não esteja, vá à caixa de spam/lixo eletrônico) e confirme o e-mail para prosseguir e usar nossa plataforma!
                </p>

                <a class="btn btn-primary" v-on:click="resendLink">Solicitar E-mail</a>
              </div>
            </div>

          </div>
        </div>
      </div>
  </div>

</template>

<script>
import {faPlay} from '@fortawesome/free-solid-svg-icons'
export default {
  layout: 'default',
  data(){
    return {
      loading: false,
    };
  },
  computed: {
    faPlay () {
      return faPlay
    },
  },
  mounted() {

  },
  methods: {
    async resendLink() {
      this.loading = true
      await this.$axios.get("/laravel/api/email/reenviar")
        .then(res => {
          this.$toast.success("Email enviado!",{duration:600})
        })
        .catch(err => {
          this.$toast.error(JSON.parse(err.request.response).error.message,{duration:600})
        });
      this.loading = false
    },
  },
}
</script>
