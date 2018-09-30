page("/", index);
page("/products", products);
page("/product/:productId", product);
page();

function index() {
  $("main").html(renderHomePage());
}

async function products() {
  const mercadoLivreProducts = await getProducts()
  $("main").html(renderList(mercadoLivreProducts));
  $("#js-cart").html(renderCart());
}

async function product(context) {
  const mercadoLivreProduct = await getProduct(context.params.productId);
  $("main").html(renderProduct(mercadoLivreProduct));
  $("#js-cart").html(renderCart());
}

// Produtos por categoria, nesse caso, Ferramentas de construção civil
function getProducts() {
  return fetch("https://api.mercadolibre.com/sites/MLB/search?category=MLB1132")
    .then((response) => response.json())
    .then((json) => json.results);
}

// Mostrar produto selecionado
function getProduct(id) {
  return fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((response) => response.json())
    .then((json) => json);
}
