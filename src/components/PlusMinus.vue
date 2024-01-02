<template>
    <div class="container-component-PlusMinus">
        <button @click="this.amount > 1 ? this.amount-- : this.amount = 1; $emit('valueUpdate', this.amount)">
            <p>-</p>
        </button>
        <div id="amountField">
            <p>{{ this.amount }}</p>
        </div>
        <button @click="this.amount++; $emit('valueUpdate', this.amount)">
            <p>+</p>
        </button>
    </div>
</template>

<script>
export default {
    name: 'PlusMinus',
    props: ["init"],
    watch: { 
        init(newVal) {
          this.amount = newVal;
    },
},
    data() {
        return {
            amount: this.init != undefined ? this.init : 1,
        }
    },
}
</script>
  
<style scoped>
.container-component-PlusMinus {    
    display: flex;
    position: relative;
    margin-left: calc(50% - 90px);
}

button {
    margin-top: 12.5px;
    position: relative;
    width: 45px;
    height: 45px;
    background-color: white;
    border: none;
    border-radius: 10px;
}

#amountField {
    width: 70px;
    height: 70px;
    background-color: white;
    border-radius: 10px;
    margin-left: 10px;
    margin-right: 10px;
}
#amountField p {
    margin-top: 50%;
    transform: translateY(-50%);
    text-align: center;
}

#personenTitle {
    position: absolute;
    bottom: 60px;
    margin-left: 90px;
    transform: translateX(-50%);
}
</style>