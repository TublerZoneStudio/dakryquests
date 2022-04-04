import React, {useState, useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import 'materialize-css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

export const MessagesList = ({ messages }) => {
	
	const navigate = useNavigate()
	
	return(
		<>
			<div className="tl-title">
				<h2> Доска объявлений</h2>
				<hr style={{ width: "500px" }}className="styled-hr"></hr>
			</div>
			<div className="container bill-container">
				{ messages.map((message) => {
					return (
						<div key={message._id} className="message-inner">
							<div className="title-content">
								<div className="envelope-inner">
									<FontAwesomeIcon style={{color: "var(--fg)" }} icon={ faEnvelope } size="2x"/>
								</div>
								<div className="message">
									<div className="message-title">
										<strong className="strong-f">{message.owner_nickname}</strong> <strong className="strong-p">{message.title}</strong>{message.create_date}
									</div>
									<div className="message-desc">
										{message.desc}
									</div>
								</div>
							</div>
						</div>
					)
				})}
			</div> 
		</>
	)				
}