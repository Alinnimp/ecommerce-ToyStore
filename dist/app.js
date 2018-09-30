function renderHomePage() {
  return `
    <div class="welcome_area bg-img background-overlay" style="background-image: url(/dist/img/brinquedos.jpg);">
    <div class="container h-100">
      <div class="row h-100 align-items-center">
        <div class="col-12">
        <div class="hero-content">
            <a href="/products" class="btn essence-btn">Brinquedos</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

function renderCart() {
  let cartProducts = JSON.parse(localStorage.getItem("products"));
  let productCounter = "";

  if(cartProducts) {
    productCounter = cartProducts.length;
  }

  return `
    <div class="header-meta d-flex clearfix justify-content-end">
      <div class="cart-area">
        <a id="essenceCartBtn"> <span id="js-cart-counter">${productCounter}</span></a>
      </div>
    </div>
  `;
}

function renderList(products) {
  return `
    <section class="shop_grid_area section-padding-80">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="shop_grid_product_area">
              <div class="row">
                ${products.map((product => renderListItem(product))).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderListItem(product) {
  return `
    <div class="col-lg-4" data-id="${product.id}">
      <div class="single-product-wrapper">
        <div class="product-img">
          <img src="${product.thumbnail}" alt="">
        </div>
        <div class="product-description">
          <h6>${product.title}</h6>
          <p class="product-price">R$${product.price}</p>
          <div class="hover-content">
            <div class="add-to-cart-btn">
              <a href="product/${product.id}" class="btn essence-btn">Ver produto</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderProduct(product) {
  $("main").html(productTemplate(product));
  buyFunctions(product);
}

function productTemplate(product) {
  // console.log(product);
  return `
    <section class="single_product_details_area d-flex align-items-center">
      <div class="single_product_thumb clearfix">
        <img src="${product.pictures[0].url}" alt="">
      </div>
      <div class="single_product_desc clearfix">
        <h2>${product.title}</h2>
        <p class="product-price">R$${product.price}</p>
        <div class="cart-fav-box d-flex align-items-center">
          <button type="submit" id="js-buy" data-product-id=${product.id} class="btn essence-btn">Adicionar ao carrinho</button>
        </div>
      </div>
    </section>
  `;
}

function buyFunctions(productItem) {
  $(`button[data-product-id="${productItem.id}"]`).on("click", function() {
    let productsArray;
    if (localStorage.getItem("products")) {
      productsArray = JSON.parse(localStorage.getItem("products"));
      productsArray.push(productItem)
    } else {
      productsArray = [productItem];
    }
    localStorage.setItem("products", JSON.stringify(productsArray));
    $("#js-cart-counter").html(productsArray.length);
  });
}
