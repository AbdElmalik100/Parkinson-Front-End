import { defineStore } from 'pinia'
import { toast } from "vue3-toastify";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from '~/plugins/axios'

export const useStore = defineStore('store', (nuxtApp) => {
    const { $axios, $storage } = useNuxtApp()
    // const $axios = axios().provide.axios


    const user = ref(null)
    const editUser = ref(null)
    const drawingResult = ref(null)
    const MRIResult = ref(null)
    const voiceResult = ref(null)
    const tappyResult = ref(null)

    const isAuthenticated = () => {
        return localStorage.getItem("UT") ? true : false
    }

    const getLoggedInUser = async () => {
        if (isAuthenticated()) {
            await $axios.get('auth/users/me')
                .then(response => {
                    user.value = response.data
                }).catch(error => {
                    localStorage.removeItem("UT")
                    navigateTo({
                        name: "index"
                    })
                })
        }
    }

    const updateUser = async (file, loading) => {
        loading.value = true
        if (file.value === null) {
            updateUserFun(loading)
        } else {
            await uploadBytes(storageRef($storage, `avatar/${file.value.name}`), file.value)
                .then(snapshot => {
                    getDownloadURL(snapshot.ref)
                        .then(downloadURL => {
                            console.log(downloadURL);
                            editUser.value.avatar = downloadURL
                            updateUserFun(loading)
                        })
                })
        }
    }

    const updateUserFun = async (loading) => {
        await $axios.put('auth/users/me/', editUser.value)
            .then(response => {
                console.log(response);
                toast("Profile Updated!", {
                    "transition": {
                        "enter": "animate__animated animate__fadeInRight animate__faster",
                        "exit": "animate__animated animate__fadeOutRight animate__faster",
                    },
                    "theme": "dark",
                    "type": "success",
                    "hideProgressBar": true,
                    "multiple": false,
                })
                setTimeout(() => {
                    location.reload()
                }, 1500)
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                loading.value = false
            })
    }

    const login = async (form, errors, loading) => {
        loading.value = true
        await $axios.post('auth/token/login/', form.value)
            .then(response => {
                localStorage.setItem("UT", response.data.auth_token)
                $axios.defaults.headers.Authorization = `token ${response.data.auth_token}`
                $axios.get("auth/users/me")
                    .then(innerResponse => {
                        user.value = innerResponse.data
                        navigateTo({
                            name: "index"
                        })
                    })
            }).catch(error => {
                errors.value = error.response.data
                if (error.response.data.non_field_errors) {
                    toast("Invalid email or password!", {
                        "transition": {
                            "enter": "animate__animated animate__fadeInRight animate__faster",
                            "exit": "animate__animated animate__fadeOutRight animate__faster",
                        },
                        "theme": "dark",
                        "type": "error",
                        "hideProgressBar": true,
                        "multiple": false,
                    })
                }
            }).finally(() => {
                loading.value = false
            })
    }

    const register = async (form, errors, loading) => {
        loading.value = true
        await $axios.post('auth/users/', form.value)
            .then(response => {
                console.log(response.data);
                navigateTo({
                    name: 'login'
                })
            }).catch(error => {
                errors.value = error.response.data
            }).finally(() => {
                loading.value = false
            })
    }

    const logout = async () => {
        await $axios.post('auth/token/logout/')
            .then(response => {
                console.log("logged out!");
                localStorage.removeItem("UT")
                $axios.defaults.headers.Authorization = ''
                user.value = null
                navigateTo({
                    name: 'login'
                })
            })
    }



    const contactUs = async (contactForm, loading) => {
        loading.value = true
        await $axios.post("api/contact/", contactForm.value)
            .then(response => {
                console.log(response);
                toast("Message has been sent!", {
                    "icon": () => h('i', { class: 'fa-solid fa-paper-plane fs-5' }),
                    "transition": {
                        "enter": "animate__animated animate__fadeInRight animate__faster",
                        "exit": "animate__animated animate__fadeOutRight animate__faster",
                    },
                    "theme": "dark",
                    "type": "success",
                    "hideProgressBar": true,
                    "multiple": false,
                })
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                loading.value = false
            })
    }

    const drawing = async (form, loading) => {
        await $axios.post('api/drawing/', form)
            .then(response => {
                console.log(response.data);
                drawingResult.value = response.data
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                loading.value = false
            })
    }

    const MRI = async (form, loading) => {
        await $axios.post('api/mri/', form)
            .then(response => {
                console.log(response.data);
                MRIResult.value = response.data
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                loading.value = false
            })
    }

    const voiceBiometrics = async (form, loading) => {
        await $axios.post('api/voice_biometrics/', form)
            .then(response => {
                console.log(response.data);
                voiceResult.value = response.data
            }).catch(error => {
                toast("File type must be WAV", {
                    "transition": {
                        "enter": "animate__animated animate__fadeInRight animate__faster",
                        "exit": "animate__animated animate__fadeOutRight animate__faster",
                    },
                    "theme": "dark",
                    "type": "error",
                    "hideProgressBar": true,
                    "multiple": false,
                })
            }).finally(() => {
                loading.value = false
            })
    }

    const tappyKeyboard = async (form, loading) => {
        await $axios.post('api/tappy_keyboard/', form)
            .then(response => {
                console.log(response.data);
                tappyResult.value = response.data
            }).catch(error => {
                toast("File type must be XLS or XLSX", {
                    "transition": {
                        "enter": "animate__animated animate__fadeInRight animate__faster",
                        "exit": "animate__animated animate__fadeOutRight animate__faster",
                    },
                    "theme": "dark",
                    "type": "error",
                    "hideProgressBar": true,
                    "multiple": false,
                })
            }).finally(() => {
                loading.value = false
            })
    }


    return {
        user,
        editUser,
        drawingResult,
        MRIResult,
        voiceResult,
        tappyResult,
        isAuthenticated,
        getLoggedInUser,
        updateUser,
        register,
        login,
        logout,
        contactUs,
        drawing,
        MRI,
        voiceBiometrics,
        tappyKeyboard
    }
})