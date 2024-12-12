import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../index.css';
import faceImage from '../assets/face.png';
import { useNavigate } from 'react-router-dom';

const ClubRegistrationPage = () => {
    const navigate = useNavigate();
    const [clubData, setClubData] = useState({
        name: '',
        description: '',
        tags: ['', '', ''],
        image: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClubData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleRegisterClick = () => {
        navigate('/clubs');
    };
    const handleTagChange = (index, value) => {
        const newTags = [...clubData.tags];
        newTags[index] = value;
        setClubData(prev => ({
            ...prev,
            tags: newTags
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'clubs'), clubData);
            setMessage('동아리가 성공적으로 등록되었습니다!');
            // 폼 초기화
            setClubData({
                name: '',
                description: '',
                tags: ['', '', ''],
                image: ''
            });
        } catch (error) {
            setMessage('오류가 발생했습니다: ' + error.message);
        }
    };

    return (
        <div className="club-registration-page">
            <div className="header">
            <img src={faceImage} alt="face" width="100" height="100" className="round-image" />
                <h1>동아리 등록</h1>
                <button 
                    className="register-button"
                    onClick={handleRegisterClick}
                >
                    동아리 목록
                </button>
            </div>
            {message && <div className="message">{message}</div>}
            
            <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                    <label>동아리명</label>
                    <input
                        type="text"
                        name="name"
                        value={clubData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>동아리 소개</label>
                    <textarea
                        name="description"
                        value={clubData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>태그</label>
                    {clubData.tags.map((tag, index) => (
                        <input
                            key={index}
                            type="text"
                            value={tag}
                            onChange={(e) => handleTagChange(index, e.target.value)}
                            placeholder={`태그 ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="form-group">
                    <label>이미지 URL</label>
                    <input
                        type="text"
                        name="image"
                        value={clubData.image}
                        onChange={handleChange}
                        placeholder="이미지 URL을 입력하세요"
                    />
                </div>

                <button type="submit" className="submit-button">
                    동아리 등록
                </button>
            </form>
        </div>
    );
};

export default ClubRegistrationPage;
