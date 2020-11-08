import React from 'react'
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Grid, Typography} from "@material-ui/core";
import Link from "@material-ui/core/Link";


const Main: React.FC = () => {
  return (
    <>
        <Container maxWidth="xs">
            <TextField fullWidth label="Outlined" variant="outlined" margin="normal" />
            <TextField fullWidth label="Outlined" variant="outlined" margin="normal" />

            <Button fullWidth variant="contained" color="primary" style={{margin: '24px 0px 16px 0px'}}>
                SIGN IN
            </Button>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={6}>
                    <Typography variant="body2" color="primary">
                        <Link href="#" onClick={() => {}} underline="hover">
                            Forgot Password?
                        </Link>
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body2" color="primary">
                        <Link href="#" onClick={() => {}} underline="hover">
                            Don't have an account? Sign Up
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    </>
  )
}

export default Main
