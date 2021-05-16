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

const endGame = () => {
  document.getElementById('question').innerHTML = ''
  document.getElementById('result').textContent = `Score: ${score}`
  document.getElementById('scoreForm').className = ''
}

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

document.addEventListener('click', event => {
  if (event.target.classList.contains('choice')) {
    if (event.target.dataset.value === questions[current].answer) {
      score++
    } else {
      time -= 5
      // console.log('wrong')
      // we'll come back to setting what happens if they get it wrong later so keep this.
      // I think this is where I'll set the conditions around the time reducing when they get something wrong.
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