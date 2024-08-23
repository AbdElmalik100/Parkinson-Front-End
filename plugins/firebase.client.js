import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

export default defineNuxtPlugin(nuxtApp => {
    const firebaseConfig = {
        apiKey: "AIzaSyAjqrtrfPSbSyzPsaj_dHI2qPbofesUILY",
        authDomain: "parkinson-storage.firebaseapp.com",
        projectId: "parkinson-storage",
        storageBucket: "parkinson-storage.appspot.com",
        messagingSenderId: "820197052818",
        appId: "1:820197052818:web:79c99cb0f005f5d846b14b"
    };
    
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app)

    nuxtApp.vueApp.provide('storage', storage)
    nuxtApp.provide('storage', storage)
})

