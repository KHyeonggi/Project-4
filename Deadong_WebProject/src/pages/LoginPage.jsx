import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    const [loginData, setLoginData] = useState({
        userId: '',
        password: '',
    })

    const handleLogin = (e) => {
        e.preventDefault()
        // 로그인 로직 구현
        console.log('로그인 시도:', loginData)
    }

    const handleKakaoLogin = () => {
        // 카카오 로그인 로직 구현
    }

    return (
        <LoginContainer>
            <LoginBox>
                <Logo>대동사이트</Logo>

                <Form onSubmit={handleLogin}>
                    <InputGroup>
                        <Label>아이디</Label>
                        <Input
                            type="text"
                            placeholder="Enter your ID"
                            value={loginData.userId}
                            onChange={(e) => setLoginData({ ...loginData, userId: e.target.value })}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>비밀번호</Label>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        />
                    </InputGroup>

                    <LoginButton type="submit">로그인</LoginButton>

                    <KakaoButton type="button" onClick={handleKakaoLogin}>
                        카카오 로그인
                    </KakaoButton>

                    <LinkGroup>
                        <StyledLink to="/find-account">ID/PW 찾기</StyledLink>
                        <StyledLink to="/signup">회원가입</StyledLink>
                        <StyledLink to="/admin-login">관리자 로그인</StyledLink>
                    </LinkGroup>
                </Form>
            </LoginBox>
        </LoginContainer>
    )
}

// 스타일 컴포넌트
const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f5f5;
`

const LoginBox = styled.div`
    width: 400px;
    padding: 40px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const Logo = styled.h1`
    text-align: center;
    margin-bottom: 30px;
    color: #333;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const Label = styled.label`
    font-size: 14px;
    color: #666;
`

const Input = styled.input`
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;

    &:focus {
        outline: none;
        border-color: #007bff;
    }
`

const LoginButton = styled.button`
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #0056b3;
    }
`

const KakaoButton = styled(LoginButton)`
    background-color: #fee500;
    color: #000000;

    &:hover {
        background-color: #fdd835;
    }
`

const LinkGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
`

const StyledLink = styled(Link)`
    color: #666;
    text-decoration: none;
    font-size: 14px;

    &:hover {
        color: #007bff;
    }
`

export default LoginPage
