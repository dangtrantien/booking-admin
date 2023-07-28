import { useState, useEffect } from 'react';

import useHttp from '../../hooks/use-http';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

// ==================================================

const UserList = () => {
  const sendRequest = useHttp();

  const [users, setUsers] = useState({});
  const [currentUsers, setCurrentUsers] = useState([]);
  const [page, setPage] = useState(1);

  const pageChangeHandler = (direction) => {
    if (direction === 'next') {
      setPage((prev) => (prev === users.result?.length ? 1 : prev + 1));
    } else {
      setPage((prev) => (prev === 1 ? users.result?.length : prev - 1));
    }
  };

  useEffect(() => {
    sendRequest({ url: 'https://booking-server-6rik.onrender.com/admin/users' })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        setUsers(result);
      })
      .catch((err) => console.log(err));
  }, [sendRequest]);

  // Render value theo page
  useEffect(() => {
    if (users.result) {
      setCurrentUsers(users.result[page - 1].result);
    }
  }, [users, page]);

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
            <div>Username</div>
          </th>
          <th>
            <div>Email</div>
          </th>
          <th>
            <div>Full Name</div>
          </th>
          <th>
            <div>Phone Number</div>
          </th>
          <th>
            <div>Card Number</div>
          </th>
        </tr>
      </thead>
      <tbody>
        {currentUsers.map((user) => (
          <tr key={user._id}>
            <td>
              <input type='checkbox' />
            </td>
            <td>{user._id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.fullName}</td>
            <td>{user.phoneNumber}</td>
            <td>{user.cardNumber}</td>
          </tr>
        ))}

        <tr>
          <td colSpan={7} />
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={6} />
          <td>
            <div className='pagination'>
              <p>
                1{currentUsers.length > 1 ? `-${currentUsers.length}` : ''} of{' '}
                {users.total}
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

export default UserList;
