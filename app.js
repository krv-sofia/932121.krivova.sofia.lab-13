const express = require('express');

const app = express();
app.use(express.json());

function result(questions, answers) {
    let correctAnswers = 0;
    const totalAnswers = answers?.length;

    for (let index in answers) {
        const str = questions[index].replace(' = ', '');
        const correctAnswer = eval(str);
        
        if (+correctAnswer == +answers[index]) {
            correctAnswers += 1;
        }
    }
    
    return {correctAnswers, totalAnswers};
}

app.post('/answer', (req, res) => {
    let { questions, answers } = req.body;
    res.json(result(questions, answers));
});

app.use(express.static('public'))
app.use('/Mockups', express.static('public', {extensions: ['html']}))

app.listen(5000, () => console.log('listening on port 5000'));