import React, { useEffect, useState } from "react";
import { deleteCourse, getMyCourses } from "../services/AdminService";
import Grid from '@mui/material/Grid';
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import "../css/RemoveCourse.css"
import Flip from 'react-reveal/Flip';


export const RemoveCourse = () => {
    const [courses, setCourses] = useState([])
    useEffect(() => {
        const dbCall = async () => {
            try {
                var response = await getMyCourses()
                console.log("response bhaya", response)
                setCourses(response)
            } catch (err) {
                console.log("err", err)
            }
        }
        dbCall()
    }, [])

    const deleteCourses = async (id) => {
        // console.log(id);
        // console.log(courses.filter(e => e.c_id != id))
        try {
            var response = await deleteCourse(id);
            if (response) {
                setCourses(courses.filter(e => e.c_id != id))
            }
        } catch (err) {

        }
    }
    return (
        <div>
            <div className="originRemoveCourse">
            <Grid container spacing={2}>

                {
                    courses.map(e => {
                        return (
                            <Grid  sx={{marginLeft : "50px"}} item xs={2.4}>
                                        <Flip left>
                                <div style={{ cursor: 'pointer' , backgroundColor : " #F2F5F5" }} className="card" >
                                    <div className="card-image" >
                                        <img className="card-image-display" src={'https://www.shutterstock.com/image-vector/open-book-vector-clipart-silhouette-260nw-795305758.jpg'} onError={() => 'src=https://public-v2links.adobecc.com/d096df37-ca37-4026-553f-8cfa6bec09ec/component?params=component_id%3A634ba680-536e-4b6f-b4a3-41986b9b22f5&params=version%3A0&token=1679461552_da39a3ee_5b75718b73ea33c3022cbe352cbeb9bcb66597f0&api_key=CometServer1'} />
                                        <IconButton className="cancelMark">
                                            <CloseIcon className="mark" onClick={() => deleteCourses(e.c_id)} />
                                        </IconButton>

                                    </div>

                                    <div style={{ height: '37%', width: '100%', marginLeft: '10px', marginBottom: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', rowGap: '2' }}>
                                        <div style={{ color: '#0A0102', marginLeft: '0px', fontSize: '14px' }}><span>Course Name : {e.name}</span></div>

                                        <div style={{ color: '#878787', fontSize: '10px', marginLeft: '0px', marginBottom: '5px' }}><span>Instructor Name : {e.instructor}</span></div>
                                        <div style={{ color: '#878787', fontSize: '10px', marginLeft: '0px', marginBottom: '5px' }}><span>Last Date To Enroll :{e.lastDate}</span></div>

                                        <div>
                                            <span style={{ marginTop: '5px', padding: '3px 7px 3px 7px', fontSize: '10px', textAlign: 'center', width: '14px', height: '13px', background: 'green', color: 'white' }}>Duration:{e.duration}hrs approx.</span  >
                                        </div>
                                        <div style={{ marginTop: '5px', }}><span style={{ fontSize: '12px' }}>Seats Left:{e.seatsLeft} </span></div>
                                    </div>
                                </div>
                                </Flip>
                            </Grid>
                        )
                    })
                }
            </Grid>
            </div>
        </div>
<<<<<<< Updated upstream
    )
}
=======
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

            //   </div>

            // </>
            :
            mode === 'json' && course != '' ?
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




>>>>>>> Stashed changes
