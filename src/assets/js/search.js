

const token ='BQB7vDluMnfmar-IbMvYhX2or6mox2QS2eB9DVy4HSm6Z16UuKUK3hKTeLAq79ahLBoGFEsIvo9i-p-t_Ecg-CD6_PcZisBN8qXIeHoET3BtzQ2qVRfXhRBSwcLuJCB5OxVjAq1vVVTpmlTgzMVl_veeZk8igoMR00GiS94ndj5vb6S2sflLyvXaF3resJZAKhSGLdVru9NWxRs3nSRp6LHUnEPsmuQBqFcOl1WsEYhdzdR1FekLHCh-n71PdITRWybhleEwc6lRmysC8W970s94ela_AwgLzB4SBDzrxlxy2S2aGtO5usCu';

const pesquisa = document.getElementById("search_input");

pesquisa.addEventListener("keydown", () => {
    const query = pesquisa.value.trim(); // Pega o valor digitado sem espaços extras
console.log("olaa")
    if (query.length < 2) return; 

    fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro na API: " + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log(data.artists.items);
        
        if(data.artists.items.length>0){
            displayArtists(data.artists.items)
            displayTrack(data.artists.items[0].id)   
        }

    })
    .catch(error => {
        console.error("Erro ao buscar artistas:", error);
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

function displayTrack(idArtist){
    const url = `https://api.spotify.com/v1/artists/${idArtist}/top-tracks?market=US`;


    fetch(url,{
        headers: {
            "Authorization": `Bearer ${token}`
            }
    }).then((response)=>response.json()).then((data)=>{


        // dados para o Html

        if(data.tracks.length>0){
            const tracks=data.tracks
            const artistsMusicContainer=document.querySelector('.artists-music')
            
            console.log(artistsMusicContainer)

            if (!artistsMusicContainer) {
                console.error("Erro: Elemento '.artists-music' não encontrado no DOM.");
                return;
            }

            tracks.forEach(track => {
                const trackElement=document.createElement("div")
                trackElement.classList.add('artist-music-side')
                const img=document.createElement('img')
                img.classList.add('artist-music-side-img')
                img.src = track.album.images.length > 0 ? track.album.images[0].url : 'src/assets/img/1.jpg';

                const trackInfo=document.createElement('div')

                const title=document.createElement('h1')
                title.classList.add('artist-music-side-title')
                title.textContent=track.name

                const nameArtist=document.createElement("p")
                nameArtist.classList.add('artist-music-side-name')
                nameArtist.textContent=track.artists[0].name

                
                trackInfo.appendChild(title);
        trackInfo.appendChild(nameArtist);

        trackElement.appendChild(img);
        trackElement.appendChild(trackInfo);

        artistsMusicContainer.appendChild(trackElement);
                

            });
            
        }


    }).catch(error => console.error("Erro ao buscar artista:", error))

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