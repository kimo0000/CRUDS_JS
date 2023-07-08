let popup = document.querySelector(".popup");
let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector(".totals");
let toto = document.querySelector("#toto");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let create = document.querySelector("#create");
let search = document.querySelector("#search");
let searchByTitle = document.querySelector("#by_title");
let searchByCategory = document.querySelector("#by_category");
let deleteAll = document.querySelector("#btn_all");
let tableTbody = document.querySelector("table tbody");

let mode = "create";
let temp;

// Function Get Total
function getTotal() {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    if (price.value != "") {
        toto.innerHTML = result;
        total.style.backgroundColor = "green";
    } else {
        toto.innerHTML = "";
        total.style.backgroundColor = "red";
    }
}

// Show Data
let dataProduct;
if (localStorage.getItem("products")) {
    dataProduct = JSON.parse(localStorage.getItem("products"));
} else {
    dataProduct = [];
}

create.addEventListener("click", () => {
    let newProduct = {
        id: Date.now(),
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        toto: toto.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };

    if (title.value != "" && price.value != "") {
        if (mode === "create") {
            if (newProduct.count > 1 && newProduct.count <= 99) {
                for (let i = 0; i < newProduct.count; i++) {
                    dataProduct.push(newProduct);
                    getText("All Product Added Successfull", "success");
                }
            } else {
                dataProduct.push(newProduct);
                getText("One Product Added Successfull", "success");
            }
        } else {
            dataProduct[temp] = newProduct;
            create.innerHTML = "Create";
            count.style.display = "block";
            getText("Product Updated Succesefull", "success");
            mode = "create";
        }
    } else {
        getText("Please Insert Product!", "danger");
    }

    // console.log(dataProduct);
    localStorage.setItem("products", JSON.stringify(dataProduct));
    cleanInput();
    showData(dataProduct);
});

// Function Clean Input
function cleanInput() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    toto.value = "";
    count.value = "";
    category.value = "";
}

// Function Show Data
function showData(data) {
    const products = data
        .map((item, i) => {
            //   console.log(item);

            let { title, price, taxes, ads, discount, toto, category } = item;
            // console.log(id)
            let n = 0;
            return `
           <tr>
             <td>-${i}-</td>
             <td>${title}</td>
             <td>${price}</td>
             <td>${taxes}</td>
             <td>${ads}</td>
             <td>${discount}</td>
             <td>${toto}</td>
             <td>${category}</td>
             <td><button onclick="updateItem(${i})">update</button></td>
             <td><button onclick="deleteItem(${i})">delete</button></td>
           </tr>
        `;
        })
        .join("");

    // console.log(products)

    tableTbody.innerHTML = products;
    getTotal();
    // Show Button Delete All
    if (dataProduct.length) {
        //    console.log("The data Mength is " + dataProduct.length);
        deleteAll.innerHTML = `<button id="delete_all" onclick="deleteAllItem()">Delete All (${dataProduct.length})</button>`;
    } else {
        deleteAll.innerHTML = "";
    }
}

showData(dataProduct);

// Function Delete Item
function deleteItem(i) {
    // console.log(i)
    // console.log(dataProduct[i])
    dataProduct.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(dataProduct));
    showData(dataProduct);
    getText("Product Deleted Succesefull", "danger");
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}

// Function Update Item
function updateItem(i) {
    //    console.log(i)
    mode = "update";
    temp = i;
    // console.log(temp);
    create.innerHTML = "Update";
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    toto.innerHTML = dataProduct[i].toto;
    getTotal();
    count.style.display = "none";
    category.value = dataProduct[i].category;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}

// Function Delete All Item
function deleteAllItem() {
    // console.log('delete All');
    dataProduct.splice(0);
    localStorage.clear();
    showData(dataProduct);
}

// Function Get Text
function getText(text, action) {
    popup.innerHTML = text;
    popup.classList.add(action);
    setTimeout(() => {
        popup.innerHTML = "";
        popup.classList.remove(action);
    }, 2000);
}

// Function search By title || category
let searchMode = "Title";

function getSearch(id) {
    // console.log(id)
    if (id === "by_title") {
        searchMode = "Title";
    } else {
        searchMode = "Category";
    }

    search.placeholder = `search By ${searchMode}`;
    search.focus();
    search.value = "";
}

// Fucntion Search
function searched(value) {

    if (searchMode === "Title") {
        let productTitle = dataProduct.filter((item) => {
            // console.log(item)
            // console.log(i)
            // console.log(typeof arr[i].title)
            // console.log(value)
            // console.log(item.title)
            return item.title.includes(value.toLowerCase());
        });

        // console.log(productTitle);
        showData(productTitle);
    } else {
        let productCategory = dataProduct.filter((item) => {
            // console.log(item)
            // console.log(i)
            // console.log(typeof arr[i].title)
            // console.log(value)
            console.log(item.category)
            return item.category.includes(value.toLowerCase());
        });

        // console.log(productCategory);
        showData(productCategory);
    }
}
