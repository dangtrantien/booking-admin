import { useState, useEffect } from 'react';

import useHttp from '../../hooks/use-http';
import { host } from '../../store/store';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

// ==================================================

const TransactionList = () => {
  const sendRequest = useHttp();

  const [totalTransaction, setTotalTransaction] = useState(0);
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const [page, setPage] = useState(1);

  const pageChangeHandler = (direction) => {
    if (direction === 'next') {
      setPage((prev) => prev + 1);
    } else {
      setPage((prev) => prev - 1);
    }
  };

  // Set total transaction
  useEffect(() => {
    sendRequest({
      url: `${host}/admin/transactions`,
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        setTotalTransaction(result.length);
      })
      .catch((err) => console.log(err));
  }, [sendRequest]);

  // Render value theo page
  useEffect(() => {
    sendRequest({
      url: `${host}/admin/transactions?page=${page}&limit=9`,
    })
      .then((result) => {
        if (result.error) {
          setPage((prev) => prev - 1);

          return alert(result.message);
        }

        setCurrentTransactions(result);
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
                of {totalTransaction}
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

export default TransactionList;
