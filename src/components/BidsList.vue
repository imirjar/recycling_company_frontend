<template>
  <div class="container">
    <h1>Ваша ставка лидирует</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Дата окончания</th>
          <th scope="col">Лоты</th>
          <th scope="col">Владелец</th>
          <th scope="col">Город</th>
          <th scope="col">Текущая ставка</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in myLots" v-bind:key="item.id" v-show="item.status==0">
          <td>{{item.number_in}}</td>
          <td>{{item.end_date}}</td>
          <td><li v-for="element in item.requisition_item" v-bind:key="element.id">{{element.id}}){{element.name}}</li></td><!-- раскрывающийся список -->
          <td>{{item.customer}}</td>
          <td>{{item.city}}</td>
          <td>{{item.bid_sum}} руб.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="container">
    <h1>Выигранные</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Дата окончания</th>
          <th scope="col">Лоты</th>
          <th scope="col">Владелец</th>
          <th scope="col">Город</th>
          <th scope="col">Текущая ставка</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in myLots" v-bind:key="item.id"  v-show="item.status==1">
          <td>{{item.number_in}}</td>
          <td>{{item.end_date}}</td>
          <td><li v-for="element in item.requisition_item" v-bind:key="element.id">{{element.id}}){{element.name}}</li></td><!-- раскрывающийся список -->
          <td>{{item.customer}}</td>
          <td>{{item.city}}</td>
          <td>{{item.bid_sum}} руб.</td>
        </tr>
      </tbody>
    </table>
  </div>




</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'BidsList',
  computed: mapGetters(["myLots", "currentUser"]),
  methods:  {
    getMyLots() {
      this.$store.dispatch("getMyLots"); 
    },
    openLot(requisition){
      this.$router.push({
        name: 'LotItem',
        params: {id:requisition.id}
      })
    },
    convertDate(str) {
      var date = new Date(str);
      var options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }
      return date.toLocaleString('ru', options)
    }
  },
  async mounted() {
    this.getMyLots();
  },
}
</script>
