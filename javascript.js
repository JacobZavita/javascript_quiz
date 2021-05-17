let score = 0
let current = 0
let time = 60
let timer
let questions = [
  {
    question: 'What is NOT a datatype of javascript',
    options: ['Numbers', 'Arrays', 'Booleans', 'Strings'],
    answer: 'Arrays'
  },
  {
    question: 'This is the "not" operator',
    options: ['=/=', '*', '!', '-='],
    answer: '!'
  },
  {
    question: 'The following is best practice when using variables',
    options: ['Just use var', 'Use const and let interchangeably', 'Primarily use var but also use const and let when necessary', 'Either just use var or only use const and let'],
    answer: 'Either just use var or only use const and let'
  },
  {
    question: 'Semicolons are okay to use...',
    options: ['At the end of every line', 'only in for loops', 'at the end of each function', 'to declare an array'],
    answer: 'only in for loops'
  },
  {
    question: 'template literals are for',
    options: ['inserting the value of a variable', 'connecting arrays to functions', 'expressing a code template', 'searching code comments'],
    answer: 'inserting the value of a variable'
  },
  {
    question: 'If you want to check for specific conditions, you would use a:',
    options: ['while loop', 'conditional array', 'if statement', 'prompt'],
    answer: 'if statement'
  },
  {
    question: 'A Switch Case is used to',
    options: ['check for the condition of one single variable', 'check for the condition of multiple variables', 'end a line of code', 'confuse the developer'],
    answer: 'check for the condition of one single variable'
  },
  {
    question: 'If you wanted to do one thing when a comparison is true and another when it is false, you could use a:',
    options: ['Object', 'getElementById', 'turnary', 'for loop'],
    answer: 'turnary'
  },
  {
    question: 'If you want to run the same sequence of code multiple times you could use a',
    options: ['Function', 'For loop', 'A or B', 'Template literal'],
    answer: 'A or B'
  },
  {
    question: 'Arrays are:',
    options: ['collections of data', 'indicated by {}', 'limited to numbers', 'how you hold a sequence of repeatable code'],
    answer: 'collections of data'
  },
  {
    question: 'You can turn an array into a string using',
    options: ['array.stringify', 'array.push', 'array.parse', 'array.join'],
    answer: 'array.join'
  },
  {
    question: 'Functions are mainly used to...',
    options: 'repeat a series of steps that can be called later', 'check for specific conditions', 'hold a bundle of data', 'suppress objects',
    answer: 'repeat a series of steps that can be called later'
  },
  {
    question: 'Recursive logic is when...',
    options: 'the logic causes a specific event to happen', 'logic creates truthy or falsey statements', 'the logic calls itself creating an infinite loop', 'the logic references a variable in an unlinked file'
    answer: 'the logic calls itself creating an infinite loop'
  },
  {
    question: '',
    options: '',
    answer: ''
  },
  {
    question: '',
    options: '',
    answer: ''
  },
]

// This function establishes what happens at the end of the game. It clears the last displayed question, displays their final score, and reveals the hidden scoreForm that let's them log their score with their initials.
const endGame = () => {
  document.getElementById('question').innerHTML = ''
  document.getElementById('right-wrong').innerHTML = ''
  document.getElementById('result').textContent = `Score: ${score}/${questions.length}`
  document.getElementById('scoreForm').className = ''
}

// This function renders a question. First it clears the previous displayed question. Then it creates a div and fills that div with the list of potential answers. As a multiple-choice quiz it displays four options one of which is correct.
const renderQuestion = () => {
  document.getElementById('question').innerHTML = ''
  let qElem = document.createElement('div')
  qElem.innerHTML = `
        <h3>Question ${current+1}: ${questions[current].question}</h3>
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
  document.getElementById('right-wrong').innerHTML = ''
  if (event.target.classList.contains('choice')) {
    if (event.target.dataset.value === questions[current].answer) {
      score++
      let right = document.createElement('div')
      right.innerHTML = `
      <h5>Last answer: <span class="badge bg-success">Correct!</span></h5>
      `
      document.getElementById('right-wrong').append(right)
    } else {
      time -= 5
      let wrong = document.createElement('div')
      wrong.innerHTML = `
      <h5>Last answer: <span class="badge bg-danger">Wrong</span> you lost five seconds!</h5>
      `
      document.getElementById('right-wrong').append(wrong)
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