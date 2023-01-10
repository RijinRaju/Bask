import React,{useState,useEffect} from 'react'
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import jwt_decode from 'jwt-decode'
import axios from 'axios';
import IconButton from "@mui/material/IconButton";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function Task() {

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [task,setTask] = useState([])
  const [length,setLength] = useState(1)
  const [user, setUser] = useState(() =>
    jwt_decode(localStorage.getItem("studentToken"))
  );
  const [answers,setAnswers] = useState([{
    answers:'',id:''
  }])

  console.log(Object.keys(task).length)

  const formChange =(index, e) =>{
        let data = [...answers]
        data[e.target.name] = {
          answers: e.target.value,
          id: parseInt(e.target.name) + 1,
        };
        setAnswers(data);

  }

  const addAnswer = ()=>{
    setLength(length+1)
    let newAnswer =  {answers:'',id:''}
    setAnswers([...answers, newAnswer])
    
  }


  const userDetails=()=>{
     
  }

useEffect(()=>{

userDetails()
axios.post('http://127.0.0.1:8000/task_view',{
  id:user.user_id
}).then((res)=>{
setTask(res.data)
})

},[])


const answerSubmit=(e,task)=>{
e.preventDefault()
  axios
    .post("http://127.0.0.1:8000/sub_answers", {
      question: task.id,
      answers: answers,
      user: user.user_id,
    })
    .then((res) => {
      console.log(res.data);
    });

}

  return (
    <div>
      {task.map((task) => (

        <Accordion>

          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>week {task.week} </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box component="form" onSubmit={(e)=>answerSubmit(e,task)}>
            {task.task.map((t) => {
                    
              return (

                <div>
                  <Typography>
                    <span style={{ color: "blue" }}> {t.id}.</span> {t.question}
                  </Typography>
                </div>
              );
            })}
            <Typography variant="h5">
              Answers{" "}
              {
               length < task.task.length?              
               <IconButton color="primary" aria-label="add answers" onClick={addAnswer}>
              < AddCommentIcon/>
              </IconButton>:null
              }

            </Typography>
            {answers.map((input, index) => (
              <>
                
                <Typography>{index + 1}.</Typography>
                <textarea
                  placeholder="write the answers here.."
                  name={index}
                  defaultValue={input.answers}
                  onChange={(e) => formChange(index, e)}
                  style={{
                    backgroundColor: "white",
                    height: "10vh",
                    border: 0,
                  }}
                  // onChange={(e) => handleFormChange(index, e)}
                  className="qus_area"
                  cols="110"
                  rows="5"
                />
                
              </>
            ))}
            <Button type="submit" id={task.id} >submit</Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default Task