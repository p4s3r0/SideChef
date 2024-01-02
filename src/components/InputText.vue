<template>
    <div id="container-component-InputText">
        <input type="text" placeholder="Benutzername" v-model="this.value" @input="$emit('valueUpdated', this.value)" >
    </div>
</template>

<script>
export default {
  name: 'InputText',
  data() {
      return {
        value: "",
      }
  },
}
</script>
  
<style scoped>
#container-component-InputText {
}

input {
  background-color: white;
  width: calc(100% - 32px);
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
  