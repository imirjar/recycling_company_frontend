<template>
	
		<th scope="row">{{index}}</th>
		<td>{{item.name}}</td>
		<td>item.serial_number</td>
		<td>item.sap_material</td>
		<td>item.quantity</td>
		<td>item.comment</td>
	
</template>

<script>
export default {
	name: 'lot-tr',
	props: {
		item: {
			type: Object,
			required: true
		}
	}
}
</script>

