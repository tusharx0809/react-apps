import React, { useEffect, useContext } from "react";
import profileContext from "../context/Profile/ProfileContext";

const Transactions = () => {
  const { transactions, getTransactions, user } = useContext(profileContext);

  useEffect(() => {
    getTransactions();
    console.log(transactions);
  }, []);

  return (
    <div>
      <div>
        <div className="card" style={{height:"351px", overflowY:"scroll"}}>
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
    {transactions && transactions.length > 0 ? (
        transactions.map((transaction, index)=>(
            <tr key={index}>
                <th>{index + 1}</th>
                <td>{transaction.type}</td>
                <td>{transaction.from || "Self"}</td>
                <td>{transaction.to || "Self"}</td>
                <th>{transaction.amount}</th>
                <td>{transaction.date}</td>
            </tr>
        )) 
    ):(<tr>
        <td colSpan="6">No transactions found</td>
      </tr>)}
  </tbody>
</table></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          .table-responsive {
            overflow-x: auto; /* Keep responsiveness */
          }
          .table td,  {
            word-wrap: break-word;
            word-break: break-word;
            white-space: normal; /* Enable text wrapping */
          }
        `}
      </style>
    </div>
  );
};

export default Transactions;
