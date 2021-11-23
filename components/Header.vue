<template>
  <div>
    <client-only>
      <!-- Client only nav not working ssr:true. should be fix error  -->
      <nav class="panel-menu" id="mobile-menu">
        <ul>
        </ul>
        <div class="mm-navbtn-names">
          <div class="mm-closebtn">
            Close
            <div class="tt-icon">
              <svg>
                <use xlink:href="#icon-cancel"></use>
              </svg>
            </div>
          </div>
          <div class="mm-backbtn">Back</div>
        </div>
      </nav>
    </client-only>
    <header id="tt-header">
      <div class="container">
        <div class="row tt-row no-gutters">
          <div class="col-auto">
            <!-- toggle mobile menu -->
            <a class="toggle-mobile-menu" href="#">
              <svg class="tt-icon">
                <use xlink:href="#icon-menu_icon"></use>
              </svg>
            </a>
            <!-- /toggle mobile menu -->
            <!-- logo -->
            <div class="tt-logo">
              <NuxtLink to="/"><img src="/favicon.ico" alt=""></NuxtLink>
            </div>
            <!-- /logo -->
            <!-- desctop menu -->
            <div class="tt-desktop-menu">
              <nav>
                <ul>
                  <li><a href="page-categories.html"><span>Categories</span></a></li>
                  <li><a href="page-tabs.html"><span>Trending</span></a></li>
                  <li><a href="page-create-topic.html"><span>New</span></a></li>
                  <li>
                    <a href="page-single-user.html"><span>Pages</span></a>
                    <ul>
                      <li><a href="index.html">Home</a></li>
                      <li><NuxtLink to="/topics">Topic</NuxtLink></li>
                      <li><NuxtLink :to="{name: 'user-id', params: {id: 1}}">Profile</NuxtLink></li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
            <!-- /desctop menu -->
            <!-- tt-search -->
            <div class="tt-search">
              <!-- toggle -->
              <button class="tt-search-toggle" data-toggle="modal" data-target="#modalAdvancedSearch">
                <svg class="tt-icon">
                  <use xlink:href="#icon-search"></use>
                </svg>
              </button>
              <!-- /toggle -->
              <form class="search-wrapper">
                <div class="search-form">
                  <input type="text" class="tt-search__input" name="search" placeholder="Search">
                  <button class="tt-search__btn" type="submit">
                    <svg class="tt-icon">
                      <use xlink:href="#icon-search"></use>
                    </svg>
                  </button>
                  <button class="tt-search__close">
                    <svg class="tt-icon">
                      <use xlink:href="#cancel"></use>
                    </svg>
                  </button>
                </div>
                <div class="search-results">
                  <div class="tt-search-scroll">
                    <ul>
                      <li>
                        <a href="page-single-topic.html">
                          <h6 class="tt-title">Rdr2 secret easter eggs</h6>
                          <div class="tt-description">
                            Here’s what I’ve found in Red Dead Redem..
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="page-single-topic.html">
                          <h6 class="tt-title">Top 10 easter eggs in Red Dead Rede..</h6>
                          <div class="tt-description">
                            You can find these easter eggs in Red Dea..
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="page-single-topic.html">
                          <h6 class="tt-title">Red Dead Redemtion: Arthur Morgan..</h6>
                          <div class="tt-description">
                            Here’s what I’ve found in Red Dead Redem..
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="page-single-topic.html">
                          <h6 class="tt-title">Rdr2 secret easter eggs</h6>
                          <div class="tt-description">
                            Here’s what I’ve found in Red Dead Redem..
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="page-single-topic.html">
                          <h6 class="tt-title">Top 10 easter eggs in Red Dead Rede..</h6>
                          <div class="tt-description">
                            You can find these easter eggs in Red Dea..
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="page-single-topic.html">
                          <h6 class="tt-title">Red Dead Redemtion: Arthur Morgan..</h6>
                          <div class="tt-description">
                            Here’s what I’ve found in Red Dead Redem..
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <button type="button" class="tt-view-all" data-toggle="modal" data-target="#modalAdvancedSearch">Advanced Search</button>
                </div>
              </form>
            </div>
            <!-- /tt-search -->
          </div>
          <div class="col-auto ml-auto">
            <div v-if="!authenticated" class="tt-account-btn">
              <NuxtLink to="/login" class="btn btn-primary">Log in</NuxtLink>
              <NuxtLink to="/register" class="btn btn-secondary">Sign up</NuxtLink>
            </div>
            <div v-else>
              <div class="tt-user-info d-flex justify-content-center">
                <a href="#" class="tt-btn-icon">
                  <i class="tt-icon"><svg><use xlink:href="#icon-notification"></use></svg></i>
                </a>
                <div class="tt-avatar-icon tt-size-md">
                  <i class="tt-icon"><svg><use xlink:href="#icon-ava-a"></use></svg></i>
                </div>

                <div class="w3-dropdown-hover">
                  <div class="btn btn-primary">{{user.name}}</div>
                  <div id="toggleUser" class="w3-dropdown-content w3-bar-block w3-border">
                    <NuxtLink :to="{name: 'user-id', params: {id: user.id}}" class="w3-bar-item w3-button">Profile</NuxtLink>
                    <a href="/logout" @click.prevent="logout" class="w3-bar-item w3-button">Logout</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    logout(){
      this.$auth.logout()
    }
  }
}
</script>

<style lang="css" scoped>
</style>