import { roomActions } from './room-slice';

// ==================================================

export const getRoom = (roomId) => {
  const token = sessionStorage.getItem('token');

  return async (dispatch) => {
    const response = await fetch(
      `https://booking-server-6rik.onrender.com/hotels/room/${roomId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bear ${token}`,
        },
        body: null,
      }
    );

    const resData = await response.json();

    if (!response.ok) {
      return alert(resData.message);
    }

    return Object.keys(resData).map((key) =>
      dispatch(roomActions.replaceRoomState({ name: key, value: resData[key] }))
    );
  };
};
