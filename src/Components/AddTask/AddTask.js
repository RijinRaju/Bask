import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'
import './AddTask.css'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper'
import { InputLabel, Typography } from '@mui/material';
import axios from 'axios'
import Card from '@mui/material/Card'
import Select from '@mui/material/Select'
import { MenuItem } from '@mui/material';
import Stack from '@mui/material/Stack'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
function AddTask() {


  const navigate = useNavigate()
  const [domains, setDomains] = useState([])
  const [weeks, setWeek] = useState(0)
  const [domain, setDomain] = useState(0)

  useEffect(() => {
    let token = localStorage.getItem("adminToken").replaceAll('"', '')
    const data = {
      Authorization: `token ${token}`,
    };
    axios.get("https://www.baskpro.online/admin/domains", { headers: data }).then((res) => {
      setDomains(res.data);
    });
  }, []);


  const [questionField, setQuestionField] = useState([{
    question: '', id: ''
  }])

  const handleFormChange = (index, e) => {

    let data = [...questionField]

    data[e.target.name] = { question: e.target.value, id: parseInt(e.target.name) + 1 }
    setQuestionField(data)
  }

  const addField = () => {


    let newInputField = { question: '', id: '' }
    setQuestionField([...questionField, newInputField])

  }


  const questionSubmit = (e) => {
    e.preventDefault()
    console.log(weeks, domain)
    axios.post('https://www.baskpro.online/admin/add_task', {
      task: questionField,
      week: weeks,
      domain: domain,

    }).then((e) => {
      axios.post('https://www.baskpro.online/ws/notification/notify/').then((res) => {
        console.log(res.data)
      })
      navigate('/adm_home/task_view')
    })
    console.log(questionField)

  }

  return (
    <Grid container justify="center" spacing={3} component="form" onSubmit={(e) => questionSubmit(e)} >
      <span className="font-sans text-blue-700 font-semibold text-lg">CreateTask </span>

      <Grid item xs={12} md={3}>

        <Card
          elevation={3}
          sx={{
            mr: 6,
            display:'flex',
            justifyContent:'center',
            alignItems:'center'

          }}
          
        >
          <div className="card1_div">
            <label for="email-field" class="placeholder">Week </label>
            <Select
              className="week_selct"
              style={{ width: '100%', height: '3rem' }}
              value={weeks}
              onChange={(e) => setWeek(e.target.value)}
            >
              <MenuItem value={1}>week 1</MenuItem>
              <MenuItem value={2}>week 2</MenuItem>
              <MenuItem value={3}>week 3</MenuItem>
              <MenuItem value={4}>week 4</MenuItem>
              <MenuItem value={5}>week 5</MenuItem>
              <MenuItem value={6}>week 6</MenuItem>
              <MenuItem value={7}>week 7</MenuItem>
              <MenuItem value={8}>week 8</MenuItem>
              <MenuItem value={9}>week 9</MenuItem>
              <MenuItem value={10}>week 10</MenuItem>
              <MenuItem value={11}>week 11</MenuItem>
              <MenuItem value={12}>week 12</MenuItem>
              <MenuItem value={13}>week 13</MenuItem>
              <MenuItem value={14}>week 14</MenuItem>
              <MenuItem value={15}>week 15</MenuItem>
              <MenuItem value={16}>week 16</MenuItem>
              <MenuItem value={17}>week 17</MenuItem>
              <MenuItem value={18}>week 18</MenuItem>
              <MenuItem value={19}>week 19</MenuItem>
              <MenuItem value={20}>week 20</MenuItem>
              <MenuItem value={21}>week 21</MenuItem>
              <MenuItem value={22}>week 22</MenuItem>
              <MenuItem value={23}>week 23</MenuItem>
              <MenuItem value={24}>week 24 </MenuItem>

            </Select>


            <label for="email-field" class="placeholder">Domain</label>
            <Select
              style={{ width: '100%', height: '3rem' }}
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            >
              {domains.map((domain) => (
                <MenuItem value={domain.id}>{domain.title}</MenuItem>

              ))

              }
            </Select>

            <div className="crd_btn">
              <Button variant="contained" type="submit">Create</Button>
            </div>

          </div>

        </Card>
      </Grid>

      <Grid item xs={12} md={8}>
        <Paper style={{ overflow: 'auto', maxHeight: 500, backgroundColor: '#e6ddf9', }} elevation={3}>
          <Paper elevation={3} style={{ backgroundColor: '#1976d2' }}>

            <Button variant="contained" className="add_btn" onClick={addField}><AddCircleOutlineIcon /></Button>
          </Paper>
          {questionField.map((input, index) => {
            return (

              <div key={index}>

                <Stack direction="row">
                <Typography>{index + 1}.</Typography>
                <textarea
                  name={index}
                  style={{ backgroundColor: 'white', height: '10vh', border: 0 }}
                  defaultValue={input.question}
                  onChange={(e) => handleFormChange(index, e)}
                  className="qus_area"
                  cols="75"
                  rows="5"
                />
                </Stack>
              </div>
            )
          })
          }

        </Paper>


      </Grid>
      <Grid item sx={2}>

      </Grid>

    </Grid>

  )
}

export default AddTask