document.addEventListener("DOMContentLoaded", () => {

    // 1st function
    async function fetchProducts() {
        const response = await axios.get('https://fakestoreapi.com/products');
        return response.data;
    }



    //5th function
    async function fetchProductsByCategories(category) {
        const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
        return response.data;
    }


    //6th Function for fetching categories from productList.html sidebar only
    async function fetchCategories() {
        //this function is marked async so this will also return a promise
        const response = await fetch("https://fakestoreapi.com/products/categories");
        const data = await response.json();
        return data;
    }


    // 2nd function
    async function populateProducts(flag, customProducts) {
        let products = customProducts;
        //searching the categories
        const queryParams = new URLSearchParams(window.location.search);
        const queryParamsObject = Object.fromEntries(queryParams.entries());
        //condition for categories
        if (flag == false) {
            if (queryParamsObject['category']) { //if queryparamsObject has a category
                products = await fetchProductsByCategories(queryParamsObject['category']);//it passes the parameter of queryParamsObject category if it is present
            } else {
                products = await fetchProducts();
            }
        }

        const productList = document.getElementById("productList");
        products.forEach(product => {
            //product item
            const productItem = document.createElement("a");
            productItem.target = "_blank";
            productItem.classList.add("product-item", "text-decoration-none", "d-inline-block")
            productItem.href = "productDetails.html";

            //product image name and price
            const productImage = document.createElement("div");
            const productName = document.createElement("div");
            const productPrice = document.createElement("div");

            //Adding classes
            productImage.classList.add("product-img");
            productName.classList.add("product-name", "text-center");
            productPrice.classList.add("product-price", "text-center");

            //setting the content
            productName.textContent = product.title.substring(0, 12) + "..."; //sets the title of product from the fake store API with the help of Title property of Fakestore
            productPrice.textContent = `₹ ${product.price}`;

            const imageInsideProductImage = document.createElement("img");
            imageInsideProductImage.src = product.image;

            //appending the divs
            productImage.appendChild(imageInsideProductImage);
            productItem.appendChild(productImage);
            productItem.appendChild(productName);
            productItem.appendChild(productPrice);

            productList.appendChild(productItem);
        });
    }


    //7th function for fetching categories from sidebar of productList.html
    async function populateCategories() {
        const categories = await fetchCategories();
        const categoryList = document.getElementById("categoryList");
        categories.forEach(category => {
            const categoryLink = document.createElement("a");
            categoryLink.classList.add("d-flex", "text-decoration-none");
            categoryLink.textContent = category;
            categoryLink.href = `productList.html?category=${category}`;

            categoryList.appendChild(categoryLink);
        })
    }


    populateProducts(false);
    populateCategories();



    // 3rd function
    const filterSearch = document.getElementById("search");
    filterSearch.addEventListener("click", async () => {

        const productList = document.getElementById("productList");
        const minPrice = Number(document.getElementById("minPrice").value);
        const maxPrice = Number(document.getElementById("maxPrice").value);
        const products = await fetchProducts();
        filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
        productList.innerHTML = "";
        populateProducts(true, filteredProducts);
    });



    // 4th function 
    const clearFilter = document.getElementById("clear");
    clearFilter.addEventListener("click", () => {
        window.location.reload();
    });
});