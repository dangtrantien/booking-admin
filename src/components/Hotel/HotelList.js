import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useHttp from '../../hooks/use-http';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

// ==================================================

const HotelList = () => {
  const sendRequest = useHttp();
  const navigate = useNavigate();

  const [hotels, setHotels] = useState({});
  const [currentHotels, setCurrentHotels] = useState([]);
  const [page, setPage] = useState(1);

  const pageChangeHandler = (direction) => {
    if (direction === 'next') {
      setPage((prev) => (prev === hotels.result?.length ? 1 : prev + 1));
    } else {
      setPage((prev) => (prev === 1 ? hotels.result?.length : prev - 1));
    }
  };

  const editHandler = (hotelId) => {
    return navigate('/new-hotel', { replace: true, state: { hotelId } });
  };

  const deleteHandler = (hotelId) => {
    if (
      window.confirm("Are you sure? You won't be able to revert this!") === true
    ) {
      sendRequest({
        url: `https://booking-server-6rik.onrender.com/admin/hotel/${hotelId}`,
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
    sendRequest({
      url: 'https://booking-server-6rik.onrender.com/admin/hotels',
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        setHotels(result);
      })
      .catch((err) => console.log(err));
  }, [sendRequest]);

  // Render value theo page
  useEffect(() => {
    if (hotels.result) {
      setCurrentHotels(hotels.result[page - 1].result);
    }
  }, [hotels, page]);

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
            <div>Name</div>
          </th>
          <th>
            <div>Type</div>
          </th>
          <th>
            <div>Title</div>
          </th>
          <th>
            <div>City</div>
          </th>
          <th colSpan={2}>
            <div>Action</div>
          </th>
        </tr>
      </thead>
      <tbody>
        {currentHotels.map((hotel) => (
          <tr key={hotel._id}>
            <td>
              <input type='checkbox' />
            </td>
            <td>{hotel._id}</td>
            <td>{hotel.name}</td>
            <td>{hotel.type}</td>
            <td>{hotel.title}</td>
            <td>{hotel.city}</td>
            <td>
              <button
                className='btn edit-btn'
                type='button'
                onClick={editHandler.bind(null, hotel._id)}
              >
                Edit
              </button>
            </td>
            <td>
              <button
                className='btn delete-btn'
                type='button'
                onClick={deleteHandler.bind(null, hotel._id)}
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
                1{currentHotels.length > 1 ? `-${currentHotels.length}` : ''} of{' '}
                {hotels.total}
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

export default HotelList;
