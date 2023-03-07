import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { w3cwebsocket as W3CWebsocket } from "websocket";
import Avatar from '@mui/material/Avatar'
import { createSearchParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Grid from "@mui/material/Grid";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import background from "../../Assests/chat/background.jpg"

import Typography from '@mui/material/Typography'
function Room(props) {


  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const clearText = useRef()

  const [student, setStudent] = useState([]);
  const [user, setUser] = useState(0);
  const [msg, setMsg] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [client,setClient] = useState({})
  const[allmsg,setAllMsg] = useState([])
  const[advisor,setAdvisor] = useState([])
  const[endUser,setEndUser] = useState(0)
  const[room_id,setRoomId] = useState(0)
  const[displayName,setDisplayName] = useState('')
  const[showReceiver,setShowReceiver] = useState(null)

  
  if(props.data === 'student'){
     !user &&  setUser(jwtDecode(localStorage.getItem("studentToken")).user_id);
     console.log(user)
  }
  else{
!user && setUser(jwtDecode(localStorage.getItem("AdvisorToken")).user_id);
console.log(user)

  }
  
  const DisplayChat = ()=>{
 axios
   .post("https://www.baskpro.online/advisor/chat_record", {
     sender: user,
     room_name: endUser,
   })
   .then((res) => {
     setAllMsg(res.data);
     console.log("set all messsages", res.data);
   });
  }

 const DisplayStudentChat = ()=>{
   axios
     .post("https://www.baskpro.online/advisor/chat_record", {
       sender: endUser,
       room_name: user,
     })
     .then((res) => {
       console.log(res.data);
       setAllMsg(res.data);
     });
 }


  useEffect(() => {
   
    axios
      .post("https://www.baskpro.online/advisor/chat_list", {
        id: user,
      })
      .then((res) => {
        setStudent(res.data);
        console.log(res.data)
      });
    if(props.data == "student"){
     axios
       .post("https://www.baskpro.online/adv_list", {
         id: user,
       })
       .then((res) => {
         setAdvisor(res.data);
       });
  }

  if (receiver === "") return;
    setClient(
      new W3CWebsocket(
        "wss://baskpro.online/ws/chat/" +
          receiver +
          "/" +
          user +
          "/" +
          endUser +
          "/"
      )
    );
    client.onopen = () => {
      console.log("ws open");
    };
    client.onclose = () => console.log("ws closed");

  }, [receiver]);

  
let sender = (e) => {
  client.send(JSON.stringify({ message: e.message }));
  console.log("message is send");

  client.onmessage = (e) => {
    const value = JSON.parse(e.data);
    DisplayChat()
    DisplayStudentChat()
    setMsg([...msg, value.message]);
    setShowReceiver(value.receiver)
    setRoomId(value.room);
    
  };

};



 
 

  return (
    <div>
      {/* chat room for advisors */}
      {props.data == "advisor" ? (
        <div>
          <Typography>Messages</Typography>
          <Grid container>
            <Grid item xs={3}>
              <Box sx={{ height: "80vh", backgroundColor: "white" }}>
                <Paper
                  sx={{ height: "80vh" }}
                  className="rounded-xl !shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]"
                >
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                      <ListSubheader component="div" id="nested-list-subheader">
                        students
                      </ListSubheader>
                    }
                  >
                    {student &&
                      student.map((student) => (
                        <Paper className="!shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]">
                          <ListItemButton
                            key={student.id}
                            onClick={(e) => {
                              setReceiver(student.student.id);
                              setDisplayName(student.student.first_name);
                              setEndUser(student.student.id);
                              setMsg("");
                              setAllMsg("");

                              DisplayChat();
                            }}
                          >
                            <ListItemIcon>
                              <Avatar
                                alt={
                                  student.student.first_name != null?
                                  student.student.first_name: null
                                }
                              ></Avatar>
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                student.student.first_name &&
                                student.student.first_name
                              }
                            />
                          </ListItemButton>
                        </Paper>
                      ))}
                  </List>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Paper
                component="form"
                sx={{ ml: 1, backgroundColor: "#F3EFE0" }}
                onSubmit={handleSubmit((e) => sender(e))}
                className="!shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]"
              >
                <Paper
                  sx={{
                    height: 40,
                  }}
                >
                  {receiver && (
                    <Stack direction="row">
                      <Avatar
                        alt={advisor.first_name}
                        sx={{
                          ml: 1,
                        }}
                      ></Avatar>
                      <Typography
                        sx={{
                          m: 1,
                        }}
                      >
                        {" "}
                        {displayName.toUpperCase()}
                      </Typography>
                    </Stack>
                  )}
                </Paper>
                <Paper
                  sx={{
                    height: "65vh",
                    overflowY: "scroll",
                  }}
                  className="!shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]"
                >
                  {allmsg ? (
                    allmsg.map((msg) =>
                      msg.sender.id == user ? (
                        <Box
                          key={msg.id}
                          sx={{
                            width: "40vh",
                            height: 50,
                            backgroundColor: "#B2B2B2",

                            borderRadius: "20px 20px 0px 20px",
                            mt: 2,
                            m: 3,
                            ml: 50,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {msg.message}
                        </Box>
                      ) : (
                        <Box
                          key={msg.id}
                          sx={{
                            width: "40vh",
                            height: 50,
                            backgroundColor: "#B2B2B2",
                            borderRadius: "20px 20px 0px 20px",
                            mt: 2,
                            m: 3,

                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {msg.message}
                        </Box>
                      )
                    )
                  ) : (
                    <Typography></Typography>
                  )}
                </Paper>
                <Stack
                  spacing={3}
                  sx={{ display: "flex", justifyContent: "end" }}
                  direction="row"
                >
                  <TextField
                    variant="standard"
                    name="message"
                    ref={clearText}
                    placeholder=" write something...."
                    style={{ width: "90vh", height: "5vh", margin: "2vh" }}
                    className="bg-gray-300 rounded-lg "
                    InputProps={{ disableUnderline: true }}
                    {...register("message", { required: true })}
                  />

                  {errors.message && <p></p>}
                  <Button type="submit">
                    <SendIcon />
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </div>
      ) : (
        // chat room for student
        <Grid container>
          <Grid item xs={12} md={3}>
            <Box sx={{ height: "80vh", backgroundColor: "white" }}>
              <Paper
                sx={{ height: "80vh" }}
                className="rounded-xl !shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]"
              >
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      ADVISORS
                    </ListSubheader>
                  }
                >
                  {advisor.map((advisor) => (
                    <Paper className="!shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]">
                      <ListItemButton
                        key={advisor.id}
                        onClick={(e) => {
                          setReceiver(user);
                          setDisplayName(advisor.first_name);
                          setEndUser(advisor.id);
                          setMsg("");
                          setAllMsg("");
                          DisplayStudentChat();
                        }}
                      >
                        <ListItemIcon>
                          <Avatar alt={advisor.first_name}></Avatar>
                        </ListItemIcon>
                        <ListItemText primary={advisor.first_name} />
                      </ListItemButton>
                    </Paper>
                  ))}
                </List>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Paper
              className="!shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]"
              component="form"
              sx={{ ml: 1 }}
              onSubmit={handleSubmit((e) => sender(e))}
            >
              <Paper
                sx={{
                  height: 40,
                }}
              >
                {receiver && (
                  <Stack direction="row">
                    <Avatar
                      alt={advisor.first_name}
                      sx={{
                        ml: 1,
                      }}
                    ></Avatar>
                    <Typography
                      sx={{
                        m: 1,
                      }}
                    >
                      {" "}
                      {displayName.toUpperCase()}
                    </Typography>
                  </Stack>
                )}{" "}
              </Paper>
              <Paper
                sx={{
                  height: "65vh",
                  overflowY: "scroll",
                }}
              >
                {allmsg &&
                  allmsg.map((msg) =>
                    msg.sender.id == user ? (
                      <Box
                        key={msg.id}
                        sx={{
                          width: "40vh",
                          height: 50,
                          backgroundColor: "#B2B2B2",
                          color: "white",
                          borderRadius: "20px 20px 20px 0px",
                          mt: 2,
                          m: 3,
                          ml: 60,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {msg.message}
                      </Box>
                    ) : (
                      <Box
                        key={msg.id}
                        sx={{
                          width: "40vh",
                          height: 50,
                          backgroundColor: "#b2b2b2",
                          color: "white",
                          borderRadius: "20px 20px 0px 20px",
                          mt: 2,
                          m: 3,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {msg.message}
                      </Box>
                    )
                  )}
              </Paper>
              <Stack
                spacing={3}
                sx={{ display: "flex", justifyContent: "end" }}
                direction="row"
              >
                <TextField
                  variant="standard"
                  name="message"
                  placeholder="write something...."
                  style={{ width: "90vh", height: "5vh", margin: "20px" }}
                  className="bg-gray-300 rounded-lg "
                  InputProps={{ disableUnderline: true }}
                  {...register("message", { required: true })}
                />

                {errors.message && <p></p>}
                <Button type="submit">
                  <SendIcon />
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default Room;
