import Dexie from 'dexie';

export const db = new Dexie('foodDB');
db.version(5).stores({
  user: '++idx, logged_in, username',
  curr_recipe: 'idx, created_at, name, amount_persons, description',
  curr_recipe_ingredients: '++idx, name, amount'
});

//
export async function DBL_loginUser(username) {
    await db.user.add({ logged_in: true, username: username });
}


export async function DBL_getUser() {
    const user = await db.user.toArray(); 
    return user[0];
}



export async function DBL_checkLogin() {
    const user = await db.user.toArray(); 
    if (user.length == 0) {
        return false;
    }
    return true;
}


export async function DBL_logout() {
    await db.user.clear();
    await db.curr_recipe.clear();
    await db.curr_recipe_ingredients.clear();
}



export async function DBL_setCurrentRecipe(name, created_at, ingredients, amount_persons, description, db_id) {
    await DBL_clearCurrentRecipe();

    await db.curr_recipe.add({
        idx: 1,
        created_at: created_at,
        name: name,
        amount_persons: amount_persons,
        description: description,
        db_id: db_id
    });

    for (let i = 0; i < ingredients.length; i++) {
        await db.curr_recipe_ingredients.add({name: ingredients[i].name, amount: ingredients[i].amount})
    }
    return true;
}



export async function DBL_updateCurrentRecipe(amount_persons) {
    const old_recipe = await DBL_getCurrentRecipe();
    for (let i = 0; i < old_recipe.ingredients.length; i++) {
        let number = old_recipe.ingredients[i].amount.match(/(\d+\.?\d*)/);
        if (number == null) {
            continue
        }
        number = number[0]
        
        let unit = old_recipe.ingredients[i].amount.split(number).pop()
        number = Math.round((number * 10 / old_recipe.amount_persons * amount_persons)) / 10;
        const new_amount_with_unit = number + unit

        await db.curr_recipe_ingredients.update(old_recipe.ingredients[i].idx, {amount: new_amount_with_unit});
    }
    await db.curr_recipe.update(1, {amount_persons: amount_persons});
}



export async function DBL_clearCurrentRecipe() {
    await db.curr_recipe.clear();
    await db.curr_recipe_ingredients.clear();
}



export async function DBL_getCurrentRecipe() {
    let recipe = await db.curr_recipe.toArray(); 
    if (recipe.length == 0) {
        return false;
    }

    const ingredients = await db.curr_recipe_ingredients.toArray();

    recipe = recipe[0];
    const ret = {
        created_at: recipe.created_at,
        name: recipe.name,
        amount_persons: recipe.amount_persons,
        description: recipe.description,
        db_id: recipe.db_id,
        ingredients: ingredients
    }
    return ret;
}