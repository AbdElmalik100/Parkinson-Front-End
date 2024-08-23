<template>
    <div class="user-profile position-relative" ref="menu">
        <div class="user d-flex align-items-center gap-3" @click="openMenu = !openMenu">
            <div class="avatar">
                <i v-if="store.user.avatar === null" class="fa-regular fa-circle-user fs-2 avatar-icon"></i>
                <img v-else :src="store.user.avatar" class="img-fluid rounded-circle object-fit-cover"
                    style="width: 50px; height: 50px;" alt="">
            </div>
            <div class="info">
                <span class="d-block fw-bold text-capitalize first-name">
                    {{ store.user.first_name }}
                </span>
                <span class="d-block text-muted username">
                    @{{ store.user.username }}
                </span>
            </div>
            <i class="fa-solid fa-chevron-down ms-2 arrow-down"></i>
        </div>
        <div class="user-menu rounded-3 position-absolute" :class="openMenu ? 'active' : ''">
            <div class="sub-info p-3 d-flex align-items-center gap-3">
                <div class="avatar-menu">
                    <i v-if="store.user.avatar === null" class="fa-regular fa-circle-user fs-2 avatar-icon"></i>
                    <img v-else :src="store.user.avatar" class="img-fluid rounded-circle object-fit-cover"
                        style="width: 50px; height: 50px;" alt="">
                </div>
                <div class="info-menu">
                    <span class="d-block fw-bold text-capitalize">
                        {{ store.user.first_name }}
                    </span>
                    <span class="d-block text-muted">
                        @{{ store.user.username }}
                    </span>
                </div>
            </div>
            <div class="links-menu d-flex flex-column gap-2 pt-3 border-top p-2">
                <NuxtLink to="/app/drawing-detection" @click="openMenu = false">
                    <i class="fa-solid fa-objects-column"></i>
                    Dashboard
                </NuxtLink>
                <NuxtLink :to="`/app/account/${store.user ? store.user.username : 'user'}`" @click="openMenu = false">
                    <i class="fa-solid fa-user"></i>
                    Account
                </NuxtLink>
                <button @click="store.logout(), openMenu = false">
                    <i class="fa-solid fa-right-from-bracket"></i>
                    Logout
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onClickOutside } from '#imports';
const store = useStore()
const menu = ref(null)
const openMenu = ref(false)


onClickOutside(menu, event => {
    openMenu.value = false
})


</script>

<style lang="scss" scoped>
.user-profile {
    .user {
        cursor: pointer;

        .avatar {
            .avatar-icon {
                color: $secondary;
            }
        }

        .info {
            span {
                color: $secondary;
            }
        }
    }

    .user-menu {
        border-top: 8px solid $primary;
        background-color: $white;
        top: 40px;
        right: 0;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.192);
        z-index: 55555;
        width: 225px;
        transition: 0.2s;
        visibility: hidden;
        opacity: 0;

        &.active {
            opacity: 1;
            visibility: visible;
            top: 65px;
        }

        .sub-info {
            i {
                color: $secondary;
            }

            .info-menu {
                span {
                    color: $secondary;
                }
            }
        }

        .links-menu {

            a,
            button {
                padding: 0.5rem 0.7rem;
                border-radius: 0.3rem;
                color: $black;
                font-weight: 500;
                display: flex;
                align-items: center;
                gap: 10px;

                &:hover {
                    color: $white;
                    background-color: $primary;

                    &:first-child {
                        background-image: linear-gradient(to right, $primary, $secondary);
                    }

                    &:last-child {
                        background-color: $blood-color;
                    }
                }
            }
        }
    }

    @media (max-width: 767px) {
        margin-left: auto;
        margin-right: 15px;

        .user {
            .info {
                display: none;

            }

            .avatar {
                .avatar-icon {
                    font-size: 30px !important;
                }
            }

            .arrow-down {
                display: none;
            }
        }

        .user-menu {
            right: -25px;
            top: 20px;

            &.active {
                top: 55px;
            }
        }
    }
}
</style>