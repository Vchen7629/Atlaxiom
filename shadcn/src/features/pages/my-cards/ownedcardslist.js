import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OwnedCardTable from './ownedCardTable';
import { useGetSpecificUserQuery } from '../../api-slices/usersApiSlice';

const UserOwnedCard = () => {

  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();

  const {
    data: usersData,
    error,
    isLoading,
    refetch,
  } = useGetSpecificUserQuery(userId, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const renderOwnedCardContent = () => {
    try {
      const { ids, entities } = usersData || {}
      const defaultIdKey = ids[0];
      const user = entities[defaultIdKey];

      if (error) {
        if (error.status === 404) {
          return <div className="user-not-found">User not found</div>;
        }
    
        console.error('Error fetching user data:', error);
        return <div>Error fetching user data</div>;
      }

      if (isLoading) {
        return <div>Loading...</div>;
      }

      if (!Array.isArray(ids) || ids.length === 0) {
        console.error('User IDs not available or empty');
        return <p>No user data available</p>;
      }
      
      if (!user) {
        console.error('User entity not found');
        return <p>No user data available</p>;
      }

      return <OwnedCardTable user={user} refetchUserData={refetch}/>
    } catch (e) {
      console.error(e.message);
      navigate('/profile');
      return null;
    }
  };

    return (
      <>
        {renderOwnedCardContent()}
      </>
    )

};

export default UserOwnedCard;