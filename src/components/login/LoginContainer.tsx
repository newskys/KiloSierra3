import { UserState, userState } from '@recoil/user';
import Amplify, { Auth } from 'aws-amplify';
import { Authenticator } from 'aws-amplify-react';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Login from '../ui/Login';
import awsconfig from '../../aws-exports';
import { useHistory, History } from "react-router-dom";
import { HOME } from '@common/routePath';

Amplify.configure(awsconfig)

const LoginContainer: React.FC = () => {
    const [userIdElement, setUserIdElement] = useState(null);
    const [passwordElement, setPasswordElement] = useState(null);
    const [user, setUserState] = useRecoilState<UserState>(userState)
    const history: History = useHistory()

    useEffect(() => {
        if (!!user.userId) {
            history.replace(HOME)
        }
    }, [user])

    const handleClick = (e) => {
        const userId = userIdElement.value;
        const password = passwordElement.value;

        requestApi(userId, password);
    }

    const requestApi = async (userId, password) => {
        try {
            const result = await Auth.signIn(userId, password)
            const userState: UserState = {
                isInit: true,
                userId: result.username,
                email: result.attributes?.email,
                emailVerified: result.attributes?.email_verified,
                phone: result.attributes?.phone_number,
                phoneVerified: result.attributes?.phone_number_verified,
            }

            console.log('signed in successfully.', userState)
            setUserState(userState)
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

    const setRef = (userIdEl, passwordEl) => {
        setUserIdElement(userIdEl);
        setPasswordElement(passwordEl);
    }

    return (
        <>
            <Authenticator hideDefault={true} amplifyConfig={awsconfig}>
                <Login setRef={setRef} onClick={handleClick} />
            </Authenticator>
        </>
    )
}

export default LoginContainer