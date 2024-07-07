<template>

  <div class="container">
    <iframe v-if="hasiframe" class="embed-responsive-item"
            id="slot-iframe"
            :src="iframe"
            frameborder="0"
            allowfullscreen
            allow="autoplay" style="width: 100%;height: 100%;"></iframe>

    <iframe v-else class="embed-responsive-item"
            id="slot-iframe"
            :srcdoc="iframe"
            frameborder="0"
            allowfullscreen
            allow="autoplay" style="width: 100%;height: 100%;"></iframe>
  </div>

</template>

<script>

export default {
  name: '',
  layout: 'cassino',
  data(){
    return {
      id: null,
      name: null,
      slug: null,
      image: null,
      external_id: null,
      iframe: null,
      token: null,
      hasiframe: null,
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
          this.hasiframe = res.data.data.HasIframe;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
  },
}
</script>
