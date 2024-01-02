<template>
    <div id="container-view-addNew">
      <div id="buttons">
        <ButtonSubtle id="buttonHome" type="home" @click="home()"/>
        <ButtonSubtle id="buttonSave" type="save" @click="openModal()"/>
      </div>
      <h1 id="pageTitle">Rezept<br>Bearbeiten </h1>
      <div id="content"> 
        <InputBig @valueUpdated="updateRecipeValue" :init="this.recipe_name"/>
        <p>Personen</p>
        <PlusMinus id="plusMinusPos" @valueUpdate="updateAmountPersons" :init="this.amount_persons"/>
        <p>Zutaten</p>
        <div id="ingredientsContainer">
            <InputIngredient v-for="i in this.data" :key="i.key" 
                                                    :id="i.index" 
                                                    :initName="i.name" 
                                                    :initAmount="i.amount" 
                                                    @zutatUpdated="updateZutat" @amountUpdated="updateAmount"/>
        </div>
        <div id="actionButtons">
            <ButtonRectangle type="minus" id="minusButtonPos" @clickedAdd="removeIngredient()" />
            <ButtonRectangle type="add" id="addButtonPos" @clickedAdd="addNewIngredient()" />
        </div>
        <p>Beschreibung</p>
        <textarea type="text" id="descriptionBox" v-model="this.recipe_description"></textarea>
        
      </div>
      <confirmModal @confirm="save()" @abort="this.modalVisible = 'hidden'" :visibility="this.modalVisible" title="Bestätigung" :loading="this.loading" text="Bist du sicher, dass du das Rezept bearbeiten willst? Nach der Bestätigung, kann es nicht mehr rückgängig gemacht werden" confirm_text="Bearbeiten"/>
    </div>
</template>
  
<script>
import { DBL_checkLogin, DBL_getCurrentRecipe} from '@/local_db.js'
import { modifyRecipe } from '@/supabase';
import ButtonSubtle from '@/components/ButtonSubtle.vue';
import InputBig from '@/components/InputBig.vue';
import PlusMinus from '@/components/PlusMinus.vue';
import InputIngredient from '@/components/InputIngredient.vue';
import ButtonRectangle from '@/components/ButtonRectangle.vue';
import confirmModal from '@/modals/confirmModal.vue';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: 'ModifyView',
    setup() {
    const modify_successful = () => {
      toast.success("Rezept wurde Bearbeitet!", {
        autoClose: 1000,
        success: true,
      }); // ToastOptions
    };

    const modify_not_successful = () => {
      toast.error("Etwas ist schiefgelaufen!", {
        autoClose: 3000,
        success: true
      }); // ToastOptions
    }


    return { modify_successful, modify_not_successful };
   },
    components: {
        ButtonSubtle,
        InputBig,
        PlusMinus,
        InputIngredient,
        ButtonRectangle,
        confirmModal
    }, data() {
      return {
        data: [],
        recipe_name: "",
        i: 0,
        amount_persons: 1,
        db_id: 0,
        modalVisible: "hidden",
        recipe_description: "",
        loading: "not-loading"
      }
  },
    methods: {
    async home() {
        this.$router.push("/home")
    },
    addNewIngredient() {
        this.data.push({name: "", amount: "", index: this.i});
        this.i++;
    },
    removeIngredient() {
        this.data.pop();
        this.i--;
    },
    updateRecipeValue(value) {
        this.recipe_name = value;
    },
    updateZutat(value, index) {
        this.data[index].name = value;
    },
    updateAmount(value, index) {
        this.data[index].amount = value;
    },
    updateAmountPersons(value) {
        this.amount_persons = value;
    },
    openModal() {
        this.modalVisible = "visible";
    },
    async save() {
        if(this.recipe_name == "") {
            this.warning_no_name();
            return;
        }
        this.loading = "loading";

        const data = {
            name: this.recipe_name,
            ingredients: this.data,
            amount_persons: this.amount_persons,
            description: this.recipe_description
        }
        if(await modifyRecipe(this.db_id, data)) {
            this.modify_successful();
            setTimeout(() => {
                this.$router.push('/'); 
                this.loading = "not-loading";}, 2000);
        } else {
            this.loading = "not-loading";
            this.modify_not_successful();
        }
    }
    },
    async beforeCreate() {
        const login = await DBL_checkLogin();
        if (!login) {
            this.$router.push("/")
        }
        const recipe = await DBL_getCurrentRecipe();
        this.data = recipe.ingredients;
        for (let i = 0; i < this.data.length; i++) {
            this.data[i].index = i;
        }
        this.amount_persons = recipe.amount_persons;
        this.recipe_name = recipe.name;
        this.db_id = recipe.db_id;
        this.recipe_description = recipe.description
        this.i = this.data.length;
    },
   
}
</script>

<style scoped>
#container-view-addNew {
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
}

#pageTitle {
    position: absolute;
    top: 9vh;
    left: 10vw;
}

#buttonHome {
    position: relative;
}

#buttonSave {
    margin-top: 20px;
}

#buttons {
    position: absolute;
    right: 5%;
    top: 5%;
}

#content {
    margin-top: 30vh;
}

#plusMinusPos {
}

#addButtonPos {
    margin-left: 10px;
}

#actionButtons {
    display: flex;
    margin-top: 10px;
    margin-bottom: 20px;
    margin-left: 53%;
    transform: translateX(-50%);
}

#descriptionBox {
    width: calc(80% - 40px);
    margin-left: 10%;
    border-radius: 10px;
    border: none;
    height: 20vh;
    margin-bottom: 20px;
    padding: 20px 20px 20px 20px;
}

p {
    margin-top: 40px;
    margin-left: 10%;
}
</style>
