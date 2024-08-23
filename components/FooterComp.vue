<template>
    <footer class="py-3">
        <div class="container d-flex align-items-center justify-content-between flex-md-row flex-column gap-5">
            <NuxtLink to="/">
                <img width="125" src="/assets/images/Parkinson-logo-2.png" alt="">
            </NuxtLink>
            <ul class="d-flex align-items-center justify-content-center gap-3 text-uppercase fw-semibold h-100">
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
            <div class="social-links d-flex align-itmes-center gap-3">
                <a href="https://www.facebook.com/profile.php?id=100056778566163" title="Facebook" target="_blank">
                    <i class="fa-brands fa-square-facebook fs-3"></i>
                </a>
                <a href="https://www.instagram.com/devahmedsherif/" title="Instagram" target="_blank">
                    <i class="fa-brands fa-instagram fs-3"></i>
                </a>
                <a href="https://twitter.com/" title="X" target="_blank">
                    <i class="fa-brands fa-x-twitter fs-3"></i>
                </a>
                <a href="https://www.linkedin.com/in/ahmed-sherif-043683222/" title="Linkedin" target="_blank">
                    <i class="fa-brands fa-linkedin fs-3"></i>
                </a>
            </div>
        </div>
    </footer>
</template>

<script setup>



</script>

<style lang="scss" scoped>
footer {
    background-color: $secondary;

    ul {
        li {
            a {
                color: $white;
                transition: 0.2s;
                position: relative;

                &::before {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 3px;
                    background-color: $primary;
                    bottom: -55px;
                    left: 50%;
                    transition: 0.2s;
                    transform: translateX(-50%);
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

    .social-links {
        a {
            color: $white;
            transition: 0.2s;

            &:hover {
                color: $primary;
            }
        }
    }

    @media (max-width: 767px) {
        .container {
            flex-direction: column;

            ul {
                li {
                    a {
                        &::before {
                            bottom: -8px;
                        }
                    }
                }
            }
        }
    }
}
</style>