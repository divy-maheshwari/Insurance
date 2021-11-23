import React, { useState } from "react";

const Hadmin = ({account,HealthCare,Records}) => {
  const [id,setId] = useState(null);

  const handleClick = async (event) => {
    event.preventDefault();
    await HealthCare.methods.signRecord(id).send({ from: account});
  }

    return (
      <div className="container container-fluid login-conatiner">
        <div className="col-md-4">
          <h3 className="text-center">Hospital Admin</h3>
          <div className="login-form">
          <form onSubmit={e => handleClick(e)} autoComplete="off">
            <h4 className="text-center">Approve Medical Record</h4>
            <div className="form-group">
              <input
                type="number"
                onChange={event => setId(event.target.value)}
                className="form-control"
                placeholder="ID"
                required
              />
              <br />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Approve
              </button>
            </div>
            </form>
          </div>
        </div>
        <div className="col-md-6 col-md-offset-2">
          <div className="c-list">
            <h2 className="text-center">Records</h2>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Hospital Name</th>
                  <th>Sign Count</th>
                  <th>document</th>
                </tr>
              </thead>
              <tbody>
              {
                Records.map(record => {
                  return (
                    <tr key={record.id}>
                      <td>{record.id}</td>
                      <td>{record.patientName}</td>
                      <td>{record.date}</td>
                      <td>{record.hospitalName}</td>
                      <td>{record.signatureCount}</td>
                      <td><a href={`https://ipfs.infura.io/ipfs/${record.Hash}`} target="_blank">file</a></td>
                    </tr>
                  );
                })
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}

export default Hadmin;
