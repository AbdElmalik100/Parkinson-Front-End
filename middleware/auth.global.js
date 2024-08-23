export default defineNuxtRouteMiddleware((to, from) => {
    if (!process.server) {
        const store = useStore(useNuxtApp().$pinia)
        const router = useRouter()

        if ((to.name === 'register' || to.name === 'login') && store.isAuthenticated()) {
            router.push({
                name: "index"
            })
        }
        if ((to.path.includes('app') && !to.path.includes('account')) && !store.isAuthenticated()) {
            router.push({
                name: "index"
            })
        }
    }
})