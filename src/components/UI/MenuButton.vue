<template>
  <div class="row menu-button">
    <a>
        <slot></slot>
    </a>
  </div>
</template>

<script>
export default {
  name: 'menu-button'
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.menu-button {
  text-decoration: none;
  color: white;
}
.menu-button:hover {
    background: #db7e39; /* Цвет фона */
    color: black;
    cursor: pointer;
   }
a {
  margin: 10px 10px;
  padding-left:  10%;
}

</style>