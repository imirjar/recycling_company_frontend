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

		<div class="container text-container">
			<h3>Текущая ставка: {{currentMaxBid.bid_sum}} ₽ </h3>
			<p style="color: red">*Ставка не может быть меньше чем {{currentMaxBid.bid_sum*1.05}} ₽</p>
			<div>
				<input type="number" v-model="currentBid"  v-bind:min="currentMinBid" >
				<button type="button" v-on:click="checkValidation(currentBid, currentMaxBid.bid_sum)">Сделать ставку</button>
			</div>
		</div>


	</div>


</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: 'ReqItem',
	computed: mapGetters(["bids", "requisition", "currentMaxBid"]),
	methods:  {
		selectRequisitionGetBids() {
			this.$store.dispatch("selectRequisitionGetBids")
		},
		getRequisitions() {
			this.$store.dispatch("getRequisitions")
		},
		checkValidation(price, minPrice) {
			const currentBidPrice = minPrice*1.05
			if (price <= currentBidPrice) {
				console.log(price);
				console.log(minPrice);
				alert('Ставка отклонена. Ваша ставка должна быть больше '+currentBidPrice.toString()+' ₽')
			} else {
				alert('Ставка успешна')
			}
		},
	},
	data() {
		return {
			currentBid: 0,
			currentMinBid: 0
			currentMaxBid:0 
		}
	},
}
</script>

<style scoped>
	.text-container {
		margin-top: 8%;
		margin-bottom: 8%;
	}
</style>
