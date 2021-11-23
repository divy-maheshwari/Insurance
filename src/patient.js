import React, { useState } from "react";
import { create } from 'ipfs-http-client'
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const Patient = ({account,HealthCare}) => {
  const [buffer,setBuffer] = useState(null);
  const [hname,setHname] = useState('');
  const [pname,setPname] = useState('');
  const [dDate,setDdate] = useState(null);


  const captureFile = (e) => {
    const file = e.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      setBuffer(Buffer(reader.result));
      console.log('buffer',buffer);
    }
  }

  const handleClick = async(e) => {
    e.preventDefault();
    console.log("Submitting file to ipfs...")
    //adding file to the IPFS
    const result = await ipfs.add(buffer);
    console.log(result);
    await HealthCare.methods.newRecord(result.path,pname,hname,dDate).send({from:account});
  }
    return (
      <div className="container container-fluid login-conatiner">
        <div className="col-md-4">
          <div className="login-form">
            <form onSubmit={e => handleClick(e)} autoComplete="off">
              <h2 className="text-center">New Record</h2>
              <div className="form-group">
                <input
                  type="text"
                  onChange={e => setPname(e.target.value)}
                  className="form-control"
                  placeholder="Patient Name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  onChange={e => setHname(e.target.value)}
                  className="form-control"
                  placeholder="Hospital Name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="Date"
                  onChange={e => setDdate(e.target.value)}
                  className="form-control"
                  placeholder="Date"
                  required
                />
              </div>
              <div className="form-group">
                <input 
                  type = 'file' accept=".jpg, .jpeg, .png, .bmp, .gif"
                  onChange={e => captureFile(e)}
                  className="form-control"
                  placeholder="Date"
                  required
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  Submit
                </button>
              </div>
              <div className="clearfix" />
            </form>
          </div>
        </div>
      </div>
    );
  }

  export default Patient;