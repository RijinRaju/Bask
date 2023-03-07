import React, { useState, useEffect } from "react";
import "./Manifest.css";
import Grid from "@mui/material/Grid";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BatchPredictionIcon from "@mui/icons-material/BatchPrediction";
import Paper from "@mui/material/Paper";
import PersonIcon from "@mui/icons-material/Person";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import jwtDecode from "jwt-decode";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import MuiAlert from "@mui/material/Alert";
import SnackBar from '../SnackBar/SnackBar'

function Manifests(props) {
  const [listOpen, setListOpen] = useState(true);
  const [batch, setBatch] = useState([]);
  const [lst, setLst] = useState(0);
  const [students, setStudents] = useState([]);
  const [advStudents, setAdvStudents] = useState([]);
  const [user, setUser] = useState(0);
  const [open, setOpen] = useState(false);
  const [weeks, setWeeks] = useState([]);
  const [stdid, setStdId] = useState(0);
  const [weekId, setWeekId] = useState(0);
  const [lstWeeks, setLstWeeks] = useState([]);
  const [exManifest, setExManifests] = useState([]);
  const [forms, setForms] = useState({});
  const[snackOpen,setSnackOpen] = useState(null)

  const formchange = (e) => {
    const { name, value } = e.target;
    if (value != "") {
      setForms((forms) => ({ ...forms, [name]: value }));
    }
  };

  useEffect(() => {
    localStorage.getItem("AdvisorToken") &&
      setUser(jwtDecode(localStorage.getItem("AdvisorToken")).user_id);

    axios.get("https://www.baskpro.online/admin/batch_list").then((res) => {
      setBatch(res.data);
    });

    axios.get("https://www.baskpro.online/admin/weeks").then((res) => {
      setLstWeeks(res.data);
    });
  }, []);

  const listManifests = () => {
    axios
      .post("https://www.baskpro.online/advisor/manifest", {
        user: stdid,
      })
      .then((res) => {
        console.log(res.data);
        setWeeks(res.data);
      });
  };

  const manSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://www.baskpro.online/advisor/upd_mnfst", {
        week: weekId,
        status: forms.status,
        week_task: forms.week_task,
        updates: forms.updates,
        reviewer_name: forms.reviewer_name,
        advisor_name: forms.advisor_name,
        extra_workouts: forms.extra_workouts,
        english_review: forms.english_review,
        total: forms.total,
        star: forms.star,
        user: stdid,
      })
      .then((res) => {
        setSnackOpen("Manifest is Updated");
        setWeeks(res.data);
        listManifests();
      });
  };

  const createManifest = (e) => {
    e.preventDefault();
    console.log(forms);

    axios
      .post("https://www.baskpro.online/advisor/upd_mnfst", {
        week: forms.week_select,
        status: forms.status,
        week_task: forms.week_task,
        updates: forms.updates,
        reviewer_name: forms.reviewer_name,
        advisor_name: forms.advisor_name,
        extra_workouts: forms.extra_workouts,
        english_review: forms.english_review,
        total: forms.total,
        star: forms.star,
        user: stdid,
      })
      .then((res) => {
        setSnackOpen("Manifest is created");
        setWeeks(res.data);
        listManifests();
      });
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleListClick = () => {
    setListOpen(!listOpen);
  };

  return (
    <div>
      {snackOpen && (
        <SnackBar snack={true} msg={snackOpen} setSnackOpen={setSnackOpen} />
      )}

      {props.data === "advisor" ? (
        <Grid container>
          <Typography>Manifest</Typography>
          <Grid item xs={12} sm={12} md={5}>
            <List
              sx={{ width: "90%", bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              className="!shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)] manifest_list"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Advisors
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
                            listManifests();
                          }}
                        >
                          <ListItemIcon>
                            <PersonIcon />
                          </ListItemIcon>
                          <ListItemText primary={student.student.first_name} />
                          <Chip
                            label="CREATE"
                            variant="outlined"
                            style={{
                              backgroundColor: "#0a66c2",
                              color:'white',
                              border:0,
                            }}
                            onClick={handleClickOpen}
                          />
                        </ListItemButton>
                      </List>
                    ))}
                  </Collapse>
                </>
              ))}
            </List>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            style={{
              height: "75vh",
              overflow: "auto",
              marginTop: "4px",
            }}
          >
            <Paper className="!shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]">
              {weeks &&
                weeks.map((week) => (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      onClick={() => {
                        setWeekId(week.week.id);
                      }}
                    >
                      <Grid container>
                        <Grid item xs={7}>
                          <Typography>{week.week.week}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography>
                            {weeks[0].status === "1" ? (
                              <Chip
                                label="Task completed"
                                variant="outlined"
                                style={{ backgroundColor: "green" }}
                              />
                            ) : weeks[0].status === "2" ? (
                              <Chip
                                label="Task need improvement"
                                variant="outlined"
                                style={{ backgroundColor: "yellow" }}
                              />
                            ) : weeks[0].status === "3" ? (
                              <Chip
                                label="Task critical"
                                variant="outlined"
                                style={{ backgroundColor: "orange" }}
                              />
                            ) : weeks[0].status === "4" ? (
                              <Chip
                                label="Task not Completed"
                                variant="outlined"
                                style={{ backgroundColor: "red" }}
                              />
                            ) : (
                              <Chip
                                label="Review Postponed"
                                variant="outlined"
                                style={{ backgroundColor: "blue" }}
                              />
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>MANIFEST</Typography>
                      <Box component="form" onSubmit={manSubmit}>
                        <FormControl component="fieldset">
                          <FormGroup row style={{ width: 200 }}>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              className="status_selec"
                              name="status"
                              defaultValue={week ? week.status : ""}
                              onChange={formchange}
                              sx={{ m: 1 }}
                            >
                              <MenuItem value={1}>Task Completed</MenuItem>
                              <MenuItem value={2}>
                                Task need Improvement
                              </MenuItem>
                              <MenuItem value={3}>Task critical</MenuItem>
                              <MenuItem value={4}>Task not Completed</MenuItem>
                              <MenuItem value={5}>Review Postpond</MenuItem>
                            </Select>
                            <InputLabel id="demo-simple-select-label">
                              Status
                            </InputLabel>
                          </FormGroup>

                          <FormGroup row>
                            <TextField
                              id="outlined-multiline-flexible"
                              helperText="Project Updates"
                              name="updates"
                              multiline
                              maxRows={10}
                              style={{ width: 210 }}
                              defaultValue={week ? week.updates : ""}
                              onChange={formchange}
                              sx={{
                                mt: 1,
                                m: 1,
                              }}
                            />
                            <TextField
                              id="outlined-multiline-flexible"
                              helperText="Week Tasks"
                              multiline
                              name="week_task"
                              maxRows={10}
                              sx={{
                                mt: 1,
                                m: 1,
                              }}
                              style={{ width: 210 }}
                              defaultValue={week ? week.week_task : ""}
                              onChange={formchange}
                            />
                            <TextField
                              sx={{
                                mt: 1,
                                m: 1,
                              }}
                              id="outlined-required"
                              helperText="Reviewer Name"
                              name="reviewer_name"
                              defaultValue={week ? week.reviewer_name : ""}
                              onChange={formchange}
                            />
                            <TextField
                              sx={{
                                mt: 1,
                                m: 1,
                              }}
                              id="outlined-required"
                              helperText="Advisor Name"
                              name="advisor_name"
                              defaultValue={week ? week.advisor_name : ""}
                              onChange={formchange}
                            />
                            <TextField
                              sx={{
                                mt: 1,
                                m: 1,
                              }}
                              id="outlined-required"
                              helperText="Extra Workeout Review"
                              name="extra_workouts"
                              defaultValue={week ? week.extra_workouts : ""}
                              onChange={formchange}
                            />
                            <TextField
                              sx={{
                                mt: 1,
                                m: 1,
                              }}
                              id="outlined-required"
                              helperText="English Review"
                              name="english_review"
                              defaultValue={week ? week.english_review : ""}
                              onChange={formchange}
                            />
                            <TextField
                              sx={{
                                mt: 1,
                                m: 1,
                              }}
                              id="outlined-required"
                              helperText="Score"
                              name="total"
                              defaultValue={week ? week.total : ""}
                              onChange={formchange}
                            />
                            <TextField
                              sx={{
                                mt: 1,
                                m: 1,
                              }}
                              id="outlined-required"
                              helperText="Star"
                              name="star"
                              defaultValue={week ? week.star : ""}
                              onChange={formchange}
                            />
                          </FormGroup>
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{ m: 1 }}
                          >
                            Update
                          </Button>
                        </FormControl>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </Paper>
          </Grid>
        </Grid>
      ) : (
        //  manifest view in admin side.........
        <div>
          <span className="font-sans text-blue-700 font-semibold text-lg">
            Manifests{" "}
          </span>
          <Grid container>
            <Grid item xs={4}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
                className="!shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]"
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Batches
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
                          .post("https://www.baskpro.online/admin/stud_lst", {
                            id: batch.id,
                          })
                          .then((res) => {
                            console.log(res.data);
                            setStudents(res.data);
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
                      {students.map((student) => (
                        <List component="div" disablePadding key={student.id}>
                          <ListItemButton
                            sx={{ pl: 4 }}
                            onClick={() => {
                              setStdId(student.student.id);
                              axios
                                .post(
                                  "https://www.baskpro.online/advisor/manifest",
                                  {
                                    user: student.student.id,
                                  }
                                )
                                .then((res) => {
                                  setWeeks(res.data);
                                });
                            }}
                          >
                            <ListItemIcon>
                              <PersonIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={student.student.first_name}
                            />
                          </ListItemButton>
                        </List>
                      ))}
                    </Collapse>
                  </>
                ))}
              </List>
            </Grid>
            <Grid item xs={7}>
              <Paper
                className="!shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]"
                sx={{
                  height: "80vh",
                  // overflowY: "scroll",
                }}
              >
                {weeks.map((week) => (
                  <Accordion className="!shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      onClick={() => {
                        setWeekId(week.id);
                      }}
                    >
                      <Grid container>
                        <Grid item xs={7}>
                          <Typography>{week.week.week}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography>
                            {weeks[0].status === "1" ? (
                              <Chip
                                label="Task completed"
                                variant="outlined"
                                style={{
                                  backgroundColor: "green",
                                  color: "white",
                                }}
                              />
                            ) : weeks[0].status === "2" ? (
                              <Chip
                                label="Task need improvement"
                                variant="outlined"
                                style={{
                                  backgroundColor: "yellow",
                                  color: "white",
                                }}
                              />
                            ) : weeks[0].status === "3" ? (
                              <Chip
                                label="Task critical"
                                variant="outlined"
                                style={{ backgroundColor: "orange" }}
                              />
                            ) : weeks[0].status === "4" ? (
                              <Chip
                                label="Task not Completed"
                                variant="outlined"
                                style={{ backgroundColor: "red" }}
                              />
                            ) : (
                              <Chip
                                label="Review Postponed"
                                variant="outlined"
                                style={{ backgroundColor: "blue" }}
                              />
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* <Typography>MANIFEST</Typography> */}
                      <Box component="form" onSubmit={manSubmit}>
                        <FormControl component="fieldset">
                          <FormGroup row style={{ width: 200 }}>
                            <Select
                              disabled
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              className="status_selec"
                              name="status"
                              defaultValue={week ? week.status : ""}
                              onChange={formchange}
                              sx={{ m: 1 }}
                              size="small"
                            >
                              <MenuItem value={1}>Task Completed</MenuItem>
                              <MenuItem value={2}>
                                Task need Improvement
                              </MenuItem>
                              <MenuItem value={3}>Task critical</MenuItem>
                              <MenuItem value={4}>Task not Completed</MenuItem>
                              <MenuItem value={5}>Review Postpond</MenuItem>
                            </Select>
                            <InputLabel id="demo-simple-select-label">
                              Status
                            </InputLabel>
                          </FormGroup>

                          <FormGroup row>
                            <TextField
                              disabled
                              id="outlined-multiline-flexible"
                              helperText="Project Updates"
                              name="updates"
                              multiline
                              maxRows={10}
                              style={{ width: 210 }}
                              defaultValue={week ? week.updates : ""}
                              onChange={formchange}
                              sx={{
                                mt: 1,
                                m: 1,
                              }}
                              size="small"
                            />
                            <TextField
                              disabled
                              id="outlined-multiline-flexible"
                              helperText="Week Tasks"
                              multiline
                              name="week_task"
                              maxRows={10}
                              sx={{
                                mt: 1,
                                m: 1,
                              }}
                              size="small"
                              style={{ width: 210 }}
                              defaultValue={week ? week.week_task : ""}
                              onChange={formchange}
                            />
                            <TextField
                              disabled
                              sx={{
                                mt: 1,
                                m: 1,
                              }}
                              id="outlined-required"
                              helperText="Reviewer Name"
                              name="reviewer_name"
                              defaultValue={week ? week.reviewer_name : ""}
                              onChange={formchange}
                              size="small"
                            />
                            <TextField
                              disabled
                              sx={{
                                mt: 1,
                                m: 1,
                              }}
                              id="outlined-required"
                              helperText="Advisor Name"
                              name="advisor_name"
                              defaultValue={week ? week.advisor_name : ""}
                              onChange={formchange}
                              size="small"
                            />
                            <TextField
                              disabled
                              sx={{
                                mt: 1,
                                m: 1,
                              }}
                              id="outlined-required"
                              helperText="Extra Workeout Review"
                              name="extra_workouts"
                              defaultValue={week ? week.extra_workouts : ""}
                              onChange={formchange}
                              size="small"
                            />
                            <TextField
                              disabled
                              sx={{
                                mt: 1,
                                m: 1,
                              }}
                              id="outlined-required"
                              helperText="English Review"
                              name="english_review"
                              defaultValue={week ? week.english_review : ""}
                              onChange={formchange}
                              size="small"
                            />
                            <TextField
                              disabled
                              sx={{
                                mt: 1,
                                m: 1,
                              }}
                              id="outlined-required"
                              helperText="Score"
                              name="total"
                              defaultValue={week ? week.total : ""}
                              onChange={formchange}
                              size="small"
                            />
                            <TextField
                              disabled
                              sx={{
                                mt: 1,
                                m: 1,
                              }}
                              id="outlined-required"
                              helperText="Star"
                              name="star"
                              defaultValue={week ? week.star : ""}
                              onChange={formchange}
                              size="small"
                            />
                          </FormGroup>
                        </FormControl>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </div>
      )}

      {/* dialog box for manifest updation */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={createManifest}>
            <FormControl component="fieldset">
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  className="status_selec"
                  name="status"
                  defaultValue={forms.status}
                  onChange={formchange}
                  sx={{ ml: 1 }}
                  size="small"
                >
                  <MenuItem value={1}>Task Completed</MenuItem>
                  <MenuItem value={2}>Task need Improvement</MenuItem>
                  <MenuItem value={3}>Task critical</MenuItem>
                  <MenuItem value={4}>Task not Completed</MenuItem>
                  <MenuItem value={5}>Review Postpond</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Week
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  label="Week"
                  name="week_select"
                  id="weeks"
                  className="week_select"
                  style={{ width: "20rem", height: "3rem" }}
                  sx={{ m: 1 }}
                  value={forms.week}
                  onChange={formchange}
                  size="small"
                >
                  {lstWeeks.map((week) => (
                    <MenuItem value={week.id} key={week.id}>
                      {week.week}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormGroup row>
                <TextField
                  id="outlined-multiline-flexible"
                  helperText="Project Updates"
                  name="updates"
                  multiline
                  maxRows={10}
                  style={{ width: 210 }}
                  defaultValue={forms.project_updates}
                  onChange={formchange}
                  sx={{
                    mt: 1,
                    m: 1,
                  }}
                  size="small"
                />
                <TextField
                  id="outlined-multiline-flexible"
                  helperText="Week Tasks"
                  multiline
                  name="week_task"
                  maxRows={10}
                  sx={{
                    mt: 1,
                    m: 1,
                  }}
                  style={{ width: 210 }}
                  defaultValue={forms.week_task}
                  onChange={formchange}
                  size="small"
                />
                <TextField
                  sx={{
                    mt: 1,
                    m: 1,
                  }}
                  id="outlined-required"
                  helperText="Reviewer Name"
                  name="reviewer_name"
                  defaultValue={forms.reviewer_name}
                  onChange={formchange}
                  size="small"
                />
                <TextField
                  sx={{
                    mt: 1,
                    m: 1,
                  }}
                  id="outlined-required"
                  helperText="Advisor Name"
                  name="advisor_name"
                  defaultValue={forms.advisor_name}
                  onChange={formchange}
                  size="small"
                />
                <TextField
                  sx={{
                    mt: 1,
                    m: 1,
                  }}
                  id="outlined-required"
                  helperText="Extra Workeout Review"
                  name="extra_workouts"
                  defaultValue={forms.extra_workouts}
                  onChange={formchange}
                  size="small"
                />
                <TextField
                  sx={{
                    mt: 1,
                    m: 1,
                  }}
                  id="outlined-required"
                  helperText="English Review"
                  name="english_review"
                  defaultValue={forms.english_review}
                  onChange={formchange}
                  size="small"
                />
                <TextField
                  sx={{
                    mt: 1,
                    m: 1,
                  }}
                  id="outlined-required"
                  helperText="Score"
                  name="total"
                  type="number"
                  defaultValue={forms.total}
                  onChange={formchange}
                  size="small"
                />
                <TextField
                  sx={{
                    mt: 1,
                    m: 1,
                  }}
                  id="outlined-required"
                  helperText="Star"
                  name="star"
                  type="number"
                  defaultValue={forms.star}
                  onChange={formchange}
                  size="small"
                />
              </FormGroup>
              <Button type="submit" variant="contained" sx={{ m: 1 }}>
                Update
              </Button>
              <Button onClick={handleClose} variant="outlined" sx={{ m: 1 }}>
                Cancel
              </Button>
            </FormControl>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Manifests;
