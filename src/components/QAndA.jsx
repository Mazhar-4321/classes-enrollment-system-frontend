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

export const QAndA = (props) => {
    const [questionObj, setQuestionObj] = useState({
        question: '',
        answer: ''
    })
    const updateQuestion = (event) => {
        setQuestionObj(prevObj => ({
            ...prevObj, question: event.target.value
        }))
    }
    const updateAnswer = (event) => {
        setQuestionObj(prevObj => ({
            ...prevObj, answer: event.target.value
        }))
    }
    const submitQuestionToDatabase =()=>{
        console.log(questionObj)
    }
    const undo =()=>{
        setQuestionObj(prevObj=>({
            ...prevObj,question:'',answer:''
        }))
    }
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
                    value={questionObj.answer}
                    multiline
                    onChange={updateAnswer}
                    id="option1"
                    label="Answer"
                    fullWidth
                    margin="normal"
                />

            </div>
            <div className="CorrectAnswer">

                <div className="ButtonGroup">
                    <Button className="AddButton" onClick={submitQuestionToDatabase} variant="contained">
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