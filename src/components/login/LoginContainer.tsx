import React, { useState } from 'react'
import axios from 'axios'
import Login from './Login'

const LoginContainer: React.FC = () => {
    const [loginElement, setLoginElement] = useState(null);
    const [passwordElement, setPasswordElement] = useState(null);

    const handleClick = (e) => {
        const email = loginElement.value;
        const password = passwordElement.value;

        console.log(email, password);

        console.log('~');
        requestApi(email, password);
        console.log('~');
    }

    const requestApi = async (email, password) => {
        // then -> es6 문법
        // axios.get(`https://jsonplaceholder.typicode.com/todos/1`).then((response) => axios.get(`https://jsonplaceholder.typicode.com/users/${response.data.userId}`)
        //     .then((response) => {console.log(response.data)}))

        // async/await es7 문법
        console.log('1')
        const todoResult = await axios.get(`https://jsonplaceholder.typicode.com/todos/1`)
        const userId = todoResult.data.userId
        console.log('2')
        const userInfoResult = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        // console.log(userInfoResult.data)
        console.log('3')
    }

    const setRef = (loginEl, passwordEl) => {
        setLoginElement(loginEl);
        setPasswordElement(passwordEl);
    }

    return (
        <Login setRef={setRef} onClick={handleClick} />
    )
}

export default LoginContainer