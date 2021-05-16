let score = 0
let current = 0
let time = 30
let timer
let questions = [
  {
    question: '2 + 2',
    options: ['4', '8', '3', '5'],
    answer: '4'
  },
  {
    question: '10 - 9',
    options: ['0', '19', '1', '-1'],
    answer: '1'
  },
  {
    question: '3 * 4',
    options: ['9', '7', '12', '14'],
    answer: '12'
  },
  {
    question: '6 * 7',
    options: ['33', '42', '49', '45'],
    answer: '42'
  },
  {
    question: '8^2',
    options: ['56', '72', '48', '16'],
    answer: '72'
  }
]

// This function establishes what happens at the end of the game. It clears the last displayed question, displays their final score, and reveals the hidden scoreForm that let's them log their score with their initials.
const endGame = () => {
  document.getElementById('question').innerHTML = ''
  document.getElementById('result').textContent = `Score: ${score}`
  document.getElementById('scoreForm').className = ''
}

// This function renders a question. First it clears the previous displayed question. Then it creates a div and fills that div with the list of potential answers. As a multiple-choice quiz it displays four options one of which is correct.
const renderQuestion = () => {
  document.getElementById('question').innerHTML = ''
  let qElem = document.createElement('div')
  qElem.innerHTML = `
        <h3>Question: ${questions[current].question}</h3>
        <ul class="list-group">
          <li class="list-group-item choice" data-value="${questions[current].options[0]}">a) ${questions[current].options[0]}</li>
          <li class="list-group-item choice" data-value="${questions[current].options[1]}">b) ${questions[current].options[1]}</li>
          <li class="list-group-item choice" data-value="${questions[current].options[2]}">c) ${questions[current].options[2]}</li>
          <li class="list-group-item choice" data-value="${questions[current].options[3]}">d) ${questions[current].options[3]}</li>
        </ul>
        `
  document.getElementById('question').append(qElem)
}

// This event listener for when the user clicks the "Start Quiz." It does three things: 1, clears the button from view. 2, starts and displays the timer. 3, renders the question.
document.getElementById('startQuiz').addEventListener('click', () => {
  document.getElementById('startQuiz').remove()
  timer = setInterval(() => {
    document.getElementById('time').textContent = `Time Left: ${time}`
    time--
    if (time < 0) {
      endGame()
      clearInterval(timer)
    }
  }, 1000);
  renderQuestion()
})

// This event listener for when the user clicks which multiple choice answer they think is the correct one checks two conditions. 1, it checks if the user chose the correct answer. If correct, it increases the score by one. If incorrect, it reduces the remaining time by five seconds. It also checks the timer. If it reaches zero, it runs the endGame function declared and described above and clears the timer. If there is still time remaining, it renders the next question once the user makes their choice.
document.addEventListener('click', event => {
  if (event.target.classList.contains('choice')) {
    if (event.target.dataset.value === questions[current].answer) {
      score++
    } else {
      time -= 5
    }
    current++
    if (current >= questions.length) {
      endGame()
      clearInterval(timer)
    } else {
      renderQuestion()
    }
  }
})

// This event listener allows the user to submit their score with their initials to a leaderboard at the end of their game. It saves this data to localStorage, so users would need to play on the same device to see how their scores compare. Once submitted, it displays their score on the leaderboard in ascending order.
document.getElementById('submitScore').addEventListener('click', event => {
  event.preventDefault()
  let initials = document.getElementById('initials').value
  scores = JSON.parse(localStorage.getItem('scores')) || []
  scores.push({ initials, score })
  localStorage.setItem('scores', JSON.stringify(scores))

  scores.sort((a, b) => b.score - a.score)

  let tableElem = document.createElement('table')
  tableElem.className = 'table'
  tableElem.innerHTML = `
      <thead>
        <tr>
          <th scope="col">Initials</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      `
  let tableBody = document.createElement('tbody')

  for (let i = 0; i < scores.length; i++) {
    tableBody.innerHTML += `
          <tr>
            <td>${scores[i].initials}</td>
            <td>${scores[i].score}</td>
          </tr>
        `
    tableElem.append(tableBody)
    document.getElementById('question').append(tableElem)
  }
})