import { processProducts } from "./product";


/**
 * Asynchronously fetches products from the JSON file located at './produits.json'.
 * @throws {Error} If the HTTP response status is not OK.
 * @returns {Promise<Array>} An array containing the parsed JSON products.
 */
async function fetchProducts() {
    try {
      const response = await fetch('./produits.json');
      if (!response.ok) {
        throw new Error("Erreur HTTP " + response.status);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }


  
/**
 * Retrieves products using the fetchProducts() function and processes it using the processProducts() function.
 * @function
 */
fetchProducts()
.then(products => {
  processProducts(products);
});
