
    const token = 'BQB_Da5qh7-a9Q03QAycgn3VucFK-tRNKVKCG0GY9SH0NnkKxx4144ksqsbtcuDnEWJU5YQkg2LjfZ-K56lNusFd7lks_5XgLjXFW4AgZyx-GCYo9S4hxaa_EwtjnPcNf6Dt0NgfI86rE6IR_F4C6a3e2LPz6_oB1iEla9w9ylcOhBPrs6V-p1AC5ltEzvOkqr4qasXfcGdy9ifbxsnH9khR3uAzAHaf1E5CUSjiOFj0W5ygSK26CSWSl7m2asYd5-nEIBYN7t-IVQcC5c5InwnG8XGJdiZe17IZV_khSsSVGBMdWxwNkiR_';

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
    