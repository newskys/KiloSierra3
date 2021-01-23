import React from 'react';
import { Button, Card, CardMedia, CardContent, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles({
  copyright: {
    display: 'block',
  }
});

const Copyright = styled(({ ...other }) => (
  <Typography component='small' {...other} />
))`
  display: block;
  background-color: pink;
`;

const Material: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      {/* https://material-ui.com/components/cards/ */}
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

      {/* https://material-ui.com/components/icons/ */}
      <LockIcon />

      <form>
        {/* https://material-ui.com/components/text-fields/ */}
        <TextField id="standard-basic" label="Standard" />
        <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        {/* https://material-ui.com/components/buttons/ */}
        <Button variant="contained" color="primary">SIGN IN</Button>
        <Button href="#text-buttons" color="primary">Link</Button>
      </form>

      {/* 커스텀 3가지 방법 */}
      <small className={classes.copyright}>Copyright &copy; Umlaut 2020</small>
      <Typography component='small' className={classes.copyright}>Copyright &copy; Umlaut 2021</Typography>
      <Copyright>Copyright &copy; Umlaut 2020</Copyright>
    </>
  );
};

export default Material;