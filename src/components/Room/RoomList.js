import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { host } from '../../store/store';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

// ==================================================

const RoomList = () => {
  const sendRequest = useHttp();
  const navigate = useNavigate();

  const [totalRoom, setTotalRoom] = useState(0);
  const [currentRooms, setCurrentRooms] = useState([]);
  const [page, setPage] = useState(1);

  const pageChangeHandler = (direction) => {
    if (direction === 'next') {
      setPage((prev) => prev + 1);
    } else {
      setPage((prev) => prev - 1);
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
        url: `${host}/admin/room/${roomId}`,
        method: 'DELETE',
      })
        .then((result) => {
          alert(result.message);

          window.location.reload(true);
        })
        .catch((err) => console.log(err));
    }
  };

  // Set total room
  useEffect(() => {
    sendRequest({ url: `${host}/admin/rooms` })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        setTotalRoom(result.length);
      })
      .catch((err) => console.log(err));
  }, [sendRequest]);

  // Render value theo page
  useEffect(() => {
    sendRequest({
      url: `${host}/admin/rooms?page=${page}&limit=9`,
    })
      .then((result) => {
        if (result.error) {
          setPage((prev) => prev - 1);

          return alert(result.message);
        }

        setCurrentRooms(result);
      })
      .catch((err) => console.log(err));
  }, [sendRequest, page]);

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
                {totalRoom}
              </p>

              <button
                type='button'
                onClick={pageChangeHandler.bind(null, 'prev')}
                disabled={page === 1}
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
