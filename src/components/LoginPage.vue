<template>
<h1 style="text-align:center">LOGIN</h1>
<p style="text-align:center; color: red">{{token.detail}}</p>

	<div class="container">
		<div class="row">
			<div class="container" style="text-align:center">
				<div class="col-md-12" style="padding: 1em 2em;">
					<label for="login">Логин</label>
					<input class="datepicker" name="login" id="login" v-model="login">
				</div>
				<div class="col-md-12" style="padding: 1em 2em;">
					<label for="password">Пароль</label>
					<input class="datepicker" name="password" id="password" v-model="password">
				</div>
				<div class="col-md-12" style="padding: 2em;">
					<button @click="getToken({login, password})">Войти</button>
				</div>
			</div>
		</div>
	</div>	
<a>{{token}}</a>
</template>

<style type="text/css">
	label input {
		vertical-align: middle;
	}
</style>


<script>
import { mapGetters, mapActions } from "vuex";


export default {
  name: 'LoginPage',
  computed: mapGetters(["currentUser", "token"]),
  methods: {
        ...mapActions(["getToken"]),

  }
}
</script>