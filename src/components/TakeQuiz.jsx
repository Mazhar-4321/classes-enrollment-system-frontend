import * as React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { submitQuiz } from '../services/StudentService';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
let map = new Map()
export const TakeQuiz = (props) => {
    console.log(props.quiz)
    const [open, setOpen] = React.useState(true);
    const [number, setNumber] = React.useState(0)
    const [snackbarMessage, setSnackbarMessage] = React.useState('')
    const [snackbar, setSnackbar] = React.useState(false)
    const [snackbar1, setSnackbar1] = React.useState(true)
    const [backdrop, setBackdrop] = React.useState(false)
    const [questionSelected, setQuestionSelected] = React.useState(0)
    const [selected, setSelected] = React.useState(false)
    const [value, setValue] = React.useState(null)
    const [studentAnswers, setStudentAnswers] = React.useState(props.quiz)
    useEffect(() => {
        const newStudentAnswers = [];
        
        if(studentAnswers!=null)
        studentAnswers.forEach(q => {
            return {
                question_id: q.question_id,
                question: q.question,
                answer: null
            }
        })
        console.log(studentAnswers)
    }, [])

    const showMap = () => {
        console.log(map)
    }
    const getSelected = (event) => {
        console.log(event.target.value)
        const studentAnswersArray = [...studentAnswers];
        studentAnswersArray[questionSelected].answer = event.target.value;
        setStudentAnswers(studentAnswersArray)
        console.log(studentAnswersArray)
        setValue(studentAnswersArray[questionSelected].answer)


    }
    const [questions1, setQuestions1] = React.useState([{
        question: 'What is Your Name',
        answers: ['Mazhar', 'Ali', 'Syed Mazhar Ali', 'All of the Above']
    },
    {
        question: 'What is Your Home Town',
        answers: ['Mazhar', 'Ali', 'Syed Mazhar Ali', 'All of the Above']
    },
    {
        question: 'What is Your City Name',
        answers: ['Mazhar', 'Ali', 'Syed Mazhar Ali', 'All of the Above']
    }, {
        question: 'What is Your State Name',
        answers: ['Mazhar', 'Ali', 'Syed Mazhar Ali', 'All of the Above']
    }])
    const [questions, setQuestions] = React.useState(props.quiz)

    const getNextQuestion = () => {
        if (questionSelected < questions.length - 1) {
            setQuestionSelected(questionSelected + 1);
            setNumber(questionSelected + 1)
            setValue(studentAnswers[questionSelected + 1].answer)

        }
    }
    const getPreviousQuestion = () => {
        if (questionSelected > 0) {
            setQuestionSelected(questionSelected - 1)
            setValue(studentAnswers[questionSelected - 1].answer)
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        console.log(studentAnswers)
        setOpen(false);
    };
    const submitQuizHandle = async () => {
        setBackdrop(true);
       
        try {
            var quizResponse = await submitQuiz(props.courseId, studentAnswers);
            if (quizResponse) {
                //setBackdrop(false);
                setSnackbar(true)
                setSnackbarMessage('You Achieved:' + quizResponse.marks + " marks")
                setTimeout(() => {
                    setOpen(false)
                }, 1000)
                //setOpen(false);

            }
            console.log(quizResponse)
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <>
            <Snackbar open={snackbar} onClose={() => setSnackbar(false)} autoHideDuration={1000} >
                <Alert severity="info" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
           { props.quiz.length>0?<div>

                <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Quiz
                            </Typography>
                            <Button autoFocus variant='text' color="inherit" onClick={submitQuizHandle}>
                                Submit
                            </Button>
                        </Toolbar>
                    </AppBar>



                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Q{questionSelected + 1}){questions[questionSelected].question}</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            onClick={getSelected}
                            name="radio-buttons-group"
                            value={value}
                        >
                            <FormControlLabel value={questions[questionSelected].options.split(",")[0]} control={<Radio />} label={questions[questionSelected].options.split(",")[0]} />
                            <FormControlLabel value={questions[questionSelected].options.split(",")[1]} control={<Radio />} label={questions[questionSelected].options.split(",")[1]} />
                            <FormControlLabel value={questions[questionSelected].options.split(",")[2]} control={<Radio />} label={questions[questionSelected].options.split(",")[2]} />
                            <FormControlLabel value={questions[questionSelected].options.split(",")[3]} control={<Radio />} label={questions[questionSelected].options.split(",")[3]} />

                        </RadioGroup>
                    </FormControl>
                    <div>
                        <Button onClick={getPreviousQuestion}>Previous</Button>
                        <Button onClick={getNextQuestion}>Next</Button>
                    </div>

                </Dialog>
            </div>
            :
            <Snackbar open={snackbar1} onClose={() => setSnackbar1(false)} autoHideDuration={1000} >
                <Alert severity="info" sx={{ width: '100%' }}>
                   No Quiz Questions Available For This Course
                </Alert>
            </Snackbar>
}
        </>

    );
}