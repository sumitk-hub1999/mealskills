// fetching elements

const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const mealsList = document.getElementById("meals-list");
//event listener
searchBtn.addEventListener("click", getMeals);
//fetching list of meals matching to search input

function getMeals() {
  let searchInput = document.getElementById("search-input").value.trim();
  console.log(searchInput.length); //fetching data from api
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
    .then((response) => response.json())
    .then((data) => {
      obj = data; //assign data to an empty object
      createList(obj);
    })
    .catch((error) => {
      console.log("ERROR!!!", error);
    });
}
//creating function to display the list of meals
function createList(obj) {
  let { meals } = obj;
  if (meals == null) {
    console.log("no meals");
    const li = document.createElement("li");
    li.innerHTML = `<h1>No MeAlS fOunD RentEr VaLiD IngreDieNT</h1>`;
    mealsList.append(li);
  } else {
    meals.forEach((element) => {
      addLi(element);
    });
  }
}

//function to add list item to dom
function addLi(element) {
  const li = document.createElement("li");

  li.innerHTML = `
  <div class="meal-item">
  <div class="meal-img">
    <img
      src="https://www.indianhealthyrecipes.com/wp-content/uploads/2022/04/lemon-pepper-fish-recipe-500x375.jpg"
      alt="food"
    />
  </div>
  <div class="meal-name">
    <h3>${element["strMeal"]}</h3>
    <a  href="recipe.html"  target="_blank"  class="recipe-btn" 
      ><i class="fa-solid fa-spoon"></i>get recipe</a
    >
    <a href="#" class="fav-btn"
      ><i class="fa-solid fa-plus"></i>add to favourite</a
    >
    <a href="" class="view-btn"
      ><i class="fa-brands fa-youtube"></i>view recipe</a
    >
  </div>
</div>
  
  `;
  mealsList.append(li);
}

//adding local storage

const fetchById = (id) => {
  url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      obj = data;
      setToLocal(obj);
    })
    .catch((error) => {
      console.error("FETCH ERROR:", error);
    });
};

function setToLocal(obj) {
  const a = obj.meals;
  localStorage.setItem("mealsDesc", JSON.stringify(a[0]));
  window.location.href = "./recipe.html";
}
