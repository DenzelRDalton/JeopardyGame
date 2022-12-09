const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score')
let score = 0
let players = []

const jeopardyCategories = [
    {
        genre: "WHO",
        questions: [
            {
                question: 'Who wrote Harry Potter?',
                answer: 'JK Rowling.',
                level: 'easy'
            },
            {
                question: 'Who wrote Harry Potter?',
                answer: 'JK Rowling.',
                level: 'medium'
            },
            {
                question: 'Who wrote Harry Potter?',
                answer: 'JK Rowling.',
                level: 'hard'
            },
        ]
    },
    {
        genre: "WHERE",
        questions: [
            {
                question: 'Who wrote Harry Potter?',
                answer: 'JK Rowling.',
                level: 'easy'
            },
            {
                question: 'Who wrote Harry Potter?',
                answer: 'JK Rowling.',
                level: 'medium'
            },
            {
                question: 'Who wrote Harry Potter?',
                answer: 'JK Rowling.',
                level: 'hard'
            },
        ]
    },
    {
        genre: "WHO",
        questions: [
            {
                question: 'Who wrote Harry Potter?',
                answer: 'JK Rowling.',
                level: 'easy'
            },
            {
                question: 'Who wrote Harry Potter?',
                answer: 'JK Rowling.',
                level: 'medium'
            },
            {
                question: 'Who wrote Harry Potter?',
                answer: 'JK Rowling.',
                level: 'hard'
            },
        ]
    },
    {
        genre: "WHO",
        questions: [
            {
                question: 'Who wrote Harry Potter?',
                answer: 'JK Rowling.',
                level: 'easy'
            },
            {
                question: 'Who wrote Harry Potter?',
                answer: 'JK Rowling.',
                level: 'medium'
            },
            {
                question: 'Who wrote Harry Potter?',
                answer: 'JK Rowling.',
                level: 'hard'
            },
        ]
    },
    {
        genre: "WHO",
        questions: [
            {
                question: 'Who wrote Harry Potter?',
                answer: 'JK Rowling.',
                level: 'easy'
            },
            {
                question: 'Who wrote Harry Potter?',
                answer: 'JK Rowling.',
                level: 'medium'
            },
            {
                question: 'Who wrote Harry Potter?',
                answer: 'JK Rowling.',
                level: 'hard'
            },
        ]
    },
]

function addCategory(category) {
    const column = document.createElement('div')
    column.classList.add('genre-column')

    const genreTitle = document.createElement('div')
    genreTitle.classList.add('genre-title')
    genreTitle.innerText = category.genre
    column.append(genreTitle)
    
    category.questions.forEach(question => {
        const card = document.createElement('div')
        card.classList.add('card')
        
        if(question.level === 'easy') {
            card.innerHTML = 100
        } else if(question.level === 'medium') {
            card.innerHTML = 200
        } else {
            card.innerHTML = 300
        }
        
        card.setAttribute('data-question', question.question)
        card.setAttribute('data-answer', question.answer)
        card.setAttribute('data-value', card.innerHTML)
        
        card.addEventListener('click', flipCard)
        column.append(card)
    })

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

    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.removeEventListener('click', flipCard))
}

function getResult() {
    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.addEventListener('click', flipCard))

    const cardOfButton = this.parentElement
    score += parseInt(cardOfButton.getAttribute('data-value'))
    cardOfButton.innerHTML = cardOfButton.getAttribute('data-answer')
    scoreDisplay.innerHTML = score
    cardOfButton.removeEventListener('click', flipCard)
}

function setPlayers(numberOfPlayers, playerSetupBox) {
    const prevTextFields = document.querySelectorAll('.player-name-textfield')
    prevTextFields.forEach(textfield => textfield.remove())

    for(let index = 0; index < numberOfPlayers; index++) {
        const playerNameTextField = document.createElement('input')
        playerNameTextField.placeholder = "Enter Name for player " + (index + 1)
        playerNameTextField.classList.add('player-name-textfield')
        playerSetupBox.append(playerNameTextField)
    }
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



initPlayers()
jeopardyCategories.forEach(category => addCategory(category))
