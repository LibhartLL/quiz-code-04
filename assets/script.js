var $ = document.querySelector.bind(document)

$('.start_quiz').addEventListener('click', function() {
    var quiz_intro = $('.quiz-intro')
    quiz_intro.style.display = 'none'

    var main = $('main')
    main.style.display = 'block'
})

var question_screen = $('.question-screen')

var questions = [

    ['String values must be enclosed with _______ when being assigned variables?', 
    ['Quotes', 'Commas', 'Curly Brackets', 'Parentheses'], 'c' ],

    ['Question 2', 
    ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'] ],
]

var message = $('.message')

var q = 1
for (let question of questions) {

    var div = document.createElement('div')
    div.setAttribute('class', `question q${q}`)
    div.setAttribute('question', q++)

    var h2 = document.createElement('h2')

    h2.innerText = question[0]
    div.appendChild(h2)
    question_screen.insertBefore(div, message)

    var l = 0
    var letters = ['a', 'b', 'c', 'd']
    for (let a of question[1]){
        var li = document.createElement('li')
        var button = document.createElement('button')
        div.appendChild(li)
        li.appendChild(button)
        var letter = letters[l++]
        button.innerText = `${letter}. ${a}` 
        button.setAttribute('letter', letter)
        button.addEventListener('click', check_answer)
    }
}


function check_answer() {
    var clicked = this.getAttribute('letter')
    var current_question = this.parentElement.parentElement
    var current_number = parseInt(current_question.getAttribute('question'))

    if (clicked == questions[current_number-1][2]) {
        message.innerText='Correct'       
    } 
    else{
        message.innerText='Incorrect'
    }

    current_question.style.display = 'none'
    $(`.q${current_number+1}`).style.display = 'block'

}


var minutes = $('.minutes')
var seconds = $('.seconds')

var time_remaining = 75
var s = time_remaining % 60
var m = parseInt(time_remaining / 60)
minutes.innerText= m
seconds.innerText= s
