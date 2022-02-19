import React,{useState,useEffect} from 'react';
import Axios   from 'axios';
import './App.css';
import Card from './components/Card'


const currency=[
  'USD',
  'EUR',
  'CRC', 
  'GBP',
  'ILS', 
  'INR',
  'JPY',
  'KRW',
  'NGN',
  'PHP',
  'PLN',
  'PYG',
  'THB',
  'UAH',
  'VND'
]
var currency_symbols = {
  'USD': '$', // US Dollar
  'EUR': '€', // Euro
  'CRC': '₡', // Costa Rican Colón
  'GBP': '£', // British Pound Sterling
  'ILS': '₪', // Israeli New Sheqel
  'INR': '₹', // Indian Rupee
  'JPY': '¥', // Japanese Yen
  'KRW': '₩', // South Korean Won
  'NGN': '₦', // Nigerian Naira
  'PHP': '₱', // Philippine Peso
  'PLN': 'zł', // Polish Zloty
  'PYG': '₲', // Paraguayan Guarani
  'THB': '฿', // Thai Baht
  'UAH': '₴', // Ukrainian Hryvnia
  'VND': '₫', // Vietnamese Dong
};

function App() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [cur, setCur] = useState("inr");
  const [range, setRange] = useState(1);
  const [symbolt, setsymbolt] = useState("₹");
 
  useEffect(()=>{
    Axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=300&page=1&sparkline=flase#")
      .then((res)=>{
       setList(res.data);
      })
  },[])
  

   const filtered=list.filter((val)=>{
     return val.name.includes(search);
   })
  const Changes=()=>{
    setsymbolt(currency_symbols[cur.toUpperCase()])
    Axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${cur}&order=market_cap_desc&per_page=${range}&page=1&sparkline=flase#`)
      .then((res)=>{
       setList(res.data);
      })
      
  }
 
  return (
    <div className="App">
      <div className="search">
        <input placeholder="Solana...." className="input-space" type="text" onChange={(e)=>setSearch(e.target.value)}/>
        <div className="sub-input">
           <div className="drop">
             <select className="currency" 
             value={cur} onChange={(e)=>setCur(e.target.value)}>
              {currency.map((val)=>{
                return <option value={val}>{val}</option>
              })}
             </select>
           </div>
           <div className="input-group">
            <input placeholder="Range" onChange={(e)=>{setRange(e.target.value)}} type="number" min={1} max={250}/>
            <button className="btn btn-primary" onClick={Changes}>Go</button>
          </div>
        </div>
      </div>
      
      {filtered.map((val)=>{
        return(
          <Card
           rank={val.market_cap_rank.toString()} 
           id={val.id} Image={val.image}
            Name={val.name}
             Price={val.current_price}  
             Symbol={val.symbol}
             cur={symbolt}/>
        )
      })}
     <footer>&copy; Copyright 2022 HARIHARAN</footer>
    </div>
  );
}

export default App;
