<template>
    <div v-if="!loading">
        <v-container fluid>
            <v-layout row>
                <v-flex xs12>
                    <v-carousel>
                        <v-carousel-item
                                v-for="ad in promoAds"
                                :key="ad.id"
                                :src="ad.imageSrc"
                                reverse-transition="fade-transition"
                                transition="fade-transition"
                        >
                            <div class="carousel_link">
                                <v-btn class="error" :to="'/ad/' + ad.id">{{ ad.title }}</v-btn>
                            </div>
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex
                        xs12
                        sm6
                        md4
                        v-for="ad of ads"
                        :key="ad.id"
                >
                    <v-card>
                        <v-img
                                :src="ad.imageSrc"
                                height="200px"
                        ></v-img>

                        <v-card-title>
                            <h3>{{ ad.title }}</h3>
                        </v-card-title>

                        <v-card-text>
                            <p>{{ ad.description }}</p>
                        </v-card-text>

                        <v-card-actions>

                            <div class="flex-grow-1"></div>

                            <v-btn :to="'/ad/' + ad.id">Open</v-btn>

                            <app-buy-modal :ad="ad"></app-buy-modal>

                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
    <div v-else>
        <v-container fluid>
            <v-layout row>
                <v-flex xs12 class="text-center mt-12">
                    <v-progress-circular
                            :size="100"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        computed: {
            promoAds() {
                return this.$store.getters.promoAds
            },
            ads() {
                return this.$store.getters.ads
            },
            loading() {
                return this.$store.getters.loading
            }
        }
    }
</script>

<style lang="scss">
    .carousel_link {
        position: absolute;
        bottom: 50px;
        left: 50%;
        background: rgba(0, 0, 0, .5);
        padding: 5px 15px;
        border-radius: 5px 5px 0 0;
        transform: translate(-50%, 0);
    }
    .carousel_link a span {
        color: $primary;
    }
</style>