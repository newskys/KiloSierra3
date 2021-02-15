import React, { Component } from 'react'
import Layout from '@components/ui/Layout'
import CustomSignIn from './CustomSignIn'

class AuthWrapper extends Component<any> {
    state = {
        username: '',
    }

    updateUsername = (newUsername) => {
        this.setState({ username: newUsername })
    }

    render() {
        return (
            <>
                <CustomSignIn
                    authState={this.props.authState}
                    updateUsername={this.updateUsername}
                    onStateChange={this.props.onStateChange}
                />
                {/* <InternalApp authState={this.props.authState} onStateChange={this.props.onStateChange} /> */}
                <Layout />
            </>
        )
    }
}

export default AuthWrapper