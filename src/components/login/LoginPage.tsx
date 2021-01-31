import React from 'react'
import { Box, Button, Card, CardMedia, CardContent, TextField, Typography } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import Layout from '@components/ui/Layout';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
  },
});

const LoginPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Layout useHeader={false}>
      <Box className={classes.root}>
        <Card>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="200"
            image="https://picsum.photos/200"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>

        <LockIcon />

        <form>
          <TextField id="standard-basic" label="Standard" />
          <TextField id="filled-basic" label="Filled" variant="filled" />
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          <Button variant="contained" color="primary">SIGN IN</Button>
          <Button href="#text-buttons" color="primary">Link</Button>
        </form>
      </Box>
    </Layout>
  )
}

export default LoginPage;