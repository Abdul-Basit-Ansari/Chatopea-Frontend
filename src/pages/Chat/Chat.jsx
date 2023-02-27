import { useState, useContext, useEffect, useRef } from "react";
import { Typography, Box, Divider } from "@mui/material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { TextField, Avatar, Fab } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { GlobalContext } from "../../context/context";
import axios from "axios";
import { useParams, Link, useLocation } from "react-router-dom";
import moment from "moment";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';


const Chat = () => {
  const { id } = useParams();
  const location = useLocation();
  let [msgVal, setmsgVal] = useState("");
  let [rendMsg, setRendMsg] = useState(0);
  let [users, setUsers] = useState({});
  let [chatUser, setChatUser] = useState({});
  let [msgs, setMsgs] = useState({});
  let { state } = useContext(GlobalContext);
  const messagesRef = useRef(null);

  const sendMsg = async (e) => {
    e.preventDefault();
    if (msgVal) {
      try {
        let response = await axios.post(
          `${state.baseUrl}/chat/`,
          {
            message: msgVal,
            seen: false,
            is_delete: false,
            receiver_id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${state.loginToken}`,
            },
          }
        );
        setRendMsg(+1);
        if (response.status === 200) {
          setmsgVal("");
        }
      } catch (error) {
        console.error("There was an error!", error);
      }
    } else {
      //pass
    }
  };
  const handleMsg = (e) => {
    setmsgVal(e.target.value);
  };
  const getChatUser = async () => {
    await axios
      .get(`${state.baseUrl}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${state.loginToken}`,
        },
      })

      .then((res) => {
        const user = res.data;
        setChatUser(user);
      })
      .catch((err) => console.error(err));
  };
  const getUsers = async () => {
    await axios
      .get(`${state.baseUrl}/users/`, {
        headers: {
          Authorization: `Bearer ${state.loginToken}`,
        },
      })

      .then((res) => {
        const userList = res.data;
        setUsers(userList);
      })
      .catch((err) => console.error(err));
  };
  const getMsgs = async () => {
    await axios
      .get(`${state.baseUrl}/chat/${id}/`, {
        headers: {
          Authorization: `Bearer ${state.loginToken}`,
        },
      })

      .then((res) => {
        const msgList = res.data;
        setMsgs(msgList);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getChatUser();
    getMsgs();
    let elem = document.getElementById("msgBox");
    elem.scrollIntoView({ behavior: "auto" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgVal, rendMsg, location]);

  let keys1 = [1, 3, 6, 12, 17, 27, 25, 24];
  let keys2 = [0, 2, 8, 14, 19, 26, 22, 28];
  let keys3 = [4, 10, 9, 16, 18, 21, 25, 30];
  let keys4 = [5, 7, 11, 15, 20, 13, 23, 29];

  return (
    <Box
      sx={{
        height: "100vh",
        flexGrow: 0,
        backgroundColor: "#f0f2f5",
        display: "flex", 
      }}
    >




        {/* Users */}
        <Box
          sx={{
            flexDirection: 'column',
            height: '100vh',
            maxHeight: '100vh',
            width: { xxl: "30%", xl: "40%", lg: "50%" },
            display: { lg: "flex", xs: "none" },
            borderRight: "1px solid #f0f2f5",
          }}
        >
          <List sx={{  flexShrink: 0,borderRight:"1px solid #80808029" }}>
            <ListItem>
              <ListItemIcon>
                <Avatar
                  sx={{ bgcolor: "purple" }}
                  alt={state.user.fullname.charAt(0).toUpperCase()}
                >
                  {state.user.fullname.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemIcon>
              <ListItemText primary={state.user.fullname}></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Box style={{ padding: "10px" ,flexShrink: 0 ,backgroundColor: "#ffffff"}}>
            <TextField
              sx={{ backgroundColor: "#f0f2f5" }}
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Divider />
          <List id="chatUserList" sx={{ height: "80vh",backgroundColor:"#FFF", overflowY: "auto" ,flexShrink: 1}}>
            {users.length > 1
              ? users.map((user, index) => (
                <>
                  <Link
                    to={`/${user.id}/`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <ListItem key={index}>
                      <ListItemIcon>
                        <Avatar
                          alt={user.fullname.charAt(0).toUpperCase()}
                          sx={{
                            bgcolor: keys1.includes(index)
                              ? "blue"
                              : keys2.includes(index)
                              ? "red"
                              : keys3.includes(index)
                              ? "brown"
                              : keys4.includes(index)
                              ? "pink"
                              : "cyan",
                          }}
                        >
                          {user.fullname.charAt(0).toUpperCase()}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText primary={user.fullname}></ListItemText>
                      <ListItemText
                        sx={{ fontSize: "7px" }}
                        secondary={user.username}
                        align="right"
                      ></ListItemText>

                    </ListItem>
                  </Link>
                  <Divider sx={{ml:"20%",opacity:".5",width:"80%"}}/>
                </>
                ))
              : ""}
          </List>
        </Box>









        
        {/* Chat */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            maxHeight: "100vh",
            backgroundColor: "#f0f2f5",
            width: "100%",
          }}
        >
          <List sx={{ display: "inline-block", flexShrink: 0 }}>
            <ListItem>
            <Link to="/"><ChevronLeftRoundedIcon sx={{pr:"2px",fontSize:"30px" , color:"gray",display: { lg: "none", xs: "inline" }}}/>
            </Link>
              <ListItemIcon>
                <Avatar
                  sx={{ bgcolor: "red" }}
                  alt={chatUser?.fullname?.charAt(0).toUpperCase()}
                >
                  {chatUser?.fullname?.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemIcon>
              <ListItemText primary={chatUser?.fullname}></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Box
          id="chatMsgs"
            sx={{ height: "80vh", overflowY: "auto", flexShrink: 1 }}
            ref={messagesRef}
          >
            {msgs.length > 1
              ? msgs.map((msg, index) => (
                  <Box
                    key={index}
                    align={msg.sender_id === state.user.id ? "right" : "left"}
                    sx={{ px: "10px", py: "20px" }}
                  >
                    <Box
                      sx={{
                        display: "inline-block",
                        px: "7px",
                        py: "5px",
                        backgroundColor:
                          msg.sender_id === state.user.id ? "#d9fdd3" : "#fff",
                      }}
                    >
                      <Typography sx={{ display: "inline-block" }}>
                        {msg.message}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "10px",
                          display: "inline-block",
                          color: "gray",
                          marginLeft: "7px",
                        }}
                      >
                        {moment(msg.created_at).format("M/D/YY, h:mm a")}
                      </Typography>
                    </Box>
                  </Box>
                ))
              : ""}
            <span id="msgBox"></span>
          </Box>
          {/* Message Input */}
          <form onSubmit={sendMsg}>
            <Box sx={{ px: "7px", display: "flex", flexShrink: 0 }}>
              <TextField
                sx={{backgroundColor:"#fff"}}
                id="outlined-basic-email1"
                label="Type Something"
                value={msgVal}
                onChange={(e) => {
                  handleMsg(e);
                }}
                fullWidth
              />
              <Box align="right" ml="7px">
                <Fab color="primary" aria-label="submit" type="submit">
                  <SendRoundedIcon />
                </Fab>
              </Box>
            </Box>
          </form>
        </Box>
    </Box>
  );
};

export default Chat;
