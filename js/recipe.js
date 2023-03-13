const mealdesc = localStorage.getItem("mealsDesc"); //get mealDescription from local Storage
const mealDescription = JSON.parse(mealdesc);
//insert image
const imageContainer = document.getElementById("recipe-meal-img");

imageContainer.innerHTML = `

<img src="${mealDescription["strMealThumb"]}"  id ="thumbnail" />`;

//adding category
const category = document.getElementById("recipe-category");
category.innerHTML = `
<p>${mealDescription["strCategory"]}</p>
`;
//adding ingredients

//insert instructions
const instructionsContainer = document.getElementById("recipe-instructions");
const instructions = document.createElement("div");
instructions.id = "instructions";
instructions.innerHTML = `
<h1>${mealDescription["strMeal"]}</h1>
<div id = "instructions">${mealDescription["strInstructions"]}</div>`;
instructionsContainer.append(instructions);
//yt link
const viewBtn = document.getElementById("view-btn");
viewBtn.innerHTML = `
<a href="${mealDescription["strYoutube"]}" class="view-btn"><i class="fa-brands fa-youtube"></i>view recipe</a>
`;

const ingredientsList = document.getElementById("ingredients");
let strIngredient = [];
for (i = 1; i <= 20; i++) {
  strIngredient.push("strIngredient" + i);
}
let strMeasure = [];
for (i = 1; i <= 20; i++) {
  strMeasure.push("strMeasure" + i);
}
i = 0;
while (i <= 20) {
  a = strIngredient[i];
  b = strMeasure[i];

  if (mealDescription[a] == "" || mealDescription[a] == undefined) {
    i++;
    continue;
  }

  const ingredientListItem = document.createElement("li");
  ingredientListItem.innerHTML = `${mealDescription[a]} = ${mealDescription[b]}`;

  ingredientsList.append(ingredientListItem);
  i++;
}
