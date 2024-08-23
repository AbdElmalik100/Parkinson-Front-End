<template>
    <div class="tappy-keyboard min-vh-100 d-flex flex-md-row flex-column">
        <SideBar></SideBar>
        <MobileSideBar></MobileSideBar>
        <div class="content text-center p-4 flex-fill w-25">
            <label v-if="!loading && store.tappyResult === null"
                class="detection-box detection-tappy rounded-2 p-5 w-100" @dragover.prevent="handleDragOver($event)"
                @dragleave.prevent="handleDragLeave($event)" @drop.prevent="handleDrop($event)">
                <input class="d-none" type="file"
                    Accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    @change="performDetection($event)">
                <img class="img-fluid mt-5 mb-3" src="assets/images/xls.png" width="150" alt="">
                <div class="txt mb-5">
                    <h3>
                        Drag and drop your excel sheet file, or
                        <span>browse</span>
                    </h3>
                    <h3 ref="mydom"></h3>
                    <span class="text-muted">Accept only Excel sheet files (XLS, XLSX)</span>
                </div>
            </label>
            <AILoading v-if="loading"></AILoading>
            <div class="result py-5 rounded-2 bg-white p-4" v-if="store.tappyResult !== null">
                <div class="yes" v-if="store.tappyResult.parkinson">
                    <img src="assets/images/warning.png" class="img-fluid" width="125" alt="">
                    <h1 class="fw-bold text-danger mt-4">
                        {{ store.tappyResult.result }}
                    </h1>
                    <button class="main-butn d-block fw-bold mt-5 align-items-center gap-2 mx-auto" @click="restart">
                        <i class="fa-solid fa-arrow-rotate-left"></i>
                        Try another one
                    </button>
                </div>
                <div class="no" v-else>
                    <img src="assets/images/check.png" class="img-fluid" width="125" alt="">
                    <h1 class="fw-bold text-success mt-4">
                        {{ store.tappyResult.result }}
                    </h1>
                    <button class="main-butn fw-bold mt-5 d-flex align-items-center gap-2 mx-auto" @click="restart">
                        <i class="fa-solid fa-arrow-rotate-left"></i>
                        Try another one
                    </button>
                </div>
            </div>
            <div class="boxes d-flex align-items-center gap-3 mt-5 flex-lg-row flex-column">
                <div class="box rounded-2 p-4">
                    <div class="step">
                        <span class="number num-1 rounded-circle">1</span>
                        <span class="step-txt">Step One</span>
                    </div>
                    <div class="inner d-flex align-items-center flex-column gap-2">
                        <i class="fa-solid fa-cloud-arrow-up fa-3x"></i>
                        <span class="fs-5 w-75">Upload your excel sheet file</span>
                    </div>
                </div>
                <div class="box rounded-2 p-4">
                    <div class="step">
                        <span class="number num-2 rounded-circle">2</span>
                        <span class="step-txt">Step Two</span>
                    </div>
                    <div class="inner d-flex align-items-center flex-column gap-2">
                        <i class="fa-solid fa-magnifying-glass-chart fa-3x"></i>
                        <span class="fs-5 w-75">
                            Waiting for the AI model to bring you the results
                        </span>
                    </div>
                </div>
                <div class="box rounded-2 p-4">
                    <div class="step">
                        <span class="number num-3 rounded-circle">3</span>
                        <span class="step-txt">Step Three</span>
                    </div>
                    <div class="inner d-flex align-items-center flex-column gap-2">
                        <i class="fa-solid fa-file-export fa-3x"></i>
                        <span class="fs-5">Check the AI model results out</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
useHead({
    title: "Tappey Keyboard"
})
const loading = ref(false)
const store = useStore()

const handleDragOver = (event) => {
    document.querySelector(".detection-tappy").classList.add("drag")
}
const handleDragLeave = (event) => {
    document.querySelector(".detection-tappy").classList.remove("drag")
}
const handleDrop = (event) => {
    loading.value = true
    const formData = new FormData()
    console.log(event.dataTransfer.files[0]);
    formData.append('file', event.dataTransfer.files[0])
    store.tappyKeyboard(formData, loading)
}

const performDetection = (event) => {
    loading.value = true
    const formData = new FormData()
    console.log(event.target.files[0]);
    formData.append('file', event.target.files[0])
    store.tappyKeyboard(formData, loading)
}

const restart = () => {
    store.tappyResult = null
}
</script>

<style lang="scss" scoped>
.tappy-keyboard {
    .content {
        .detection-tappy {
            border: 2px dashed $light-grey;
            transition: 0.2s;
            cursor: pointer;

            .txt {
                h3 {
                    color: $secondary;

                    span {
                        color: $primary;
                        cursor: pointer;

                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
            }
        }

        .result {
            min-height: 425px;
            display: grid;
            place-items: center;
            border: 1px solid $primary;
        }
    }
}
</style>