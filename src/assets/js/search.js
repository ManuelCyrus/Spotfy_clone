const clientId = "d4061a7effe84687b752e3c965c00eb8";
const clientSecret = "5a171d14becb4c2d82f7e5cdbe7a0a19";

const pesquisa = document.getElementById("search_input");

pesquisa.addEventListener("keydown", () => {
    const query = pesquisa.value.trim();
    if (query.length < 2) return;


    // 1 Pegando o token primeiro
    fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + btoa(clientId + ":" + clientSecret) // Gera o token corretamente
        },
        body: "grant_type=client_credentials"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(" Erro na autenticação: " + response.status);
        }
        return response.json();
    })
    .then(authData => {
        const token = authData.access_token;  
        return fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist,track`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error(" Erro ao buscar artistas: " + response.status);
            }
            return response.json();
        })
        .then(data => ({ data, token })); 
    })
    .then(({ data, token }) => {
        if (data.artists && data.artists.items.length > 0) {
            displayArtists(data.artists.items);
            displayTrack(data.artists.items[0].id, token);
            console.log(data)
        } else {
            console.log("Nenhum artista encontrado.");
        }
    })
    .catch(error => {
        console.error("Erro:", error);
    });
});


function displayArtists(result){
    const artists_section=document.querySelector('.artists-card-section')
    const artists_result_section=document.querySelector('.artists-result-search-section')
 
    if(pesquisa.value !=""){
        artists_section.style.display='none'
        artists_result_section.style.display='block'
        

    }

    else{
        artists_section.style.display='block'
        artists_result_section.style.display='none'

    }
    
    if(result){
        const artist_img=document.querySelector('.artists-result-search-img')
        const artists_name=document.querySelector('.artists-result-search-name')
        const artists_type=document.querySelector('.artists-result-search-gender')

        if(result[0].name){
            artists_name.innerHTML=result[0].name
            
        }
        if (result[0].images && result[0].images.length > 0) {
            artist_img.src = result[0].images[0].url; // Pega a primeira imagem disponível
        }
        if(result[0].type ){
            artists_type.innerHTML=result[0].type
            
        }

        
    }

    // dados dos cards



}
    // fechar o displayArtist

    function displayTrack(idArtist, token) {
        const url = `https://api.spotify.com/v1/artists/${idArtist}/top-tracks?market=US`;
    
        fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.tracks && data.tracks.length > 0) {
                const tracks = data.tracks;
                const artistsMusicContainer = document.querySelector('.artists-music');
    
                console.log(artistsMusicContainer);
    
                if (!artistsMusicContainer) {
                    console.error("Erro: Elemento '.artists-music' não encontrado no DOM.");
                    return;
                }
    
                // Limpa músicas antigas antes de adicionar novas
                artistsMusicContainer.innerHTML = "";
    
                tracks.forEach(track => {
                    const trackElement = document.createElement("div");
                    trackElement.classList.add('artist-music-side');
    
                    const img = document.createElement('img');
                    img.classList.add('artist-music-side-img');
                    img.src = track.album.images.length > 0 ? track.album.images[0].url : 'src/assets/img/1.jpg';
    
                    const trackInfo = document.createElement('div');
    
                    const title = document.createElement('h1');
                    title.classList.add('artist-music-side-title');
                    title.textContent = track.name;
    
                    const nameArtist = document.createElement("p");
                    nameArtist.classList.add('artist-music-side-name');
                    nameArtist.textContent = track.artists[0].name;

                    const container=document.createElement('div')
                    container.classList.add('all_song')

                    const duration=document.createElement('p')
                    duration.classList.add('duration')
                    duration.textContent="01:3"
    

                    trackInfo.appendChild(title);
                    trackInfo.appendChild(nameArtist);
    
                    
                    trackElement.appendChild(img);
                    trackElement.appendChild(trackInfo);
    
                    container.appendChild(trackElement)
                    container.appendChild(duration)

                    artistsMusicContainer.appendChild(container);
                    
                });
            } else {
                console.log("Nenhuma música encontrada.");
            }
        })
        .catch(error => console.error("Erro ao buscar músicas do artista:", error));
    }
    

// Função para exibir os artistas na tela
// function displayArtists(artists) {
//     const artistsDiv = document.getElementById("artists");
//     artistsDiv.innerHTML = ""; // Limpa resultados anteriores

//     artists.forEach(artist => {
//         const artistCard = document.createElement("div");
//         artistCard.classList.add("artist-card");

//         const artistName = document.createElement("h3");
//         artistName.textContent = artist.name;

//         const artistImage = document.createElement("img");
//         artistImage.src = artist.images.length > 0 ? artist.images[0].url : "https://via.placeholder.com/200";
//         artistImage.alt = artist.name;

//         artistCard.appendChild(artistImage);
//         artistCard.appendChild(artistName);
//         artistsDiv.appendChild(artistCard);
//     });
// }









    // fetch("https://api.spotify.com/v1/browse/categories", {
    //     headers: {
    //         "Authorization": `Bearer ${token}`,
    //         "Content-Type": "application/json"
    //     }
    // })
    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error(`Erro na API: ${response.status}`);
    //     }
    //     return response.json();
    // })
    // .then(data => {
    //     displayCategories(data.categories.items);
    // })
    // .catch(error => {
    //     console.error("Erro ao buscar categorias:", error);
    // });
    
   
    // function displayCategories(categories) {
    //     const categoriesDiv = document.querySelector(".artists-cards"); // Contêiner dos cards
    //     categoriesDiv.innerHTML = ""; // Limpa os resultados anteriores
    
    //     categories.forEach(category => {
    //         // Criando um novo card do zero
    //         const categoryCard = document.createElement("div");
    //         categoryCard.classList.add("card");
    
    //         // Criando o título da categoria
    //         const cardTitle = document.createElement("h3");
    //         cardTitle.classList.add("card-title");
    //         cardTitle.textContent = category.name;
    
    //         // Criando a imagem da categoria
    //         const imgArtist = document.createElement("img");
    //         imgArtist.classList.add("img-artist");
    //         imgArtist.src = category.icons[0].url;
    //         imgArtist.alt = category.name;
    
    //         // Gerar cor de fundo aleatória
    //         const randomColor = getRandomColor();
    //         categoryCard.style.backgroundColor = randomColor;
    
    //         // Montando o card
    //         categoryCard.appendChild(imgArtist);
    //         categoryCard.appendChild(cardTitle);
    
    //         // Adicionando o card ao container
    //         categoriesDiv.appendChild(categoryCard);
    //     });
    // }
    
    // // Função para gerar uma cor aleatória
    // function getRandomColor() {
    //     const colors = ["#ff5733", "#33ff57", "#3357ff", "#ff33a1", "#ff9a33", "#33fff5", "#a133ff"];
    //     return colors[Math.floor(Math.random() * colors.length)];
    // }