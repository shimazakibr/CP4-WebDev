// ==========================================
// ECOTREND
// JavaScript principal
// ==========================================


// ------------------------------------------
// VARIÁVEIS
// ------------------------------------------

let products = [];

let cart = JSON.parse(
    localStorage.getItem("ecotrendCart")
) || [];


// ------------------------------------------
// ELEMENTOS HTML
// ------------------------------------------

const productsGrid =
    document.getElementById("productsGrid");

const loading =
    document.getElementById("loading");

const error =
    document.getElementById("error");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const priceInput =
    document.getElementById("priceInput");

const priceValue =
    document.getElementById("priceValue");

const resultCount =
    document.getElementById("resultCount");

const cartOverlay =
    document.getElementById("cartOverlay");

const cartItems =
    document.getElementById("cartItems");

const emptyCart =
    document.getElementById("emptyCart");

const cartTotal =
    document.getElementById("cartTotal");

const cartCount =
    document.getElementById("cartCount");


// ------------------------------------------
// CARREGAR PRODUTOS COM FETCH
// ------------------------------------------

async function loadProducts() {

    loading.classList.remove("hidden");

    error.classList.add("hidden");

    try {

        const response =
            await fetch("products.json");

        if (!response.ok) {
            throw new Error(
                "Erro ao carregar produtos."
            );
        }

        products =
            await response.json();

        createCategories();

        renderProducts();

    } catch (err) {

        console.error(err);

        error.classList.remove("hidden");

    } finally {

        loading.classList.add("hidden");

    }
}


// ------------------------------------------
// CRIAR CATEGORIAS
// ------------------------------------------

function createCategories() {

    const categories = [
        ...new Set(
            products.map(
                product => product.category
            )
        )
    ];

    categories.forEach(category => {

        const option =
            document.createElement("option");

        option.value = category;

        option.textContent = category;

        categoryFilter.appendChild(option);

    });
}


// ------------------------------------------
// FILTRAR PRODUTOS
// ------------------------------------------

function getFilteredProducts() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();

    const category =
        categoryFilter.value;

    const maxPrice =
        Number(priceInput.value);


    return products.filter(product => {

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(search);


        const matchesCategory =
            category === "Todos" ||
            product.category === category;


        const matchesPrice =
            product.price <= maxPrice;


        return (
            matchesSearch &&
            matchesCategory &&
            matchesPrice
        );

    });
}


// ------------------------------------------
// MOSTRAR PRODUTOS
// ------------------------------------------

function renderProducts() {

    const filtered =
        getFilteredProducts();


    productsGrid.innerHTML = "";


    resultCount.textContent =
        `${filtered.length} produto(s)`;


    if (filtered.length === 0) {

        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fa-solid fa-seedling"></i>
                <h3>Nenhum produto encontrado</h3>
                <p>
                    Tente alterar os filtros.
                </p>
            </div>
        `;

        return;
    }


    filtered.forEach(product => {

        const card =
            document.createElement("article");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">

                <span>
                    ${product.emoji}
                </span>

                <small>
                    ${product.category}
                </small>

            </div>


            <div class="product-body">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.description}
                </p>


                <div class="product-bottom">

                    <strong>
                        ${formatPrice(product.price)}
                    </strong>


                    <button
                        class="add-button"
                        data-id="${product.id}"
                    >

                        <i class="fa-solid fa-cart-plus"></i>

                        Adicionar

                    </button>

                </div>

            </div>

        `;


        productsGrid.appendChild(card);

    });

}


// ------------------------------------------
// ADICIONAR AO CARRINHO
// ------------------------------------------

productsGrid.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".add-button"
            );

        if (!button) return;


        const id =
            Number(button.dataset.id);


        const product =
            products.find(
                product => product.id === id
            );


        addToCart(product);

    }
);


function addToCart(product) {

    const existing =
        cart.find(
            item => item.id === product.id
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveCart();

    renderCart();

    openCart();

}


// ------------------------------------------
// SALVAR NO LOCALSTORAGE
// ------------------------------------------

function saveCart() {

    localStorage.setItem(
        "ecotrendCart",
        JSON.stringify(cart)
    );

}


// ------------------------------------------
// RENDERIZAR CARRINHO
// ------------------------------------------

function renderCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        emptyCart.style.display = "flex";

        cartItems.style.display = "none";

    } else {

        emptyCart.style.display = "none";

        cartItems.style.display = "block";


        cart.forEach(item => {

            const cartItem =
                document.createElement("div");

            cartItem.className =
                "cart-item";


            cartItem.innerHTML = `

                <div class="cart-item-icon">
                    ${item.emoji}
                </div>


                <div class="cart-item-info">

                    <strong>
                        ${item.name}
                    </strong>

                    <span>
                        ${formatPrice(item.price)}
                    </span>


                    <div class="quantity">

                        <button
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            -
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                    </div>

                </div>


                <button
                    class="remove"
                    onclick="removeFromCart(${item.id})"
                >

                    <i class="fa-solid fa-trash"></i>

                </button>

            `;


            cartItems.appendChild(cartItem);

        });

    }


    updateCartTotal();

}


// ------------------------------------------
// ALTERAR QUANTIDADE
// ------------------------------------------

function changeQuantity(id, amount) {

    const item =
        cart.find(
            item => item.id === id
        );


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        removeFromCart(id);

        return;

    }


    saveCart();

    renderCart();

}


// ------------------------------------------
// REMOVER PRODUTO
// ------------------------------------------

function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );


    saveCart();

    renderCart();

}


// ------------------------------------------
// LIMPAR CARRINHO
// ------------------------------------------

document
    .getElementById("clearCart")
    .addEventListener(
        "click",
        () => {

            cart = [];

            saveCart();

            renderCart();

        }
    );


// ------------------------------------------
// TOTAL
// ------------------------------------------

function updateCartTotal() {

    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );


    const quantity =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    cartTotal.textContent =
        formatPrice(total);


    cartCount.textContent =
        quantity;

}


// ------------------------------------------
// FORMATAR PREÇO
// ------------------------------------------

function formatPrice(price) {

    return price.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// ------------------------------------------
// ABRIR CARRINHO
// ------------------------------------------

function openCart() {

    cartOverlay.classList.remove(
        "hidden"
    );

}


// ------------------------------------------
// FECHAR CARRINHO
// ------------------------------------------

function closeCart() {

    cartOverlay.classList.add(
        "hidden"
    );

}


document
    .getElementById("openCart")
    .addEventListener(
        "click",
        openCart
    );


document
    .getElementById("closeCart")
    .addEventListener(
        "click",
        closeCart
    );


// ------------------------------------------
// FILTROS
// ------------------------------------------

searchInput.addEventListener(
    "input",
    renderProducts
);


categoryFilter.addEventListener(
    "change",
    renderProducts
);


priceInput.addEventListener(
    "input",
    () => {

        priceValue.textContent =
            formatPrice(
                Number(priceInput.value)
            );

        renderProducts();

    }
);


// ------------------------------------------
// LIMPAR FILTROS
// ------------------------------------------

document
    .getElementById("clearFilters")
    .addEventListener(
        "click",
        () => {

            searchInput.value = "";

            categoryFilter.value =
                "Todos";

            priceInput.value =
                250;

            priceValue.textContent =
                "R$ 250,00";

            renderProducts();

        }
    );


// ------------------------------------------
// CHECKOUT COM PROMISE
// ------------------------------------------

const checkoutOverlay =
    document.getElementById(
        "checkoutOverlay"
    );


document
    .getElementById("checkoutButton")
    .addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                alert(
                    "Seu carrinho está vazio."
                );

                return;

            }


            closeCart();

            checkoutOverlay.classList.remove(
                "hidden"
            );

        }
    );


// ------------------------------------------
// FECHAR CHECKOUT
// ------------------------------------------

document
    .getElementById("closeCheckout")
    .addEventListener(
        "click",
        () => {

            checkoutOverlay.classList.add(
                "hidden"
            );

        }
    );


// ------------------------------------------
// PROCESSAR PEDIDO
// ------------------------------------------

document
    .getElementById("checkoutForm")
    .addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "customerName"
                ).value;


            const email =
                document.getElementById(
                    "customerEmail"
                ).value;


            const message =
                document.getElementById(
                    "checkoutMessage"
                );


            const button =
                document.getElementById(
                    "confirmOrder"
                );


            button.disabled = true;

            button.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Processando...';


            try {

                await validateOrder(
                    name,
                    email
                );


                const result =
                    await submitOrder();


                message.className =
                    "success-message";


                message.innerHTML = `

                    <i class="fa-solid fa-circle-check"></i>

                    <strong>
                        Compra realizada!
                    </strong>

                    <p>
                        Pedido ${result.orderId}
                        confirmado com sucesso.
                    </p>

                `;


                cart = [];

                saveCart();

                renderCart();


                setTimeout(
                    () => {

                        checkoutOverlay.classList.add(
                            "hidden"
                        );

                        document
                            .getElementById(
                                "checkoutForm"
                            )
                            .reset();

                        message.innerHTML = "";

                        button.disabled = false;

                        button.textContent =
                            "Confirmar pedido";

                    },
                    2500
                );


            } catch (err) {

                message.className =
                    "error-message";


                message.textContent =
                    err.message;


                button.disabled = false;

                button.textContent =
                    "Confirmar pedido";

            }

        }
    );


// ------------------------------------------
// PROMISE: VALIDAÇÃO
// ------------------------------------------

function validateOrder(name, email) {

    return new Promise(
        (resolve, reject) => {

            setTimeout(
                () => {

                    if (
                        !name.trim()
                    ) {

                        reject(
                            new Error(
                                "Informe seu nome."
                            )
                        );

                        return;

                    }


                    if (
                        !email.includes("@")
                    ) {

                        reject(
                            new Error(
                                "Informe um e-mail válido."
                            )
                        );

                        return;

                    }


                    resolve();

                },
                700
            );

        }
    );

}


// ------------------------------------------
// PROMISE: ENVIO DO PEDIDO
// ------------------------------------------

function submitOrder() {

    return new Promise(
        resolve => {

            setTimeout(
                () => {

                    resolve({

                        orderId:
                            "ECO-" +
                            Math.floor(
                                Math.random() *
                                900000 +
                                100000
                            )

                    });

                },
                1200
            );

        }
    );

}


// ------------------------------------------
// INICIALIZAÇÃO
// ------------------------------------------

loadProducts();

renderCart();