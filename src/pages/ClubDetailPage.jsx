import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/ClubDetailPage.css';

const ClubDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [club, setClub] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedInfo, setSelectedInfo] = useState('manager');

    // 각 동아리별 상세 정보
    const clubDetailsMap = {
        "동키": {
            manager: {
                title: "담당자",
                content: "동키",
                subContent: "010-5555-5555"
            },
            days: {
                title: "활동 요일",
                content: "매주 화, 목요일",
                subContent: "13:00 ~ 15:00"
            },
            experience: {
                title: "활동 경력",
                content: "전국 동물 친구 대회 대상",
                subContent: "2023.11"
            }
        },
        "버니즈": {
            manager: {
                title: "담당자",
                content: "제이크",
                subContent: "010-7777-7777"
            },
            days: {
                title: "활동 요일",
                content: "매주 월, 수요일",
                subContent: "18:00 ~ 22:00"
            },
            experience: {
                title: "활동 경력",
                content: "NewJeans 커버댄스 대회 우승",
                subContent: "2023.12"
            }
        },
        "슈렉렉": {
            manager: {
                title: "담당자",
                content: "슈렉",
                subContent: "010-8888-8888"
            },
            days: {
                title: "활동 요일",
                content: "매주 금, 토요일",
                subContent: "19:00 ~ 21:00"
            },
            experience: {
                title: "활동 경력",
                content: "늪지대 댄스 경연대회 우승",
                subContent: "2024.01"
            }
        }
    };

    useEffect(() => {
        const fetchClubDetail = async () => {
            try {
                const docRef = doc(db, 'clubs', id);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    setClub({ id: docSnap.id, ...docSnap.data() });
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching club details:', error);
                setLoading(false);
            }
        };

        fetchClubDetail();
    }, [id]);

    const handleApply = () => {
        navigate('/club-application', { 
            state: { club_name: club?.name }
        });
    };

    const handleBoardMove = () => {
        navigate('/clubs');
    };

    const renderInfoCard = (type) => {
        // club.name을 사용하여 해당 동아리의 상세 정보를 가져옴
        const clubDetails = clubDetailsMap[club.name] || {
            manager: {
                title: "담당자",
                content: "미지정",
                subContent: "연락처 없음"
            },
            days: {
                title: "활동 요일",
                content: "미지정",
                subContent: "시간 미정"
            },
            experience: {
                title: "활동 경력",
                content: "없음",
                subContent: ""
            }
        };

        const info = clubDetails[type];
        return (
            <div className={`info-card ${selectedInfo === type ? 'selected' : ''}`} 
                onClick={() => setSelectedInfo(type)}>
                <h3 className="card-title">{info.title}</h3>
                <p className="card-content">{info.content}</p>
                <p className="card-sub-content">{info.subContent}</p>
            </div>
        );
    };

    if (loading) return <div className="loading">로딩 중...</div>;
    if (!club) return <div className="error">동아리를 찾을 수 없습니다.</div>;

    return (
        <div className="page-container">
            <div className="detail-header">
                <div className="club-profile">
                    <img 
                        src={club.image || '/default-club-image.png'} 
                        alt={club.name} 
                        className="club-image" 
                    />
                    <div className="club-title">
                        <h1>{club.name}</h1>
                        <div className="tag-container">
                            {club.tags?.map((tag, index) => (
                                <span key={index} className="tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="button-container">
                    <button className="action-button" onClick={handleBoardMove}>
                        게시판 이동
                    </button>
                    <button className="action-button" onClick={handleApply}>
                        동아리 신청
                    </button>
                </div>
            </div>

            <div className="info-container">
                {renderInfoCard('manager')}
                {renderInfoCard('days')}
                {renderInfoCard('experience')}
            </div>

            <div className="description-section">
                <h2>소개글</h2>
                <div className="description-content">
                    <p>{club.description || '등록된 소개글이 없습니다.'}</p>
                </div>
            </div>
        </div>
    );
};

export default ClubDetailPage; 