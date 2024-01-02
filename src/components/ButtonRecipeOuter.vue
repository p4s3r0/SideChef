<template>
    <div id="container-component-ButtonRectangle">
      <div id="container" @click="openRecipeView(this.name, this.created_at, this.ingredients, this.amount_persons, this.description, this.db_id)">
        <p id="title">{{ this.name }}</p>
      </div>
    </div>
</template>

<script>
import { DBL_setCurrentRecipe } from '@/local_db.js';
export default {
  name: 'ButtonRectangle',
  props: ["name", "created_at", "ingredients", "amount_persons", "description", "db_id"],
  data() {
      return {
        password: "",
      }
  },
  methods: {
    async openRecipeView(name, created_at, ingredients, amount_persons, description, db_id) {
        const ret = await DBL_setCurrentRecipe(name, created_at, ingredients, amount_persons, description, db_id);
        if(ret) {
            this.$router.push("/recipe");
        }
    }
  }
}
</script>
  
<style scoped>
#container-component-ButtonRectangle {    
    margin-top: 10px;
}

#container {
  position: relative;
  margin-left: 10%;
  right: 0px;
  width: 79%;
  height: 60px;
  background-color: white;
  border: none;
  border-radius: 10px;
}

svg {
  background-color: white;
}

#title {
    position: absolute;
    top: 25%;
    left: 5%;
    transform: translateY(-50%);
}
</style>
  