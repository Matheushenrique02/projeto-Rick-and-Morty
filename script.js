let currentPageUrl = 'https://rickandmortyapi.com/api/character'

window.onload = async () => {
    try{
        await loadCharacters(currentPageUrl)
    }  
    catch(error) {
        console.log(error)
        alert('Erro ao carregar cards')
    }

    const nextButton = document.getElementById('next')
    const backButton = document.getElementById('back')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
}

async function loadCharacters(url){
    const mainContent = document.getElementById('content')
    mainContent.innerHTML = ''

    try{
        const response = await fetch(url)
        const responseJson = await response.json()

        responseJson.results.forEach((character)  =>{
            const card = document.createElement("div")
            card.style.backgroundImage =`url(${character.image})`
            card.className = "cards"

            const characterNameBG =document.createElement('div')
            characterNameBG.className = "background"

            const characterName = document.createElement('span')
            characterName.className = "name"
            characterName.innerText = `${character.name}`

            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)

            card.onclick = () =>{
                const modal = document.getElementById('modal')
                modal.style.visibility = 'visible'

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML = ''

                const characterImage = document.createElement('div')
                characterImage.style.backgroundImage = 
                `url(${character.image})`
                characterImage.className = 'character-image'

                const name = document.createElement('span')
                name.className = 'character-datails'
                name.innerText =  `Nome: ${character.name}`

                const characterStatus= document.createElement('span')
                characterStatus.className = 'character-datails'
                characterStatus.innerText =  `Status: ${convertStatus(character.status)}`

                const species = document.createElement('span')
                species.className = 'character-datails' 
                species.innerText = `Especie: ${convertSpecies(character.species)}`

                const gender = document.createElement('span')
                gender.className = 'character-datails'
                gender.innerText = `Genero: ${convertGender(character.gender)}`

                const origin = document.createElement('span')
                origin.className = 'character-datails'
                origin.innerText = `Origem: ${character.origin.name}`


                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(characterStatus)
                modalContent.appendChild(species)
                modalContent.appendChild(gender)
                modalContent.appendChild(origin)





            }

            mainContent.appendChild(card)

        
        })

        const nextButton = document.getElementById('next')
        const backButton = document.getElementById('back')
        
        nextButton.disabled = !responseJson.info.next
        backButton.disabled = !responseJson.info.prev

        backButton.style.visibility = responseJson.info.prev? "visible" : "hidden"



        currentPageUrl = url
    }
    catch(error){
        alert('Erro ao carregar os personagens')
        console.log(error)

    }

}

async function loadNextPage(){
    if(!currentPageUrl) return

    try{
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.info.next)

    }
    catch(error){
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }
}

async function loadPreviousPage(){
    if(!currentPageUrl) return

    try{
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.info.prev)

    }
    catch(error){
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }
}

function hideModal(){
    const modal = document.getElementById('modal')
    modal.style.visibility = "hidden"

}


function convertStatus(status){
    const characterStatus = {
        alive:'vivo',
        dead:'morto',
        unknown:'desconhecido',

    }
    return characterStatus[status.toLowerCase()] || status;
}

function convertSpecies(specie){
    const characterSpecie = {
        human:'humano',
        alien:'alienigena',
        humanoid:'humanoide',
        animal:'animal',
        "mythological creature":'criatura mitológica',
        disease:'doença',
        robot:'robo',





    }
    return characterSpecie[specie.toLowerCase()] || specie;
}

function convertGender(gender){
    const characterGender = {
        male:'Macho',
        female:'femea',
        unknown:'desconhecido',

    }
    return characterGender[gender.toLowerCase()] || gender;
}











