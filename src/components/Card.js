import React,{useState} from "react";
import '../App.css';



const Card = ({
  Image,
  Name,
  Price,
  Symbol,
  id,
  rank,
  cur
}) => {
 
  return (
   <div className="parent">
     <form className="form-comp" key={id}>
      <div className="rank"><p>{`#${rank}`}</p></div>
       <h2>{`Name:${Name}`}</h2>
       <img src={Image} height="70" width="70"/>
      <h4>{`Price:${cur}${Price}`}</h4>
      <h4>{`Symbol:${Symbol}`}</h4>
     </form>
   </div>
   
  );
};

export default Card;