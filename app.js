const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score')
let players = []
let apiCategories = []
let apiQuestions = []
let activeCardList = []


function addCategory(category, questions) {
    const column = document.createElement('div')
    column.classList.add('genre-column')

    const genreTitle = document.createElement('div')
    genreTitle.classList.add('genre-title')
    genreTitle.innerText = category.title
    column.append(genreTitle)
    
    questions.forEach(question => {
        const card = document.createElement('div')
        card.classList.add('card')
        
        card.innerHTML = question.value
        card.setAttribute('data-question', question.question)
        card.setAttribute('data-answer', question.answer)
        card.setAttribute('data-value', card.innerHTML)
        
        card.addEventListener('click', flipCard)
        activeCardList.push(card)
        column.append(card)
    })
    column.style.display = "none"
    game.append(column)
}

function flipCard() {
    this.innerHTML = ''
    this.style.fontSize = "15px"
    this.style.lineHeight = "30px"
    const textDisplay = document.createElement('div')
    textDisplay.classList.add('card-text')
    textDisplay.innerHTML = this.getAttribute('data-question')
    const answerButton = document.createElement('button')
    answerButton.classList.add('answer-button')
    answerButton.innerHTML = "Show Answer"
    answerButton.addEventListener('click', getResult)
    this.append(textDisplay, answerButton)
    // console.log(activeCardList.length)
    activeCardList = activeCardList.filter(ele => {return ele.getAttribute('data-question') != this.getAttribute('data-question')})
    // console.log(activeCardList.length)
    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.removeEventListener('click', flipCard))
}

function incrementPlayerScore(value, playerName, playerButtonList) {
    players.forEach(player => {
        if(player.playerName === playerName) {
            player.playerScore += value
            const playerScoreDisplay = document.getElementById(playerName)
            playerScoreDisplay.innerHTML = "\t" + player.playerScore
        }
    })
    deactivatePlayerButtons(playerButtonList)
}

function deactivatePlayerButtons(playerButtonList) {
    playerButtonList.forEach(button => button.remove())
}

function getResult() {
    activeCardList.forEach(card => card.addEventListener('click', flipCard))

    const cardOfButton = this.parentElement
    const score = parseInt(cardOfButton.getAttribute('data-value'))
    let playerButtonList = []
    cardOfButton.innerHTML = cardOfButton.getAttribute('data-answer')
    players.forEach(player => {
        const playerButton = document.createElement('button')
        playerButton.innerHTML = player.playerName
        playerButton.classList.add('player-button')
        playerButton.addEventListener('click', () => incrementPlayerScore(score, player.playerName, playerButtonList))
        playerButtonList.push(playerButton)
        cardOfButton.append(playerButton)
    })
    const noneButton = document.createElement('button')
    noneButton.innerHTML = "none"
    noneButton.classList.add('player-button')
    noneButton.addEventListener('click', () => deactivatePlayerButtons(playerButtonList))
    playerButtonList.push(noneButton)
    cardOfButton.append(noneButton)
    cardOfButton.removeEventListener('click', flipCard)
}

function savePlayers(playerNameList, playerSetupBox) {
    let alertCheck = false
    playerNameList.forEach(playerName => {
        if(playerName.value === "" || playerName.value === undefined || playerName.value.indexOf(' ') >= 0) {
            alertCheck = true
        }
        console.log(playerName)
    })

    if(alertCheck === true) {
        alert("MUST ENTER ALL PLAYER NAMES, NO SPACES PERMITTED")
        return
    }

    const columns = Array.from(document.getElementsByClassName('genre-column')) 
    console.log(columns)
    
    columns.forEach(column => {
        column.style.display = "block"
    })

    playerNameList.forEach(playerName => {
        const name = document.createElement('div')
        const span = `<span id=${playerName.value}></span>`
        name.innerHTML = playerName.value + span
        scoreDisplay.append(name)

        players.push(
            {
                playerName: playerName.value,
                playerScore: 0
            }
        )
        const playerScoreDisplay = document.getElementById(playerName.value)
        playerScoreDisplay.innerHTML = "\t" + 0
    })

    playerSetupBox.remove()
}

function setPlayers(numberOfPlayers, playerSetupBox) {
    const prevTextFields = document.querySelectorAll('.player-name-textfield')
    prevTextFields.forEach(textfield => textfield.remove())
    const prevSubmitButton = document.getElementsByClassName("submit-button")
    if(prevSubmitButton.length > 0) {
        prevSubmitButton[0].remove()
    }

    for(let index = 0; index < numberOfPlayers; index++) {
        const row = document.createElement('div')
        const playerNameTextField = document.createElement('input')
        playerNameTextField.placeholder = "Enter Name for player " + (index + 1)
        playerNameTextField.classList.add('player-name-textfield')
        row.classList.add('break')
        playerSetupBox.append(row)
        playerSetupBox.append(playerNameTextField)
    }

    const row = document.createElement('div')
    row.classList.add('break')
    playerSetupBox.append(row)

    const submitButton = document.createElement('button')
    submitButton.classList.add('submit-button')
    submitButton.innerHTML = "submit"
    submitButton.addEventListener('click', ()=> savePlayers(document.querySelectorAll('.player-name-textfield'), playerSetupBox))
    playerSetupBox.append(submitButton)

}

function initPlayers() {
    const playerSetupBox = document.createElement('div')
    playerSetupBox.classList.add('player-setup')
    
    const playerMessageLabel = document.createElement('h2')
    playerMessageLabel.innerHTML = "Please select the number of players"
    playerSetupBox.append(playerMessageLabel)
    
    const playerSelect = document.createElement('select')
    playerSelect.options[playerSelect.options.length] = new Option(1)
    playerSelect.options[playerSelect.options.length] = new Option(2)
    playerSelect.options[playerSelect.options.length] = new Option(3)
    playerSelect.classList.add('player-select')
    playerSelect.addEventListener('change', () => setPlayers(playerSelect.selectedIndex + 1, playerSetupBox))
    playerSetupBox.append(playerSelect)
    
    game.append(playerSetupBox)
}

async function getCategories() {
    let categoryIdList = []
    while(apiCategories.length < 5) {
        let num = (Math.floor(Math.random() * 99) + 1)
        let request = 'https://jservice.io/api/category?id=' + num
        let response = await fetch(request).then(category => category.json()).catch(e => console.log(e))
        if(!categoryIdList.includes(response.id) && response.clues_count > 3) {
            apiCategories.push(response)
            categoryIdList.push(response.id)
        }
    }


    apiCategories.forEach(async (category) => {
        let request = 'https://jservice.io/api/clues?&category=' + category.id
        let response = await fetch(request).then(q => q.json()).catch(e => console.log(e))
        let tempQuestions = []
            
        for(j = 1; j <= 3; j++) {
            response[j].value = j * 100
            apiQuestions.push(response[j])
            tempQuestions.push(response[j])
        }
        
        addCategory(category, tempQuestions)
        tempQuestions = []
    })

}


getCategories()
initPlayers()


