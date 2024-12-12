import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AdminPage = () => {
    const [pendingClubs, setPendingClubs] = useState([]);
    
    useEffect(() => {
        const fetchPendingClubs = async () => {
            const querySnapshot = await getDocs(collection(db, 'clubs'));
            const clubs = querySnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(club => !club.approved);
            setPendingClubs(clubs);
        };
        
        fetchPendingClubs();
    }, []);

    const handleApprove = async (clubId) => {
        try {
            const clubRef = doc(db, 'clubs', clubId);
            await updateDoc(clubRef, {
                approved: true
            });
            // 승인된 클럽을 목록에서 제거
            setPendingClubs(prev => prev.filter(club => club.id !== clubId));
        } catch (error) {
            console.error("승인 중 오류 발생:", error);
        }
    };

    return (
        <div className="admin-page">
            <h1>관리자 페이지</h1>
            <div className="pending-clubs">
                {pendingClubs.map(club => (
                    <div key={club.id} className="club-card">
                        <h2>{club.name}</h2>
                        <p>{club.description}</p>
                        <div className="tags">
                            {club.tags.map((tag, index) => (
                                <span key={index} className="tag">{tag}</span>
                            ))}
                        </div>
                        {club.image && <img src={club.image} alt={club.name} />}
                        <button onClick={() => handleApprove(club.id)}>
                            승인하기
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage; 