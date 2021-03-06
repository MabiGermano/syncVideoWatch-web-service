import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import api from "../../services/api";
import { Box, Button, Grid, TextField } from "@mui/material";
import "./style.css";

function InitialPage(props) {

    
    const {roomId} = props.location.state ? props.location.state : {}; 
    const history = useHistory();
    const [nickname, setNickname] = useState('');

    async function handleJoinRoom(event) {
        event.preventDefault();
        const user = {nickname, room: {identifier: roomId}};
        const response = await api.post('user', user);
        const userCreated = response.data;
        localStorage.setItem("uuid",userCreated.identifier);
        localStorage.setItem("nickname",userCreated.nickname);
        history.push(`/room/${userCreated.room.identifier}`);
      }

    return (
        <Box id="main-content">
            <Grid container spacing={0.5}>
                <Grid item xs={2}>
                    <Box id="publishing-area"></Box>
                </Grid>
                <Grid item xs={10}>
                    <Grid component="main" justifyContent="center" alignContent="center" container>
                        <Grid item xs={5} className="panel" id="form-panel" justifyContent="center"  alignContent="center" container>
                            <Box
                                component="form"
                                sx={{ display: "flex", mt: 1 }}
                                justifyContent="space-evenly"
                                noValidate
                                autoComplete="off"
                                onSubmit={handleJoinRoom}
                            >
                                <Grid item>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Insert your nickname"
                                        color="primary"
                                        focused={true}
                                        onChange={e => setNickname(e.target.value)}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={1}
                                    sx={{ display: "flex", alignContent: "center" }}
                                >
                                    <Button variant="contained" type="submit">
                                        Start
                                    </Button>
                                </Grid>
                            </Box>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>

        </Box>
    );
}

export default InitialPage;