import axios from "axios"

export default defineNuxtPlugin(nuxtApp => {
    const axiosAPI = axios.create({
        // baseURL: 'http://127.0.0.1:8000/',
        baseURL: 'https://parkinson-aidnet-back-end.up.railway.app/',
        proxy: false,
        withCredentials: false,
        headers: {
            Authorization: ''
        }
    })
    if (process.server !== true) {
        if (localStorage.getItem("UT")) {
            axiosAPI.defaults.headers.Authorization = `token ${localStorage.getItem("UT")}`
        } else axiosAPI.defaults.headers.Authorization = ''
    }

    return {
        provide: {
            axios: axiosAPI
        }
    }
})