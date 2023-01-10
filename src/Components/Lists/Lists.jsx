import React,{useEffect,useState} from 'react'
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from 'axios'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}


// Tab function


function Lists() {

    const [value, setValue] = React.useState(0);
 
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


  return (
    <div>
      <span className="font-sans text-blue-700 font-semibold text-lg">
       Pending Requests
      </span>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
        }}
        style={{
          height: "80vh",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: "divider",
          }}
        >
          <Tab
            label="Pending List"
            sx={{
              ":hover": {
                bgcolor: "#7602b6", // theme.palette.primary.main
                color: "white",
              },
            }}
            {...a11yProps(0)}
          />
         
        </Tabs>
        <TabPanel value={value} index={0}>
          <PendList />
        </TabPanel>
       
      </Box>
    </div>
  );
}

export default Lists

// pending list function

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PendList(){


  
 
  const [pendList,setPendList] = useState([])
  const [batch, setBatch] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = useState(0);
  const [selBatch,setSelBatch] = useState(0)
  const pendListFunction=()=>{
    
     axios.post("http://127.0.0.1:8000/admin/pend_list").then((res) => {
       setPendList(res.data);
       console.log(res.data);
     });
  }

  useEffect(()=>{
    pendListFunction()

  axios.get("http://127.0.0.1:8000/admin/batch_list").then((res) => {
    setBatch(res.data);
    console.log(res.data);
  });

  },[])

   

   const handleClickOpen = () => {
     setOpen(true);
   };

   const handleClose = () => {
     setOpen(false);
   };

   const handleDialogSubmit = (e)=>{
     axios.post('http://127.0.0.1:8000/admin/decline',{
       id:id
     }).then((res)=>{
           console.log(res.data)
           pendListFunction()
           
     })
     setOpen(false)
   }

  return (
    <div>
     
      {pendList ? (
        <TableContainer component={Paper}>
          <Typography ml={2}>
            <h3>New Applications</h3>
          </Typography>
          <Table
            sx={{ minWidth: 800, maxWidth: 900 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last NAME</TableCell>
                <TableCell align="center">EMAIL</TableCell>
                <TableCell align="center">Batch</TableCell>
                <TableCell align="center">Approve</TableCell>
                <TableCell align="center">Decline</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendList.map((list) => (
                <TableRow
                  key={list.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  
                >
                  <TableCell align="center">{list.first_name}</TableCell>
                  <TableCell align="center">{list.last_name}</TableCell>
                  <TableCell align="center">{list.email}</TableCell>
                  <TableCell align="center">
                    <Select
                      name="batch"
                      id="batch"
                      value={batch.id}
                      sx={{ input: { color: "white" } }}
                      InputLabelProps={{
                        style: { color: "#fff" },
                      }}
                     onChange={(e)=>setSelBatch(e.target.value)}
                    >
                      {batch.map((batch) => (
                        <MenuItem value={batch.id} key={batch.id}>
                          {batch.Batch_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={(res) => {
                        console.log(selBatch)
                        axios
                          .post(` http://127.0.0.1:8000/admin/approve_list`, {
                            student: list.id,
                            batch: selBatch,
                          })
                          .then((res) => {
                            pendListFunction();
                          });
                      }}
                    >
                      Approve
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={(e) => {
                        setId(list.id);
                        handleClickOpen();
                        // axios
                        //   .post("http://127.0.0.1:8000/admin/decline", {
                        //     id: list.id,
                        //   })
                        //   .then((e) => {

                        // });
                      }}
                      color="error"
                    >
                      Decline
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        // <img src={user} width='100' height='100' alt="img" />
        <Typography>No Records</Typography>
      )}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            confirm decline
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDialogSubmit}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function ApprovedList(){

  return (
    <div>
      <TableContainer component={Paper}>
        <Typography ml={2}>
          <h3>New Applications</h3>
        </Typography>
        <Table sx={{ minWidth: 800, maxWidth: 900 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last NAME</TableCell>
              <TableCell align="right">EMAIL</TableCell>
              <TableCell align="right">Approve</TableCell>
              <TableCell align="right">Decline</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          
              <TableRow
                
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    
                  >
                    Approve
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                   
                    color="error"
                  >
                    Decline
                  </Button>
                </TableCell>
              </TableRow>
        
          </TableBody>
        </Table>
      </TableContainer>
    
    </div>
  );
}



