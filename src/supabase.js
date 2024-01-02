import { createClient } from '@supabase/supabase-js';
import { DBL_getUser } from '@/local_db';

export const supabase = createClient(process.env.VUE_APP_DB_LINK, process.env.VUE_APP_DB_KEY)

export async function getData() {
    const user = await DBL_getUser()
    let { data } = await supabase.from('recipes').select().eq('user', user.username);
    if (data == null) {
        return false;
    }
    return data;
} 


export async function saveNewRecipe(name, amount_persons, ingredients, description) {
    let ingred = [];
    for (let i = 0; i < ingredients.length; i++) {
        ingred.push({name: ingredients[i].name, amount: ingredients[i].amount});
    }
    const user = await DBL_getUser();
    console.log(user)
    const data = {
        name: name,
        ingredients: ingred,
        amount_persons: amount_persons,
        description: description,
        user: user["username"]
    };
    const {error} = await supabase.from('recipes').insert(data);
    if (error != null) {
        return false;
    }
    return true;
}


export async function delRecipe(id) {
    const { error } = await supabase.from('recipes').delete().eq('id', id)
    if (error != null) {
        return false;
    }
    return true;
}


export async function modifyRecipe(id, data) {
    const { error } = await supabase.from('recipes').update(data).eq('id', id)
    if (error != null) {
        return false;
    }
    return true;
}