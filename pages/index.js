import Head from "next/head"
import { useState } from "react"
import { useEffect } from "react";
import { useRouter } from "next/router";


export default function Home() {
  
  const [fileHistory, setFileHistory] = useState([]);
  const [battlegrounds, setBattlegrounds] = useState(["politicalMonster", "poetry", "meetup"]);

  const [randomLink, setRandomLink] = useState("/bitecrowds/snippetzone");

  useEffect(() => {
    let fileHistoryLocal = JSON.parse(localStorage.getItem("fileHistory") || "[]");
    if(fileHistoryLocal.length) {
      console.log("setting", fileHistoryLocal)
      setFileHistory(fileHistoryLocal);
    }

    setRandomLink("/bitecrowds/" + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 7));
  }, [])
  

  return (
    <>
      <Head>
        <title>Bitecrowds - Landing</title>
        <link rel="stylesheet" href="https://cdn.rawgit.com/Chalarangelo/mini.css/v3.0.1/dist/mini-default.min.css"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </Head>
      <div className="container">
        <header>
          <a href="#" className="logo">Bitecrowds</a>
          <a href={randomLink} className="button">Share a snippet</a>
          <a href="#" className="button">Contact us</a>
      </header>
      <div className="row">
        <div className="col-sm"></div>
        <div className="col-sm-10">
          <h1>Bitecrowds<small>Code-sharing fast and easy</small></h1>
        </div>
        <div className="col-sm"></div>
      </div>
      <div className="row">
        <div className="col-sm"></div>
        <div className="col-sm-10">
          <p>Share <kbd>code</kbd> with your <code>friends</code>, and<code>colleagues</code> faster than ever before.</p>
          <pre>{`function equals(P, NP){
  return Math.random(0, 1);
}`}</pre>
        </div>
        <div className="col-sm"></div>
      </div>
      <div className="row">
        <div className="col-sm"></div>
        <div id="shareasnip" className="col-sm-10">
          <a href={randomLink} className="button secondary">
            Share a snippet now!
          </a>
        </div>
        <div className="col-sm"></div>
      </div>
      <div className="row">
        <div className="col-sm">
        </div>
        {/* <div className="col-sm-10"> */}
          <div className="card">
            <h4>Live code sharing <small>Live code editor that is focused on speed.</small></h4>
          </div>
          <div className="card">
            <h4>Syntax highlighting <small>Syntax highlighting for multiple languages.</small></h4>
          </div>
          <div className="card">
            <h4>Platform independent<small>Works cross platform.</small></h4>
          </div>
          <div className="card">
            <h4>Minimal memory consuption<small>Small memory footprint.</small></h4>
          </div>
        {/* </div> */}
        <div className="col-sm"></div>
      </div>
      <div className="row">
        <div className="col-sm"></div>
        <div className="col-sm-10">
          <h2>File history<small>Files you accessed before</small></h2>
        </div>
        <div className="col-sm"></div>
      </div>
        
      <div className="row">
        <div className="col-sm"></div>
          <div className="col-sm-10">
            {fileHistory.length > 0 && 
              <nav>
                {fileHistory.map((el, idx) => {
                  return (<a key={idx} href={"/bitecrowds/" + el}>{ idx + 1 + ". " + el}</a>)
                })}
              </nav>
            }
            {fileHistory.length === 0 && <p>No file history.</p>}
          </div>
          <div className="col-sm"></div>
      </div>
      <div className="row">
        <div className="col-sm"></div>
        <div className="col-sm-10">
          <h2>Public battlegrounds<small>Files where you can fight for what matters.</small></h2>
        </div>
        <div className="col-sm"></div>
      </div>
      <div className="row">
        <div className="col-sm"></div>
          <div className="col-sm-10">
            {battlegrounds.length > 0 && 
              <nav>
                {battlegrounds.map((el, idx) => {
                  return (<a key={idx} href={"/bitecrowds/" + el}>{ idx + 1 + ". " + el}</a>)
                })}
              </nav>
            }
            {battlegrounds.length === 0 && <p>No battlegrounds available today.</p>}
          </div>
          <div className="col-sm"></div>
      </div>
      <footer className="stiky">
        <p>Website created by <a href="">Tudor Zgimbau</a> and <a href="https://www.linkedin.com/in/mihai-cosmin-ivanov-4136a9195">Ivanov Mihai Cosmin.</a></p>
        <p>Contact us</p>
      </footer>
      </div>
    </>
  )
}
