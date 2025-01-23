import React, { useEffect, useContext } from "react";
import profileContext from "../context/Profile/ProfileContext";
import html2pdf from "html2pdf.js";


const Transactions = () => {
  const { transactions, getTransactions } = useContext(profileContext);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  const sortedTransactions = Array.isArray(transactions)
    ? transactions.sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  const handleDownloadPdf = () => {
    const element = document.getElementById("table-to-pdf");
    html2pdf().from(element).save("statements.pdf");
  };
  
  return (
    
      <div>
        <div className="card" style={{ height: "351px", overflowY: "scroll" }}>
          <div className="card-body">
            <div className="d-flex justify-content-around">
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <p className="display-6">Transactions</p>
                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    className="btn btn-outline-primary my-3"
                  >
                    Download &darr;
                  </button>
                </div>
                <div className="table-responsive">
                  <table id="table-to-pdf" className="table w-100">
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
                    <tbody className="table-group-divider">
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
    
  );
};

export default Transactions;
