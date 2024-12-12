import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../index.css' // CSS 파일 import

const LoginPage = () => {
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        userId: '',
        password: '',
    })

    const handleLogin = (e) => {
        e.preventDefault()
        console.log('로그인 시도:', loginData)
    }

    const handleKakaoLogin = () => {
        // 카카오 로그인 로직 구현
    }

    const handleFabClick = () => {
        navigate('/clubs')
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="logo">대동사이트</h1>

                <form className="form" onSubmit={handleLogin}>
                    <div className="input-group">
                        <label className="label">아이디</label>
                        <input
                            className="input"
                            type="text"
                            placeholder="Enter your ID"
                            value={loginData.userId}
                            onChange={(e) => setLoginData({ ...loginData, userId: e.target.value })}
                        />
                    </div>

                    <div className="input-group">
                        <label className="label">비밀번호</label>
                        <input
                            className="input"
                            type="password"
                            placeholder="Enter your password"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        />
                    </div>

                    <button className="login-button" type="submit">
                        로그인
                    </button>

                    <button className="kakao-button" type="button" onClick={handleKakaoLogin}>
                        카카오 로그인
                    </button>

                    <div className="link-group">
                        <Link className="styled-link" to="/find-account">
                            ID/PW 찾기
                        </Link>
                        <Link className="styled-link" to="/signup">
                            회원가입
                        </Link>
                        <Link className="styled-link" to="/admin">
                            관리자 로그인
                        </Link>
                    </div>
                </form>
            </div>

            <button className="fab" onClick={handleFabClick} title="동아리 검색">
                🔍
            </button>
        </div>
    )
}

export default LoginPage
