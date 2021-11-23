import React from 'react';

 const Insurance = ({Records}) => {
     return (
      <div className="col-md-12">
      <h3  className="text-center">Insurance Page</h3>
      <div className="c-list">
      <h2 className="text-center">Approved Records</h2>
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
     );
   }

export default Insurance;
