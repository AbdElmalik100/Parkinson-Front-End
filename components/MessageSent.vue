<template>
    <div ref="message" class="message-alert p-4 d-flex align-items-center gap-3 rounded-2" :class="show ? 'show' : ''">
        <i class="fa-solid fa-paper-plane fs-4"></i>
        <span class="d-block fw-semibold">Message has been sent.</span>
    </div>
</template>

<script setup>
const message = ref(null)
defineProps(['show'])

</script>

<style lang="scss" scoped>
.message-alert {
    top: 20px;
    right: -500px;
    background-color: $secondary;
    border-right: 5px solid $primary;
    color: $white;
    position: fixed;
    transition: 0.2s;

    &.show {
        right: 20px;
    }

    @media (max-width: 767px) {
        right: -50%;
        transform: translateX(50%);
        width: fit-content;
        text-wrap: nowrap;
        font-size: 15px;

        &.show {
            right: 50%;
        }
    }
}
</style>