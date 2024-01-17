<template>
  <div>
    <div class="container-fluid">
      <div class="row mt-3">
        <div class="col-md-12">
          <div class="card border-0" style="background:transparent;">
            <div class="card-body">
              <ul class="nav nav-pills navtab-bg nav-justified">
                <li class="nav-item">
                  <NuxtLink :to="{ name:'apostas-conta'}" data-toggle="tab" aria-expanded="false" class="nav-link">
                    <span class="d-none d-sm-block">Perfil</span>
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink :to="{ name:'apostas-conta-historico'}" data-toggle="tab" aria-expanded="false" class="nav-link active">
                    <span class="d-none d-sm-block">Histórico</span>
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink :to="{ name:'apostas-conta-transacoes-depositos'}" data-toggle="tab" aria-expanded="false" class="nav-link">
                    <span class="d-none d-sm-block">Transações</span>
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink :to="{ name:'apostas-conta-senha'}" data-toggle="tab" aria-expanded="false" class="nav-link">
                    <span class="d-none d-sm-block">Senha</span>
                  </NuxtLink>
                </li>
              </ul>

              <div class="tab-content text-muted">
                <div class="tab-pane active">
                  <div class="row mt-3">
                    <div class="col-md-12">
                      <div class="card border-0 bg-dark" style="background-color: #303841 !important;">
                        <div class="card-body">
                          <h3 class="text-white">Histórico</h3>

                          <div class="row table-header d-none d-sm-none d-md-block d-lg-block d-lg-block">
                            <div class="col-sm-2">Data</div>
                            <div class="col-sm-2">Jogo</div>
                            <div class="col-sm-3">Valor</div>
                            <div class="col-sm-2">Multiplicador</div>
                            <div class="col-sm-3">Lucro</div>
                          </div>

                          <div class="row table-line" v-for="(item, index) in this.bets">
                            <div class="col-sm-2 col-12 text-center">
                              <strong class="d-block d-sm-none">
                                Data:
                              </strong>
                              {{item.created_at}}
                            </div>
                            <div class="col-sm-2 col-12 text-center">
                              <strong class="d-block d-sm-none">
                                Jogo:
                              </strong>
                              {{item.game}}
                            </div>
                            <div class="col-sm-3 col-12 text-center">
                              <strong class="d-block d-sm-none">
                                Valor:
                              </strong>
                              <span class="text-danger" v-if="item.amount==='0,00'">R$ {{item.amount}}</span>
                              <span class="text-success" v-else>R$ {{item.amount}}</span>
                            </div>
                            <div class="col-sm-2 col-12 text-center">
                              <strong class="d-block d-sm-none">
                                Multiplicador:
                              </strong>
                              {{item.multiplier}}
                            </div>
                            <div class="col-sm-3 col-12 text-center">
                              <strong class="d-block d-sm-none">
                                Lucro:
                              </strong>
                               <span class="text-danger" v-if="item.win_amount==='0,00'">R$ {{item.win_amount}}</span>
                               <span class="text-success" v-else>R$ {{item.win_amount}}</span>
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
  layout: 'defaultaposta',

  data() {
    return {
      loading: false,
      bets: [],
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
    this.getBets();
  },

  methods: {
    async getBets() {
      this.$axios.get("/laravel/api/account/bets?page="+this.page)
        .then(res => {
          this.bets = res.data.data
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
        this.getBets();
      }
    },
    goNextPage() {
      if(this.page<this.pagination.totalPages){
        this.page++;
        this.getBets();
      }
    },
  },
}
</script>
