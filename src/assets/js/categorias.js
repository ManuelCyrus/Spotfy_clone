

    fetch("https://api.spotify.com/v1/browse/categories", {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        displayCategories(data.categories.items);
    })
    .catch(error => {
        console.error("Erro ao buscar categorias:", error);
    });
    
   
    function displayCategories(categories) {
        const categoriesDiv = document.querySelector(".artists-cards"); // Contêiner dos cards
        categoriesDiv.innerHTML = ""; // Limpa os resultados anteriores
    
        categories.forEach(category => {
            // Criando um novo card do zero
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
    
            // Adicionando o card ao container
            categoriesDiv.appendChild(categoryCard);
        });
    }
    
    // Função para gerar uma cor aleatória
    function getRandomColor() {
        const colors = ["#ff5733", "#33ff57", "#3357ff", "#ff33a1", "#ff9a33", "#33fff5", "#a133ff"];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    