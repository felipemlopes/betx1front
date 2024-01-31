<template>

  <div class="">
    <div class="embed-responsive embed-responsive-16by9">
      <iframe class="embed-responsive-item"
        id="slot-iframe"
        :src="iframe"
        frameborder="0"
        allowfullscreen
        allow="autoplay"></iframe>
    </div>

  </div>

</template>

<script>

export default {
  name: '',
  layout: 'defaultcassino',
  data(){
    return {
      id: null,
      name: null,
      slug: null,
      image: null,
      external_id: null,
      iframe: null,
      token: null,
    };
  },
  computed: {

  },
  mounted() {
    this.getGame();
    this.getIframe();
    window.addEventListener('message', this.onReceiveMessage)
    this.$store.dispatch('user/fetchBalance')
  },
  methods: {
    onReceiveMessage(event) {
      try {
        if(JSON.parse(event.data).balance){
          this.$store.commit('user/setTotalbalance',JSON.parse(event.data).balance)
        }
      } catch(err) {
      }
    },
    async getGame() {
      await this.$axios.get("/laravel/api/cassino/games/"+this.$route.params.slug)
        .then(res => {
          this.id = res.data.data.id;
          this.name = res.data.data.name;
          this.slug = res.data.data.slug;
          this.image = res.data.data.image;
          this.external_id = res.data.data.external_id;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
    async getIframe() {
      await this.$axios.get("/laravel/api/cassino/games/"+this.$route.params.slug+"/token")
        .then(res => {
          this.iframe = res.data.data.IframeUrl;
          this.token = res.data.data.name;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
  },
}
</script>
