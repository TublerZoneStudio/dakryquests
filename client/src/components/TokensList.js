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
						<div >{token.token_type}</div>
						<div>
							<button id={token._id} style={{ background: "transparent", border: "none" }} className="li-redact-btn">
								<svg style={{width: "13px", height: "13px"}} className="component-color" preserveAspectRatio="none" viewBox="0 0 100 100">
									<path d="M 0 79.2846 L 0 100 L 20.7154 100 L 81.8031 38.9081 L 61.0919 18.1969 L 0 79.2846 Z M 97.8208 22.8904 C 99.9764 20.7411 99.9764 17.2513 97.8208 15.102 L 84.898 2.1792 C 82.7487 0.0236 79.2589 0.0236 77.1096 2.1792 L 67.0016 12.2851 L 87.7149 32.9984 L 97.8208 22.8904 Z"></path>
								</svg>
							</button>
						</div>
					</li>
				)
			})}
		</>
	)
}