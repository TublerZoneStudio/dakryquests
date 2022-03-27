import React, {useState, useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import 'materialize-css'
import $ from 'jquery' 
import no_results from '../images/inbox.png'

export const TokensList = ({ tokens }) => {
	
	if (!tokens.length) {
		return(
			<div style={{ textAlign: "center", color: "#fff" }}className="tokens-noop container register-main">
				<img src={no_results}/>
				<p>У вас еще нет не одного токена :(</p>
			</div>
		)
	}
	
	return(
		<>
			{tokens.map((token) => {
				var cons = "li-" + token._id
				var token_status = ""
				
				if(!token.status){
					token_status += "dot red"
				} else {
					token_status += "dot green"
				}
				
				return (
					<li key={token._id} id={cons} className="li collection-item"><div className="token-inner">{token.token}</div>
						<div className="dot-inner"><div className={token_status}></div></div>
						<div>
							<button className={token._id} style={{ background: "transparent", border: "none" }} className="li-del-btn">
								<svg style={{width: "17px", height: "17px"}} className="component-color" viewBox="0 0 24 24" ><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"></path></svg>
							</button>
							<button className="li-copy-btn">
								<svg style={{width: "15px", height: "15px"}} className="component-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path></svg>
							</button>
						</div>
					</li>
				)
			})}
		</>
	)
}