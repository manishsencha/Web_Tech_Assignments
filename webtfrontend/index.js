const BASE_URL = "http://localhost:8080/api";

const productsDisplay = document.getElementById("products-display");
const purchaseTable = document.getElementById("purchase");
let customerEmail = document.getElementById("email");
let customerName = document.getElementById("name");

var products = [];

var purchase = {};

function fetchProducts() {
  let xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      products = this.responseText;
      console.log(typeof this.responseText + " : " + this.responseText);
      products = JSON.parse(products);
      renderProducts();
    }
  };
  xmlHttpRequest.open("GET", BASE_URL + "/allProducts");
  xmlHttpRequest.send();
}

function createProductDisplayRow(id, name, price) {
  let tr = document.createElement("tr");
  let tdName = document.createElement("td");
  let tdPrice = document.createElement("td");
  let tdQuantity = document.createElement("td");
  let tdAdd = document.createElement("td");

  console.log(name + " " + price);

  let nameTextNode = document.createTextNode(name);
  let priceTextNode = document.createTextNode(`$${price}`);
  let quantityNode = document.createElement("input");
  let addNode = document.createElement("button");

  quantityNode.type = "number";
  quantityNode.className = "form-control mr-2 col";
  quantityNode.id = id;

  addNode.textContent = "Add";
  addNode.className = "btn btn-success";

  addNode.addEventListener("click", (e) => {
    let addQuantity = document.getElementById(id).value;
    let purchaseList = purchase["products"];

    if (addQuantity === "") {
      console.log("Nothing to add!!!");
      return;
    }
    addQuantity = parseInt(addQuantity);
    console.log(addQuantity);

    if (addQuantity < 0) {
      return alert("Please enter a valid quantity");
    }
    let ind = purchaseList.findIndex((obj) => obj.id == id);

    if (ind != -1) {
      let oldQuantity = purchaseList[ind]["quantity"];

      price = parseInt(price);

      let newAmount = parseInt(purchase["totalAmount"]) + price * addQuantity;
      purchase = { ...purchase, totalAmount: newAmount };

      // Update the purchase list
      purchaseList[ind] = {
        ...purchaseList[ind],
        quantity: oldQuantity + addQuantity,
        amount: price * (addQuantity + oldQuantity),
      };

      // update the full object
      purchase = { ...purchase, products: purchaseList };

      purchaseTable.style.display = "block";
      document.getElementById(id).value = "";
      renderCurrentPurchase();

      localStorage.setItem("webt-purchase", JSON.stringify(purchase));

      // See output after adding
      console.log(purchase);
    } else {
      // If the product is not in the list
      // Add it
      let purchaseList = purchase["products"];

      purchaseList.push({
        id: id,
        name: name,
        quantity: addQuantity,
        amount: price * addQuantity,
      });

      purchase = {
        ...purchase,
        totalAmount: purchase["totalAmount"] + price * addQuantity,
        products: purchaseList,
      };

      document.getElementById(id).value = "";
      purchaseTable.style.display = "block";
      renderCurrentPurchase();

      localStorage.setItem("webt-purchase", JSON.stringify(purchase));

      console.log(purchase);
    }
  });

  tdName.appendChild(nameTextNode);
  tdPrice.appendChild(priceTextNode);
  tdQuantity.appendChild(quantityNode);
  tdAdd.appendChild(addNode);

  tr.appendChild(tdName);
  tr.appendChild(tdPrice);
  tr.appendChild(tdQuantity);
  tr.appendChild(tdAdd);

  return tr;
}

function renderProducts() {
  for (let i = 0; i < products.length; i++) {
    let elem = createProductDisplayRow(
      products[i].id,
      products[i].name,
      products[i].price
    );
    if (i == 0) console.log(elem);
    productsDisplay.appendChild(elem);
  }
}

function initPurchase() {
  purchase["name"] = "";
  purchase["email"] = "";
  purchase["totalAmount"] = 0;
  purchase["products"] = [];
  customerEmail.value = "";
  customerName.value = "";

  if (localStorage.getItem("webt-purchase")) {
    purchase = JSON.parse(localStorage.getItem("webt-purchase"));
    console.log(purchase);
  }
  if (purchase["products"].length == 0) purchaseTable.style.display = "none";
  renderCurrentPurchase();
}

function init() {
  initPurchase();
  fetchProducts();
}

function createPurchaseRow(product, quantity, amount) {
  let tr = document.createElement("tr");
  let tdProduct = document.createElement("td");
  let tdQuantity = document.createElement("td");
  let tdAmount = document.createElement("td");

  tdQuantity.appendChild(document.createTextNode(quantity));
  tdProduct.appendChild(document.createTextNode(product));
  tdAmount.appendChild(document.createTextNode(`$${amount}`));

  tr.appendChild(tdProduct);
  tr.appendChild(tdQuantity);
  tr.appendChild(tdAmount);

  return tr;
}

function renderCurrentPurchase() {
  let purchaseSummary = document.getElementById("purchase-summary");
  purchaseSummary.innerHTML = "";
  for (const product of purchase["products"]) {
    let row = createPurchaseRow(
      product["name"],
      product["quantity"],
      product["amount"]
    );
    purchaseSummary.appendChild(row);
  }
  let tr = document.createElement("tr");
  let td = document.createElement("td");
  tr.insertCell(0);
  tr.insertCell(1);
  tr.insertCell(2);

  tr.cells[2].appendChild(
    document.createTextNode(`$${purchase["totalAmount"]}`)
  );
  purchaseSummary.appendChild(tr);
}

function makePurchase() {
  let re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let checkEmail = re.test(customerEmail.value);

  if (checkEmail == false) {
    return alert("Enter valid email!!!");
  }

  if (customerName.value.trim() == "") {
    return alert("Enter a valid name!!!");
  }

  if (purchase["products"].length == 0) {
    return alert("Please add something to cart!!");
  }

  purchase = {
    ...purchase,
    name: customerEmail.value,
    email: customerEmail.value,
  };
  //   purchase = JSON.parse(purchase);

  console.log("PURCHASE : ", purchase);

  let xmlHttpRequest = new XMLHttpRequest();

  xmlHttpRequest.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
      localStorage.removeItem("webt-purchase");
      initPurchase();
      let res = JSON.parse(this.responseText);
      alert(
        `Name : ${res.name} \n Email : ${res.email} \n Total Bill : ${res.totalBill}`
      );
    } else {
      console.log(this.responseText);
    }
  };

  xmlHttpRequest.open("POST", BASE_URL + "/purchase");
  xmlHttpRequest.setRequestHeader(
    "Content-Type",
    "application/json;charset=UTF-8"
  );

  xmlHttpRequest.send(JSON.stringify(purchase));
}
