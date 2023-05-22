import React, { useEffect, useState } from "react";
import "../css/UploadQuestions.css";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop';
import FormGroup from '@mui/material/FormGroup';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import Popper from '@mui/material/Popper';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@mui/material";
import { addQuestion, addQuiz, deleteQuestion, getMyCourses, getQuizQuestions, updateQuestionById } from "../services/AdminService";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { MultiMulti, TrueFalse } from "../components/TrueFalse";
import { MultipleChoice } from "../components/MultiMulti";
import { QAndA } from "../components/QAndA";
let questionsMap = new Map();

const QuestionForm = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open1 = Boolean(anchorEl);
  const id = open1 ? 'simple-popper' : undefined;
  const [questions, setQuestions] = useState([]);
  // const [jsonOrForm, setJsonOrForm] = useState(-1);
  const [quizId, setQuizId] = useState(null);
  const [questionId, setQuestionId] = useState(null)
  const [course, setCourse] = useState('');
  const [category, setCategory] = useState('');
  const [mode, setMode] = useState('')
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
  const handleChange = async (event) => {
    setQuizId(event.target.value);
    var quizResponse = await getQuizQuestions(event.target.value);
    questionsMap = new Map();
    quizResponse.forEach(q => questionsMap.set(q.question, 1));
    setQuestions(quizResponse)
    setCourse(event.target.value);
    setNewQuestion("");
    setNewOption1("");
    setNewOption2("");
    setNewOption3("");
    setNewOption4("");
    setNewCorrectAnswer("");
    setQuestionId(null)
  };

  const handleChange1 = (event) => {
    setMode(event.target.value)
  }
  const handleChange2 = (event) => {
    console.log(event.target.value)
    setCategory(event.target.value)
  }
  const showSnackBar = async (message, severity) => {
    setSnackbar(true);
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
  }
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
      }
    }
    dbCall()
  }, [])

  const updateExistingQuestion = async () => {
    let oldQuestions = [...questions]
    var questionObj = null;
    oldQuestions = oldQuestions.map(question => {
      if (question.question_id == questionId) {
        questionsMap.delete(question.question);
        questionsMap.set(newQuestion, 1);
        question.question = newQuestion;
        question.answer = newCorrectAnswer == 0 ? newOption1 : newCorrectAnswer == 1 ? newOption2 : newCorrectAnswer == 2 ? newOption3 : newOption4;
        question.options[0] = newOption1;
        question.options[1] = newOption2;
        question.options[2] = newOption3;
        question.options[3] = newOption4;
        questionObj = question
      }
      return question
    })

    var updateResponse = await updateQuestionById(questionObj.question_id, questionObj);

    setQuestions(oldQuestions);
    setNewQuestion("");
    setNewOption1("");
    setNewOption2("");
    setNewOption3("");
    setNewOption4("");
    setNewCorrectAnswer("");
    setQuestionId(null);
    showSnackBar("Question Updated Successfully", "success")
    setQuestionId(null)
  }
  const handleAddQuestion = () => {

    if (course.length == 0) {
      showSnackBar("Select The Course or Upload Course And Get Back...", "error")
      return
    }
    if (newQuestion.length == 0 || newOption1.length == 0 || newOption2.length == 0 || newOption3.length == 0 ||
      newOption4.length == 0) {
      showSnackBar("Questions And Options Can't be Empty", "error")
      return
    }

    if (questionsMap.has(newQuestion) && questionId == null) {
      showSnackBar("Question Already Taken", "error")
      return;
    }
    var map = new Map()
    map.set(newOption1, 1);
    map.set(newOption2, 1);
    map.set(newOption3, 1);
    map.set(newOption4, 1);
    if (map.size < 4) {
      showSnackBar("Duplicate Options", "error")
      return
    }
    if (newCorrectAnswer.length < 1) {
      showSnackBar("Select An Option", "error")
      return
    }
    if (questionId) {
      updateExistingQuestion();
      return;
    }
    const newQuestionObj = {
      question: newQuestion,
      question_id: Date.now(),
      options: [newOption1, newOption2, newOption3, newOption4],
      correctAnswer: newCorrectAnswer == 0 ? newOption1 : (newCorrectAnswer == 1 ? newOption2 : (newCorrectAnswer == 2 ? newOption3 : newOption4)),
    };
    addQuestionToDB(newQuestionObj)
    //newQuestionObj.correctAnswer = newCorrectAnswer
    setQuestions([...questions, newQuestionObj]);
    questionsMap.set(newQuestion, 1)
    setNewQuestion("");
    setNewOption1("");
    setNewOption2("");
    setNewOption3("");
    setNewOption4("");
    setNewCorrectAnswer("");
    showSnackBar("Question Added To List Successfully", "success")
    setCount(count + 1)

  };
  const addQuestionToDB = async (questionObj) => {
    var response = await addQuestion(course, questionObj);

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    var file = event.target.files[0]
    var reader = new FileReader();
    if (file.type !== 'application/json') {
      showSnackBar("File Type Not Supported", "error")
      return
    }
    reader.onload = async function (event) {
      var jsonObject = JSON.parse(event.target.result);
      var array = Object.values(jsonObject).map(obj => { obj.question_id = Date.now() + Math.random(); return obj; }).filter(obj => obj.question &&
        obj.answer && obj.options && obj.question.length > 0 &&
        obj.answer.length > 0 && obj.options.length == 4 && obj.options[0].length > 0 &&
        obj.options[1].length > 0 && obj.options[2].length > 0 && obj.options[3].length > 0 &&
        obj.options.indexOf(obj.answer) != -1 && !questionsMap.has(obj.question) &&
        checkForSimilarOptions(obj.options));
      if (array.length > 0) {
        try {

          var quizInsertResponse = await addQuiz(course, array);
          if (quizInsertResponse) {
            array.forEach(a => questions.push(a))
            setOpen(false);
            showSnackBar("Quiz Uploaded Successfully", "success")
            return
          } else {
            setOpen(false);
            showSnackBar("Quiz Uploaded Failed", "error")
          }
        } catch (err) {
          setOpen(false);
          showSnackBar("File Uploading Failed", "error")
          return
        }

      } else {
        setOpen(false);
        showSnackBar("JSON Validation Failed or  Questions Already Exists", "error")
      }

    };
    setOpen(true)
    reader.readAsText(file)

  };
  const undo = () => {
    setNewQuestion("");
    setNewOption1("");
    setNewOption2("");
    setNewOption3("");
    setNewOption4("");
    setNewCorrectAnswer("");

  }
  const checkForSimilarOptions = (options) => {
    var map = new Map();
    map.set(options[0], 1);
    map.set(options[1], 1);
    map.set(options[2], 1);
    map.set(options[3], 1);

    return map.size == 4

  }

  const handleOptionChange = (event) => {
    setNewCorrectAnswer(event.target.value);
  };
  const onSnackbarClose = () => {
    setSnackbar(false)
  }
  const onAlertClose = () => {
    setSnackbar(false)
  }
  const handleChipClick = (question) => {
    if (mode !== 'manual') {
      return
    }
    console.info('You clicked the Chip.', question);
    setQuestionId(question.question_id)
    setNewQuestion(question.question);
    question.options = typeof (question.options) == 'string' ? question.options.split(",") : question.options;
    setNewOption1(question.options[0]);
    setNewOption2(question.options[1]);
    setNewOption3(question.options[2]);
    setNewOption4(question.options[3]);
    var answer = null;
    if (question.answer) {
      switch (question.answer) {
        case question.options[0]: answer = 0; break;
        case question.options[1]: answer = 1; break;
        case question.options[2]: answer = 2; break;
        case question.options[3]: answer = 3; break;
      }
    } else {
      switch (question.correctAnswer) {
        case question.options[0]: answer = 0; break;
        case question.options[1]: answer = 1; break;
        case question.options[2]: answer = 2; break;
        case question.options[3]: answer = 3; break;
      }
    }
    setNewCorrectAnswer(answer)

  };

  const handleChipDelete = async (questionId) => {
    var response = await deleteQuestion(questionId);
    if (response) {
      showSnackBar("Question Deleted Successfully", "success")
      setQuestions(prevQuestions => prevQuestions.filter(q => q.question_id != questionId));

    } else {
      showSnackBar("Question Deletion Failed", "error")
    }
  };
  return (
    <div>

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
        <div style={{ width: '100%', marginLeft: "2rem", height: 'auto', display: 'flex', flexDirection: 'row', gap: '5px', flexWrap: 'wrap' }}>
          {
            questions.map(question1 => (<><Tooltip title={`Question:${question1.question},Answer:${question1.answer},options:${question1.options}`}>
              <Chip
                sx={{ maxWidth: '100px' }}
                label={question1.question}
                onClick={() => handleChipClick(question1)}
                color={question1.name ? 'primary' : 'success'}
                onDelete={() => handleChipDelete(question1.question_id)}
              />
            </Tooltip>
            </>
            ))
          }
        </div>
        <h3 style={{ marginLeft: "2rem", color: "#1c266e" }}>Add Questions </h3>
        <Box sx={{ width: 500, marginLeft: '30px', display: 'flex', flexDirection: 'row', gap: '20px' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Mode</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={mode}
              onChange={handleChange1}
              label="Age"

            >
              <MenuItem value={"manual"}>Manual</MenuItem>
              <MenuItem value={"json"}>Json</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Course</InputLabel>
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
          {
            mode === 'manual' &&
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Age"
                onChange={handleChange2}
              >
                <MenuItem value={"Q&A"}>Q&A</MenuItem>
                <MenuItem value={"multiple Choice single select"}>Multiple Choice And Single Select</MenuItem>
                <MenuItem value={"multiple Choice multiple select"}>Multiple Choice And Multiple Select</MenuItem>
                <MenuItem value={"true false"}>true and false</MenuItem>

              </Select>
            </FormControl>
          }

        </Box>
        <div className="QuestinSection">
          {
            mode === 'manual' && course != ''  ?
              // category == 'multiple Choice single select' ?
                <>

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
                      <Button className="AddButton" onClick={undo} variant="contained">
                        Undo
                      </Button>
                    </div>
                  </div>

                </>
                // <MultipleChoice checkbox={false} />
                // : category == 'multiple Choice multiple select' ?
                //   // <>
                //   //    <div className="EnterQuestions">
                //   //   <TextField
                //   //     required
                //   //     id="question"
                //   //     label="Question"
                //   //     value={newQuestion}
                //   //     onChange={(e) => setNewQuestion(e.target.value)}
                //   //     fullWidth
                //   //     margin="normal"
                //   //   />
                //   //   <TextField
                //   //     required
                //   //     id="option1"
                //   //     label="Option 1"
                //   //     value={newOption1}
                //   //     onChange={(e) => setNewOption1(e.target.value)}
                //   //     fullWidth
                //   //     margin="normal"
                //   //   />
                //   //   <TextField
                //   //     required
                //   //     id="option2"
                //   //     label="Option 2"
                //   //     value={newOption2}
                //   //     onChange={(e) => setNewOption2(e.target.value)}
                //   //     fullWidth
                //   //     margin="normal"
                //   //   />
                //   //   <TextField
                //   //     required
                //   //     id="option3"
                //   //     label="Option 3"
                //   //     value={newOption3}
                //   //     onChange={(e) => setNewOption3(e.target.value)}
                //   //     fullWidth
                //   //     margin="normal"
                //   //   />
                //   //   <TextField
                //   //     required
                //   //     id="option4"
                //   //     label="Option 4"
                //   //     value={newOption4}
                //   //     onChange={(e) => setNewOption4(e.target.value)}
                //   //     fullWidth
                //   //     margin="normal"
                //   //   />
                //   // </div>
                //   // <div className="CorrectAnswer">
                //   //   <FormControl component="fieldset" margin="normal">
                //   //     <FormLabel component="legend">Correct Answer</FormLabel>
                //   //     <RadioGroup
                //   //       aria-label="correct-answer"
                //   //       name="correct-answer"
                //   //       value={newCorrectAnswer}
                //   //       onChange={handleOptionChange}
                //   //     >
                //   //       <FormControlLabel
                //   //         value={0}
                //   //         control={<Checkbox />}
                //   //         label="Option 1"
                //   //       />
                //   //       <FormControlLabel
                //   //         value={1}
                //   //         control={<Checkbox />}
                //   //         label="Option 2"
                //   //       />
                //   //       <FormControlLabel
                //   //         value={2}
                //   //         control={<Checkbox />}
                //   //         label="Option 3"
                //   //       />
                //   //       <FormControlLabel
                //   //         value={3}
                //   //         control={<Checkbox />}
                //   //         label="Option 4"
                //   //       />
                //   //     </RadioGroup>
                //   //   </FormControl>
                //   //   <div className="ButtonGroup">
                //   //     <Button className="AddButton" onClick={handleAddQuestion} variant="contained">
                //   //       Add question
                //   //     </Button>
                //   //     <Button className="AddButton" onClick={undo} variant="contained">
                //   //       Undo
                //   //     </Button>
                //   //   </div>
                //   // </div>

                //   // </>
                //   <MultipleChoice checkbox={true} />
                //   : category == 'Q&A' ?
                //     <><QAndA /></> :
                //     <> <TrueFalse /></>
              :
              mode === 'json'  ?
                <div style={{ width: '100%', height: '200px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                  <label style={{ textAlign: 'center', border: '1px solid rgb(0,0,0,0.5', background: '#1976D2', borderRadius: '5px', color: 'white', padding: '5px 5px 5px 5px', cursor: 'pointer' }} for="img">Import .json File</label>
                  <input style={{ display: 'none' }} type='file' id='img' onChange={handleSubmit}>
                  </input>
                  <Button sx={{ marginLeft: 5 }} aria-describedby={id} variant="outlined" type="button" onMouseLeave={handleClick} onMouseEnter={handleClick}>
                    See Pattern
                  </Button>
                  <Popper id={id} open={open1} anchorEl={anchorEl}>
                    <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>

                      <text>
                        <br />
                        [<br />
                        &#123;<br />
                        question:What is Your Name,
                        <br />
                        answer:a,
                        <br />
                        options:[a,b,c,d]
                        <br />
                        &#125;,
                        <br />
                        &#123;<br />
                        question:What is his Name,
                        <br />
                        answer:b,
                        <br />
                        options:[a,b,c,d]
                        <br />
                        &#125;,
                        <br />
                        ...
                        <br />
                        ]
                      </text>

                    </Box>
                  </Popper>
                </div>
                : <></>
          }
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;
