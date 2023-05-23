import React, { useState } from "react";
import {
    Button,
    TextField,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel,
} from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export const MultipleChoice = (props) => {
    const [questionObj, setQuestionObj] = useState({ question: '', answer: null })
    const [newQuestion, setNewQuestion] = useState("");
    const [newOption1, setNewOption1] = useState("");
    const [newOption2, setNewOption2] = useState("");
    const [newOption3, setNewOption3] = useState("");
    const [newOption4, setNewOption4] = useState("");
    const handleOptionChange = (event) => {
        setNewCorrectAnswer(event.target.value);
    };
    const handleAddQuestion = () => {

        // if (course.length == 0) {
        //   showSnackBar("Select The Course or Upload Course And Get Back...", "error")
        //   return
        // }
        // if (newQuestion.length == 0 || newOption1.length == 0 || newOption2.length == 0 || newOption3.length == 0 ||
        //   newOption4.length == 0) {
        //   showSnackBar("Questions And Options Can't be Empty", "error")
        //   return
        // }

        // if (questionsMap.has(newQuestion) && questionId == null) {
        //   showSnackBar("Question Already Taken", "error")
        //   return;
        // }
        // var map = new Map()
        // map.set(newOption1, 1);
        // map.set(newOption2, 1);
        // map.set(newOption3, 1);
        // map.set(newOption4, 1);
        // if (map.size < 4) {
        //   showSnackBar("Duplicate Options", "error")
        //   return
        // }
        // if (newCorrectAnswer.length < 1) {
        //   showSnackBar("Select An Option", "error")
        //   return
        // }
        // if (questionId) {
        //   updateExistingQuestion();
        //   return;
        // }
        // const newQuestionObj = {
        //   question: newQuestion,
        //   question_id: Date.now(),
        //   options: [newOption1, newOption2, newOption3, newOption4],
        //   correctAnswer: newCorrectAnswer == 0 ? newOption1 : (newCorrectAnswer == 1 ? newOption2 : (newCorrectAnswer == 2 ? newOption3 : newOption4)),
        // };
        // addQuestionToDB(newQuestionObj)
        // //newQuestionObj.correctAnswer = newCorrectAnswer
        // setQuestions([...questions, newQuestionObj]);
        // questionsMap.set(newQuestion, 1)
        // setNewQuestion("");
        // setNewOption1("");
        // setNewOption2("");
        // setNewOption3("");
        // setNewOption4("");
        // setNewCorrectAnswer("");
        // setCount(count + 1)

    };
    const undo = () => {
        // setNewQuestion("");
        // setNewOption1("");
        // setNewOption2("");
        // setNewOption3("");
        // setNewOption4("");
        // setNewCorrectAnswer("");

    }

    const updateQuestion = (event) => {
        setQuestionObj(prevObj => ({ ...prevObj, question: event.target.value }))
    }
    const [newCorrectAnswer, setNewCorrectAnswer] = useState("");
    return (
        <>
            <div className="EnterQuestions">
                <TextField
                    required
                    id="question"
                    label="Question"
                    value={questionObj.question}
                    onChange={updateQuestion}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    required
                    id="option1"
                    label="Option 1"
                    value={newOption1}
                    onChange={(e) => setNewOption1(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    required
                    id="option2"
                    label="Option 2"
                    value={newOption2}
                    onChange={(e) => setNewOption2(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    required
                    id="option3"
                    label="Option 3"
                    value={newOption3}
                    onChange={(e) => setNewOption3(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    required
                    id="option4"
                    label="Option 4"
                    value={newOption4}
                    onChange={(e) => setNewOption4(e.target.value)}
                    fullWidth
                    margin="normal"
                />
            </div>
            <div className="CorrectAnswer">
                <FormControl component="fieldset" margin="normal">
                    <FormLabel component="legend">Correct Answer</FormLabel>
                    {props.checkbox ? <RadioGroup
                        aria-label="correct-answer"
                        name="correct-answer"
                        value={newCorrectAnswer}
                        onChange={handleOptionChange}
                    >
                        <FormControlLabel
                            value={0}
                            control={<Checkbox />}
                            label="Option 1"
                        />
                        <FormControlLabel
                            value={1}
                            control={<Checkbox />}
                            label="Option 2"
                        />
                        <FormControlLabel
                            value={2}
                            control={<Checkbox />}
                            label="Option 3"
                        />
                        <FormControlLabel
                            value={3}
                            control={<Checkbox />}
                            label="Option 4"
                        />
                    </RadioGroup>
                        :
                        <RadioGroup
                            aria-label="correct-answer"
                            name="correct-answer"
                            value={newCorrectAnswer}
                            onChange={handleOptionChange}
                        >
                            <FormControlLabel
                                value={0}
                                control={<Radio />}
                                label="Option 1"
                            />
                            <FormControlLabel
                                value={1}
                                control={<Radio />}
                                label="Option 2"
                            />
                            <FormControlLabel
                                value={2}
                                control={<Radio />}
                                label="Option 3"
                            />
                            <FormControlLabel
                                value={3}
                                control={<Radio />}
                                label="Option 4"
                            />
                        </RadioGroup>
                    }
                </FormControl>
                <div className="ButtonGroup">
                    <Button className="AddButton" onClick={handleAddQuestion} variant="contained">
                        Add question
                    </Button>
                    <Button className="AddButton" onClick={undo} variant="contained">
                        Undo
                    </Button>
                </div>
            </div>
        </>
    )
}