<template>
  <!-- App.vue -->
  <v-app>
      <v-navigation-drawer
              app
              temporary
              v-model="drawer"
      >
          <v-list>
              <v-list-item
                      v-for="link of links"
                      :key="link.title"
                      :to="link.url"
              >
                  <v-list-item-icon>
                      <v-icon>{{ link.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                      <v-list-item-title v-text="link.title"></v-list-item-title>
                  </v-list-item-content>

              </v-list-item>

              <v-list-item
                      v-if="isUserLoggedIn"
                      @click="onLogout"
              >
                  <v-list-item-icon>
                      <v-icon>exit_to_app</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                      <v-list-item-title v-text="'Logout'"></v-list-item-title>
                  </v-list-item-content>

              </v-list-item>

          </v-list>
      </v-navigation-drawer>

      <v-app-bar app color="primary" dark>

          <v-app-bar-nav-icon
            @click="drawer = !drawer"
            class="hidden-md-and-up"
          ></v-app-bar-nav-icon>

          <v-toolbar-title>
              <router-link to="/" tag="span" class="pointer">
                  Ad application
              </router-link>
          </v-toolbar-title>

          <div class="flex-grow-1"></div>

          <v-toolbar-items class="hidden-sm-and-down">
              <v-btn
                      v-for="link in links"
                      :key="link.title"
                      :to="link.url"
                  text
              >
                  <v-icon left>{{ link.icon }}</v-icon>
                  {{ link.title }}
              </v-btn>

              <v-btn
                      @click="onLogout"
                      text
                      v-if="isUserLoggedIn"
              >
                  <v-icon left>exit_to_app</v-icon>
                  Logout
              </v-btn>

          </v-toolbar-items>
      </v-app-bar>

      <v-content>
          <router-view></router-view>
      </v-content>
    <template v-if="error">
        <v-snackbar
                :color="error"
                :multi-line="true"
                :timeout="5000"
                @input="closeError"
                :value="true"

        >
            {{ error }}
            <v-btn
                    dark
                    text
                    @click.native="closeError"
            >
                Close
            </v-btn>
        </v-snackbar>
    </template>

  </v-app>

</template>

<script>

    export default {
        data() {
            return {
                drawer: false
            }
        },
        computed: {
            error() {
                return this.$store.getters.error
            },
            isUserLoggedIn() {
                return this.$store.getters.isUserLoggedIn
            },
            links() {
                if(this.isUserLoggedIn) {
                    return [
                        { title: 'Orders', icon: 'bookmark_border', url: '/orders'},
                        { title: 'New ad', icon: 'note_add', url: '/news'},
                        { title: 'My ads', icon: 'list', url: '/list'},
                    ]
                }
                    return [
                        { title: 'Login', icon: 'lock', url: '/login'},
                        { title: 'Registration', icon: 'face', url: '/registration'},
                    ]
            }
        },
        methods: {
            closeError() {
                this.$store.dispatch('clearError')
            },
            onLogout() {
                this.$store.dispatch('logoutUser')
                this.$router.push('/')
            }
        }
    };
</script>

<style scoped="">
    .pointer {
        cursor: pointer;
    }
</style>
