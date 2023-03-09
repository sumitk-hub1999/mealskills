// fetching elements

const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const mealsList = document.getElementById("meals-list");
//event listener
const searchBarList = document.createElement("ul");
const searchBarValue = document.getElementById("search-input");
const searchBar = document.getElementById("meal-search-box");

//ADDING TO FAVOURITES LIST FIRST

//when we click search button triggered
searchBtn.addEventListener("click", getMeals);
//fetching list of meals matching to search input
// we will add dynamic input event listeners
//listening different inputs or dynamically
window.addEventListener("click", () => {
  while (searchBarList.firstChild) {
    searchBarList.removeChild(searchBarList.firstChild);
  }
});

// event listener  to listen dynamic input
searchBarValue.addEventListener("keyup", (e) => {
  while (searchBarList.firstChild) {
    searchBarList.removeChild(searchBarList.firstChild);
  }
  API_SEARCH_BAR_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  let searchValueInput = document.getElementById("search-input").value;
  API_SEARCH_BAR_URL += searchValueInput;
  populateSearchList(API_SEARCH_BAR_URL);
  searchBar.append(searchBarList);
});

// function to add list items of dynamic input to search bar list
async function populateSearchList(url) {
  await fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      obj1 = data;
    })
    .catch((error) => {
      console.error("FETCH ERROR:", error);
    });

  let { meals } = obj1;

  a = url.substring(url.indexOf("=") + 1);
  a += "";

  if (obj1 != null) {
    for (element of meals) {
      var searchListItem = document.createElement("li");
      searchListItem.className = "searchListItem";
      searchListItem.innerHTML = `<a href = "javascript:void(0)" onclick= "fetchById(${element["idMeal"]}) " >${element["strMeal"]}</a>`;
    }
    searchBarMealsList.append(searchListItem);
  }
}

//searchBarValue.addEventListener();
function getMeals() {
  let searchInput = document.getElementById("search-input").value.trim();
  console.log(searchInput.length); //fetching data from api
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
    .then((response) => response.json())
    .then((data) => {
      //   obj = data; //assign data to an empty object
      //   createList(obj);
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
            <div class="meal-item">
            <div class="meal-img">
              <img
                src="${meal["strMealThumb"]}"
                alt="food"
              />
            </div>
            <div class="meal-name">
              <h3>${meal["strMeal"]}</h3>
              <a   onclick= "fetchById(${meal["idMeal"]})" data-id =${meal["idMeal"]} class="recipe-btn" 
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
        });
        mealList.classList.remove("error");
      } else {
        html = `<h1>No MeAlS fOunD RentEr VaLiD IngreDieNT</h1>`;
        mealList.classList.add("error");
      }
      mealList.innerHTML = html;
    })
    .catch((error) => {
      console.log("ERROR!!!", error);
    });
}

//creating function to display the list of meals
// function createList(obj) {

// }

//function to add list item to dom
// function addLi(meal) {
//   const li = document.createElement("li");

//   li.innerHTML = `

//   `;
//   mealsList.append(li);
// }

// //fetching recipe info and all and displaying whole recipe in new page

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

//ADD TO FAVOURITES
