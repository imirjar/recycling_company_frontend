import MainPage  from '@/components/MainPage.vue'
import {createRouter, createWebHistory} from "vue-router";
import LotsList  from '@/components/LotsList.vue'
import BidsList  from '@/components/BidsList.vue'
import MyProfile from '@/components/MyProfile.vue'
import LotItem   from '@/components/LotItem.vue'
import LoginPage   from '@/components/LoginPage.vue'


const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/lots',
        component: LotsList
    },
    {
        path: '/bids',
        component: BidsList
    },
    {
        path: '/profile',
        component: MyProfile
    },
    {
        path: '/lot/:id',
        name: 'LotItem',
        component: LotItem
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage
    }
]


const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;