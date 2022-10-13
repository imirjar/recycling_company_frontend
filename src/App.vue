<template>
  <div class="row" v-if="token.access">
    <div class="spa-menu col-md-2">
        <h3 class="vtormet-logo">Втормет-Ресурс</h3>
        <ul>
          <menu-button @click="$router.push('/')"       >Главная    </menu-button>
          <menu-button @click="$router.push('/lots')"   >Аукцион    </menu-button>
          <menu-button @click="$router.push('/bids')"   >Мои лоты   </menu-button>
          <menu-button @click="$router.push('/profile')">Мой профиль</menu-button>
        </ul>
    </div>
    <div class="col-md-10">
      <router-view></router-view>
    </div>
  </div>
  <div class="row" style="justify-content: center;" v-else>

          <div class="login-container" style="text-align:center">
            <br>
            <h2>Вход в личный кабинет<br>Аукциона</h2><br>
            <div class="col-md-12" style="padding: 1em 2em;">
              <label for="login">Логин</label><br>
              <input class="login-input" type="text" name="login" id="login" v-model="login">
            </div>
            <div class="col-md-12" style="padding: 1em 2em;">
              <label for="password">Пароль</label><br>
              <input class="login-input" type="password" name="password" id="password" v-model="password">
            </div>
            <div class="col-md-12" style="padding: 2em;">
              <button class="login-button" @click="getToken({login, password})">
                Войти
              </button>
            </div>
          </div>

  </div>
</template>

<script>
import MenuButton from "@/components/UI/MenuButton";
import { mapGetters, mapActions } from "vuex";


export default {
  name: 'App',
  components: {MenuButton},
  computed: mapGetters(["token"]),
  methods: {
        ...mapActions(["getToken"]),
  }
}
</script>


<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .spa-menu {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background: #4a4a4a;
  }

  .login-container {
    border-width: 0.4px;
    border-color: black;
    border-style: solid;
    border-radius: 10px 10px;
    margin-left: auto;
    margin-right: auto;
    max-width: 30rem;
    width:  90%;
    box-sizing: inherit;
    box-shadow: 10px 5px 5px grey;
    position: absolute;
    top: 20%;
  }

  .login-input {
    border: 0;
    border-bottom: 1px solid grey;
  }

  .login-button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 2% 5%;
    min-width: 65%;
    text-align: center;
    text-decoration: none;
    display: inline-block;
  }

  .login-button:hover {
    background-color: #4e9a06; /* Green */
  }

  ul {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .vtormet-logo {
    padding-top: 10%;
    padding-bottom: 10%;
    text-align: center;
    color: white;
  }



</style>
