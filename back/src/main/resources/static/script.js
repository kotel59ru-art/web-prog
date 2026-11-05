// скрипт на сортировку товара по цене
const sort = document.getElementById("sort");
const catalog = document.querySelector(".catalog");

const tovary = Array.from(document.querySelectorAll(".tovar"));
const originalOrder = [...tovary];

sort.addEventListener("change", function() {
    const selected = sort.value;

    const sortedTovary = [...originalOrder];

    if (selected === "asc") {
        sortedTovary.sort(function(a, b) {
            return Number(a.dataset.price) - Number(b.dataset.price);
        });
    }

    if (selected === "desc") {
        sortedTovary.sort(function(a, b) {
            return Number(b.dataset.price) - Number(a.dataset.price);
        });
    }

    sortedTovary.forEach(function(tovar) {
        catalog.appendChild(tovar);
    });
});


// скрипт на фильтрация товаров по категориям
const filter = document.getElementById("filter");

filter.addEventListener("change", function() {
    const selectedCategory = filter.value;

    tovary.forEach(function(tovar) {
        const category = tovar.dataset.category;

        if (selectedCategory === "all" || selectedCategory === category) {
            tovar.style.display = "block";
        } else {
            tovar.style.display = "none";
        }
    });
});


// скрипт для выюора города на сайте
const city = document.getElementById("city");
const changeCity = document.getElementById("changeCity");

changeCity.addEventListener("click", function() {
    let selectedCity = prompt(
        "Выберите город:\n1. Москва\n2. Пермь\n3. Екатеринбург"
    );

    if (selectedCity === "1") {
        city.textContent = "Москва";
    }

    if (selectedCity === "2") {
        city.textContent = "Пермь";
    }

    if (selectedCity === "3") {
        city.textContent = "Екатеринбург";
    }
    // функция сохраннения выбранного города в cookie
    if (city.textContent !== "Не выбран") {
    document.cookie = "city=" + encodeURIComponent(city.textContent) + "; max-age=2592000; path=/";
}
});


// проверка раннее выбора города сохраненного в cookie
const cookies = document.cookie.split("; ");

let savedCity = "";

cookies.forEach(function(cookie) {
    const parts = cookie.split("=");

    if (parts[0] === "city") {
        savedCity = decodeURIComponent(parts[1]);
    }
});

if (savedCity !== "") {
    city.textContent = savedCity;
} else {
    changeCity.click();
}


// скрипт добавления товара в корзину и отображения кол-ва товаров в ней
const buttons = document.querySelectorAll(".addCart");
const cartCount = document.getElementById("cartCount");

// скрипт добавления товара в корзину и отображение после обновления страницы

function loadCartCount() {
    fetch("/cart-count")
        .then(function(response) {
            return response.json();
        })
        .then(function(count) {
            cartCount.textContent = count;
        })
        .catch(function(error) {
            console.log("Ошибка получения корзины:", error);
        });
}

loadCartCount();


buttons.forEach(function(button) {
    button.addEventListener("click", function() {

        const id = button.dataset.id;

        fetch("/add-cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "id=" + id
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(count) {
            cartCount.textContent = count;
        });

    });
});







