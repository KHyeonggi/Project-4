import React, { useState } from 'react';
import ClubCard from '../components/ClubCard';
import '../index.css'; // CSS 파일 import

const ClubSearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [clubs, setClubs] = useState([
        {
            name: '동아리 A',
            description: '동아리 A의 한 줄 소개',
            tags: ['태그1', '태그2', '태그3'],
            image: 'path/to/imageA.jpg',
        },
        {
            name: '동아리 B',
            description: '동아리 B의 한 줄 소개',
            tags: ['태그1', '태그2', '태그3'],
            image: 'path/to/imageB.jpg',
        },
        {
            name: '동아리 C',
            description: '동아리 B의 한 줄 소개',
            tags: ['태그1', '태그2', '태그3'],
            image: 'path/to/imageB.jpg',
        },
        {
            name: '동아리 F',
            description: '동아리 A의 한 줄 소개',
            tags: ['태그1', '태그2', '태그3'],
            image: 'path/to/imageA.jpg',
        },
        {
            name: '동아리 E',
            description: '동아리 B의 한 줄 소개',
            tags: ['태그1', '태그2', '태그3'],
            image: 'path/to/imageB.jpg',
        },
        {
            name: '동아리 D',
            description: '동아리 B의 한 줄 소개',
            tags: ['태그1', '태그2', '태그3'],
            image: 'path/to/imageB.jpg',
        },
        // 더 많은 동아리 데이터 추가
    ]);

    const filteredClubs = clubs.filter(club =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                {filteredClubs.map((club, index) => (
                    <ClubCard key={index} club={club} />
                ))}
            </div>
        </div>
    );
};

export default ClubSearchPage; 