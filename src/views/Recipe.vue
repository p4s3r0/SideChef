<template>
    <div id="container-view-recipe">
      <div id="buttons">
        <ButtonSubtle id="buttonHome" type="home" @click="home()"/>
        <ButtonSubtle id="buttonDelete" type="delete" @click="openDelModal()"/>
        <ButtonSubtle id="buttonModify" type="modify" @click="modify()"/>
      </div>
      <h1 id="pageTitle">{{ this.data.name }}</h1>
      <div id="content"> 
        <div v-if="this.ingredients_present">
            <p>Personen</p>
            <PlusMinus id="PlusMinusPos" @valueUpdate="changePersonsAmount" :init="this.persons_amount"/>
        </div>
        <div id="ingredientsContainer" v-if="this.ingredients_present">
            <p>Zutaten</p>
            <FieldIngredient v-for="i in this.data.ingredients" :key="i.key" :name="i.name" :amount="i.amount"/>
        </div>
        <div v-if="this.data.description != '' && this.data.description != undefined">
            <p>Beschreibung</p>
            <div id="descriptionField">{{ this.data.description }}</div>
        </div>
      </div>
      <confirmModal :visibility="this.deleteModalVisibility" :loading="this.loading" title="Bestätigung" confirm_text="Löschen"  text="Bist du dir sicher, dass du das Rezept löschen möchtest? Diese Aktion kann nicht mehr rückgängig gemacht werden" @confirm="del()" @abort="this.deleteModalVisibility='hidden'"/>
    </div>
</template>
  
<script>
import { DBL_checkLogin, DBL_clearCurrentRecipe, DBL_getCurrentRecipe } from '@/local_db.js'
import ButtonSubtle from '@/components/ButtonSubtle.vue';
import FieldIngredient from '@/components/FieldIngredient.vue';
import PlusMinus from '@/components/PlusMinus.vue';
import confirmModal from '@/modals/confirmModal.vue';
import { delRecipe } from '@/supabase.js';

import { DBL_updateCurrentRecipe } from '@/local_db.js';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


export default {
    name: 'RecipeView',
    setup() {
    const delete_succesful = () => {
      toast.success("Rezept gelöscht!", {
        autoClose: 1000,
        success: true,
      }); // ToastOptions
    };

    const delete_not_succesful = () => {
      toast.error("Rezept konnte nicht gelöscht werden!", {
        autoClose: 3000,
        success: true
      }); // ToastOptions
    }
    return { delete_succesful, delete_not_succesful };
   },
    components: {
        ButtonSubtle,
        FieldIngredient,
        PlusMinus,
        confirmModal
    }, 
    data() {
      return {
        data: {},
        persons_amount: 1,
        deleteModalVisibility: "hidden",
        loading: "not-loading",
        ingredients_present: true,
      }
  },
    methods: {
    async home() {
        await DBL_clearCurrentRecipe();
        this.$router.push("/home");
    },
    modify() {
        this.$router.push("/modify");
    },
    openDelModal() {
        this.deleteModalVisibility = "visible";
    },
    async del() {
        this.loading = "loading"
        if(await delRecipe(this.data.db_id)) {
            this.delete_succesful();
            setTimeout(() => { 
                this.home();
                this.deleteModalVisibility = "hidden";
                this.loading = "not-loading"}, 2000);
        } else {
            this.loading = "not-loading";
            this.delete_not_succesful();
        }
    },
    async changePersonsAmount(value) {
        this.persons_amount = value;
        await DBL_updateCurrentRecipe(value);
        this.data = await DBL_getCurrentRecipe();
    }
    },
    async beforeCreate() {
        const login = await DBL_checkLogin();
        if (!login) {
            this.$router.push("/")
        }
        this.data = await DBL_getCurrentRecipe();
        this.persons_amount = this.data.amount_persons;
        if (this.data.ingredients.length == 0) {
            this.ingredients_present = false;
        }
    }
}
</script>

<style scoped>
#container-view-recipe {
    position: absolute;
    left: 0px;
    top: 0px;
    bottom: 0px;
    right: 0px;
    background-color: #EDEDED;
}

#pageTitle {
    position: absolute;
    top: 9vh;
    left: 10vw;
    width: 65%;
    word-wrap: break-word;
}

#buttonHome {
    position: relative;
}

#buttonDelete {
    position: relative;
    margin-top: 5px;
}
#buttonModify {
    position: relative;
    margin-top: 5px;
}

#buttons {
    position: absolute;
    right: 5%;
    top: 5%;
}

#content {
    margin-top: 30vh;
    padding-bottom: 50px;
}

#PlusMinusPos {
    margin-bottom: 5vh;
}

#descriptionField {
    width: calc(80% - 28px);
    margin-left: 10%;
    margin-top: 20px;
    padding: 20px 10px 20px 15px;
    background-color: white;
    border-radius: 10px;
    margin-bottom: 40px;
}

p{
    margin-left: 10%;
    margin-top: 40px;
}
</style>
