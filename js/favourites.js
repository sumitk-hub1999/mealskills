const favouritesWrapper = document.getElementById("favourites-wrapper");
const favouritesList = document.getElementById("favourites-list");
//creating function to add favourite meals
function addFavouriteMeals() {
  const data = localStorage.getItem("favourites");
  const meal = JSON.parse(data);

  if (meal.length == 0) {
    //if there are no favourites
    emptyListTag = document.createElement("div");
    emptyListTag.id = "";
    emptyListTag.innerHTML = `<h1>Scooby's Hungry. Tell him your favourite meals.. </h1><img src ="./tenor.png" height: 50% width = 50% />`;
    favouritesList.remove();
    favouritesWrapper.append(emptyListTag);
  }
  // else there are favourites add item cards as list item to ul
  meal.forEach((element) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
    
    <div class="meal-item">
    <div class="meal-img">
      <img
        src="${element["strMealThumb"]}"
        alt="food"
      />
    </div>
    <div class="meal-name">
      <h3> ${element["strMeal"]}</h3>
      <a  target="_blank" data-id =${element["idMeal"]}  id="desc-btn" onClick= "fetchById(${element["idMeal"]})" class="recipe-btn"
        ><i class="fa-solid fa-spoon"></i>get recipe</a
      >
      <a  class="remove-btn" onclick = "deletefromStorage(${element["idMeal"]})"
        ><i class="fa-sharp fa-solid fa-xmark"></i>remove from
        favourite</a
      >
      
    </div>
  </div>
  
    `;
    favouritesList.append(listItem);
  });
}
// function to fetch from  favourites array from local storage
function getFavourites() {
  let favourites = [];
  const isPresent = localStorage.getItem("favourites"); //parsing favourites array
  if (isPresent) {
    favourites = JSON.parse(isPresent);
  }

  return favourites;
}

//function to delete data from favourites  array through id
function deletefromStorage(id) {
  //console.log(id);
  const favourites = getFavourites();
  let res;

  favourites.forEach((elem) => {
    if (elem["idMeal"] == id) {
      //console.log();
      res = favourites.indexOf(elem);
      //console.log(res);
    }
  });
  if (res != -1) {
    b = favourites.splice(res, 1);
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }
  location.reload();
}

//function to fetch data from id
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

//function to add meal recipe to local storage for rendering on recipe page
function setToLocal(obj) {
  const a = obj.meals;
  localStorage.setItem("mealsDesc", JSON.stringify(a[0]));
  window.location.href = "./recipe.html";
}

//adding event listener to listen

window.addEventListener("DOMContentLoaded", () => {
  addFavouriteMeals();
});
