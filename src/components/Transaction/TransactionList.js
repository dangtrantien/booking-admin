import { useState, useEffect } from 'react';

import useHttp from '../../hooks/use-http';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

// ==================================================

const TransactionList = () => {
  const sendRequest = useHttp();

  const [transactions, setTransactions] = useState({});
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const [page, setPage] = useState(1);

  const pageChangeHandler = (direction) => {
    if (direction === 'next') {
      setPage((prev) => (prev === transactions.result?.length ? 1 : prev + 1));
    } else {
      setPage((prev) => (prev === 1 ? transactions.result?.length : prev - 1));
    }
  };

  useEffect(() => {
    sendRequest({
      url: 'https://booking-server-6rik.onrender.com/admin/transactions',
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        setTransactions(result);
      })
      .catch((err) => console.log(err));
  }, [sendRequest]);

  // Render value theo page
  useEffect(() => {
    if (transactions.result) {
      const newResult = transactions.result[page - 1].result?.map((resData) => {
        const newRoomList = resData.room?.map((r) => r.roomNumber);

        return { ...resData, room: newRoomList };
      });

      setCurrentTransactions(newResult);
    }
  }, [transactions, page]);

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
            <div>User</div>
          </th>
          <th>
            <div>Hotel</div>
          </th>
          <th>
            <div>Room</div>
          </th>
          <th>
            <div>Date</div>
          </th>
          <th>
            <div>Price</div>
          </th>
          <th>
            <div>Payment Method</div>
          </th>
          <th>
            <div>Status</div>
          </th>
        </tr>
      </thead>
      <tbody>
        {currentTransactions.map((transaction) => (
          <tr key={transaction._id}>
            <td>
              <input type='checkbox' />
            </td>
            <td>{transaction._id}</td>
            <td>{transaction.user?.username}</td>
            <td>{transaction.hotel?.name}</td>
            <td>{transaction.room.join(', ')}</td>
            <td>
              {transaction.dateStart} - {transaction.dateEnd}
            </td>
            <td>${transaction.price}</td>
            <td>{transaction.payment}</td>
            <td>
              <div
                className={
                  transaction.status === 'Booked'
                    ? 'status booked'
                    : transaction.status === 'Checkin'
                    ? 'status checkin'
                    : 'status checkout'
                }
              >
                {transaction.status}
              </div>
            </td>
          </tr>
        ))}

        <tr>
          <td colSpan={9} />
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={7} />
          <td colSpan={2}>
            <div className='pagination'>
              <p>
                1
                {currentTransactions.length > 1
                  ? `-${currentTransactions.length}`
                  : ''}{' '}
                of {transactions.total}
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

export default TransactionList;
