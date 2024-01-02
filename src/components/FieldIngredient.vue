<template>
    <div id="container-component-FieldIngredient">
      <div id="container">
        <div id="ingredient">
            <p>{{ this.name }} </p>
        </div>
        <div id="amount">
            <p>{{ this.amount }}</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'FieldIngredient',
  props: ["name", "amount"],
  data() {
      return {
      }
  },
  methods: {
  },
  beforeCreate() {
  }
}
</script>
  
<style scoped>
#container-component-FieldIngredient {    
    margin-top: 10px;
}

#ingredient {
  position: relative;
  margin-left: 10%;
  width: 58%;
  height: 60px;
  background-color: white;
  border: none;
  border-radius: 10px;
}
#ingredient p {
    top: 50%;
    margin-left: 5%;
    transform: translateY(25%);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

#amount {
    position: relative;
    width: 20%;
    height: 60px;
    background-color: white;
    border-radius: 10px;
    margin-left: 10px;
}
#amount p {
    top: 50%;
    text-align: center;
    transform: translateY(25%);
}

#container {
    display: flex;
}

</style>
  