<template>
    <header class="py-3 position-relative">
        <div class="container d-flex align-items-center justify-content-between">
            <NuxtLink to="/">
                <img width="125" src="/assets/images/Parkinson-logo.png" alt="">
            </NuxtLink>
            <ul class="links d-flex align-items-center justify-content-center gap-3 text-uppercase fw-semibold h-100">
                <li>
                    <NuxtLink to="/">
                        Home
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/about">
                        About
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/contact">
                        Contact
                    </NuxtLink>
                </li>
            </ul>
            <UserProfile v-if="store.user !== null"></UserProfile>
            <NuxtLink v-else to="/login" class="get-started login-btn">Get Started</NuxtLink>
            <MobileMenu class="d-none mobile-menu"></MobileMenu>
        </div>
    </header>
</template>

<script setup>
const store = useStore()


</script>

<style lang="scss">
header {
    background-color: $white;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.150);

    ul.links {
        li {

            a {
                transition: 0.2s;
                position: relative;

                &::before {
                    content: '';
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 3px;
                    bottom: -55px;
                    background-color: $primary;
                    transition: 0.2s;
                }

                &:hover {
                    color: $primary;

                    &::before {
                        width: 100%;
                    }
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

    @media (max-width: 767px) {

        .login-btn,
        .links {
            display: none !important;
        }

        .mobile-menu {
            display: block !important;
        }
    }
}
</style>
