import React, { useState } from 'react'
import axios from 'axios'
import Login from '../ui/Login'
import { Authenticator } from 'aws-amplify-react';
import Amplify from 'aws-amplify'
import awsconfig from '../../aws-exports'
import AuthWrapper from './AuthWrapper';
import { Auth } from 'aws-amplify'
import { SignIn } from 'aws-amplify-react'
Amplify.configure(awsconfig)

const LoginContainer: React.FC = () => {
    const validAuthStates = ['signIn', 'signedOut', 'signedUp']
    const [userIdElement, setUserIdElement] = useState(null);
    const [passwordElement, setPasswordElement] = useState(null);

    const handleClick = (e) => {
        const userId = userIdElement.value;
        const password = passwordElement.value;

        requestApi(userId, password);
    }

    const requestApi = async (userId, password) => {
        try {
            await Auth.signIn(userId, password)
            console.log('signed in successfully.')
            // this.props.onStateChange('signedIn', {})
        } catch (err) {
            if (err.code === 'UserNotConfirmedException') {
                // this.props.updateUsername(email)
                await Auth.resendSignUp(userId)
                console.log('sign up')
                // this.props.onStateChange('confirmSignUp', {})
            } else if (err.code === 'NotAuthorizedException') {
                // The error happens when the incorrect password is provided
                console.log('login failed - not authorized')
                // this.setState({ error: 'Login failed.' })
            } else if (err.code === 'UserNotFoundException') {
                console.log('login failed - user not found')
                // The error happens when the supplied username/email does not exist in the Cognito user pool
                // this.setState({ error: 'Login failed.' })
            } else {
                console.log('login failed - not authorized')
                // this.setState({ error: 'An error has occurred.' })
                console.error(err)
            }
        }
    }

    const setRef = (loginEl, passwordEl) => {
        setUserIdElement(loginEl);
        setPasswordElement(passwordEl);
    }

    return (
        <>
            <Authenticator hideDefault={false} amplifyConfig={awsconfig}>
                <Login setRef={setRef} onClick={handleClick} />
            </Authenticator>
        </>
    )
}

export default LoginContainer