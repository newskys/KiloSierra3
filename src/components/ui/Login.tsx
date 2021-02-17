import React, { useRef, useEffect } from 'react'
import { Button, Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        padding: '16px',
    },

    avatar_wrap: {
        color: '#FF1493',
        padding: '16px 0 0 0',
    },

    avatar: {
        margin: '0 auto',
        backgroundColor: '#FF1493',
    },

    login_input: {
        margin: '16px 0 0 0',
    },

    signin: {
        margin: '16px 0 0 0',
        padding: '8px',
    },

    text_link: {
        margin: '8px 0 0 0',
    },

    text_button: {
        textTransform: 'none',
    }
})

interface Props {
    onClick: Function
    setRef: Function
}

const Login: React.FC<Props> = ({ onClick, setRef }) => {
    const classes = useStyles();
    const userIdRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        setRef(userIdRef.current, passwordRef.current)
    }, [])

    return (
        <>
            <TextField inputRef={userIdRef} fullWidth className={classes.login_input} variant="outlined" label="ID *" margin="normal" />
            <TextField inputRef={passwordRef} fullWidth className={classes.login_input} variant="outlined" label="Password *" margin="normal" type="password" />
            <Button onClick={(e) => onClick(e)} className={classes.signin} fullWidth variant="contained" color="primary">SIGN IN</Button>
        </>
    )
}

export default Login