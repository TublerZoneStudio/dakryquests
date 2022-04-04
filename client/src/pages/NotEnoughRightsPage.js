import React from 'react'
import {useNavigate} from 'react-router-dom'
import EnoughRights from '../images/cloud-computing.png'

export const NotEnoughRightsPage = () => {
	
	const navigate = useNavigate()
	return(
		<>
			<div style={{ textAlign: "center", color: "#fff" }}className="container register-main">
				<img src={EnoughRights}/>
				<p>У вас нет доступа к этой странице :(</p>
				<button className="create-btn waves-effect waves-component .waves-ripple" onClick={() => navigate('/public-tables')}>Вернутся обратно</button>
			</div>
		</>
	)	
}