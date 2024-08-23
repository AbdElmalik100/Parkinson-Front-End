<template>
    <HeaderComp></HeaderComp>
    <div class="container min-vh-100 py-5 my-5 text-center">
        <div class="error error-404" v-if="error.statusCode === 404">
            <img src="assets/images/404 error.png" class="img-fluid" width="500" alt="">
            <h1 class="fw-bold">Page not found!</h1>
            <p class="text-muted w-75 mx-auto mb-5">
                oops you may be looking for a page currently unavailable or has been removed.
            </p>
            <NuxtLink to="/" class="main-butn fs-5 px-4 d-block mx-auto p-2" style="width: fit-content;">
                Back home
            </NuxtLink>
        </div>
        <div class="error error-500" v-else>
            <pre class="text-start">{{ error }}</pre>
            <img src="assets/images/500 server down.png" class="img-fluid" width="500" alt="">
            <p class="fw-semibold fs-5">
                Something went wrong with the server, we will fix that as soon as possible.
            </p>
        </div>
    </div>
    <FooterComp></FooterComp>
</template>

<script setup>
defineProps(['error'])

</script>

<style lang="scss" scoped>
.error-page {
    .container {
        display: grid;
        place-items: center;
    }

    .error {
        h1 {
            color: $secondary;
        }
    }
}
</style>