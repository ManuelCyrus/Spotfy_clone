// const clientId = "d4061a7effe84687b752e3c965c00eb8";
// const clientSecret = "5a171d14becb4c2d82f7e5cdbe7a0a19";


fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + btoa(clientId + ":" + clientSecret) 
    },
    body: "grant_type=client_credentials"
})
.then(response => {
    if (!response.ok) {
        throw new Error(`Erro na autenticação: ${response.status}`);
    }
    return response.json();
})
.then(authData => {
    const token = authData.access_token; 

    return fetch("https://api.spotify.com/v1/browse/categories", {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
})
.then(response => {
    if (!response.ok) {
        throw new Error(`Erro ao buscar categorias: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    displayCategories(data.categories.items); 
})
.catch(error => {
    console.error(" Erro:", error);
});

function displayCategories(categories) {
    const categoriesDiv = document.querySelector(".artists-cards"); 
    categoriesDiv.innerHTML = ""; 

    categories.forEach(category => {
        // Criando um novo card
        const categoryCard = document.createElement("div");
        categoryCard.classList.add("card");

        // Criando o título da categoria
        const cardTitle = document.createElement("h3");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = category.name;

        // Criando a imagem da categoria
        const imgArtist = document.createElement("img");
        imgArtist.classList.add("img-artist");
        imgArtist.src = category.icons[0].url;
        imgArtist.alt = category.name;

        // Gerar cor de fundo aleatória
        const randomColor = getRandomColor();
        categoryCard.style.backgroundColor = randomColor;

        // Montando o card
        categoryCard.appendChild(imgArtist);
        categoryCard.appendChild(cardTitle);

        categoriesDiv.appendChild(categoryCard);
    });
}

function getRandomColor() {
    const colors = ["#ff5733", "#33ff57", "#3357ff", "#ff33a1", "#ff9a33", "#33fff5", "#a133ff"];
    return colors[Math.floor(Math.random() * colors.length)];
}
