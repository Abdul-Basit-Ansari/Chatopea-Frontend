import React from "react";
import { useState, useContext, useEffect } from "react";
import { Box, Divider } from "@mui/material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { TextField, Avatar } from "@mui/material";
import { GlobalContext } from "../../context/context";
import axios from "axios";
import { Link } from "react-router-dom";
const Chatbar = () => {
  let [users, setUsers] = useState({});
  let { state } = useContext(GlobalContext);

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
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let keys1 = [1, 3, 6, 12, 17, 27, 25, 24];
  let keys2 = [0, 2, 8, 14, 19, 26, 22, 28];
  let keys3 = [4, 10, 9, 16, 18, 21, 25, 30];
  let keys4 = [5, 7, 11, 15, 20, 13, 23, 29];

  return (
    <Box sx={{display:"flex"}}>
      <Box
        container = {true}
        sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            maxHeight: '100vh',
          width: { xxl: "30%", xl: "40%", lg: "50%" },
          borderRight: "1px solid #e0e0e0",
        }}
      >
        <List sx={{  flexShrink: 0, }}>
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
        <Box sx={{ flexShrink: 0, padding: "10px" }}>
          <TextField
            sx={{ backgroundColor: "#efeae27a" }}
            id="outlined-basic-email"
            label="Search"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Divider />
        <List sx={{ height: "76vh", overflowY: "auto" ,  flexGrow: 1 }}>
          {users.length > 1
            ? users.map((user, index) => (
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
              ))
            : ""}
        </List>
      </Box>
      <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems:"center",
            justifyContent:"center",
            backgroundColor: "#f0f2f5",
            width:"100%"
          }}
        >
            <h1 style={{marginBottom:"10px"}}>Chatopea Web</h1>
            <p style={{marginBottom:"10px"}}>Send and receive messages .</p>
            <p style={{marginBottom:"10px"}}>End-to-end encrypted</p>
        </Box>
    </Box>
  );
};

export default Chatbar;
