<template>
    <div class="mri min-vh-100 d-flex flex-md-row flex-column">
        <SideBar></SideBar>
        <MobileSideBar></MobileSideBar>
        <div class="content text-center p-4 flex-fill w-25">
            <label v-if="!loading && store.MRIResult === null" class="detection-box detection-mri rounded-2 p-5 w-100"
                @dragover.prevent="handleDragOver($event)" @dragleave.prevent="handleDragLeave($event)" @drop.prevent="handleDrop($event)">
                <input class="d-none" type="file" Accept="image/png, image/jpeg, image/jpg" @change="performDetection($event)">
                <img class="img-fluid mt-5" src="assets/images/image.png" width="150" alt="">
                <div class="txt mb-5">
                    <h3>
                        Drag and drop your image, or
                        <span>browse</span>
                    </h3>
                    <span class="text-muted">Accept PNG, JPEG and JPG, max size (1 MB)</span>
                </div>
            </label>
            <AILoading v-if="loading"></AILoading>
            <div class="result py-5 rounded-2 bg-white p-4" v-if="store.MRIResult !== null">
                <div class="detection-images d-flex align-items-center justify-content-center w-100 mb-3">
                    <img :src="store.MRIResult.image" class="img-fluid rounded-2" width="150" height="150" alt="MRI Image" title="MRI Image">
                    <img :src="store.MRIResult.heatmap_image" class="img-fluid rounded-2" width="175" height="175" alt="MRI Heatmap Image" title="MRI Heatmap Image">
                </div>
                <h1 class="fw-bold mt-4" :class="store.MRIResult.parkinson ? 'text-danger' : 'text-success'">
                    {{ store.MRIResult.result }}
                </h1>
                <button class="main-butn fw-bold mt-5 d-flex align-items-center gap-2 mx-auto" @click="restart">
                    <i class="fa-solid fa-arrow-rotate-left"></i>
                    Try another one
                </button>
            </div>
            <div class="boxes d-flex align-items-center gap-3 mt-5 flex-lg-row flex-column">
                <div class="box rounded-2 p-4">
                    <div class="step">
                        <span class="number num-1 rounded-circle">1</span>
                        <span class="step-txt">Step One</span>
                    </div>
                    <div class="inner d-flex align-items-center flex-column gap-2">
                        <i class="fa-solid fa-cloud-arrow-up fa-3x"></i>
                        <span class="fs-5">Upload your image file</span>
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
    title: "MRI Detection"
})
const store = useStore()
const loading = ref(false)

const handleDragOver = (event) => {
    document.querySelector(".detection-mri").classList.add("drag")
}
const handleDragLeave = (event) => {
    document.querySelector(".detection-mri").classList.remove("drag")
}
const handleDrop = (event) => {
    loading.value = true
    const formData = new FormData()
    formData.append('image', event.dataTransfer.files[0])
    store.MRI(formData, loading)
}


const performDetection = (event) => {
    loading.value = true
    const formData = new FormData()
    formData.append('image', event.target.files[0])
    store.MRI(formData, loading)
}

const restart = () => {
    store.MRIResult = null
}
</script>

<style lang="scss" scoped>
.mri {
    .content {
        .detection-mri {
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
            .detection-images {
                gap: 125px ;
            }
        }
    }
    @media(max-width:767px) {
        .result {
            .detection-images {
                gap: 35px !important;
                img {
                    width: 100px !important;
                    &:last-child {
                        width: 115px !important;
                    }
                }
            }
        }
    }
}
</style>