<template>
    <div class="contact-page min-vh-100">
        <div class="container d-flex align-items-center gap-5 py-5 flex-lg-row flex-column">
            <div class="left-side flex-fill">
                <img class="img-fluid w-100" src="assets/images/Contact.png" alt="">
            </div>
            <div class="right-side flex-fill">
                <div class="box rounded-2 p-4">
                    <div class="head text-center">
                        <h3 class="text-uppercase mb-2 fw-bold">Contact Us</h3>
                        <p class="text-muted mb-0 w-75 mx-auto">
                            Need a help, Don’t miss the touch with us.
                            contact us now for support
                        </p>
                    </div>
                    <form class="mt-4 d-flex flex-column gap-3">
                        <label class="w-100">
                            <input type="text" maxlength="30" placeholder="First Name" v-model="emailForm.first_name">
                            <span v-if="validation.first_name.$error" class="error text-danger d-block mt-1 fst-italic">
                                {{ validation.first_name.required.$message }}
                            </span>
                        </label>
                        <label class="w-100">
                            <input type="text" maxlength="30" placeholder="Last Name" v-model="emailForm.last_name">
                            <span v-if="validation.last_name.$error" class="error text-danger d-block mt-1 fst-italic">
                                {{ validation.last_name.required.$message }}
                            </span>
                        </label>
                        <label class="w-100">
                            <input type="email" maxlength="30" placeholder="Email Address" v-model="emailForm.email">
                            <span v-if="validation.email.$error" class="error text-danger d-block mt-1 fst-italic"
                                v-for="(item, index) in validation.email.$errors" :key="index">
                                {{ item.$message }}
                            </span>
                        </label>
                        <label class="w-100">
                            <input type="text" maxlength="30" placeholder="Subject" v-model="emailForm.subject">
                            <span v-if="validation.subject.$error" class="error text-danger d-block mt-1 fst-italic">
                                {{ validation.subject.required.$message }}
                            </span>
                        </label>
                        <label class="w-100">
                            <textarea class="" placeholder="Message" rows="5" v-model="emailForm.message"></textarea>
                            <span v-if="validation.message.$error" class="error text-danger d-block mt-1 fst-italic">
                                {{ validation.message.required.$message }}
                            </span>
                        </label>
                        <button class="get-started" type="submit" @click.prevent="submitForm">
                            <span v-if="!loading">Send Message</span>
                            <div v-else class="spinner-border d-block mx-auto" style="width: 1.5rem; height: 1.5rem;"
                                role="status">
                            </div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <MessageSent :show="messageSent"></MessageSent>
    </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

useHead({
    title: "Contact",
})
const store = useStore()

const messageSent = ref(false)
const loading = ref(false)
const emailForm = ref({
    first_name: '',
    last_name: '',
    email: '',
    subject: '',
    message: '',
})

const rules = {
    first_name: { required: helpers.withMessage("This field can't be empty", required) },
    last_name: { required: helpers.withMessage("This field can't be empty", required) },
    email: {
        required: helpers.withMessage("This field can't be empty", required),
        email: helpers.withMessage("Invalid email address", email)
    },
    subject: { required: helpers.withMessage("This field can't be empty", required) },
    message: { required: helpers.withMessage("This field can't be empty", required) },
}

const validation = useVuelidate(rules, emailForm)


const timer = () => {
    if (messageSent.value) {
        return setInterval(() => {
            messageSent.value = false
        }, 2500);
    }
}

const submitForm = () => {
    validation.value.$validate()
    if (!validation.value.$error) {
        // messageSent.value = true
        // clearInterval(counter.value)
        // counter.value = timer()
        store.contactUs(emailForm, loading)
    }
}


</script>

<style lang="scss" scoped>
.contact-page {
    .right-side {
        .box {
            background-color: $white;
            box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.250);

            h3 {
                color: $secondary;
            }
        }
    }
}
</style>