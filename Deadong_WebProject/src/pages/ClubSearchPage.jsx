import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../apikey';
import ClubCard from '../components/ClubCard';
import '../index.css';
import faceImage from '../assets/face.png';


const ClubSearchPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'clubs'));
                const clubsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setClubs(clubsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching clubs:', error);
                setLoading(false);
            }
        };

        fetchClubs();
    }, []);

    const filteredClubs = clubs.filter(club =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleRegisterClick = () => {
        navigate('/register-club');
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="club-search-page">
            <div className="header">
                <img src={faceImage} alt="face" width="100" height="100" className="round-image" />
                <h1>동아리 검색</h1>
                <button 
                    className="register-button"
                    onClick={handleRegisterClick}
                >
                    동아리 등록
                </button>
            </div>
            <input
                type="text"
                placeholder="동아리명이나 태그를 입력하세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <div className="club-list">
                {filteredClubs.map((club) => (
                    <ClubCard key={club.id} club={club} />
                ))}
            </div>
        </div>
    );
};

export default ClubSearchPage; 