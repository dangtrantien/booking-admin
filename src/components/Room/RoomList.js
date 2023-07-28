import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useHttp from '../../hooks/use-http';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

// ==================================================

const RoomList = () => {
  const sendRequest = useHttp();
  const navigate = useNavigate();

  const [rooms, setrooms] = useState({});
  const [currentRooms, setCurrentRooms] = useState([]);
  const [page, setPage] = useState(1);

  const pageChangeHandler = (direction) => {
    if (direction === 'next') {
      setPage((prev) => (prev === rooms.result?.length ? 1 : prev + 1));
    } else {
      setPage((prev) => (prev === 1 ? rooms.result?.length : prev - 1));
    }
  };

  const editHandler = (roomId) => {
    return navigate('/new-room', { replace: true, state: { roomId } });
  };

  const deleteHandler = (roomId) => {
    if (
      window.confirm("Are you sure? You won't be able to revert this!") === true
    ) {
      sendRequest({
        url: `https://booking-server-6rik.onrender.com/admin/room/${roomId}`,
        method: 'DELETE',
      })
        .then((result) => {
          alert(result.message);

          window.location.reload(true);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    sendRequest({ url: 'https://booking-server-6rik.onrender.com/admin/rooms' })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        setrooms(result);
      })
      .catch((err) => console.log(err));
  }, [sendRequest]);

  // Render value theo page
  useEffect(() => {
    if (rooms.result) {
      setCurrentRooms(rooms.result[page - 1].result);
    }
  }, [rooms, page]);

  return (
    <table>
      <thead>
        <tr>
          <th>
            <div>
              <input type='checkbox' />
            </div>
          </th>
          <th>
            <div>ID</div>
          </th>
          <th>
            <div>Title</div>
          </th>
          <th>
            <div>Description</div>
          </th>
          <th>
            <div>Price</div>
          </th>
          <th>
            <div>Max People</div>
          </th>
          <th colSpan={2}>
            <div>Action</div>
          </th>
        </tr>
      </thead>
      <tbody>
        {currentRooms.map((room) => (
          <tr key={room._id}>
            <td>
              <input type='checkbox' />
            </td>
            <td>{room._id}</td>
            <td>{room.title}</td>
            <td>{room.desc}</td>
            <td>{room.price}</td>
            <td>{room.maxPeople}</td>
            <td>
              <button
                className='btn edit-btn'
                type='button'
                onClick={editHandler.bind(null, room._id)}
              >
                Edit
              </button>
            </td>
            <td>
              <button
                className='btn delete-btn'
                type='button'
                onClick={deleteHandler.bind(null, room._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}

        <tr>
          <td colSpan={8} />
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={6} />
          <td colSpan={2}>
            <div className='pagination'>
              <p>
                1{currentRooms.length > 1 ? `-${currentRooms.length}` : ''} of{' '}
                {rooms.total}
              </p>

              <button
                type='button'
                onClick={pageChangeHandler.bind(null, 'prev')}
              >
                <FaAngleLeft />
              </button>

              <button
                type='button'
                onClick={pageChangeHandler.bind(null, 'next')}
              >
                <FaAngleRight />
              </button>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default RoomList;
