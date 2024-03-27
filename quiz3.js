const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        id: '1',
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        id: '2',
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        id: '3',
    },
    {
        question: "Which of the following is not an HTML tag?",
        a: "<select>",
        b: "<input>",
        c: "<textarea>",
        d: "<list>",
        id: '4',
    },
    {
        question: "World Wide Web was invented by",
        a: "Ted Nelson",
        b: "Tim Berners-Lee",
        c: "Linus Torvalds",
        d: "Robert E. Kahn",
        id: '5',
    },
    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        a: "var",
        b: "let",
        c: "Both A and B",
        d: "none of the above",
        id: '6',
    },
    {
        question: "Which tag creates a number/order list?",
        a: "<UL>",
        b: "<OL>",
        c: "<OT>",
        d: "none of the above",
        id: '7',
    },
    {
        question: "Which of the following is a container?",
        a: "<SELECT>",
        b: "<BODY>",
        c: "<INPUT>",
        d: "Both (a) and (b)",
        id: '8',
    },
    {
        question: "How can you open a link in a new browser window?",
        a: "< a href = “url” target = “new”>",
        b: "<a href = “url” target= “_blank”>",
        c: "<a href = “url”.new>",
        d: "<a href = “url” target =”open”>",
        id: '9',
    },
    {
        question: "Which of the following statements is not true regarding JavaScript?",
        a: "JavaScript is a loosely typed language",
        b: "1JavaScript is an object-based language",
        c: "JavaScript is event driven",
        d: "A JavaScript embedded in an HTML document is compiled and executed by the client browser",
        id: '10',
    },
    {
        question: "Identify the empty or void element in HTML",
        a: "<sup>",
        b: "<br>",
        c: "<p>",
        d: "<abbr>",
        id: '11',
    },



];

const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')


const submitBtn = document.getElementById('submit')

let currentQuiz = 0
let score = 0

let q = []
let a = []
loadQuiz()

function loadQuiz() {
    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d

}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer

    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id
        }
    })

    return answer
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected()

    if (answer) {
        q.push(quizData[currentQuiz].id)
        a.push(answer)

        currentQuiz++

        if (currentQuiz < quizData.length) {
            loadQuiz()
        } else {
            const params = new URLSearchParams();
            params.append('q', q);
            params.append('a', a);
            fetch('/getscore.php', {
                method: 'POST',
                body: params,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
                .then(response => response.json())
                .then(data => {
                    score = data.score;
                    quiz.innerHTML = `
                <h2>You answered ${score}/${quizData.length} questions correctly</h2>
                <button onclick="location.reload()">Reload</button>
            `
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }
})