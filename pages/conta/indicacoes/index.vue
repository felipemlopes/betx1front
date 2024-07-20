<template>
  <div>
    <div class="container-fluid">
      <div class="row mt-3">
        <div class="col-md-12">
          <div class="card border-0" style="background:transparent;">
            <div class="card-body">

              <div class="tab-content text-muted">
                <div class="tab-pane active">
                  <div class="row mt-3">
                    <div class="col-md-12">
                      <div class="card border-0 bg-dark">
                        <div class="card-body">
                          <h3 class="text-white">Indicações</h3>

                          <div class="row table-header d-none d-sm-none d-md-block d-lg-block d-lg-block">
                            <div class="col-sm-4 text-center">Data</div>
                            <div class="col-sm-4 text-center">Usuário</div>
                            <div class="col-sm-4 text-center">Depositou</div>
                          </div>

                          <div class="row table-line" v-for="(item, index) in this.users">
                            <div class="col-sm-4 col-12 text-center">
                              <strong class="d-block d-sm-none">
                                Data:
                              </strong>
                              {{item.created_at}}
                            </div>
                            <div class="col-sm-4 col-12 text-center">
                              <strong class="d-block d-sm-none">
                                Usuário:
                              </strong>
                              {{item.name}}
                            </div>
                            <div class="col-sm-4 col-12 text-center">
                              <strong class="d-block d-sm-none">
                                Depositou:
                              </strong>
                              <span class="text-danger" v-if="item.deposited">Sim</span>
                              <span class="text-success" v-else>Não</span>
                            </div>
                          </div>

                          <div class="noresult" v-show="pagination.count===0">
                            <div class="text-center">
                              <h5 class="mt-2">Registros não foram encontrados</h5>
                            </div>
                          </div>

                          <div class="d-flex justify-content-center mt-2" v-show="pagination.count!==0">
                            <ul class="pagination">
                              <li class="page-item">
                                <a class="page-link" :class="{'disabled' : pagination.currentPage===1}" v-on:click="goPrevPage()">
                                  <span aria-hidden="true">«</span>
                                </a>
                              </li>
                              <li class="page-item">
                                <a class="page-link">{{ page }}</a>
                              </li>
                              <li class="page-item">
                                <a class="page-link" :class="{'disabled' : pagination.currentPage===pagination.totalPages}" v-on:click="goNextPage()">
                                  <span aria-hidden="true">»</span>
                                </a>
                              </li>
                            </ul>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
  layout: 'conta',

  data() {
    return {
      loading: false,
      users: [],
      page: 1,
      pagination: {
        count: null,
        total: null,
        perPage: null,
        currentPage: null,
        totalPages: null,
      },
    };
  },

  mounted() {
    this.getIndications();
  },

  methods: {
    async getIndications() {
      await this.$axios.get("/laravel/api/account/indications?page="+this.page)
        .then(res => {
          this.users = res.data.data
          this.pagination.count = res.data.pagination.count;
          this.pagination.total = res.data.pagination.total;
          this.pagination.perPage = res.data.pagination.perPage;
          this.pagination.currentPage = res.data.pagination.currentPage;
          this.pagination.totalPages = res.data.pagination.totalPages;
        })
        .catch(err => {
          this.$toast.success(JSON.parse(err.request.response).error.message,{duration:600})
        });
    },
    goPrevPage() {
      if(this.page>1){
        this.page--;
        this.getIndications();
      }
    },
    goNextPage() {
      if(this.page<this.pagination.totalPages){
        this.page++;
        this.getIndications();
      }
    },
  },
}
</script>
