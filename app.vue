<template>
  <div>
    <HeaderComp></HeaderComp>
    <NuxtPage></NuxtPage>
    <FooterComp></FooterComp>
  </div>
</template>

<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Parkinson's Aidnet` : "Parkinson's Aidnet";
  }
})
const store = useStore()
const { $axios } = useNuxtApp()


const { login } = useOneTap({
  disableAutomaticPrompt: true,
  onSuccess: async (response) => {
    console.log(response);
    await $axios.post("auth/google-verify/", response)
      .then(innerResponse => {
        console.log(innerResponse.data);
        localStorage.setItem("UT", innerResponse.data.token)
        $axios.defaults.headers.Authorization = `token ${innerResponse.data.token}`
        store.getLoggedInUser()
        navigateTo({
          name: "index"
        })
      }).catch(error => {
        console.log(error);
      })
  },
  onError: (error) => console.log("Error with One Tap Login", error),
});






onNuxtReady(async () => {
  store.getLoggedInUser()
  if (!store.isAuthenticated()) {
    login()
  }
})



</script>