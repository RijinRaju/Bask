import React,{useEffect,useState} from 'react'
import axios from 'axios'
import './CheckTask.css'
import Grid from '@mui/material/Grid'
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BatchPredictionIcon from "@mui/icons-material/BatchPrediction";
import Paper from "@mui/material/Paper";
import PersonIcon from "@mui/icons-material/Person";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import jwtDecode from 'jwt-decode';
import Button from '@mui/material/Button'
import Chip from "@mui/material/Chip";

function CheckTask() {


    const [listOpen, setListOpen] = useState(true);
    const [batch, setBatch] = useState([]);
    const [lst, setLst] = useState(0);
    const [students, setStudents] = useState([]);
    const [advStudents, setAdvStudents] = useState([]);
    const [lstWeeks, setLstWeeks] = useState([]);
    const [weeks, setWeeks] = useState([]);
    const [open, setOpen] = useState(false);
    const[user,setUser] = useState(0)
    const[stdId,setStdId] = useState(0)
    const[question,setQuestion] = useState([])
    const[verify,setVerify] = useState(false)


     !user && setUser(jwtDecode(localStorage.getItem("AdvisorToken")).user_id);

    useEffect(() => {
      axios.get("https://www.baskpro.online/admin/batch_list").then((res) => {
        setBatch(res.data);
      });

      axios.get("https://www.baskpro.online/admin/weeks").then((res) => {
        setLstWeeks(res.data);
      });
    }, [weeks]);

     const handleListClick = () => {
       setListOpen(!listOpen);
     };



  return (
    <div>
      <Typography>Task Verify</Typography>
      <Grid container>
        <Grid item xs={4} md={3} lg={3}>
          <List
            className="taskList !shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)] "
            sx={{
              bgcolor: "background.paper",
              height: "76vh",
              marginRight: "20px",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                STUDENTS
              </ListSubheader>
            }
          >
            {batch.map((batch) => (
              <>
                <ListItemButton
                  key={batch.id}
                  onClick={() => {
                    setLst(batch.id);
                    axios
                      .post("https://www.baskpro.online/advisor/std_mnfst", {
                        id: batch.id,
                        user: user,
                      })
                      .then((res) => {
                        console.log(res.data);
                        setAdvStudents(res.data);
                      });
                    handleListClick();
                  }}
                >
                  <ListItemIcon>
                    <BatchPredictionIcon />
                  </ListItemIcon>
                  <ListItemText primary={batch.Batch_name} />
                  {lst == batch.id ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse
                  in={lst == batch.id ? true : false}
                  timeout="auto"
                  unmountOnExit
                >
                  {advStudents.map((student) => (
                    <List component="div" disablePadding key={student.id}>
                      <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => {
                          setStdId(student.student.id);
                          axios
                            .post(
                              "https://www.baskpro.online/advisor/chk_task",
                              {
                                user: student.student.id,
                              }
                            )
                            .then((res) => {
                              console.log(res.data);
                              setWeeks(res.data);
                            });
                        }}
                      >
                        <ListItemIcon>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={student.student.first_name} />
                      </ListItemButton>
                    </List>
                  ))}
                </Collapse>
              </>
            ))}
          </List>
        </Grid>
        <Grid xs={12} md={8} lg={8}>
          <Paper
            className="!shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]"
            sx={{
              height: "76vh",
              overflowY: "scroll",
            }}
          >
            {weeks.map((week) => (
              <Accordion className="!shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Grid container>
                  <Grid item xs={6}>
                  <Typography>Week{week.question.week}</Typography>
                  </Grid>
                  <Grid item xs={5}>
                  {verify && week.status ? <Chip label="completed" variant="outlined" color="success" />:null}
                  </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  {week.question.task.map((ques) => (
                    <Typography>
                      {ques.id}
                      {" ."}
                      {ques.question}
                    </Typography>
                  ))}
                  <Typography>ANSWERS</Typography>
                  {week.answers.map((ans) => (
                    <Typography>
                      {ans.id}
                      {". "}
                      {ans.answers}
                    </Typography>
                  ))}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "end",
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="success"
                      size="small"
                      sx={{ mr: 2 }}
                      onClick={() => {
                        axios
                          .post(
                            "https://www.baskpro.online/advisor/task_verify",
                            {
                              task_id: week.id,
                            }
                          )
                          .then((res) => {
                            if(res.status == 200){
                              setVerify(true)
                            }
                          });
                      }}
                    >
                      completed
                    </Button>
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default CheckTask