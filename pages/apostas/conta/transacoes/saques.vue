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
                  <NuxtLink :to="{ name:'apostas-conta-historico'}" data-toggle="tab" aria-expanded="false" class="nav-link">
                    <span class="d-none d-sm-block">Histórico</span>
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink :to="{ name:'apostas-conta-transacoes-depositos'}" data-toggle="tab" aria-expanded="false" class="nav-link active">
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
                    <div class="col-md-3">
                      <div class="card border-0 bg-dark" style="background-color: #303841 !important;">
                        <div class="card-body">

                          <NuxtLink :to="{ name:'apostas-conta-transacoes-depositos'}" class="dropdown-item">
                            <fa-icon :icon="faPlusSquare" style="margin-right: 10px;"/>
                            Depósitos
                          </NuxtLink>
                          <NuxtLink :to="{ name:'apostas-conta-transacoes-saques'}" class="dropdown-item active">
                            <fa-icon :icon="faMinusSquare" style="margin-right: 10px;"/>
                            Saques
                          </NuxtLink>

                        </div>
                      </div>
                    </div>
                    <div class="col-md-9">
                      <div class="card border-0 bg-dark" style="background-color: #303841 !important;">
                        <div class="card-body">
                          <h3 class="text-white">Saques</h3>

                          <div class="row table-header d-none d-sm-none d-md-block d-lg-block d-lg-block">
                            <div class="col-sm-4">Data</div>
                            <div class="col-sm-4">Valor</div>
                            <div class="col-sm-4">Status</div>
                          </div>

                          <div class="row table-line" v-for="(item, index) in this.transactions">
                            <div class="col-sm-4 col-12 text-center">
                              <strong class="d-block d-sm-none">
                                Data:
                              </strong>
                              {{item.created_at}}
                            </div>
                            <div class="col-sm-4 col-12 text-center">
                              <strong class="d-block d-sm-none">
                                Valor:
                              </strong>
                              R$ {{item.amount}}
                            </div>
                            <div class="col-sm-4 col-12 text-center">
                              <strong class="d-block d-sm-none">
                                Status:
                              </strong>
                              {{item.status}}
                            </div>
                          </div>

                          <div class="noresult" v-show="pagination.count===0">
                            <div class="text-center">
                              <h5 class="mt-2">Registros não foram encontrados</h5>
                            </div>
                          </div>

                          <div class="d-flex justify-content-center mt-2">
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
import {
  faClock, faDice, faDoorClosed, faFutbol,
  faGear,
  faGift,
  faMedal,
  faPlusSquare,
  faReceipt,
  faUserAlt,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons'
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons'
export default {
  layout: 'defaultaposta',

  data() {
    return {
      loading: false,
      transactions: [],
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

  computed: {
    faPlusSquare () {
      return faPlusSquare
    },
    faMinusSquare () {
      return faMinusSquare
    },
    prevPage () {
      return this.page-1
    },
    nextPage () {
      return this.page+1
    },
  },

  mounted() {
    this.getTransactions();
  },

  methods: {
    async getTransactions() {
      this.$axios.get("/laravel/api/account/transactions/withdrawals?page="+this.page)
        .then(res => {
          this.transactions = res.data.data
          //this.page = res.data.pagination.currentPage;
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
        this.getTransactions();
      }
    },
    goNextPage() {
      if(this.page<this.pagination.totalPages){
        this.page++;
        this.getTransactions();
      }
    },
  },
}
</script>
