<template>
    <div class="mobile-menu position-relative">
        <i class="fa-solid fa-bars fs-3 menu-btn" @click="open = true"></i>
        <div class="overlay" :class="open ? 'open' : ''">
            <div class="menu d-flex flex-column justify-content-between p-4 text-end" ref="menu">
                <i class="fa-solid fa-x fs-4" @click="open = false"></i>
                <ul
                    class="d-flex align-items-center justify-content-center gap-3 text-uppercase fw-semibold h-100 flex-column">
                    <li>
                        <nuxt-link to="/" @click="open = false">
                            Home
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/about" @click="open = false">
                            About
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/contact" @click="open = false">
                            Contact
                        </nuxt-link>
                    </li>
                </ul>
                <NuxtLink v-if="store.user === null" to="/login" class="get-started" @click="open = false">Get Started</NuxtLink>
                <NuxtLink v-else :to="`/app/drawing-detection`" class="get-started" @click="open = false">Dashboard</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'
const store = useStore()

const menu = ref(null)
const open = ref(false)

onClickOutside(menu, event => {
    open.value = false
})


</script>

<style lang="scss" scoped>
.mobile-menu {
    i {
        cursor: pointer;
        color: $secondary;
    }

    .overlay {
        opacity: 0;
        z-index: -1;

        &.open {
            opacity: 1;
            z-index: 5555;

            .menu {
                right: 0;
                z-index: 555555;
            }
        }

        .menu {
            position: fixed;
            right: -375px;
            top: 0;
            height: 100%;
            width: 75%;
            background-color: $white;
            transition: 0.2s;

            ul {
                li {
                    a {
                        transition: 0.2s;
                        position: relative;
                        font-size: 18px;

                        &::before {
                            content: '';
                            position: absolute;
                            width: 0;
                            bottom: -5px;
                            height: 3px;
                            left: 50%;
                            transform: translateX(-50%);
                            background-color: $primary;
                        }

                        &.router-link-active {
                            color: $primary;

                            &::before {
                                width: 100%;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>