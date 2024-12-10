import React from 'react';
import '../index.css'; // CSS 파일 import

const ClubCard = ({ club }) => {
    return (
        <div className="club-card">
            <img src={club.image} alt={club.name} className="club-image" />
            <div className="club-info">
                <h2 className="club-name">{club.name}</h2>
                <p className="club-description">{club.description}</p>
                <div className="club-tags">
                    {club.tags.map((tag, index) => (
                        <span key={index} className="club-tag">{tag}</span>
                    ))}
                </div>
                <button className="join-button">가입신청</button>
            </div>
        </div>
    );
};

export default ClubCard; 