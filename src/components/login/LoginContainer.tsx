import React, { useState } from 'react'
import axios from 'axios'
import Login from '../ui/Login'

const LoginContainer: React.FC = () => {

    // 과제
    // 1. userId 2의 앨범 title목록 보여주기
    // 유저아이디 x의 앨범 목록 요청 API: https://jsonplaceholder.typicode.com/albums?userId=x

    const requestApiAlbums = (userId) => {
        axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
             .then((response) => {
                 console.log('albums list', response.data)
                 console.log('albums title', response.data.map((item) => item.title))
             })
    }
    requestApiAlbums(2);

    // 2. userId 1의 5번째 글의 댓글 보여주기 
    // 유저아이디 x의 글 목록 요청 API: https://jsonplaceholder.typicode.com/posts?userId=x
    // 글번호 x의 댓글 요청API: https://jsonplaceholder.typicode.com/posts/x/comments

    const requestApiPosts = async (userId, posts) => {
        const postsList = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        const postId = postsList.data[posts - 1].id
        const commentResult = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        console.log('comment list', commentResult.data)
    }
    requestApiPosts(1, 5);


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