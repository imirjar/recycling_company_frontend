<template>
  <div class="container">
    <h1>Доступные лоты</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Дата окончания</th>
          <th scope="col">Лоты</th>
          <th scope="col">Город</th>
        </tr>
      </thead>
      <tbody>
        <tr class="tr-item" v-for="requisition in lots" v-bind:key="requisition.id" @click="openLot(requisition)">
          <td>{{requisition.number_in}}</td>
          <td>{{convertDate(requisition.end_date)}}</td>
          <td> 
            <li v-for="item in requisition.requisition_item" v-bind:key="item.id">
              {{item.name}}
            </li>
          </td>
          <td>{{requisition.city}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: 'LotsList',
  computed: mapGetters(["lots", "currentUser"]),
  methods:  {
    getLots() {
      this.$store.dispatch("getLots");
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
    this.getLots();
  },
}
</script>

<style scoped>
  .tr-item:hover {
    color:  white;
    cursor: pointer;
    background: #4b4b4b;
  }
</style>
