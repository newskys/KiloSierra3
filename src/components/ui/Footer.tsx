import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    copyright: {
        display: 'inline-block',
        textAlign: 'center',
        fontSize: '12px',
    }
});

interface Props {
    isLogin: boolean
    onClickLogin: Function
    onClickLogout: Function
}

const Footer: React.FC<Props> = ({ isLogin, onClickLogin, onClickLogout }) => {
    const classes = useStyles();

    return (
        <>
        {!isLogin && (<Typography className={classes.copyright} component='small' onClick={(e) => onClickLogin(e)}>Login</Typography>)}
            {isLogin && (<Typography className={classes.copyright} component='small' onClick={(e) => onClickLogout(e)}>Logout</Typography>)}
            <Typography className={classes.copyright} component='small'>&nbsp;・ Copyright &copy; Umlaut 2021</Typography>
        </>
    )
}

export default Footer
