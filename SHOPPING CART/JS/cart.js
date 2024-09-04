document.addEventListener("DOMContentLoaded", () => {
    async function populateCart() {
        const cart = await fetchCartById(1);
        console.log(cart);
        const cartProducts = cart.products;//because cart has the details of products abd we are accessing using .products as products in an array present in cart
        console.log(cartProducts);
        const cartProductDownloadPromise = cartProducts.map(product => {
            return fetchProductById(product.productId);
        });
        console.log(cartProductDownloadPromise);
        // Promise.all(cartProductDownloadPromise);
        const products = await Promise.all(cartProductDownloadPromise);
        console.log(products);
    }
    populateCart();
});