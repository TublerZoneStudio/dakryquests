import React, {useState, useCallback, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {LoginContext} from '../context/LoginContext'
import 'materialize-css'
import $ from 'jquery'

export const Nickname = ({ user }) => {
	const navigate = useNavigate()
	
	var username = ""
	
	if(typeof user.nickname !== "undefined"){
		username += user.nickname
	}else{
		$('.inner').html('Не авторизован')
	}
	  
	return(
		<div className="inner">{username}</div>
	)
}