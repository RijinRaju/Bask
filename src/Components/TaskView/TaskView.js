import React,{useEffect,useState} from 'react'
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from 'axios'
import Grid from '@mui/material/Grid'
import DeleteIcon from '@mui/icons-material/Delete';


function TaskView() {

const[task,setTask] = useState([])

const tasks=()=>{
  axios.post('http://127.0.0.1:8000/admin/task_view').then((res) => {

    setTask(res.data)
  })
}

  useEffect(() => {
   tasks()
  }, [])

  return (
    <div>
      <span className="font-sans text-blue-700 font-semibold text-lg">Week Tasks</span>
      {task.map((task) => (
        <Accordion
        className="!shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          > 
  
          <Grid container>
            <Grid item xs={6}>
           <Typography>week {task.week} </Typography>
           </Grid>
           <Grid item xs={3}>
            <Typography > {task.domain.title} </Typography>
            </Grid>
            <Grid item xs={3} >
              <button onClick={()=>{
                axios.post('http://127.0.0.1:8000/del_tsk',{
                  id:task.id
                }).then((e)=>{
                      tasks()
                })
              }}>
                <DeleteIcon/>
              </button>
            </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>

            {task?
              task.task.map((t) => {

                return <Typography>{t.id}. {t.question}</Typography>;
              })
              : "none"}

          </AccordionDetails>
        
        </Accordion>
      ))}

    </div>
  )
}

export default TaskView