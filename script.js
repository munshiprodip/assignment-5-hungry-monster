/*
    Title       : Assignment 5 | Hungry Monstar
    Description : Load data from API & place to DOM. 
    Author      : Prodip M
    Date        : 06 February 2021
    Time        : 10:12 PM
*/

// Add event handelar 
document.getElementById('searchForm').addEventListener('submit', function(e){
    e.preventDefault()
    const searchInput = document.getElementById('searchInput').value
    searchFood(searchInput)
})

// Display messages
const displayMessage = message =>{
    document.getElementById('message').innerHTML = message
}

// Clear search result display
const clearDisplay = () =>{
    document.getElementById('displayResult').innerHTML = ""
}

// Fetch data from API with search input
const searchFood = searchInput =>{
    if (searchInput) {
        document.getElementById("searchForm").reset();
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`
        fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.meals===null) {
                clearDisplay()
                const message = `<h3>!!!Ops..."${searchInput}" <br/> This dish is not currently cooked. <br/> Do you like chicken, we have lots of chicken items.</h3>`
                displayMessage(message)
                return false
            }else{
                clearDisplay()
                const message = `<h3>${searchInput} ...?? Yeah !!... <br/> Your favorite dish is ready to satisfy your appetite.  </h3>`
                displayMessage(message)
                displayFoods(data.meals)
                return false
            } 
        })
    }else{
        clearDisplay()
        const message = `<h3>I think you are too much hungry, Forgot to enter food names. <br/> Please enter at least one character...</h3>`
        displayMessage(message)
        return false
    }
}

// Display food items to DOM
const displayFoods = foods =>{
    clearDisplay()
    const displayResult = document.getElementById('displayResult')
    foods.forEach(food => {
        const column = document.createElement('div')
        column.className = "col-md-3 food-item my-3 "

        const foodContent = `
        <div onclick="getDetails('${food.idMeal}')" class="items-image card w-100 overflow-hidden">
            <img src="${food.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title text-center">${food.strMeal}</h5>
            </div>
        </div>
        `
        column.innerHTML = foodContent
        displayResult.appendChild(column)
    });
}

//  Fetch single item from API with item id
const getDetails = idMeal =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
    .then(response => response.json())
    .then(data => displayDetails(data.meals))
}

// Display single item to DOM
const displayDetails = foods =>{
    const modalBody = document.getElementById('modalBody')
    foods.forEach(food => {
        const foodDetails = `
        <div class="card w-100">
            <div class="row g-0">

                <div class="col-md-6">
                    <img src="${food.strMealThumb}" class="card-img-top single-item-image" alt="...">
                </div>

                <div class="col-md-6">
                    <div class="card-body">
                        <h3 class="card-title">${food.strMeal} <span><button type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button></span></h3>
                        <h5 class="card-title">Ingredients</h5>
                        <ul class="list-unstyled">
                            ${ingredientList(food)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        `
        modalBody.innerHTML = foodDetails
        const foodModal = new bootstrap.Modal(document.getElementById('foodModal'))
        foodModal.show()
    });
}

// Create Ingredient list without empty value
const ingredientList = food =>{
    let li = ''
    console.log(food)
    for (let i = 1; i <= 20; i++) {
        const strIngredient = 'strIngredient'+i
        const strMeasure = 'strMeasure'+i
        if(food[strIngredient]){
            li = li + `<li><span><i class="fas fa-check-square text-warning"></i> </span> ${food[strMeasure]}  ${food[strIngredient]}</li>`;
        }
    }
    return li
}