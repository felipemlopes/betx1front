<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="wow fadeInRight" style="visibility: visible; animation-name: fadeInRight;">
          <h1 class="text-dark font-size57 font-bold text-center">
            {{ title }}
          </h1>
          <div class="mt-50">
            <div class="card mt-2">
              <div class="card-body text-white" v-html="content">
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
  layout: 'default',

  data(){
    return {
      title: null,
      slug: null,
      content: null,
    };
  },
  mounted() {
    this.getPage();
  },
  methods: {
    async getPage() {
      await this.$axios.get("/laravel/api/pages/"+this.$route.params.slug)
        .then(res => {
          this.title = res.data.data.title;
          this.slug = res.data.data.slug;
          this.content = res.data.data.content;

        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
  },
}
</script>
