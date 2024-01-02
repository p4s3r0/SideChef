<template>
    <div id="container-component-InputBig">
        <input type="text" placeholder="Rezept Name" v-model="this.data" @input="$emit('valueUpdated', this.data)" >
    </div>
</template>

<script>
export default {
  name: 'InputBig',
  props: ["init"],
  data() {
      return {
        data: "",
      }
  }, watch: { 
        init(newVal) {
          this.data = newVal;
    },
  },
}
</script>
  
<style scoped>
#container-component-InputBig {
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
  