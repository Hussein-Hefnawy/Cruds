let ddlcategory = document.getElementById('ddlcategory');
let category = document.getElementById('category');
let product = document.getElementById('product');
let quantity = document.getElementById('quantity');
let price = document.getElementById('price');
let discount = document.getElementById('discount');
let total = document.getElementById('total');

let CategoryArry;
let ProductArry;

let btnStatus = "Create";
let proID;

localStorage.Category != null ? CategoryArry = JSON.parse(localStorage.Category) : CategoryArry = [];
localStorage.Product != null ? ProductArry = JSON.parse(localStorage.Product) : ProductArry = [];
localStorage.setItem("Product", JSON.stringify(ProductArry));

//Save Category
function SaveCategory() {

    let objCategory = {

        category: category.value
    };

    CategoryArry.push(objCategory);
    localStorage.setItem('Category', JSON.stringify(CategoryArry));
    Rest();
    ShowCategory();
    ShowTableCategory();
    CountCategory();
}

//Rest Category
function Rest() {
    category.value = '';
}

//show Data 
function ShowCategory() {

    let item = '';
    item += `<option value="">Select Category........</option>`

    for (let i = 0; i < CategoryArry.length; i++) {

        item += `<option value="${i}">${CategoryArry[i].category}</option>`
    }
    ddlcategory.innerHTML = item;
}
//Show Table Category

function ShowTableCategory() {

    let Table = '';

    for (let i = 0; i < CategoryArry.length; i++) {

        Table += `
        <tr>
        <td>${i}</td>
        <td>${CategoryArry[i].category}</td>

        <td>
            <button class="btn btn-danger" onclick="DeleteCategory(${i})">
                <i class="fas fa-trash"></i>
            </button>
        </td>

    </tr>
        `;
    }
    document.getElementById('bodyCate').innerHTML = Table;

}

//Delete Category

function DeleteCategory(id) {

    if (confirm('Are you Sure To Delete ....?') == true) {
        CategoryArry.splice(id, 1);
        localStorage.Category = JSON.stringify(CategoryArry);
        ShowTableCategory();
        ShowCategory();
        CountCategory();
    }


}

//Count Category

function CountCategory() {

    document.getElementById('countCategory').innerHTML = `-Total Category (${CategoryArry.length})`;

}

//Validation Category

function ValidationCategory() {

    let valid = true;
    if (category.value == '') {
        alert('Enter Name Category.....');
        valid = false;
    } else {
        SaveCategory();
        valid = true;
    }

    return valid;

}


////////////////////////////////////////////////////
//Get Total
function GetTotal() {

    if (price.value != 0) {
        let Total = (quantity.value * price.value) - discount.value;
        total.value = Total;
        total.className.replace = "form-control bg-danger text-center";
        total.className = "form-control bg-success text-center";


    } else {
        total.value = 0;
        total.className.replace = "form-control bg-success text-center";
        total.className = "form-control bg-danger text-center";
    }
}

//Svae Product

function SaveProduct() {
    
    let TablePro = ''
    let = NewProduct = {
        ddlcategory: ddlcategory.options[ddlcategory.selectedIndex].text,
        product: product.value,
        quantity: quantity.value,
        price: price.value,
        discount: discount.value,
        total: total.value
    };

    if (btnStatus === "Create") {
        ProductArry.push(NewProduct);
    } else {
        ProductArry[proID] = NewProduct;
        document.getElementById('btnSave').className.replace = 'btn btn-info w-25';
        document.getElementById('btnSave').className = 'btn btn-success w-25';
    }

    localStorage.setItem("Product", JSON.stringify(ProductArry));
    Rest();
    ShowTableProduct();
    CountProduct();
    GetTotal();
}

//Rest Data
function Rest() {

    ddlcategory.options[ddlcategory.selectedIndex].text = "Select Category........";
    product.value = '';
    quantity.value = 0;
    price.value = 0;
    discount.value = 0;
    total.value = 0;
    document.getElementById('btnSave').className.replace = 'btn btn-info w-25';
    document.getElementById('btnSave').className = 'btn btn-success w-25';
}

//show Table

function ShowTableProduct() {

    let TablePro = '';

    for (let x = 0; x < ProductArry.length; x++) {
        TablePro += `
        <tr>
                <td>${x}</td>
                <td>${ProductArry[x].ddlcategory}</td>
                <td>${ProductArry[x].product}</td>
                <td>${ProductArry[x].quantity}</td>
                <td>${ProductArry[x].price}</td>
                <td>${ProductArry[x].discount}</td>
                <td>${ProductArry[x].total}</td>
                <td>
                    <button class="btn btn-info" onclick="EditProduct(${x})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger" onclick="DeleteProduct(${x})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>

        </tr>`;

    }

    document.getElementById('tablePro').innerHTML = TablePro;
}


//Delete Product

function DeleteProduct(id) {
    if (confirm('Are You Sure To Delete') == true) {
        ProductArry.splice(id, 1);
        localStorage.Product = JSON.stringify(ProductArry);
        ShowTableProduct();
        CountProduct();
    }
}



//Edit Product

function EditProduct(id) {

    ddlcategory.options[ddlcategory.selectedIndex].text = ProductArry[id].ddlcategory;
    product.value = ProductArry[id].product;
    quantity.value = ProductArry[id].quantity;
    price.value = ProductArry[id].price;
    discount.value = ProductArry[id].discount;
    total.value = ProductArry[id].total;
    btnStatus = "Edit";
    proID = id;

    document.getElementById('btnSave').className.replace = 'btn btn-success w-25';
    document.getElementById('btnSave').className = 'btn btn-info w-25';
}







//Count Product

function CountProduct() {

    document.getElementById('countpro').innerHTML = `-Total Items (${ProductArry.length})`;
}




//validation Product

function ValidationProduct() {
    let lbcate = document.getElementById('lbcate');
    let lbProduct = document.getElementById('lbProduct');
    let lbqutity = document.getElementById('lbqutity');
    let lbPrice = document.getElementById('lbPrice');

    let valid = true;

    if (ddlcategory.options[ddlcategory.selectedIndex].text == 'Select Category........') {

        lbcate.innerHTML = 'Category : * [Required]';
        lbcate.style.color = 'red';
        valid = false;

    } else {
        lbcate.innerHTML = 'Category : *';
        lbcate.style.color = 'white';
        valid = true;
    }



    if (product.value == '') {

        lbProduct.innerHTML = 'Product Name : * [Requred]';
        lbProduct.style.color = 'red';
        valid = false;

    } else {
        lbProduct.innerHTML = 'Product Name : * ';
        lbProduct.style.color = 'white';
        valid = true;
    }



    if (quantity.value == 0) {

        lbqutity.innerHTML = 'quantity : * [Requred]';
        lbqutity.style.color = 'red';
        valid = false;

    } else {
        lbqutity.innerHTML = 'quantity : *';
        lbqutity.style.color = 'white';
        valid = true;
    }

    if (price.value == 0) {

        lbPrice.innerHTML = 'Price : * [Requred]';
        lbPrice.style.color = 'red';
        valid = false;

    } else {
        lbPrice.innerHTML = 'Price : *';
        lbPrice.style.color = 'white';
        valid = true;

    }

    if (ddlcategory.options[ddlcategory.selectedIndex].text != '' &&
        product.value != '' && quantity.value != 0 && price.value != 0) {

        SaveProduct();

    }




    return valid;
}


$(document).ready(function () {
    ShowCategory();
    ShowTableCategory();
    CountCategory();
    ShowTableProduct();
    CountProduct();
    $('#tablPro').DataTable();
});