<template>
  <div id="container-view-home">
    <div id="buttons">
      <ButtonSubtle id="buttonHome" type="home"/>
      <ButtonSubtle id="buttonLogout" type="logout" @click="logout"/>
    </div>
    <h1 id="pageTitle">Alle <br>Rezepte</h1>
    <div id="content"> 
      <SearchBar @valueUpdated="reorderWithSearch"/>
      <div id="recipesContainer">
        <ButtonRecipeOuter v-for="r in this.recipes"  :key="r.key" 
                                                      :name="r.name" 
                                                      :amount_persons="r.amount_persons" 
                                                      :created_at="r.created_at" 
                                                      :description="r.description"
                                                      :ingredients="r.ingredients"
                                                      :db_id="r.id"
                                                      />
      </div>
    </div>

    <ButtonRectangle id="buttonNew" type="add" @click="addNew"/>
    
  </div>
</template>

<script>
import { DBL_checkLogin, DBL_logout } from '@/local_db.js'
import { sortByKeyword } from '@/scripts.js'
import ButtonSubtle from '@/components/ButtonSubtle.vue';
import ButtonRectangle from '@/components/ButtonRectangle.vue';
import SearchBar from '@/components/SearchBar.vue';
import ButtonRecipeOuter from '@/components/ButtonRecipeOuter.vue';
import { getData } from '@/supabase';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


export default {
name: 'HomeView',
setup() {
  const invalidSupabaseData = () => {
    toast.error("No Data from Database", {
      autoClose: 3000,
    });
  };
  return { invalidSupabaseData };
  },
components: {
  ButtonSubtle,
  SearchBar,
  ButtonRecipeOuter,
  ButtonRectangle
},
data() {
    return {
      recipes: []
    }
},
methods: {
  logout() {
    DBL_logout();
    this.$router.push("/");
  },
  addNew() {
    this.$router.push("/add")
  },
  reorderWithSearch(search) {
    this.recipes = sortByKeyword(this.recipes, search);
  }
},
async beforeCreate() {
  const login = await DBL_checkLogin();
  if (!login) {
    this.$router.push("/")
  }

  const data = await getData();
  if (!data) {
    this.invalidSupabaseData();
  }
  this.recipes = data;
}
}
</script>

<style scoped>
#container-view-home {
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

#buttonLogout {
  position: relative;
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

#recipesContainer {
  margin-top: 5vh;
  margin-bottom: 20px;
}

#buttonNew {
  position: fixed;
  bottom: 5vw;
  right: 5vw;
}
</style>
