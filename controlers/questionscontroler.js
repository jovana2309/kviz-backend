const db = require ('../models/');


const getAllQuestions =  async (req, res) => {
    try {
      const allQuestions = await db.Pitanja.findAll();
         res.status(200).json(allQuestions);
        }
        catch (err) {
        console.error('Error fetching all questions: ',err);
        res.status(500).send('Internal Server Error');
        }
        };

 
        const deleteQuestion = async (req,res) => {
            const {id} = req.params;
        
            try {
              const question = await db.Pitanja.destroy({
                where: {
                  id:id
                }
              });
                 
              if(!question) {
                return res.status(404).json({message: 'Question not found'});
              }
        
              return res.status(200).json({message: 'Question deleted successfully'});
            }
               catch (error) {
                console.log(error)
                return res.status(500).json({message: 'Server error'});
               }
          };

         
          const newQuestion = async (req, res) => {
            const { id, question , answer1, answer2, answer3, answer4, correctAnswer } = req.body;
            const newQ = {pitanje: question, odgovor1: answer1, odgovor2: answer2, odgovor3: answer3, odgovor4:answer4,tacan_odgovor: correctAnswer};
          
            if (newQ.tacan_odgovor > 4 || newQ.tacan_odgovor < 1) {
                return res.status(400).json ({message: 'Correct answer must be between 1 and 4'})
            }

            try {
              
              const questions = await db.Pitanja.create({
               id:id,
               pitanje: question, 
               odgovor1: answer1,
               odgovor2: answer2,
               odgovor3: answer3,
               odgovor4: answer4,
               tacan_odgovor: correctAnswer
              });
          
    
              
              return res.status(201).json(questions);
            } catch (error) { 
              console.error('Error adding question:', error);
              return res.status(500).json({ message: 'Internal server error' });
            }
          };


          const editQuestion = async (req,res) => {
            const {question,answer1,answer2,answer3,answer4,correctAnswer} = req.body;
            const questionForUpdating = {pitanje: question, odgovor1:answer1, odgovor2:answer2, odgovor3:answer3, odgovor4:answer4, tacan_odgovor:correctAnswer};

            if(questionForUpdating.tacan_odgovor > 4 || questionForUpdating.tacan_odgovor < 1) {
                return res.status(400).json({ message: 'Correct answer must be between 1 and 4'})
            }

            try {
            const questions = await db.Pitanja.findByPk(req.params.id);
            
            if (!questions) {
                return res.status(400).json({message: 'Question not found'});
            }
            
            await db.Pitanja.update(questionForUpdating, {
                where: {
                    id:req.params.id
                }
            });

            return res.status(200).json(questions);
            }

            catch (error) {
                console.error(error);
                return res.status(500).json({message:'Error updating question', error:error.message})
            }
          };


        module.exports = {
            getAllQuestions,
            deleteQuestion,
            newQuestion,
            editQuestion
        };

