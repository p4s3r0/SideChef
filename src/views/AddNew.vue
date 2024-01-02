<template>
    <div id="container-view-addNew">
      <div id="buttons">
        <ButtonSubtle id="buttonHome" type="home" @click="home()"/>
        <ButtonSubtle id="buttonSave" type="save" @click="openSaveModal()"/>
      </div>
      <h1 id="pageTitle">Neues <br> Rezept</h1>
      <div id="content"> 
        <InputBig @valueUpdated="updateRecipeValue"/>
        <p>Personen</p>

        <PlusMinus id="plusMinusPos" @valueUpdate="updateAmountPersons"/>
        <p>Zutaten</p>
        <div id="ingredientsContainer">
            <InputIngredient v-for="i in this.data" :key="i.key" :id="i.index" @zutatUpdated="updateZutat" @amountUpdated="updateAmount"/>
        </div>
        <div id="actionButtons">
            <ButtonRectangle type="minus" id="minusButtonPos" @clickedAdd="removeIngredient()" />
            <ButtonRectangle type="add" id="addButtonPos" @clickedAdd="addNewIngredient()" />
        </div>
      </div>
      <p>Beschreibung</p>
      <textarea type="text" id="descriptionBox" v-model="this.recipe_description"></textarea>
      <confirmModal :visibility="this.deleteModalVisibility" :loading="this.loading" title="Bestätigung" confirm_text="Hinzufügen" text="Bist du dir sicher, dass du das Rezept hinzufügen willst?" @confirm="save()" @abort="this.deleteModalVisibility='hidden'"/>
    </div>

</template>
  
<script>
import { DBL_checkLogin } from '@/local_db.js'
import { saveNewRecipe } from '@/supabase';
import ButtonSubtle from '@/components/ButtonSubtle.vue';
import InputBig from '@/components/InputBig.vue';
import PlusMinus from '@/components/PlusMinus.vue';
import InputIngredient from '@/components/InputIngredient.vue';
import ButtonRectangle from '@/components/ButtonRectangle.vue';
import confirmModal from '@/modals/confirmModal.vue';


import { toast } from 'vue3-toastify';

import 'vue3-toastify/dist/index.css';

export default {
    name: 'addNew',
    setup() {
    const succesful_added = () => {
      toast.success("Rezept Hinzugefügt!", {
        autoClose: 1000,
        success: true,
      });
    };
    
    const warning_no_name = () => {
      toast.warning("Name fehlt.", {
        autoClose: 3000,
        success: true,
      });
    };


    const unsuccesful_addition = () => {
      toast.error("Etwas ist schiefgelaufen!", {
        autoClose: 3000,
        success: true
      }); // ToastOptions
    }


    return { succesful_added, unsuccesful_addition, warning_no_name };
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
        recipe_description: "",
        i: 0,
        amount_persons: 1,
        deleteModalVisibility: "hidden",
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
    openSaveModal() {
        this.deleteModalVisibility = "visible";
    },
    async save() {
        if(this.recipe_name == "") {
            this.deleteModalVisibility = "hidden"
            this.warning_no_name();
            return;
        }
        this.loading = "loading"
        if(await saveNewRecipe(this.recipe_name, this.amount_persons, this.data, this.recipe_description)) {
            this.succesful_added();
            setTimeout(() => {
                this.$router.push('/');
                this.deleteModalVisibility = "hidden"
                this.loading = "not-loading";}, 2000);
        } else {
            this.deleteModalVisibility = "hidden"
            this.unsuccesful_addition();
        }
    }
    },
    async beforeCreate() {
        const login = await DBL_checkLogin();
        if (!login) {
            this.$router.push("/")
        }
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
    margin-left: 10%;
    /* text-align: center; */
    margin-top: 40px;
}
</style>
