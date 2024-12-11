import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import ClubCard from '../components/ClubCard';
import '../index.css';

const ClubSearchPage = () => {
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
        club.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="club-search-page">
            <h1>동아리 검색</h1>
            <input
                type="text"
                placeholder="동아리명을 입력하세요"
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