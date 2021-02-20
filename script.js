let recipes = []

const generateRecipe = (type, diet) => {
    const apiKey = '' /* <--- YOUR APIKEY HERE */
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&sort=random&addRecipeInformation=true&type=${type}&diet=${diet.vegan ? 'vegan,' : ''}${diet.glutenfree ? 'gluten%20free,' : ''}`, {
    method: 'GET'
})
    .then(res => {
        if(res.ok){
            return res.json()
        } else  {
            $('#recipe-name').html("Could'nt recive the recipe. API's daily quota might be exceeded")
        }
    })
    .then(data => setResults(data.results[0]))
    .catch(error => $('#recipe-name').html(error + '<br>Make sure you have the right API key'))
}

const infoBoolean = (value, text) => {
    if(value) {
        return `<li>${text}</li>`
    } else {
        return '';
    }
}

const setResults = (data) => {
    $('#recipe-info').html('')
    $('#recipe-info').css('display', 'block')

    $('#recipe-name').html(data.title)
    $('#image-container').html(`<img class="recipe-image" src="${data.image}">`)
    $('#recipe-info').append(infoBoolean(data.vegan, '<i><li>Vegan</li></i>'))
    $('#recipe-info').append(infoBoolean(data.glutenFree, '<i><li>Gluten free</li></i>'))
    $('#recipe-info').append(`<li id="timer" class="center-child"><div id="recipe-time">${data.readyInMinutes}</div></li>`)
    $('#recipe-link').html(`<a href="${data.sourceUrl}" target="_blank">See this recipe</a>`)
}

$( "#recipeform" ).submit((e) => {
    e.preventDefault();
    let type = $('#food-type').val();
    let vegan = $('#vegan').is(':checked')
    let glutenfree = $('#glutenfree').is(':checked')
    let diet = {vegan, glutenfree}
    $('.load-overlay').css('display','flex')
    $('#recipe').css('display', 'none')
    generateRecipe(type, diet)
    setTimeout(() => {
        $('.load-overlay').css('display','none')
        $('#recipe').css('display', 'block')
    }, 3000)
    
});