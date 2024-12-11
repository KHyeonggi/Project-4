import React, { useState } from 'react'
import '../index.css' // CSS 파일 import
import { useLocation } from 'react-router-dom';
import { db } from '../firebase'; // firebase 설정 파일에서 db import
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ClubApplication = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const club_name = location.state?.club_name;

    const [formData, setFormData] = useState({
        name: '',
        student_id: '',
        phone: '',
        motivation: '',
        privacyAgreement: '',
        club_name: club_name
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.privacyAgreement || formData.privacyAgreement === 'disagree') {
            alert('개인정보 수집에 동의해주세요.');
            return;
        }

        try {
            // applications 컬렉션에 신청 데이터 저장
            await addDoc(collection(db, 'applications'), {
                ...formData,
                appliedAt: new Date(),
                status: 'pending' // 승인 상태 추가
            });

            alert('가입신청이 완료되었습니다!');
            navigate('/clubs'); // 동아리 목록 페이지로 이동
        } catch (error) {
            console.error('Error adding application: ', error);
            alert('가입신청 중 오류가 발생했습니다.');
        }
    }

    return (
        <div className="Application-container">
            <div className="Application-box">
                <h1 className="logo">{club_name} 가입 신청</h1>

                <form className="form" onSubmit={handleSubmit}>
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
                        <label className="label">학번을 입력해주세요</label>
                        <input
                            className="input"
                            type="number"
                            name="student_id"
                            placeholder="학번을 입력해주세요"
                            value={formData.student_id}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label className="label">연락처를 입력해주세요</label>
                        <input
                            className="input"
                            type="text"
                            name="phone"
                            placeholder="연락처를 입력해주세요"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label className="label">지원동기를 입력해주세요</label>
                        <textarea
                            className="input"
                            name="motivation"
                            placeholder="지원동기를 입력해주세요"
                            value={formData.motivation}
                            onChange={handleChange}
                            rows="4"
                        />
                    </div>

                    <div className="input-group">
                        <label className="label">개인정보 수집 및 이용 동의</label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="privacyAgreement"
                                    value="agree"
                                    checked={formData.privacyAgreement === 'agree'}
                                    onChange={handleChange}
                                />
                                동의
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="privacyAgreement"
                                    value="disagree"
                                    checked={formData.privacyAgreement === 'disagree'}
                                    onChange={handleChange}
                                />
                                미동의
                            </label>
                        </div>
                    </div>

                    <button className="signup-button" type="submit">
                        가입신청
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ClubApplication
