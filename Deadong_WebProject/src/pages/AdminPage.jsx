import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import '../index.css';

const AdminPage = () => {
    const [pendingClubs, setPendingClubs] = useState([]);
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 동아리 승인 요청 가져오기
                const clubsSnapshot = await getDocs(collection(db, 'clubs'));
                const clubs = clubsSnapshot.docs
                    .map(doc => ({ id: doc.id, ...doc.data() }))
                    .filter(club => !club.approved);
                setPendingClubs(clubs);

                // 가입 신청 가져오기
                const applicationsSnapshot = await getDocs(collection(db, 'applications'));
                const applicationsData = applicationsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setApplications(applicationsData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    const handleApproveClub = async (clubId) => {
        try {
            const clubRef = doc(db, 'clubs', clubId);
            await updateDoc(clubRef, {
                approved: true
            });
            setPendingClubs(prev => prev.filter(club => club.id !== clubId));
        } catch (error) {
            console.error("Error approving club:", error);
        }
    };

    const handleApproveApplication = async (applicationId) => {
        try {
            const applicationRef = doc(db, 'applications', applicationId);
            await updateDoc(applicationRef, {
                status: 'approved',
                approvedAt: new Date()
            });
            // 승인된 신청서를 UI에서 업데이트
            setApplications(prev => prev.map(app => 
                app.id === applicationId 
                    ? { ...app, status: 'approved' }
                    : app
            ));
        } catch (error) {
            console.error("Error approving application:", error);
            alert('승인 처리 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="admin-container">
            <h1>관리자 페이지</h1>
            
            <section className="pending-clubs-section">
                <h2>동아리 승인 대기</h2>
                <div className="pending-clubs">
                    {pendingClubs.map(club => (
                        <div key={club.id} className="club-card">
                            <h3>{club.name}</h3>
                            <p>{club.description}</p>
                            <div className="tags">
                                {club.tags?.map((tag, index) => (
                                    <span key={index} className="tag">{tag}</span>
                                ))}
                            </div>
                            {club.image && <img src={club.image} alt={club.name} />}
                            <button onClick={() => handleApproveClub(club.id)}>
                                승인하기
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <section className="applications-section">
                <h2>가입 신청 관리</h2>
                <div className="applications-list">
                    {applications.map((application) => (
                        <div key={application.id} className="application-card">
                            <h3>{application.club_name} 동아리 지원서</h3>
                            <div className="application-details">
                                <p><strong>이름:</strong> {application.name}</p>
                                <p><strong>학번:</strong> {application.student_id}</p>
                                <p><strong>연락처:</strong> {application.phone}</p>
                                <p><strong>지원동기:</strong> {application.motivation}</p>
                                <p><strong>신청일:</strong> {application.appliedAt?.toDate().toLocaleDateString()}</p>
                                <p><strong>상태:</strong> {application.status === 'pending' ? '검토중' : '승인됨'}</p>
                            </div>
                            {application.status === 'pending' && (
                                <button 
                                    className="approve-button"
                                    onClick={() => handleApproveApplication(application.id)}
                                >
                                    가입 승인
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AdminPage; 