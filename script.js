// fetching elements

const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const mealsList = document.getElementById("meals-list");
//event listener
const searchBarList = document.createElement("ul");
const searchBarValue = document.getElementById("search-input");
const searchBar = document.getElementById("meal-search-box");
const searchInput = window.location.search;
//const searchInput = window.location.search;
//const favBtn = document.getElementById();
//ADD TO FAVOURITES

const favouritesMealArray = []; //array containing favourites meal
function addToFavourites(id) {
  favBtn = document.querySelector('[fav-data-id = "' + id + '"]');
  console.log(favBtn);
  favBtn.innerText = "remove from fav";

  let searchInput = document.getElementById("search-input").value.trim();
  console.log(searchInput.length); //fetching data from api
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      obj = data;
    })
    .catch((error) => {
      console.error("FETCH ERROR:", error);
    });

  const { meals } = obj;
  let isPresentAlready = -1;
  for (elem of meals) {
    if (elem["idMeal"] == id) {
      const favourites = getFavourites();
      favourites.forEach((e) => {
        if (e["idMeal"] == id) {
          isPresentAlready = 0;
        }
      });
      if (isPresentAlready == -1) {
        favouritesMealArray.push(elem);
        localStorage.setItem("favourites", JSON.stringify(favouritesMealArray));
      } else {
        const favourites = getFavourites();
        res = -1;
        //iterate favourites array n find if element present or not
        favourites.forEach((elem) => {
          if (elem["idMeal"] == id) {
            res = favourites.indexOf(elem);
          }
        });
        //if present then delete
        if (res != -1) {
          favBtn = document.querySelector('[fav-data-id = "' + id + '"]');
          favBtn.innerText = "add to favourite";

          favourites.splice(res, 1);
          localStorage.setItem("favourites", JSON.stringify(favourites));
          console.log(favourites);
        }
      }
    }
  }
}
//function to fetch array containing favourites from local storage
function getFavourites() {
  let favourites = [];
  const isPresent = localStorage.getItem("favourites");
  if (isPresent) {
    favourites = JSON.parse(isPresent);
  }
  return favourites;
}
//when we click search button triggered
searchBtn.addEventListener("click", getMeals);
//fetching list of meals matching to search input
// we will add dynamic input event listeners
//listening different inputs or dynamically
// event listener  to listen dynamic input

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
        //const favourites = getFavourites();
        // let isFavourite = "ADD TO FAVOURITES";
        // for (elem of favourites) {
        //   if (meal["idMeal"] == meal["idMeal"]) {
        //     isFavourite = "REMOVE FROM FAV";
        //   }
        // }

        data.meals.forEach((meal) => {
          const favourites = getFavourites();
          let isFavourite = "add to favourite";
          for (elem of favourites) {
            if (elem["idMeal"] == meal["idMeal"]) {
              isFavourite = "remove from fav";
            }
          }
          //appending html ..
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
              <a   onclick= "fetchById(${meal["idMeal"]})" data-id =${meal["idMeal"]} target = "_blank" class="recipe-btn" 
                ><i class="fa-solid fa-spoon"></i>get recipe</a
              >
              <a class="fav-btn" id="fav-btn" onclick = addToFavourites(${meal["idMeal"]}) id = "fav-btn" fav-data-id = ${meal["idMeal"]}>${isFavourite}
                </a
              >
              <a href="" class="view-btn" onclick= "fetchById(${meal["idMeal"]})" data-id =${meal["idMeal"]} 
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
  window.target = "_blank";
  window.location.href = "./recipe.html";
}
