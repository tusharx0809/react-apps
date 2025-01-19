import React, { useEffect, useContext } from "react";
import profileContext from "../context/Profile/ProfileContext";

const Transactions = () => {
  const { transactions, getTransactions } = useContext(profileContext);

  useEffect(() => {
    getTransactions();
    console.log(transactions);
  }, []);

  return (
    <div>
      <div>
        <div className="card" style={{height:"351px"}}>
          <div className="card-body">
            <div className="d-flex justify-content-around">
              <div className="col-12">
                <h3 className="display-6">Transactions</h3>
                <div className="table-responsive">
                <table class="table w-100">
  <thead>
    <tr>
      <th scope="col">Type</th>
      <th scope="col">From</th>
      <th scope="col">To</th>
      <th scope="col">Amount</th>
      <th scope="col">Date</th>
    </tr>
  </thead>
  <tbody class="table-group-divider">
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
  </tbody>
</table></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
