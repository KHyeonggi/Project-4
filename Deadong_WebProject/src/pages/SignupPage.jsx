import React, { useState } from 'react'
import '../index.css' // CSS 파일 import
import faceImage from '../assets/face.png';


const SignupPage = () => {
    const [formData, setFormData] = useState({
        university: '',
        age: '',
        name: '',
        userId: '',
        password: '',
        confirmPassword: '',
        gender: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // 회원가입 로직 구현
        console.log('회원가입 정보:', formData)
    }

    return (
        <div className="signup-container">
            <div className="signup-box">
                <div className="header">
                     <img src={faceImage} alt="face" width="100" height="100" className="round-image" />
                    <h1 className="logo">회원가입</h1>  
                </div>

                <form className="form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="label">대학교명을 입력해주세요</label>
                        <input
                            className="input"
                            type="text"
                            name="university"
                            placeholder="대학교명을 입력해주세요"
                            value={formData.university}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label className="label">나이를 입력해주세요</label>
                        <input
                            className="input"
                            type="number"
                            name="age"
                            placeholder="나이를 입력해주세요"
                            value={formData.age}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label className="label">이름을 입력해주세요</label>
                        <input
                            className="input"
                            type="text"
                            name="name"
                            placeholder="이름을 입력해주세요"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label className="label">아이디를 입력해주세요</label>
                        <input
                            className="input"
                            type="text"
                            name="userId"
                            placeholder="아이디를 입력해주세요"
                            value={formData.userId}
                            onChange={handleChange}
                        />
                        <button type="button" className="check-button">
                            중복확인
                        </button>
                    </div>

                    <div className="input-group">
                        <label className="label">비밀번호를 입력해주세요</label>
                        <input
                            className="input"
                            type="password"
                            name="password"
                            placeholder="비밀번호를 입력해주세요"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label className="label">비밀번호를 입력해주세요</label>
                        <input
                            className="input"
                            type="password"
                            name="confirmPassword"
                            placeholder="비밀번호를 입력해주세요"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label className="label">성별</label>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="남성"
                                    checked={formData.gender === '남성'}
                                    onChange={handleChange}
                                />
                                남성
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="여성"
                                    checked={formData.gender === '여성'}
                                    onChange={handleChange}
                                />
                                여성
                            </label>
                        </div>
                    </div>

                    <button className="signup-button" type="submit">
                        회원가입
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignupPage
