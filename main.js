let titleProduct = document.getElementById("title");
let priceProduct = document.getElementById("price");
let taxesProduct = document.getElementById("taxes");
let addsproduct = document.getElementById("adds");
let discountProduct = document.getElementById("discount");
let totalProduct = document.getElementById("total");
let countProduct = document.getElementById("count");
let categoryProduct = document.getElementById("category");
let createProduct = document.getElementById("create");

let mood = "create";
let tmp;
//Get totol
function getTotal() {
  if (priceProduct.value != "") {
    totalProduct.innerHTML =
      +priceProduct.value +
      +taxesProduct.value +
      +addsproduct.value -
      +discountProduct.value;
    totalProduct.style.backgroundColor = "#040";
  } else {
    totalProduct.innerHTML = "";
    totalProduct.style.backgroundColor = "#ff0000ad";
  }
}

// Create data

let dataProuct;
if (localStorage.products != null) {
  dataProuct = JSON.parse(localStorage.products);
} else {
  dataProuct = [];
}
createProduct.onclick = function () {
  let newProduct = {
    title: titleProduct.value.toLowerCase(),
    price: priceProduct.value,
    taxes: taxesProduct.value,
    adds: addsproduct.value,
    discount: discountProduct.value,
    total: totalProduct.innerHTML,
    count: countProduct.value,
    category: categoryProduct.value.toLowerCase(),
  };
  if (
    titleProduct.value != "" &&
    priceProduct.value != "" &&
    categoryProduct.value != "" &&
    countProduct.value < 100
  ) {
    if (mood === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProuct.push(newProduct);
        }
      } else {
        dataProuct.push(newProduct);
      }
    } else {
      dataProuct[tmp] = newProduct;
      mood = "create";
      createProduct.innerHTML = "Create";
      countProduct.style.display = "block";
    }
    clearInputs();
  }
  // Save data in local storage
  localStorage.setItem("products", JSON.stringify(dataProuct));

  showData();
};

// Clear inputs
function clearInputs() {
  titleProduct.value = "";
  priceProduct.value = "";
  taxesProduct.value = "";
  addsproduct.value = "";
  discountProduct.value = "";
  totalProduct.innerHTML = "";
  countProduct.value = "";
  categoryProduct.value = "";
}
// Read
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataProuct.length; i++) {
    table += `
    <tr>
            <td>${i + 1}</td>
            <td>${dataProuct[i].title}</td>
            <td>${dataProuct[i].price}</td>
            <td>${dataProuct[i].taxes}</td>
            <td>${dataProuct[i].adds}</td>
            <td>${dataProuct[i].discount}</td>
            <td>${dataProuct[i].total}</td>
            <td>${dataProuct[i].category}</td>
            <td><button onclick ="updateItem(${i})" id="update">update</button></td>
            <td><button onclick ="deleteItem(${i})" id="delete">delete</button></td>
          </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  // delete All
  let deleteAll = document.getElementById("delete-all");
  if (dataProuct.length > 0) {
    deleteAll.innerHTML = `<button onclick = "deleteAll()" >delete all ${dataProuct.length}</button>`;
  } else {
    deleteAll.innerHTML = "";
  }
}
showData();

// delete
function deleteItem(i) {
  dataProuct.splice(i, 1);
  localStorage.products = JSON.stringify(dataProuct);
  showData();
}
// delete All
function deleteAll() {
  dataProuct.splice(0);
  localStorage.clear();
  showData();
}
// update
function updateItem(i) {
  titleProduct.value = dataProuct[i].title;
  priceProduct.value = dataProuct[i].price;
  taxesProduct.value = dataProuct[i].taxes;
  addsproduct.value = dataProuct[i].adds;
  discountProduct.value = dataProuct[i].discount;
  categoryProduct.value = dataProuct[i].category;
  getTotal();
  countProduct.style.display = "none";
  createProduct.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
// search
let searchMood = "title";
function getSearchByButton(id) {
  let search = document.getElementById("search");
  if (id == "search-title") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "search by " + searchMood;
  search.focus();
  search.value = "";
  showData();
}
function searchData(value) {
  let table = "";
  for (let i = 0; i < dataProuct.length; i++) {
    if (searchMood == "title") {
      if (dataProuct[i].title.includes(value.toLowerCase())) {
        table += `
    <tr>
            <td>${i}</td>
            <td>${dataProuct[i].title}</td>
            <td>${dataProuct[i].price}</td>
            <td>${dataProuct[i].taxes}</td>
            <td>${dataProuct[i].adds}</td>
            <td>${dataProuct[i].discount}</td>
            <td>${dataProuct[i].total}</td>
            <td>${dataProuct[i].category}</td>
            <td><button onclick ="updateItem(${i})" id="update">update</button></td>
            <td><button onclick ="deleteItem(${i})" id="delete">delete</button></td>
          </tr>`;
      }
    } else {
      if (dataProuct[i].category.includes(value.toLowerCase())) {
        table += `
    <tr>
            <td>${i}</td>
            <td>${dataProuct[i].title}</td>
            <td>${dataProuct[i].price}</td>
            <td>${dataProuct[i].taxes}</td>
            <td>${dataProuct[i].adds}</td>
            <td>${dataProuct[i].discount}</td>
            <td>${dataProuct[i].total}</td>
            <td>${dataProuct[i].category}</td>
            <td><button onclick ="updateItem(${i})" id="update">update</button></td>
            <td><button onclick ="deleteItem(${i})" id="delete">delete</button></td>
          </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
// clean data
