import React,{useState,useEffect} from 'react';
import HealthCare from './build/contracts/HealthCare.json';
import Patient from './patient'
import Hadmin from './hadmin'
import Labadmin from './ladmin'
import Insurance from './insurance'
import Web3 from 'web3';


function App() {
    const [account,setAccount] = useState("0x000000000000000000000");
    const [healthcare,setHealthCare] = useState(null);
    const [records,setRecords] = useState([]);
  
  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  },[]);
    async function loadWeb3() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
      }
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
      }
      else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    }
    async function loadBlockchainData() {
      const web3 = window.web3
      // Load account
      const accounts = await web3.eth.getAccounts()
      setAccount(accounts[0]);
      // Network ID
      const networkId = await web3.eth.net.getId()
      const networkData = HealthCare.networks[networkId]
      if(networkData) {
        const Care = new web3.eth.Contract(HealthCare.abi, networkData.address)
        setHealthCare(Care);
        console.log(healthcare);
        const imageCount = await Care.methods.imageCount().call();
        for(let i = 1; i <= imageCount; i++) {
            const record = await Care.methods.records(i).call()
            setRecords([...records, record])
          }

      } else {
        window.alert('Decentragram contract not deployed to detected network.')
      }
    }

    return (
        <div>
          <header className="App-header">
          <h1 className="App-title text-center">HealthCare Insurance</h1>
        </header>
          {account === "0x473Fa39c53C48d23622DDF219b210FfE4EA546F3" ? 
          <div>
            <Insurance Records={records}/>
          </div> :
          account === "0x06e8A48a3bDEc373a2b702A467D03bc4B1ac6146" ?
          <div>
            <Hadmin account={account} HealthCare={healthcare} Records={records}/>
          </div> :
          account === "0x3a18eb97AbaFF86a088A218972Bd4B8F437b6B2e" ?
          <div>
            <Labadmin account={account} HealthCare={healthcare} Records={records}/>
          </div> :
          account === "0x2bE3F56E06212730F5E04eb5666C503cEC817f93" ?
          <div>
            <Patient account={account} HealthCare={healthcare}/>
          </div> :
          <div>
            <h1 style={{textAlign:"center"}}>connect your account with MetaMask </h1>
            </div>
          }
        </div>
    
      );
}

    export default App;
