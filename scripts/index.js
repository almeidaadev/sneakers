const getScreenSize = () => {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
    };
};

const showCart = () => {
    const cart = document.querySelector(".cart img");
    const cartContainer = document.querySelector(".cart-container");

    cart.addEventListener("click", () => {
        cartContainer.classList.toggle("active");
    });
};

const showMenu = () => {
    const openMenu = document.querySelector(".open-menu");
    const closeMenu = document.querySelector(".close-menu");
    const menu = document.querySelector(".menu");
    const overlay = document.querySelector(".overlay");

    openMenu.addEventListener("click", (e) => {
        e.preventDefault();

        menu.classList.toggle("active");
        overlay.classList.toggle("active");
        openMenu.style.display = "none";
        closeMenu.style.display = "block";
    });

    closeMenu.addEventListener("click", (e) => {
        e.preventDefault();

        menu.classList.toggle("active");
        overlay.classList.toggle("active");
        openMenu.style.display = "block";
        closeMenu.style.display = "none";
    });

    const handleResize = () => {
        if (getScreenSize().width <= 850) {
            openMenu.style.display = "block";
            closeMenu.style.display = "none";
        } else {
            menu.classList.remove("active");
            overlay.classList.remove("active");

            openMenu.style.display = "none";
            closeMenu.style.display = "none";
        }
    };

    window.addEventListener("resize", handleResize);
};

const loadImgs = () => {
    const mainImg = document.querySelector(".main-img img");
    const moreImg = document.querySelectorAll(".more-img img");

    const arrImgs = [
        "/assets/sneakers/Rectangle.png",
        "/assets/sneakers/Rectangle Copy 2.png",
        "/assets/sneakers/Rectangle Copy 3.png",
        "/assets/sneakers/Rectangle Copy 4.png",
    ];

    moreImg.forEach((img) => {
        img.addEventListener("click", () => {
            const actuallyImg = img.src;

            mainImg.src = actuallyImg;
        });
    });

    if (arrImgs.length >= 0) {
        mainImg.src = arrImgs[0];
    }
};

const createProduct = (value, quant, finalValue) => {
    const div = document.createElement("div");
    const productsCart = document.querySelector(".products-cart");
    const imgProduct = "/assets/sneakers/test.png";

    div.innerHTML = `
        <img src=${imgProduct} alt="image product">   
        <div>
            <span>Fall Limited Edition Sneakers</span><br/>
            <span>${value} x ${quant}</span>
            <span>$${finalValue}</span>
            <span class="delete">Excluir</span>
        </div> 
        `;

    div.className = "test";

    const deleteItem = div.querySelector(".delete");

    deleteItem.addEventListener("click", deleteProduct);

    productsCart.appendChild(div);
};

const cartEmpty = () => {
    const cartEmpty = document.querySelector(".cart-empty");

    const productsCart = document.querySelector(".products-cart");
    const productsCartLen = productsCart.children.length - 1;

    if (!productsCartLen) {
        cartEmpty.style.display = "flex";
        productsCart.style.display = "none";
    } else {
        cartEmpty.style.display = "none";
        productsCart.style.display = "block";
    }

    console.log(productsCartLen);
};

const addProduct = () => {
    const cart = document.querySelector(".cart span");
    const menos = document.getElementById("menos");
    const mais = document.getElementById("mais");
    const value = document.getElementById("value");
    const buttonAdd = document.querySelector(".add-to-cart-btn");

    buttonAdd.addEventListener("click", () => {
        const oldQuantProduct = parseInt(cart.textContent);
        const quantProduct = parseInt(value.textContent) || 0;
        const priceProduct = 125.0;
        const finalValue = priceProduct * parseInt(value.textContent);
        cart.textContent = quantProduct + oldQuantProduct;

        createProduct(priceProduct, quantProduct, finalValue);
        cartEmpty();
    });

    const menosFunc = () => {
        const spanValue = parseInt(value.textContent);
        const cont = spanValue - 1;

        if (cont <= 0) {
            value.textContent = "0";
        } else {
            value.textContent = cont;
        }
    };

    const maisFunc = () => {
        const spanValue = parseInt(value.textContent);
        const cont = spanValue + 1;

        value.textContent = cont;
    };

    menos.addEventListener("click", menosFunc);
    mais.addEventListener("click", maisFunc);
};

const deleteProduct = (e) => {
    const parentElement = e.target.parentElement.parentElement;
    parentElement.remove();
    cartEmpty();
};

addProduct();
loadImgs();
showMenu();
showCart();
cartEmpty();
