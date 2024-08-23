<template>
    <div class="home-page min-vh-100">
        <div class="landing min-vh-100 position-relative">
            <img class="img-fliud w-100" src="assets/images/hero.jpg" alt="">
            <div class="info position-absolute">
                <h1 class="fw-normal mb-2">AI-ParkinsonCare</h1>
                <p class="mb-5">
                    Your smart solution for Parkinson's detection. Our innovative AI brings you not just early diagnosis
                    but
                    comprehensive healthcare support. Redefine your Parkinson's care with technology that cares.
                    Discover a new era of well-being with Parkinson's AidNet.
                </p>
                <nuxt-link v-if="store.user === null" to="login" class="get-started fs-5"
                    style="padding: 13px 32px;">Get Started</nuxt-link>
                <nuxt-link v-else to="/app/drawing-detection" class="get-started fs-5"
                    style="padding: 13px 32px;">Dashboard</nuxt-link>
            </div>
        </div>
        <div class="services py-5 my-5">
            <div class="container">
                <div class="heading">
                    <span class="skew"></span>
                    <h1>Serivces</h1>
                </div>
                <div
                    class="services-card my-5 py-5 d-flex align-items-center justify-content-center gap-3 flex-wrap flex-md-row flex-column">
                    <div class="box text-center p-4">
                        <img width="75" src="/assets/images/pencil-512.png" alt="">
                        <div class="info">
                            <h3 class="fw-bold fs-4">Drawing Detection</h3>
                            <p class="text-muted">
                                Analyzes drawing and handwriting for motor abnormalities
                            </p>
                        </div>
                    </div>
                    <div class="box text-center p-4">
                        <img width="75" src="/assets/images/brain-2-512.png" alt="">
                        <div class="info">
                            <h3 class="fw-bold fs-4">MRI Detection</h3>
                            <p class="text-muted">
                                Examines MRI scans for Parkinson's signs.
                            </p>
                        </div>
                    </div>
                    <div class="box text-center p-4">
                        <img width="75" src="/assets/images/audio-wave-512.png" alt="">
                        <div class="info">
                            <h3 class="fw-bold fs-4">Voice Biometrics</h3>
                            <p class="text-muted">
                                Detects Parkinson's indicators in voice patterns.
                            </p>
                        </div>
                    </div>
                    <div class="box text-center p-4">
                        <img width="75" src="/assets/images/keyboard-2-512.png" alt="">
                        <div class="info">
                            <h3 class="fw-bold fs-4">Tappy Keyboard</h3>
                            <p class="text-muted">
                                Monitors keystrokes for motor control insights.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="last-section py-5 ">
            <div class="container d-flex gap-3 align-items-center flex-md-row flex-column">
                <div class="right-side w-100 text-center">
                    <img class="img-fluid w-100" src="assets/images/ai brain.png" alt="">
                </div>
                <div class="left-side w-100">
                    <h1 class="fw-bold mb-4 text-uppercase">
                        Unlocking Tomorrow's Health Today
                    </h1>
                    <div class="d-flex flex-column">
                        <p class="text-muted">
                            Embark on a journey towards proactive well-being with our state-of-the-art Parkinson's
                            Disease
                            Detection System.
                        </p>
                        <p class="text-muted">
                            Harnessing the power of cutting-edge AI technologies, our innovative solution provides a
                            comprehensive and early diagnosis through a multimodal approach.
                        </p>
                        <p class="text-muted">
                            From MRI scans to voice biometrics, our models ensure accuracy and reliability. Join us in
                            redefining healthcare with personalized, user-friendly diagnostics, empowering you to take
                            control
                            of your health journey.
                        </p>
                        <p class="text-muted">
                            Welcome to a future where technology meets compassion, making health management smarter and
                            more
                            accessible than ever.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
useHead({
    title: "Home"
})
const store = useStore()



</script>

<style lang="scss" scoped>
.home-page {
    .landing {
        img {
            height: 100vh;
            object-fit: cover;
        }

        .info {
            left: 10%;
            top: 50%;
            transform: translateY(-50%);
            color: $white;
            width: 525px;

            h1 {
                font-size: 75px;
            }

            p {
                line-height: 1.6;
            }
        }
    }

    .services {
        .services-card {
            .box {
                background-color: $white;
                border: 1px solid $primary;
                height: 300px;
                width: 250px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-radius: 5px;
                gap: 25px;
                transition: 0.2s;
                box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.250);

                &:hover {
                    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.450);
                }

                h3 {
                    color: $secondary;
                }
            }
        }
    }

    .last-section {
        background-color: $white;

        h1 {
            color: $secondary;
        }
    }


    @media (max-width: 767px) {
        .landing {
            .info {
                width: calc(100% - 50px) !important;
                text-align: center;
                left: 50%;
                transform: translate(-50%, -50%);

                h1 {
                    font-size: 40px !important;
                }
            }
        }
    }
}
</style>