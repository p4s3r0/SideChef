<template>
    <div id="container-component-InputBig">
        <input type="text" placeholder="Zutat" v-model="this.data" @input="$emit('zutatUpdated', this.data, this.id)" id="ing">
        <input type="text" placeholder="Menge" v-model="this.amount"  @input="$emit('amountUpdated', this.amount, this.id)" id="am">
    </div>
</template> 

<script>
export default {
  name: 'InputBig',
  props: ["id", "initName", "initAmount"],
  data() {
      return {
        data: "",
        amount: ""
      }
  }, beforeMount() {
    this.data = this.initName;
    this.amount = this.initAmount
  }
}
</script>
  
<style scoped>
#container-component-InputBig {
  margin-left: 10%;
  margin-top: 10px;
  display: flex;  
}

input {
  background-color: white;
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

#ing {
  width: 55%;
}

#am {
  margin-left: 10px;
  width: 20%;
  padding-left: 0px;
  text-align: center;
}
</style>
  