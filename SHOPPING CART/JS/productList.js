document.addEventListener("DOMContentLoaded", () => {


    async function fetchProducts() {
        const response = await axios.get('https://fakestoreapi.com/products');
        return response.data;
    }

    async function populateProducts() {
        const products = await fetchProducts();

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
            productPrice.textContent = `&#8377; ${product.price}`;

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

    populateProducts();
});