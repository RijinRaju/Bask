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

function Room(props) {


  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [student, setStudent] = useState([]);
  const [user, setUser] = useState(0);
  const [msg, setMsg] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [client,setClient] = useState({})
  const[allmsg,setAllMsg] = useState([])
  const[advisor,setAdvisor] = useState([])
  const[suser,setSuser] = useState(0)

  !user && setUser(jwtDecode(localStorage.getItem("AdvisorToken")).user_id); 
  if(props.data === 'student'){
     !user &&  setUser(jwtDecode(localStorage.getItem("studentToken")).user_id);
     console.log(user)
  }
  


  useEffect(() => {
    axios.post("http://127.0.0.1:8000/advisor/chat_list", {
        id: user,
      })
      .then((res) => {
        setStudent(res.data);
      });


    axios.post("http://127.0.0.1:8000/adv_list",{
      id:user
    }).then((res)=>{
      setAdvisor(res.data)
    })

  if (receiver === "") return;
    setClient( new W3CWebsocket(
      "ws://127.0.0.1:8000/ws/chat/" + receiver + "/" + user + "/"
    )
    )
    client.onopen = () => {
      console.log("ws open");
    };
    client.onclose = () => console.log("ws closed");

  }, [receiver]);

  
let sender = (e) => {
  client.send(JSON.stringify({ message: e.message }));
  console.log("message is send");

  client.onmessage = (e)=>{
    const value = JSON.parse(e.data)
  console.log(value);
      setMsg([...msg,value.message])
  }
};



 
 

  return (
    <div>
      {/* chat room for advisors */}
      {props.data == "advisor" ? (
        <Grid container>
          <Grid item xs={3}>
            <Box sx={{ height: "80vh", backgroundColor: "white" }}>
              <Paper
                elevation={5}
                sx={{ height: "80vh" }}
                className="rounded-xl"
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
                  {student.map((student) => (
                    <ListItemButton
                      key={student.id}
                      onClick={(e) => {
                        setReceiver(student.student.id);
                        setMsg("");
                        axios
                          .post("http://127.0.0.1:8000/advisor/chat_record", {
                            sender: user,
                            room_name: student.student.id,
                          })
                          .then((res) => {
                            setAllMsg(res.data);
                            console.log(res.data);
                          });
                      }}
                    >
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary={student.student.first_name} />
                    </ListItemButton>
                  ))}
                </List>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Paper
              component="form"
              sx={{ ml: 1 }}
              onSubmit={handleSubmit((e) => sender(e))}
            >
              <Paper sx={{ height: "71vh", overflowY: "scroll" }}>
                {allmsg.map((msg) =>(
                  console.log(msg,"user",user),
                  msg.receiver !== user ? (
                    <Box
                      key={msg.id}
                      sx={{
                        width: 200,
                        height: 50,
                        backgroundColor: "#8b00f7",
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
                  ) : (
                    <Box
                      key={msg.id}
                      sx={{
                        width: 200,
                        height: 50,
                        backgroundColor: "gray",
                        borderRadius: "20px 20px 0px 20px",
                        mt: 2,
                        m: 3,
                        ml:50,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {msg.message}
                    </Box>
                  )
                ))}
                {msg != "" &&
                  msg.map((msg) => (
                    <Box
                      sx={{
                        width: 200,
                        height: 50,
                        backgroundColor: "#8b00f7",
                        borderRadius: "20px 20px 20px 0px",
                        mt: 2,
                        m: 3,
                        ml: 60,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {msg}
                    </Box>
                  ))}
              </Paper>
              <Stack
                spacing={3}
                sx={{ display: "flex", justifyContent: "end" }}
                direction="row"
              >
                <TextField
                  variant="standard"
                  name="message"
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
      ) : (
        // chat room for student
        <Grid container>
          <Grid item xs={3}>
            <Box sx={{ height: "80vh", backgroundColor: "white" }}>
              <Paper
                elevation={5}
                sx={{ height: "80vh" }}
                className="rounded-xl"
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
                      ADVISOR
                    </ListSubheader>
                  }
                >
                  {advisor.map((advisor) => (
                    <ListItemButton
                      key={advisor.id}
                      onClick={(e) => {
                        setReceiver(user);
                        setMsg("");
                        axios
                          .post("http://127.0.0.1:8000/advisor/chat_record", {
                            sender: advisor.id,
                            room_name: user,
                          })
                          .then((res) => {
                            console.log(res.data);
                            setAllMsg(res.data);
                          });
                      }}
                    >
                      <ListItemIcon>
                        <Avatar alt={advisor.first_name}></Avatar>
                      </ListItemIcon>
                      <ListItemText primary={advisor.first_name} />
                    </ListItemButton>
                  ))}
                </List>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Paper
              component="form"
              sx={{ ml: 1 }}
              onSubmit={handleSubmit((e) => sender(e))}
            >
              <Paper sx={{ height: "71vh", overflowY: "scroll" }}>
                {allmsg.map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      width: 200,
                      height: 50,
                      backgroundColor: "#8b00f7",
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
                ))}
                {msg != "" &&
                  msg.map((msg) => (
                    <Box
                      sx={{
                        width: 200,
                        height: 50,
                        backgroundColor: "#8b00f7",
                        borderRadius: "20px 20px 20px 0px",
                        mt: 2,
                        m: 3,
                        ml: 60,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {msg}
                    </Box>
                  ))}
              </Paper>
              <Stack
                spacing={3}
                sx={{ display: "flex", justifyContent: "end" }}
                direction="row"
              >
                <TextField
                  variant="standard"
                  name="message"
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
      )}
    </div>
  );
}

export default Room;
