<template>
  <div>
    <div class="container-fluid">
      <div class="row mt-3">
        <div class="col-md-12">
          <div class="card border-0" style="background:transparent;">
            <div class="card-body">
              <ul class="nav nav-pills navtab-bg nav-justified">
                <li class="nav-item">
                  <NuxtLink :to="{ name:'cassino-conta'}" data-toggle="tab" aria-expanded="false" class="nav-link">
                    <span class="d-none d-sm-block">Perfil</span>
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink :to="{ name:'cassino-conta-historico'}" data-toggle="tab" aria-expanded="false" class="nav-link">
                    <span class="d-none d-sm-block">Histórico</span>
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink :to="{ name:'cassino-conta-transacoes'}" data-toggle="tab" aria-expanded="false" class="nav-link active">
                    <span class="d-none d-sm-block">Transações</span>
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink :to="{ name:'cassino-conta-senha'}" data-toggle="tab" aria-expanded="false" class="nav-link">
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

                          <NuxtLink :to="{ name:'cassino-conta-transacoes-depositos'}" class="dropdown-item">
                            <fa-icon :icon="faPlusSquare" style="margin-right: 10px;"/>
                            Depósitos
                          </NuxtLink>
                          <NuxtLink :to="{ name:'cassino-conta-transacoes-saques'}" class="dropdown-item">
                            <fa-icon :icon="faMinusSquare" style="margin-right: 10px;"/>
                            Saques
                          </NuxtLink>

                        </div>
                      </div>
                    </div>
                    <div class="col-md-9">
                      <div class="card border-0 bg-dark" style="background-color: #303841 !important;">
                        <div class="card-body">
                          <h3 class="text-white">Transações</h3>

                          <div class="row table-header d-none d-sm-none d-md-block d-lg-block d-lg-block">
                            <div class="col-sm-3">Data</div>
                            <div class="col-sm-3">Tipo</div>
                            <div class="col-sm-3">Valor</div>
                            <div class="col-sm-3">Status</div>
                          </div>

                          <div class="row table-line" v-for="(item, index) in this.transactions">
                            <div class="col-sm-3 col-12 text-center">
                              <strong class="d-block d-sm-none">
                                Data:
                              </strong>
                              {{item.created_at}}
                            </div>
                            <div class="col-sm-3 col-12 text-center">
                              <strong class="d-block d-sm-none">
                                Tipo:
                              </strong>
                              {{item.type}}
                            </div>
                            <div class="col-sm-3 col-12 text-center">
                              <strong class="d-block d-sm-none">
                                Valor:
                              </strong>
                              R$ {{item.amount}}
                            </div>
                            <div class="col-sm-3 col-12 text-center">
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
  layout: 'defaultcassino',

  data() {
    return {
      loading: false,
      transactions: [],
      page: null,
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
  },

  mounted() {
    this.getTransactions();
  },

  methods: {
    async getTransactions() {
      await this.$axios.get("/laravel/api/account/transactions/deposits")
        .then(res => {
          this.transactions = res.data.data
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
  },
}
</script>
