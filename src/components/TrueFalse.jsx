import React, { useState } from "react";
import {
    Button,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
} from "@mui/material";

export const TrueFalse = () => {
    const [questionObj,setQuestionObj] = useState({
        question:'',
        answer:''
    })

    const updateQuestion =(event)=>{
        setQuestionObj(prevObj=>({
            ...prevObj,question:event.target.value
        }))
    }
    const updateAnswer =(event)=>{
        setQuestionObj(prevObj=>({
            ...prevObj,answer:event.target.value
        }))
    }
    const submitQuestionToDatabase=()=>{
        console.log(questionObj)
    }
    const undo =()=>{
        setQuestionObj(prevObj=>({...prevObj,question:''}))
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


            </div>
            <div className="CorrectAnswer">
                <FormControl component="fieldset" margin="normal">
                    <FormLabel component="legend">Correct Answer</FormLabel>

                    <RadioGroup
                        aria-label="correct-answer"
                        name="correct-answer"

                    >
                        <FormControlLabel
                            value={0}
                            onClick={()=>setQuestionObj(prevObj=>({...prevObj,answer:true}))}
                            control={<Radio />}
                            label="True"
                        />
                        <FormControlLabel
                            value={1}
                            onClick={()=>setQuestionObj(prevObj=>({...prevObj,answer:false}))}
                            control={<Radio />}
                            label="False"
                        />

                    </RadioGroup>

                </FormControl>
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

