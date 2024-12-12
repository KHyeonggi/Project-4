import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import '../index.css'; // CSS 파일 import

const ClubCard = ({ club }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/clubs/${club.id}`);
    };

    const handleApply = (e) => {
        e.stopPropagation(); // 카드 클릭 이벤트가 발생하지 않도록 함
        navigate('/club-application', { 
            state: { club_name: club.name }
        });
    };

    return (
        <div className="club-card" onClick={handleClick}>
            <img src={club.image} alt={club.name} className="club-image" />
            <div className="club-info">
                <h2 className="club-name">{club.name}</h2>
                <p className="club-description">{club.description}</p>
                <div className="club-tags">
                    {club.tags.map((tag, index) => (
                        <span key={index} className="club-tag">{tag}</span>
                    ))}
                </div>
                <button 
                    className="join-button" 
                    onClick={handleApply}
                >
                    가입신청
                </button>
            </div>
        </div>
    );
};

export default ClubCard;