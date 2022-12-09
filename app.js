const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score')
let score = 0

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
    column.classList.add('genre=column')

    const genreTitle = document.createElement('div')
    genreTitle.classList.add('genre-title')
    genreTitle.innerText = category.genre
    column.append(genreTitle)
    game.append(column)

    category.questions.forEach(question => {
        const card = document.createElement('div')
        card.classList.add('card')
        column.append(card)

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
    })
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

jeopardyCategories.forEach(category => addCategory(category))
