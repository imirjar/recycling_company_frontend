import { createApp } from 'vue'
import { createStore } from 'vuex'
import router from "@/router/router";
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.vue'




const store = createStore({
    state: {
        bids: {},
        currentUser: { name: "imirjar", password: "1234", id: 1 },
        requisition: {},
        lots: [],
        myLots: [],
        token: {},
    },
    actions: {
        /*Получаем Ставки по ID заявки*/
        async getBids(ctx, requisitionId) {
            const res = await fetch('http://localhost:8000/api/bids/?requisition='+requisitionId, {
                headers: {'Authorization': 'Bearer ' + this.state.token['access'].toString()}
            });
            const bids = await res.json();
            ctx.commit('GET_BIDS', bids);
        },
        /*Получаем заявку по ID*/
        async getRequisition(ctx, requisitionId) {
            const res = await fetch('http://localhost:8000/api/requisitions/?id='+requisitionId, {
                headers: {'Authorization': 'Bearer ' + this.state.token['access'].toString()}
            });
            const requisition = await res.json();
            ctx.commit('GET_REQ', requisition);
        },
        /*Получаем все заявки*/
        async getLots(ctx) {
            const res = await fetch('http://localhost:8000/api/requisitions/?customer_id='+this.state.currentUser.id+'&exclude_user=true', {
                headers: {'Authorization': 'Bearer ' + this.state.token['access'].toString()}
            });
            const lots = await res.json();
            ctx.commit('GET_LOTS', lots);
        },
        async getMyLots(ctx) {
            const res = await fetch('http://localhost:8000/api/requisitions/?customer_id='+this.state.currentUser.id, {
                headers: {'Authorization': 'Bearer ' + this.state.token['access'].toString()}
            });
            const myLots = await res.json();
            ctx.commit('GET_MY_LOTS', myLots);
        },
        async setBid(ctx, userBid) {
            console.log(userBid);
            const res = await fetch('http://localhost:8000/api/bids/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(userBid)
            });
            console.log(res)
        },
        async getToken(ctx, {login, password}) {
            let user = {
                'username' : login,
                'password' : password
            }
            await fetch('http://localhost:8000/api/token/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
                ctx.commit('GET_TOKEN', data);
                if (data.access) {
                    router.push('/')
                }
            });
            
        }
    },
    mutations: {
        GET_BIDS(state, bids) {
            state.bids = bids;
        },
        GET_REQ(state, requisition) {
            state.requisition = requisition;
        },
        GET_LOTS(state, lots) {
            state.lots = lots;
        },
        GET_MY_LOTS(state, myLots) {
            state.myLots = myLots;
        },
        GET_TOKEN(state, token) {
            state.token = token;
        },
    },
    getters: {
        bids(state) {
            return state.bids;
        },
        requisition(state) {
            return state.requisition;
        },
        lots(state) {
            return state.lots;
        },
        myLots(state) {
            return state.myLots;
        },
        currentUser(state) {
            return state.currentUser;
        },
        currentRequisition(state) {
            return state.currentRequisition;
        },
        token(state) {
            return state.token;
        },
        
    }
    
})

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
