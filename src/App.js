import { useState } from 'react';
import './App.css';
import React from 'react';


//Starting form 23th March 2021
let startDate = new Date("2021-3-23");
let todayDate = new Date();

let diffInDays = Math.ceil((todayDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));

//Calculating MaxDate
var dd = todayDate.getDate();
var mm = todayDate.getMonth() + 1;

if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}

let maxDate = todayDate.getFullYear() + '-' + mm + '-dd';


function App() {

  const [tweetMessage, tweetMsgHandler] = useState(`Day ${diffInDays} of #Devsnest6monthsChallenge\n`);

  const [tweetTag, tweetTagHandler] = useState('\n#Devsnest');

  const [tweetSize, tweetSizeHandler] = useState(44);

  const [dateValue, dateValueHandler] = useState("2021-03-23");

  const dateHandler = (event) => {
    let value = event.target.value;

    dateValueHandler(value);

    startDate = new Date(value);

    diffInDays = Math.ceil((todayDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));

    let changeDateText = { target: { value: "" } };
    msgHandler(changeDateText);
  }

  const msgHandler = (event) => {
    let msgTweet = `Day ${diffInDays} of #Devsnest6monthsChallenge\n`;
    msgTweet += `${event.target.value}`;
    tweetMsgHandler(msgTweet);
    tweetSizeHandler(msgTweet.length + tweetTag.length);
  }

  const tagHandler = (event) => {
    let msgTag = tweetTag;
    if (!msgTag.includes(event.target.innerText)) {
      msgTag += ` ${event.target.innerText}`;
    }
    tweetTagHandler(msgTag);
    tweetSizeHandler(tweetMessage.length + msgTag.length);
  }

  const sendTweet = () => {
    let finalMessage = encodeURIComponent(tweetMessage + tweetTag);
    let twitterUrl = `https://twitter.com/intent/tweet?text=${finalMessage}`;
    window.open(twitterUrl, "_blank");
  }



  return (
    <div className="App">
      <h1>Tweet your Daily Progress on #Devsnest6MonthsChallenge</h1>
      <br></br>
      <div className="data-section">
        <div>
          Start date: <input className="inpt-startDate" type='date' value={dateValue} onChange={dateHandler} min="2021-01-01" max={maxDate}></input>
        </div>

        <br />
        <textarea className="txt-tweet" placeholder="Enter the tweet message here" onChange={msgHandler}></textarea>

        <br />
        <div className='btn-section'>

          <button className="btn-tag" type="button" onClick={tagHandler}>#JavaScript</button>

          <button className="btn-tag" type="button" onClick={tagHandler}>#ReactJS</button>

          <button className="btn-tag" type="button" onClick={tagHandler}>#DevsnestChallenge</button>

          <button className="btn-tag" type="button" onClick={tagHandler}>#100daysofcode</button>

          <button className="btn-tag" type="button" onClick={tagHandler}>#DSA</button>

        </div>
        <br />

        <div className="data-section">
          <h3>⬇ Preview of your tweet ⬇</h3>

          <pre className="txt-output">{tweetMessage}</pre>

          <p>{tweetTag}</p>
          
          <h4 className={tweetSize <= 280 ? "limit-tweet" : "limit-exceed"}>Limit : {tweetSize}/280</h4>
        </div>
        <br />
        <span className="btn-tweet" onClick={sendTweet}>Tweet <img src="https://raw.githubusercontent.com/anuraghazra/anuraghazra/master/assets/twitter.svg"alt="Tweet-Logo" /></span>
        <br />
      </div>
  
    </div>
  );
}

export default App;
