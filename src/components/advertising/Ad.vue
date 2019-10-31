<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-card v-if="!loading">
                    <v-img
                        :src="ad.imageSrc"
                        height="300px"
                    ></v-img>
                    <v-card-text>
                        <h1 class="text--primary">{{ ad.title }}</h1>
                        <p>{{ ad.description }}</p>
                    </v-card-text>
                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <app-edit-ad-modal :ad="ad" v-if="isOwner"></app-edit-ad-modal>
                        <app-buy-modal :ad="ad"></app-buy-modal>
                    </v-card-actions>
                </v-card>
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
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import EditAdModal from './EditAdModal'
    export default {
        props: ['id'],
        computed: {
            ad() {
                const id = this.id
                return this.$store.getters.adById(id)
            },
            loading() {
                return this.$store.getters.loading
            },
            isOwner() {
                return this.ad.ownerId === this.$store.getters.user.id
            }
        },
        components:{
            appEditAdModal: EditAdModal
        }
    }
</script>
