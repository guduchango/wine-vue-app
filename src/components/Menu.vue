    <template>
        <!-- Bottom Menu -->
        <nav class="fixed bottom-0 left-0 right-0 bg-white border-t shadow z-10">
            <div class="flex justify-around p-2 text-xs">
                <RouterLink to="/wine_list">
                    <button class="flex flex-col items-center text-gray-600 hover:text-blue-500">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m-4 0h8" />
                        </svg>
                        Home
                    </button>
                </RouterLink>
                
                    <button @click="createWine()" class="flex flex-col items-center text-gray-600 hover:text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        Create
                    </button>
                

                <button @click="logout" class="flex flex-col items-center text-gray-600 hover:text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                    </svg>
                    Exit
                </button>

            </div>
        </nav>
    </template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useWineStore } from '../stores/wines'
const router = useRouter()
const auth = useAuthStore()
const wineStore = useWineStore()
function createWine() {
  wineStore.selectWine(null)
  router.push('/wine_form') // asegúrate de tener esta ruta
}

const logout = () => {
  auth.logout(router)
}
</script>
