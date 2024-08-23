<template>
    <div class="register-page min-vh-100">
        <div class="container d-flex align-items-center flex-md-row flex-column gap-4 py-5">
            <div class="left-side flex-fill text-center w-100">
                <img class="img-fluid" src="assets/images/register.png" alt="">
            </div>
            <div class="right-side flex-fill p-4 rounded-2 w-75">
                <div class="head text-center">
                    <h3 class="text-uppercase mb-2 fw-bold">signup</h3>
                    <p class="text-muted mb-0">
                        Create an account to make use of our services.
                    </p>
                </div>
                <form class="register-form d-flex flex-column gap-3 mt-4">
                    <label class="w-100">
                        <input type="text" placeholder="First Name" v-model="registerForm.first_name">
                        <span v-if="errors" class="error fst-italic text-danger d-block mt-1"
                            v-for="(item, index) in errors.first_name" :key="index">
                            {{ item }}
                        </span>
                    </label>
                    <label class="w-100">
                        <input type="text" placeholder="Last Name" v-model="registerForm.last_name">
                        <span v-if="errors" class="error fst-italic text-danger d-block mt-1"
                            v-for="(item, index) in errors.last_name" :key="index">
                            {{ item }}
                        </span>
                    </label>
                    <label class="w-100">
                        <input type="text" placeholder="Username" v-model="registerForm.username">
                        <span v-if="errors" class="error fst-italic text-danger d-block mt-1"
                            v-for="(item, index) in errors.username" :key="index">
                            {{ item }}
                        </span>
                    </label>
                    <label class="w-100">
                        <input type="email" placeholder="Emaill address" v-model="registerForm.email">
                        <span class="error fst-italic text-danger d-block mt-1"></span>
                        <span v-if="errors" class="error fst-italic text-danger d-block mt-1"
                            v-for="(item, index) in errors.email" :key="index">
                            {{ item }}
                        </span>
                    </label>
                    <label class="w-100">
                        <input type="password" placeholder="Password" v-model="registerForm.password">
                        <span v-if="errors" class="error fst-italic text-danger d-block mt-1"
                            v-for="(item, index) in errors.password" :key="index">
                            {{ item }}
                        </span>
                    </label>
                    <label class="w-100">
                        <input type="password" placeholder="Confirm Password" v-model="registerForm.re_password">
                        <span v-if="errors" class="error fst-italic text-danger d-block mt-1"
                            v-for="(item, index) in errors.re_password || errors.non_field_errors" :key="index">
                            {{ item }}
                        </span>
                    </label>
                    <button class="get-started mt-2" type="submit" @click.prevent="createAccount">
                        <span v-if="!loading">Signup</span>
                        <div v-else class="spinner-border d-block mx-auto" style="width: 1.5rem; height: 1.5rem;"
                            role="status">
                        </div>
                    </button>
                    <div class="text-center mt-4">
                        <p class="text-muted mb-0">
                            Already have an account?
                            <NuxtLink to="/login" class="sign-up fw-bold text-uppercase">
                                Login
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
    title: "Signup",
})
const store = useStore()
const registerForm = ref({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    re_password: '',
})
const loading = ref(false)
const errors = ref(null)



const createAccount = () => {
    console.log("Creating an account!");
    store.register(registerForm, errors, loading)
}

</script>

<style lang="scss" scoped>
.register-page {
    .right-side {
        background-color: $white;
        box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.250);

        .head {
            h3 {
                color: $secondary;
            }
        }

        .register-form {
            .forget-pass {
                width: fit-content;
            }

            .sign-up {
                color: $primary;
            }
        }
    }

    @media (max-width: 767px) {
        .right-side {
            width: 100% !important;
        }
    }
}
</style>