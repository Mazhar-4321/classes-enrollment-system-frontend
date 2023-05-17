import React, { useEffect, useState } from "react";
import "../css/UploadQuestions.css";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { addQuiz, getMyCourses } from "../services/AdminService";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Pulse from 'react-reveal/Pulse';
let questionsMap = new Map();


const QuestionForm = () => {
  const [questions, setQuestions] = useState([]);
  const [course, setCourse] = useState('');
  const [courses, setCourses] = useState([])
  const [count, setCount] = useState(0);
  const [snackbar, setSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleChange = (event) => {
    setCourse(event.target.value);
  };
  const [newQuestion, setNewQuestion] = useState("");
  const [newOption1, setNewOption1] = useState("");
  const [newOption2, setNewOption2] = useState("");
  const [newOption3, setNewOption3] = useState("");
  const [newOption4, setNewOption4] = useState("");
  const [newCorrectAnswer, setNewCorrectAnswer] = useState("");

  useEffect(() => {
    const dbCall = async () => {
      try {
        var response = await getMyCourses()
        setCourses(response)
      } catch (err) {
        console.log("err", err)
      }
    }
    dbCall()
  }, [])

  const handleAddQuestion = () => {
    console.log(questionsMap)
    if (course.length == 0) {
      setSnackbar(true);
      setSnackbarMessage("Select The Course or Upload Course And Get Back...");
      setSnackbarSeverity("error");
      return
    }
    if (newQuestion.length == 0 || newOption1.length == 0 || newOption2.length == 0 || newOption3.length == 0 ||
      newOption4.length == 0) {
      setSnackbar(true);
      setSnackbarMessage("Questions And Options Can't be Empty");
      setSnackbarSeverity("error");
      return
    }

    if (questionsMap.has(newQuestion)) {
      setSnackbar(true);
      setSnackbarMessage("Question Already Taken");
      setSnackbarSeverity("error")
      return;
    }
    var map = new Map()
    map.set(newOption1, 1);
    map.set(newOption2, 1);
    map.set(newOption3, 1);
    map.set(newOption4, 1);
    if (map.size < 4) {
      setSnackbar(true);
      setSnackbarMessage("Duplicate Options");
      setSnackbarSeverity("error")
      return
    }
    if (newCorrectAnswer.length < 1) {
      setSnackbar(true);
      setSnackbarMessage("Select An Option");
      setSnackbarSeverity("error")
      return
    }
    const newQuestionObj = {
      question: newQuestion,
      question_id: Date.now(),
      options: [newOption1, newOption2, newOption3, newOption4],
      correctAnswer: newCorrectAnswer == 0 ? newOption1 : (newCorrectAnswer == 1 ? newOption2 : (newCorrectAnswer == 2 ? newOption3 : newOption4)),
    };

    setQuestions([...questions, newQuestionObj]);
    questionsMap.set(newQuestion, 1)
    setNewQuestion("");
    setNewOption1("");
    setNewOption2("");
    setNewOption3("");
    setNewOption4("");
    setNewCorrectAnswer("");
    setSnackbar(true);
    setSnackbarMessage("Question Added To List Successfully");
    setSnackbarSeverity("success")
    setCount(count + 1)

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (count < 10) {
      setSnackbarMessage("Minimum 10 Questions Are Expected");
      setSnackbar(true)
      setSnackbarSeverity("info");
      return
    }
    var response = await addQuiz(course, questions);
    if (response) {
      setSnackbarMessage("Quiz Uploaded Successfully");
      setSnackbar(true)
      setSnackbarSeverity("success");
    }
  };

  const handleOptionChange = (event) => {
    setNewCorrectAnswer(event.target.value);
  };
  const onSnackbarClose = () => {
    setSnackbar(false)
  }
  const onAlertClose = () => {
    setSnackbar(false)
  }
  return (
    <div>
      <div className="originUploadQuestion">
      <Pulse>
        <div className="uploadQuestionMainBox">
      <h2 style={{ fontSize: '25px', marginLeft: '200px',color: "#1c266e"}}>{count} Question/s Added To List</h2>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={snackbar} autoHideDuration={2000} onClose={onSnackbarClose}>
        <Alert onClose={onAlertClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <div className="QuestionForm">
        <h3 style={{ marginLeft: "2rem", color: "#1c266e" }}>Add Questions </h3>
        <Box sx={{ width: 200, marginLeft: '30px' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Courses</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={course}
              label="Age"
              onChange={handleChange}
            >
              {courses.map(e => <MenuItem value={e.c_id}>{e.name}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
        <div className="QuestinSection">
          <div className="EnterQuestions">
            <TextField
              required
              id="question"
              label="Question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
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
            </FormControl>
            <div className="ButtonGroup">
              <Button className="AddButton" onClick={handleAddQuestion} variant="contained">
                Add question
              </Button>
              <Button className="SubmitButton" onClick={handleSubmit} variant="contained">
                Submit Questions
              </Button>
            </div>
          </div>
        </div>
      </div>
      </div>
      </Pulse>
      </div>
    </div>
  );
};

export default QuestionForm;
