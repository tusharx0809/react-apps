import React, { useEffect, useContext } from "react";
import profileContext from "../context/Profile/ProfileContext";

const Transactions = () => {
  const { transactions, getTransactions } = useContext(profileContext);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

   const sortedTransactions = Array.isArray(transactions)
    ? transactions.sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  return (
    <div>
      <div>
        <div className="card" style={{ height: "351px", overflowY: "scroll" }}>
          <div className="card-body">
            <div className="d-flex justify-content-around">
              <div className="col-12">
                <p className="display-6">Transactions</p>
                <div className="table-responsive">
                  <table class="table w-100">
                    <thead>
                      <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Type</th>
                        <th scope="col">From</th>
                        <th scope="col">To</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date</th>
                      </tr>
                    </thead>
                    <tbody class="table-group-divider">
                      {sortedTransactions && sortedTransactions.length > 0 ? (
                        sortedTransactions.map((transaction, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <th>{transaction.type}</th>
                            <td>{transaction.from || "Checquings"}</td>
                            <td>{transaction.to || "Checquings"}</td>
                            <th>{transaction.amount}</th>
                            <td>
                              {new Date(transaction.date).toLocaleString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6">No transactions found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          .table-responsive {
            overflow-x: auto; 
          }
          .table td {
            word-wrap: break-word;
            word-break: break-word;
            white-space: normal; 
            max-width: 2000px;  
          }
          
          .table th {
            white-space: nowrap;
          }
        `}
      </style>
    </div>
  );
};

export default Transactions;
