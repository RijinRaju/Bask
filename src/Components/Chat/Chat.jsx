import React,{useState,useEffect,useRef} from 'react'
import {w3cwebsocket as W3CWebsocket} from 'websocket'
import {useNavigate,useLocation,useSearchParams,useParams} from 'react-router-dom'
import Button from '@mui/material/Button'
import TextField from'@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardHeader from'@mui/material/CardHeader'

function Chat() {

  const client = useRef(null)
  const [msg,setMsg] = useState([])
  const[value,setValue] = useState('')

// const {room} = useParams

  const location = useLocation()
  const searchParams  = useSearchParams()
  const {room,name} = Object.fromEntries([...searchParams])
  const navigate = useNavigate()
  
  
  useEffect(()=>{
    if(!location.search){
      navigate('/')
    }
  },[location,navigate])

  useEffect(()=>{
    if(room === "") return ;
    client.current = new W3CWebsocket('ws://127.0.0.1:8000/ws/chat'+room+'/')
    client.current.onopen = () => console.log("ws opened")
    client.current.onclose = () => console.log("ws closed")
    
    return () =>{
      if(client.current){
        client.current.close()
      }
    }
  },[room])


  useEffect(()=>{
    if(!client.current) return;

    client.current.onmessage = (message)=>{
      const data = JSON.parse(message.data)
      console.log('got replay')
      setMsg(m=>[
        ...m,{
          msg: data.msg,
          name: data.name
        }
      ])
    }
  },[])

  const sendMessageHandler=(e)=>{


    e.preveventDefault()
    if(!client.current ){
      console.log('no connection is extablished');
      return 
    }
    client.current.send(
      JSON.stringify({
        type:'message',
        message:value,
        name:name
      })
    )
    setValue('')
  }

  return (
    <div>
      Room Name:{room}
      {msg.map((msg,index) => (
        <Card key={index}>
          <CardHeader
            avatar={<Avatar >R</Avatar>}
            title={msg.name}
            subheader={msg.msg}
          />
        </Card>
      ))}

      <form onValidate onSubmit={sendMessageHandler}>
        <TextField
        label="enter"
        variant="outlined"
        value={value}
        fullwidth
        onChange={(e)=>{setValue(e.target.value)}}
        />
  <Button
  type="submit"
  fullwidth
  variant="contained"
  color="primary"
  >
    send
  </Button>
        

      </form>
    </div>
  );
}

export default Chat
