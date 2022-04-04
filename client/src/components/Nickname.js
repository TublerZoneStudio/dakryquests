import React, {useState, useCallback, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {LoginContext} from '../context/LoginContext'
import 'materialize-css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery'

export const Nickname = ({ user }) => {
	const navigate = useNavigate()
	
	if(typeof user.nickname !== "undefined"){
		$('.inner').html(user.nickname)
	}else{
		$('.inner').html('Не авторизован')
	}
	
	if(user.user_status == 'admin'){
		$('.admin').show()
	} else {
		$('.admin').hide()
	}
	
	if(user.user_status == 'employee'){
		$('.employee').show()
	} else {
		$('.employee').hide()
	}
	
	if(user.user_status == 'participant'){
		$('.participant').show()
	} else {
		$('.participant').hide()
	}
	
	return(
		<>
			<span className="inner">{user.username}</span>
			<span className="admin"><FontAwesomeIcon style={{ marginLeft: "10px", color: "yellow" }} icon={ faStar } size={ "xs" }/></span>
			<span className="employee"><FontAwesomeIcon style={{ marginLeft: "10px" }} icon={ faUserTie } size={ "xs" }/></span>
			<span className="participant"><FontAwesomeIcon style={{ marginLeft: "10px" }} icon={ faUser } size={ "xs" }/></span>
		</>
	)
}

//<FontAwesomeIcon style={{ margin: "10px" }}icon={ faStar } size={ "xs" }/>