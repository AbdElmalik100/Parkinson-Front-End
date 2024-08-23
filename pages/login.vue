<template>
    <div class="login-page min-vh-100">
        <div class="container d-flex align-items-center flex-md-row flex-column gap-4 py-5">
            <div class="left-side flex-fill text-center">
                <img class="img-fluid" src="assets/images/login.png" alt="">
            </div>
            <div class="right-side flex-fill p-4 rounded-2">
                <div class="head text-center">
                    <h3 class="text-uppercase mb-2 fw-bold">Login</h3>
                    <p class="text-muted mb-0 w-75 mx-auto">
                        Welcome back, please login into your account to continue with us.
                    </p>
                </div>
                <form class="login-form d-flex flex-column gap-3 mt-4 text-end">
                    <label class="w-100">
                        <input type="email" placeholder="Emaill address" v-model="loginForm.email">
                        <span class="error fst-italic text-danger d-block mt-1 text-start" v-if="errors"
                            v-for="(item, index) in errors.email" :key="index">
                            {{ item }}
                        </span>
                    </label>
                    <label class="w-100">
                        <input type="password" placeholder="Password" v-model="loginForm.password">
                        <span class="error fst-italic text-danger d-block mt-1 text-start" v-if="errors"
                            v-for="(item, index) in errors.password" :key="index">
                            {{ item }}
                        </span>
                    </label>
                    <NuxtLink to="/" class="forget-pass text-decoration-underline fw-bold ms-auto">
                        Forget Password?</NuxtLink>
                    <button class="get-started mt-2" type="submit" @click.prevent="submitLogin">
                        <span v-if="!loading">Login</span>
                        <div v-else class="spinner-border d-block mx-auto" style="width: 1.5rem; height: 1.5rem;"
                            role="status">
                        </div>
                    </button>
                    <hr class="separator position-relative mt-4">
                    <div class="d-md-none d-block">
                        <GoogleSignInButton logo-alignment="center" text="continue_with" width="280" class="w-100"
                            @success="handleLoginSuccess" @error="handleLoginError"></GoogleSignInButton>
                    </div>
                    <div class="d-md-block d-none">
                        <GoogleSignInButton logo-alignment="center" text="continue_with" width="400" class="w-100"
                            @success="handleLoginSuccess" @error="handleLoginError"></GoogleSignInButton>
                    </div>
                    <div class="text-center mt-4">
                        <p class="text-muted mb-0">
                            Don't have an account?
                            <NuxtLink to="/register" class="sign-up fw-bold text-uppercase">
                                Signup
                            </NuxtLink>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script setup>
useHead({
    title: "Login",
})

const { $axios } = useNuxtApp()
const store = useStore()
const loading = ref(false)
const errors = ref(null)

const loginForm = ref({
    email: '',
    password: '',
})

const submitLogin = async () => {
    console.log("Logging In");
    store.login(loginForm, errors, loading)
}

const handleLoginSuccess = async (response) => {
    console.log(response);
    await $axios.post("auth/google-verify/", response)
        .then(innerResponse => {
            console.log(innerResponse.data);
            localStorage.setItem("UT", innerResponse.data.token)
            $axios.defaults.headers.Authorization = `token ${innerResponse.data.token}`
            store.getLoggedInUser()
            navigateTo({
                name: "index"
            })
        }).catch(error => {
            console.log(error);
        })
}


const handleLoginError = (error) => {
    console.log(error);
}


</script>

<style lang="scss" scoped>
.login-page {
    .right-side {
        background-color: $white;
        box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.250);

        .head {
            h3 {
                color: $secondary;
            }
        }

        .login-form {
            .forget-pass {
                width: fit-content;
            }

            .sign-up {
                color: $primary;
            }

            .separator {
                color: $light-grey;

                &::before {
                    content: 'or';
                    color: $grey;
                    background-color: $white;
                    width: 35px;
                    height: 35px;
                    font-size: 18px;
                    position: absolute;
                    border-radius: 50px;
                    left: 50%;
                    top: 50%;
                    display: grid;
                    place-items: center;
                    transform: translate(-50%, -50%);

                }
            }
        }
    }
}
</style>