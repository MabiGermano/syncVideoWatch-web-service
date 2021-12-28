import { Box, Button, Grid, TextField } from "@mui/material";
import "./style.css";

function InitialPage() {

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
                            >
                                <Grid item>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Insert your nickname"
                                        color="primary"
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