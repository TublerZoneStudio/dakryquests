import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {SignInPage} from '../pages/SignInPage'

export const RedirectToSign = () => {
	console.log('dfsdsdf')
	return (
		<div>
			<SignInPage/>
		</div>
	)
}

