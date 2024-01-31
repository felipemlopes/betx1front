<template>

  <div class="">

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
  },
  methods: {
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
  },
}
</script>
