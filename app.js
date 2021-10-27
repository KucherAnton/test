class Quiz {
    constructor (type, questions, results) {
        this.type = type;
        this.questions = questions;
        this.results = results; 
        this.score = 0;
        this.result = 0;
        this.current = 0;
    }
    Click(index) {
        let value = this.questions[this.current].Click(index);
        this.score += value
        let correct = -1;

        if (value >= 1){
            correct = index
        } else {
            for (let i = 0; i <= this.questions[this.current].answers.length; i++) {
                if (this.questions[this.current].answers[i].value >= 1) {
                    correct = i;
                    break;
                }
            }
        }
        this.Next();
        return correct;
    }
    Next() {
        this.current++;
        if (this.current >= this.questions.length) {
            this.End();
        }
    }
    End() {
        for (let i = 0; i < this.result.length; i++) {
            if (this.result[i].Check(this.score)) {
                this.result = i;
            }
        }
    }
}

class Question {
    constructor(text, answers) {
        this.text = text;
        this.answer = answers;
    }
    Click(index) {
        return this.answers[index].value;
    }
}

class Answer {
    constructor(text, value) {
        this.text = text;
        this.value = value;
    }
}

class Result {
    constructor(text, value) {
        this.text = text;
        this.value = value; 
    }
    Check(value) {
        if (this.value <= value) {
            return true;
        } else {
            return false;
        }
    }
}   

// Придумай сам

const results = [
    new Result('Ты лох ебаный', 0),
    new Result('qwe', 4),
    new Result('qwe', 8),
    new Result('qwe', 12)
];

const questions = [
    new Question('Какого хуя?', [
        new Answer('Такого', 1),
        new Answer('ююю', 0),
        new Answer('ййй', 0),
        new Answer('ццц', 0)
    ]),
];

//

const quiz = new Quiz(1, questions, results);

Update()

function Update() {
    if (quiz.current < quiz.questions.length) {
        headElem.innerHTML = quiz.questions[quiz.current].text;
        buttonsElem.innerHTML = '';

        for (let i = 0; i < quiz.questions[quiz.current].answers.length; i++) {
            let btn = document.createElement('button');
            btn.className = 'button';
            btn.innerHTML = quiz.questions[quiz.current].answer[i].text;
            btn.setAttribute('index', i);
            buttonsElem.appendChild(btn);
        }
        pagesElem.appendChild(btn);
        Init();
    } else {
        buttonsElem.innerHTML = '';
        headElem.innerHTML = quiz.results[quiz.result].text;
        pagesElem.innerHTML = 'Вы набрали ' + quiz.score + ' очков';
    }
}

function Init() {
    let btns = document.getElementsByClassName('button');
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function (e) {
            Click(e.target.getAttribute('index'));
        });
    }
}

function Click(index) {
    let correct = quiz.Click(index);
    let btns = document.getElementsByClassName('button');
    for (let i = 0; i < btns.length; i++) {
        btns[i].className = 'button button_passive';
    }
    if (quiz.type == 1) {
        if(correct >= 0) {
            btns[correct].className = 'button button_correct'
        }

        if(index != correct) {
            btns[index].className = 'button button_wrong';
        }
    } else {
        btns[index].className = 'button button_correct';
    }
    setTimeout(Update, 1000);
}