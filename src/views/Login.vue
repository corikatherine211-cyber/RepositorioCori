<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Login</ion-title>
                <ion-buttons slot="end">
                    <ion-button fill="solid" @click="router.push({ name: 'Registro'})">Registrarse</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <h2>Pokémon</h2>
            <div v-for="pokemon in pokemonStore.pokemons" :key="pokemon.name">
                {{ pokemon.name }}
            </div>

            <h2>Gatos</h2>
            <div v-for="gato in pokemonStore.gatos" :key="gato.url">
                <img :src="gato.url" width="150" />
            </div>

            <ion-item lines="none">                
                <ion-input 
                    label="Usuario" 
                    :disabled="loading"
                    class="ion-margin-top"
                    label-placement="floating" 
                    fill="outline" 
                    v-model="userStore.login.username"
                    placeholder="Enter text">
                </ion-input>
            </ion-item>

            <ion-item lines="none">
                <ion-input 
                    label="Contraseña" 
                    :disabled="loading"
                    label-placement="floating" 
                    class="ion-margin-top"
                    fill="outline" 
                    placeholder="Enter text" 
                    v-model="userStore.login.password"
                    @keyup.enter="handleLogin"
                    type="password">
                </ion-input>
            </ion-item>   

            <ion-item class="ion-margin-bottom" lines="none">
                <ion-button 
                    slot="end" 
                    size="default" 
                    @click="handleLogin"
                    :disabled="loading"> 
                    <span v-if="!loading">Ingresar</span>
                    <ion-spinner v-if="loading" name="crescent"></ion-spinner>
                </ion-button>
            </ion-item>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { usePokemonStore } from "@/stores/pokemonStore"

import { IonPage, IonHeader, IonToolbar, 
    IonTitle, IonContent, alertController, 
    IonItem, IonInput, IonButton, IonButtons, IonSpinner } from '@ionic/vue';
import { useUserStore } from '@/stores/user';
import { useContentStore } from '@/stores/content';
import { useRouter } from 'vue-router';

const pokemonStore = usePokemonStore()
const userStore = useUserStore();
const contentStore = useContentStore();
const router = useRouter();
const loading = ref(false);

onMounted(() => {
  pokemonStore.cargarPokemons()
  pokemonStore.cargarGatos()
})

function handleLogin() {
    loading.value = true;
    userStore.$login().then(res => {
        loading.value = false;
        contentStore.$getContent(contentStore.home.internal_name).then(res => {
            router.push({ path: '/'+contentStore.home.url });
        });
    }).catch(error => {
        alertController.create({
            header: 'Error de inicio de sesión',
            message: error.response.data.message,
            buttons: ['Continuar'],
        }).then(alert => alert.present());
        loading.value = false;
    })
}
</script>