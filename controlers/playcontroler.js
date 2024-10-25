const db = require("../models/")
let GAME_STATE = [];

const startGame = async (req,res) => {
try {
    const game = GAME_STATE.find((game) => game.player === req.user.email)
    if(game) {
        return res.json({
            question: game.questions[game.currentScore].pitanje,
            currentScore: game.currentScore,
            lifeline: game.lifeline,
            answers: [
                {id:1,text:game.questions[game.currentScore].odgovor1},
                {id:2,text:game.questions[game.currentScore].odgovor2},
                {id:3,text:game.questions[game.currentScore].odgovor3},
                {id:4,text:game.questions[game.currentScore].odgovor4},

            ],
        });
        
    }
    else {
        const questions = await db.Pitanja.findAll({
        order:db.Sequelize.literal("rand()"),
        limit:15,
        });

        GAME_STATE.push({
            player:req.user.email,
            currentScore:0,
            questions,  
            lifeline: true,
        });

        return res.json({
            question:questions[0].pitanje,
            currentScore:0,
            lifeline: true,
            answers: [
            {id: 1, text:questions[0].odgovor1},
            {id: 2, text:questions[0].odgovor2},
            {id: 3, text:questions[0].odgovor3},
            {id: 4, text:questions[0].odgovor4},
            ],
        });
    }
}
catch (error) {
    console.error('Error starting game:', error);
        res.status(500).json({error: 'Internal server error'});
}
};

const fiftyFifty = async (req,res) => {
    const game = GAME_STATE.find((game) => game.player === req.user.email); 
    const {question} = req.body;
    console.log(question)
    if(question.currentScore == game.currentScore && game.lifeline) {
    const correctAnswer = game.questions[game.currentScore].tacan_odgovor;
    const randomAnswer = generateRandomExceptCorrect(correctAnswer);
    const twoAnswers = question.answers.map((answer) => {
        if (answer.id === correctAnswer || answer.id === randomAnswer)
            return answer;
        else {
            return {id: answer.id, text: ""}
        }
    });

    question.answers = twoAnswers;
    game.lifeline = false;
    question.lifeline = false;
    return res.json(question);
}

return res.json ({question: false});
}



const submitAnswer = async (req,res) => {
    const game = GAME_STATE.find((game) => game.player === req.user.email);
    const { answer } = req.body;
    const correctAnswer = game.questions[game.currentScore].tacan_odgovor;

    if (answer == correctAnswer) {
        game.currentScore++;
        if (game.currentScore > 14) {
            return gameOver(req,res);
        }

        return res.json({
            question: game.questions[game.currentScore].pitanje,
            currentScore: game.currentScore,
            lifeline: game.lifeline,
            answers: [
                {id:1,text:game.questions[game.currentScore].odgovor1},
                {id:2,text:game.questions[game.currentScore].odgovor2},
                {id:3,text:game.questions[game.currentScore].odgovor3},
                {id:4,text:game.questions[game.currentScore].odgovor4},

            ],
        });

    }

    gameOver(req,res);
};


const gameOver = async (req,res) => {
    const game = GAME_STATE.find((game) => game.player === req.user.email);
    GAME_STATE = GAME_STATE.filter((game) => game.player !== req.user.email);

    try {
        const korisnik = await db.Korisnici.findOne({
            attributes: ["id"],
            where: {email:req.user.email},
        });

        await db.Rezultati.create({
            broj_tacnih_odgovora: game.currentScore,
            korisnik_id: korisnik.id,
        });
        
    }

    catch (error) {
        console.log (error.message);
    }

    return res.json ({
        currentScore: game.currentScore,
        gameOver: true,
    });
};

function generateRandomExceptCorrect  (correctAnswer) {
    if (correctAnswer < 1 || correctAnswer > 4) {
        throw new Error ("correctAnswer has to be between 1 and 4");
    }

    let randomNumber;

    do {
        randomNumber = Math.floor(Math.random() * 4) + 1;
    }
    while (randomNumber === correctAnswer);

    return randomNumber;
}

module.exports = {
startGame, submitAnswer, fiftyFifty
};

