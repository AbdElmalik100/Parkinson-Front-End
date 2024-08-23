<template>
    <div class="account min-vh-100 d-flex flex-md-row flex-column">
        <SideBar></SideBar>
        <MobileSideBar></MobileSideBar>
        <div class="content p-4 flex-fill w-25">
            <div class="user-box  p-4 d-flex align-items-start gap-4 justify-content-between  rounded-3 flex-md-row flex-column-reverse"
                v-if="store.user !== null">
                <div class="info d-flex flex-column">
                    <h2 class="fw-semibold">
                        {{ store.user.first_name }} {{ store.user.last_name }}
                    </h2>
                    <span class="email fs-5 text-muted">
                        {{ store.user.email }}
                    </span>
                    <span class="username fs-5 text-muted">
                        @{{ store.user.username }}
                    </span>
                    <span class="date-joined fs-5 text-muted">
                        Joined on {{ new Date(store.user.date_joined).toDateString() }}
                    </span>
                </div>
                <div class="avatar mx-md-0 mx-auto">
                    <i v-if="store.user.avatar === null" class="fa-regular fa-circle-user fa-5x avatar-icon"></i>
                    <img class="rounded-circle object-fit-cover" :src="store.user.avatar"
                        style="width: 125px; height: 125px;" alt="">
                </div>
            </div>
            <div class="personal-info p-4 mt-3 rounded-3" v-if="store.editUser !== null">
                <h3 class="border-bottom pb-2 fw-semibold">Personal information</h3>
                <div class="box mt-5">
                    <div
                        class="user-avatar d-flex align-items-lg-center align-items-start gap-md-5 gap-1 flex-lg-row flex-column">
                        <span class="text-muted">Avatar: </span>
                        <label>
                            <input type="file" accept="image/png, image/jpeg, image/jpg" class="d-none"
                                @change="reviewAvatar($event)">
                            <div class="avatar-placeholder d-grid rounded-circle"
                                v-if="store.editUser.avatar === null && previewAvatar === null">
                                <div class="text-center">
                                    <img class="img-placeholder" src="assets/images/image upload.png" width="60" alt="">
                                    <span class="d-block fw-semibold text-muted mt-2">Upload your avatar</span>
                                    <span class="accepts d-block text-muted mt-1">JPG, PNG, JPEG Max size 2MB</span>
                                </div>
                            </div>
                            <div class="img-cont"
                                v-else-if="previewAvatar !== null && (store.editUser.avatar === null || store.editUser.avatar !== null)">
                                <img :src="previewAvatar" class="ava rounded-circle object-fit-cover"
                                    style="width: 250px; height: 250px;" alt="">
                            </div>
                            <div class="img-cont" v-else-if="previewAvatar === null && store.editUser.avatar !== null">
                                <img :src="store.editUser.avatar" class="ava rounded-circle object-fit-cover"
                                    style="width: 250px; height: 250px;" alt="">
                            </div>
                        </label>
                        <span class="text-danger fst-italic text-center text-md-start w-100" v-if="imageError !== null">
                            {{ imageError }}
                        </span>
                    </div>
                    <form class="mt-5 d-flex flex-column gap-4" name="Personal Information">
                        <div class="d-flex align-items-center flex-md-row flex-column">
                            <span class="text-muted">First Name: </span>
                            <input class="w-50" type="text" name="First Name" placeholder="First Name"
                                v-model="store.editUser.first_name" maxlength="30">
                        </div>
                        <div class="d-flex align-items-center">
                            <span class="text-muted">Last Name: </span>
                            <input class="w-50" type="text" name="Last Name" placeholder="Last Name"
                                v-model="store.editUser.last_name" maxlength="30">
                        </div>
                        <div class="d-flex align-items-center">
                            <span class="text-muted">Username: </span>
                            <input class="bg-secondary-subtle w-50" type="text" name="Username" placeholder="Username"
                                disabled :value="`@${store.editUser.username}`">
                        </div>
                        <div class="d-flex align-items-center">
                            <span class="text-muted">Email Address: </span>
                            <input class="bg-secondary-subtle w-50" type="text" name="Email Address"
                                placeholder="Email Address" disabled :value="store.editUser.email">
                        </div>
                        <div class="d-flex align-items-center">
                            <span class="text-muted">Phone Number: </span>
                            <input class="w-50" type="tel" name="Phone Number" placeholder="e.g + 20 0101 1308 220"
                                v-model="store.editUser.phone_number" maxlength="15">
                        </div>
                        <button class="main-butn ms-auto text-uppercase mt-4" style="width: fit-content;" type="submit"
                            @click.prevent="updateUserInfo">
                            <span v-if="!loading">Update Profile</span>
                            <div v-else class="spinner-border d-block mx-5" style="width: 1.5rem; height: 1.5rem;"
                                role="status">
                            </div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const store = useStore()
const { $axios } = useNuxtApp()
const route = useRoute()

const previewAvatar = ref(null)
const file = ref(null)
const imageError = ref(null)
const loading = ref(false)


const reviewAvatar = (e) => {
    file.value = e.target.files[0]
    console.log(e.target.files[0]);
    if (file.value.size > 2048000) {
        imageError.value = 'File size must be less than 2MB'
    } else {
        previewAvatar.value = URL.createObjectURL(file.value)
        imageError.value = null
    }
}

const updateUserInfo = () => {
    store.updateUser(file, loading)
}


onNuxtReady(async () => {
    await $axios.get(`accounts/users/?username=${route.params.username}`)
        .then(response => {
            if (response.data.length > 0) {
                store.editUser = response.data[0]
                useHead({
                    title: store.editUser.username
                })
            } else {
                throw showError({
                    statusCode: 404,
                    fatal: true
                })
            }
        }).catch(error => {
            throw showError({
                statusCode: 404,
                fatal: true
            })
        })
})


</script>

<style lang="scss" scoped>
.account {
    .content {
        .user-box {
            background-color: $white;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.150);
            color: $secondary;
            border-top: 8px solid $primary;

            img {
                border: 1px solid $primary;
            }
        }

        .personal-info {
            background-color: $white;
            color: $secondary;

            .user-avatar {
                .avatar-placeholder {
                    border: 1px dashed $light-grey;
                    width: 250px;
                    height: 250px;
                    place-items: center;
                    transition: 0.2s;
                    cursor: pointer;

                    &:hover {
                        border-color: $primary;
                    }
                }

                .img-cont {
                    border: 2px solid transparent;
                    border-radius: 50%;
                    transition: 0.2s;
                    cursor: pointer;

                    &:hover {
                        border-color: $primary;
                    }
                }
            }

            form {
                span {
                    width: 125px;
                    display: block;
                }
            }
        }
    }

    @media (max-width: 767px) {
        form {
            padding: 0 !important;
            gap: 15px !important;

            &>div {
                flex-direction: column;
                align-items: start !important;
                gap: 5px;
            }

            input {
                width: 100% !important;

            }
        }
    }
}
</style>