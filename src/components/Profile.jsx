import React, { useEffect, useState } from 'react';
import './Profile.css';

function Profile({ userData }) {
  const [localUserData, setLocalUserData] = useState(userData);

  useEffect(() => {
    if (!userData) {
      const storedUserData = JSON.parse(localStorage.getItem('userData'));
      if (storedUserData) {
        setLocalUserData(storedUserData);
      }
    }
  }, [userData]);
  
  if (!localUserData) {
    return <div className="loading">Loading profile...</div>;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalUserData({ ...localUserData, profileImage: reader.result });
        localStorage.setItem('userData', JSON.stringify({ ...localUserData, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    
    <div className="profile-container" style={{ position: 'fixed', left: 0, bottom: 0, height: '100%', width: '250px', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div className="profile-image-container" style={{ marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
        {localUserData.profileImage ? (
          <img src={localUserData.profileImage} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', maxWidth: '100%' }} />
        ) : (
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#ccc', maxWidth: '100%' }}></div>
        )}
      </div>
      <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginBottom: '60px' }} />
      <h3 className="profile-header" style={{ marginBottom: '10px' }}>User Profile</h3>
      <p className="profile-username" style={{ marginBottom: '10px' }}>Username: {localUserData.username}</p>
      
    </div>
  );
}

export default Profile;
