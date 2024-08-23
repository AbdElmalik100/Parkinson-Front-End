<template>
    <div class="about-page min-vh-100">
        <div class="container">
            <div class="box section-1 rounded-2 p-5 px-5 my-5 d-flex gap-3 flex-md-row flex-column">
                <div class="left-side">
                    <img class="img-fluid w-100" src="/assets/images/AI Robot.png" alt="">
                </div>
                <div class="right-side">
                    <h1 class="fw-bold text-uppercase text-md-start text-center">
                        The Power of AI in Parkinson's Detection
                    </h1>
                    <ul class="d-flex flex-column gap-3 mt-4">
                        <li>
                            <i class="fa-solid fa-check fs-5"></i>
                            Multimodal Precision
                        </li>
                        <li>
                            <i class="fa-solid fa-check fs-5"></i>
                            In-depth Biomedical Voice Analysis
                        </li>
                        <li>
                            <i class="fa-solid fa-check fs-5"></i>
                            Efficient MRI Image Classification
                        </li>
                        <li>
                            <i class="fa-solid fa-check fs-5"></i>
                            Real-time Tappy Keystroke Analysis
                        </li>
                        <li>
                            <i class="fa-solid fa-check fs-5"></i>
                            Dynamic Drawing Analysis
                        </li>
                        <li>
                            <i class="fa-solid fa-check fs-5"></i>
                            Smart Integration of Clinical Data
                        </li>
                        <li>
                            <i class="fa-solid fa-check fs-5"></i>
                            User-Centric Mobile Interface
                        </li>
                    </ul>
                </div>
            </div>
            <div class="box section-2 rounded-2 p-5 px-5 my-5">
                <div class="head text-center">
                    <h1 class="text-uppercase fw-bold">Parkinson's Detection Mechanism</h1>
                    <p class="text-muted">
                        Delve into the intricacies of our cutting-edge detection mechanism, where advanced AI models
                        collaborate seamlessly to decode Parkinson's clues.
                    </p>
                </div>
                <div class="row boxes mt-5 justify-content-center">
                    <div class="col-lg-4 col-md-6 mb-3">
                        <div class="inner-box p-4 rounded-2 text-center">
                            <img class="rounded-2 img-fluid" src="/assets/images/mri.png" alt="">
                            <h4 class="fw-bold mt-2 text-uppercase">MRI</h4>
                            <p class="text-muted fs-5 mb-0">
                                Unmask the power of MRI image analysis. Our AI scrutinizes intricate details, unraveling
                                patterns that elude the human eye, and contributes to a precise Parkinson's diagnosis.
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 mb-3">
                        <div class="inner-box p-4 rounded-2 text-center">
                            <img style="height: 177px;" class="rounded-2 img-fluid" src="/assets/images/spiral.png" alt="">
                            <h4 class="fw-bold mt-2 text-uppercase">Spiral</h4>
                            <p class="text-muted fs-5 mb-0">
                                Immerse yourself in the world of spirals, where our AI analyzes intricate patterns within
                                drawings. The spirals reveal subtle hand movements, offering a unique perspective that aids
                                in
                                identifying early signs of Parkinson's disease with unparalleled precision.
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 mb-3">
                        <div class="inner-box p-4 rounded-2 text-center">
                            <img style="height: 177px;" class="rounded-2 img-fluid" src="/assets/images/waves.png" alt="">
                            <h4 class="fw-bold mt-2 text-uppercase">Waves</h4>
                            <p class="text-muted fs-5 mb-0">
                                Explore the beauty of wave patterns in drawings. Our AI dissects these waves, uncovering
                                subtle
                                tremors and irregularities. This detailed analysis enhances the diagnostic accuracy,
                                providing
                                invaluable insights into the early stages of Parkinson's disease.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="technologies py-5 my-5">
                <h4 class="text-uppercase">
                    Our technologies
                </h4>
                <div class="container mt-5">
                    <div
                        class="technos d-flex align-items-center gap-3 flex-md-row flex-column justify-content-center flex-wrap">
                        <img class="img-fluid " width="350" src="/assets/images/Group 1.png" alt=""
                            title="Nuxt.JS - Bootstrap - SASS">
                        <img class="img-fluid " width="350" src="/assets/images/Group 2.png" alt=""
                            title="Tensor Flow - Keras - Flask">
                        <img class="img-fluid " width="350" src="/assets/images/Group 3.png" alt=""
                            title="Kotlin - Android - Java">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
useHead({
    title: "About"
})
</script>

<style lang="scss" scoped>
.about-page {
    .box {
        background-color: $white;
        box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.250);
    }

    .box {
        &.section-1 {
            .right-side {
                h1 {
                    color: $secondary;
                }

                ul {
                    li {
                        font-size: 18px;
                        color: $grey;
                        display: flex;
                        gap: 10px;
                        align-items: center;

                        i {
                            color: $primary;
                        }
                    }
                }
            }
        }

        &.section-2 {
            .head {
                h1 {
                    color: $secondary;
                }
            }

            .boxes {
                .inner-box {
                    flex: 1;
                    border: 1px solid $primary;
                    height: 100%;

                    h4 {
                        color: $primary;
                    }
                }
            }
        }
    }

    .technologies {
        h4 {
            color: $secondary;
            letter-spacing: 8px;
            position: relative;
            width: fit-content;

            &::after {
                content: '';
                position: absolute;
                right: -195px;
                top: 50%;
                transform: translateY(-50%);
                width: 175px;
                height: 2px;
                border-radius: 50px;
                background-color: $primary;
            }

        }
    }

    @media (max-width: 767px) {
        .box {
            padding: 50px 25px !important;
        }

        .technologies {
            h4 {
                text-align: center;
                width: 100%;

                &::after {
                    right: 50%;
                    top: initial;
                    transform: translateX(50%);
                    bottom: -12px;
                }
            }
        }
    }
}
</style>