<template>
  <div class="flex flex-col min-h-screen bg-white">
    <!-- Header -->
    <header class="flex items-center justify-between p-4 border-b">
      <h1 class="text-lg font-semibold">{{ isEditMode ? 'Edit' : 'Create' }}</h1>
      <div class="flex gap-2">
        <RouterLink to="/wine_list">
          <button class="w-12 p-2 rounded bg-blue-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
        </RouterLink>
      </div>
    </header>

    <main class="flex-1 overflow-y-auto p-4 pb-24">
      <div class="p-4 mb-4 rounded">
        <form @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="space-y-2">
              <label class="block text-sm font-medium">Name</label>
              <input v-model="wine.name" type="text" class="w-full p-2 border rounded" />
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium">Variety</label>
              <input v-model="wine.variety" type="text" class="w-full p-2 border rounded" />
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium">Vintage</label>
              <input v-model="wine.vintage" type="number" class="w-full p-2 border rounded" />
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium">Alcohol</label>
              <input v-model="wine.alcohol" type="number" step="0.1" class="w-full p-2 border rounded" />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium">Price</label>
              <input v-model="wine.price" type="number" class="w-full p-2 border rounded" />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium">Color</label>
              <select v-model="wine.color" class="w-full p-2 border rounded">
                <option value="">Select</option>
                <option value="translucent">Translucent</option>
                <option value="medium">Medium</option>
                <option value="deep">Deep</option>
              </select>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium">Aroma</label>
              <select v-model="wine.aroma" class="w-full p-2 border rounded">
                <option value="">Select</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="intense">Intense</option>
              </select>
            </div>

            <div class="space-y-2 relative">
              <label class="block text-sm font-medium flex items-center gap-2">
                Sweetness
                <TooltipInfo text="Sweetness is how much sugar you taste in the wine.
                                  A dry wine has almost no sugar and feels more serious or crisp.
                                  A sweet wine has natural sugar and feels smooth and dessert-like.
                                  There are also in-between levels, like semi-sweet." />
              </label>
              <select v-model="wine.sweetness" class="w-full p-2 border rounded">
                <option value="">Select</option>
                <option value="dry">Dry</option>
                <option value="semi-dry">Semi-dry</option>
                <option value="sweet">Sweet</option>
              </select>
            </div>

            <div class="space-y-2 relative">
              <label class="block text-sm font-medium flex items-center gap-2">
                Acidity
                <TooltipInfo text="Acidity is what makes the wine feel fresh, lively, or zesty.
                                  It’s like the feeling you get from a lemon or a green apple.
                                  A wine with more acidity is more refreshing.
                                  A wine with less acidity is more smooth or flat." />
              </label>
              <select v-model="wine.acidity" class="w-full p-2 border rounded">
                <option value="">Select</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

           <div class="space-y-2">
              <label class="block text-sm font-medium flex items-center gap-2">
                Tannin
                <TooltipInfo text="Tannins are what make the wine feel dry or rough in your mouth.
                                  They come from the grape skin, seeds, and sometimes the barrels.
                                  It’s like drinking strong black tea or eating a green banana — it dries your mouth." />
              </label>
               <select v-model="wine.tannin" class="w-full p-2 border rounded">
                <option value="">Select</option>
                <option value="mild">Mild</option>
                <option value="medium">Medium</option>
                <option value="antringent">Antringent</option>
              </select>
            </div>

            <div class="space-y-2 relative">
              <label class="block text-sm font-medium flex items-center gap-2">
                Body
                <TooltipInfo text="The body of the wine is how it feels in your mouth.
                                   It can be light like water, medium like milk, or heavy like cream.
                                   It depends on the alcohol, sugars, and other elements in the wine." />
              </label>
              <select v-model="wine.body" class="w-full p-2 border rounded">
                <option value="">Select</option>
                <option value="light">Light</option>
                <option value="medium">Medium</option>
                <option value="robust">Robust</option>
              </select>
            </div>

            <div class="space-y-2 relative">
               <label class="block text-sm font-medium flex items-center gap-2">
                Persistence
                <TooltipInfo text="Persistence is how long the flavor of the wine stays in your mouth after you swallow.
                                  If the taste disappears quickly, it has short persistence.
                                  If the flavor stays for several seconds, it has good persistence." />
              </label>
              <select v-model="wine.persistence" class="w-full p-2 border rounded">
                <option value="">Select</option>
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
              </select>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium">Score</label>
              <select v-model="wine.score" class="w-full p-2 border rounded">
                <option value="">Select</option>
                <option value="special gathering">Special gathering</option>
                <option value="get-together with close friends">Get-together with close friends</option>
                <option value="hangout with friends">Hangout with friends</option>
                <option value="it's tasty, but expensive">It's tasty, but expensive</option>
                <option value="I wouldn't buy it">I wouldn't buy it</option>
              </select>
            </div>
          </div>
          <div class="flex justify-end pt-4">
            <button type="submit" class="px-4 py-2 roundesd bg-blue-600 text-white">Save</button>
          </div>
        </form>
      </div>
    </main>

    <Menu />
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Menu from '../components/Menu.vue'
import api from '../services/api'
import TooltipInfo from '../components/TooltipInfo.vue'



// Router
const route = useRoute()
const router = useRouter()
const wineId = route.query.id || null
const isEditMode = ref(false)

// Estado reactivo
const wine = reactive({
  name: '',
  variety: '',
  vintage: '',
  alcohol: '',
  price: '',
  color: '',
  aroma: '',
  sweetness: '',
  acidity: '',
  tannin: '',
  body: '',
  persistence: '',
  score: '',
})

// Si hay un ID, traemos el vino de la API
onMounted(async () => {
  if (wineId) {
    isEditMode.value = true
    try {
      const response = await api.get(`wines/${wineId}`)
      Object.assign(wine, response.data)
    } catch (error) {
      alert('Error loading wine')
    }
  }
})

async function handleSubmit() {
  try {
    if (isEditMode.value) {
      await api.put(`wines/${wineId}`, wine)
      alert('Wine updated!')
    } else {
      await api.post('wines', wine)
      alert('Wine created!')
    }
    router.push('/wine_list')
  } catch (error) {
    alert('Error saving wine')
  }
}
</script>
