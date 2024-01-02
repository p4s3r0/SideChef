

export function sortByKeyword(recipes, keyword) {
    if (keyword == "") {
        return sortAlphabetically(recipes);
    }

    let ranking = []

    for (let p = 0; p < recipes.length; p++) {
        let curr_score = 0;
        let curr_score_index = 0;
        for (let w = 0; w < recipes[p].name.length && curr_score_index < keyword.length; w++) {
            if (recipes[p].name[w].toLowerCase() == keyword[curr_score_index].toLowerCase()) {
                curr_score_index += 1;
                curr_score += 1;
            }
        }
        //create object
        const el = {
            score: curr_score,
            data: recipes[p]
        }
        ranking.push(el)
    }

    ranking.sort((a,b) => b.score - a.score); 
    for (let i = 0; i < ranking.length; i++) {
        ranking[i] = ranking[i].data;
    }

    return ranking;  
}

function sortAlphabetically(recipes) {
    let ranking = []

    for (let p = 0; p < recipes.length; p++) {
        if (recipes[p].name.length == 0) {
            ranking.push({
                score: 0,
                data: recipes[p]
            })
            continue;
        }

        ranking.push({
            score: recipes[p].name.charCodeAt(0) + (recipes[p].starred ? 0 : 1000),
            data: recipes[p]
        })
    }
    ranking.sort((a,b) => a.score - b.score); 
    for (let i = 0; i < ranking.length; i++) {
        ranking[i] = ranking[i].data;
    }
    return ranking;
}