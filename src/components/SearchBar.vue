<template>
    <div id="container-component-InputSearch">
        <input type="text" placeholder="Suche" v-model="this.password" @input="$emit('valueUpdated', this.password)" >
    </div>
</template>

<script>
export default {
  name: 'InputPassword',
  data() {
      return {
        password: "",
      }
  },
}
</script>
  
<style scoped>
#container-component-InputSearch {
    margin-left: 10%;
}

input {
  background-color: white;
  width: calc(100% - 20%);
  height: 60px;
  border-radius: 10px;
  border: none;
  padding-left: 30px;
}

input:focus {
    outline:none;
}

::placeholder {
  color: #B7B7B7;
  opacity: 1;
  font-size: 15px;
}
</style>
  