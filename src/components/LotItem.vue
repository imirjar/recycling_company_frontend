<template>
    <div class="container">
        <div class="container text-container">
            <h1 class="text-center">Заявка вх. {{ requisition.number_in }} внешн. {{ requisition.number_out }}</h1>
        </div>
        <div>
            <li>Дата регистрации: {{Date(requisition.registration_date)}}</li>
            <li>Дата окончания: {{Date(requisition.end_date)}}</li>
            <li>Город: {{requisition.city}}</li>
        </div>
        <div class="container text-container">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Наименование</th>
                        <th scope="col">Серийный номер</th>
                        <th scope="col">САП материал</th>
                        <th scope="col">Кол-во</th>
                        <th scope="col">Комментарий</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in requisition.requisition_item" v-bind:key="item.id">
                        <th scope="row">1</th>
                        <td>{{item.name}}</td>
                        <td>{{item.serial_number}}</td>
                        <td>{{item.sap_material}}</td>
                        <td>{{item.quantity}}</td>
                        <td>{{item.comment}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div v-if="requisition.customer==currentUser.id" class="container text-container">
            <h3>Ваша ставка: {{(requisition.bid_sum*1.05).toFixed(2)}} ₽</h3>
        </div>
        <div v-if="requisition.customer!=currentUser.id" class="container text-container">
            <h3>Текущая ставка: {{requisition.bid_sum}} ₽ </h3>
            <p style="color: red">*Ставка не может быть меньше чем {{(requisition.bid_sum*1.05).toFixed(2)}} ₽</p>
            <div>
                <input type="number" v-model="newBid">
                <button type="button" @click="placeABet(newBid)">Сделать ставку</button>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from "vuex";

export default {
    name: 'LotItem',
    data() {
        return {
            newBid: 0,
        }
    },
    computed: mapGetters(["bids",  "requisition"]),
    methods: {
        ...mapActions(["getRequisition", "getBids", "setBid"]),
        placeABet(newBid) {
            var userBid = {
                customer:   this.currentUser.id, 
                bid_sum:    newBid.toFixed(2),
                requisition:this.requisition.id
            };
            this.setBid(userBid);
            alert('Вы сделали ставку в размере '+(newBid.toFixed(2)).toString())
            this.getRequisition(userBid.requisition);
        }
    },
    async mounted() {
        this.getRequisition(this.$route.params.id);
        this.getBids(this.$route.params.id)
    },
}
</script>

<style scoped>
    .text-container {
        margin-top: 8%;
        margin-bottom: 8%;
    }
</style>