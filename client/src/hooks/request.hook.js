import { useState, useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'
import axios from 'axios'

export const useRequest = (callback) => {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const { logout } = useContext(LoginContext)

	const request = useCallback( async(method = 'get', url, data = {}, headers = {}, params = {}) => {
		setLoading(true)
		try {
			const config = {
				method,
				url,
				data,
				headers,
				params
			}

			const response = await axios(config)

			return response.data
		} catch(e) {
			if(e.response.status === 401) {
				logout()
			}
		} finally {
			setLoading(false)
		}
		
	}, [axios, setLoading])

	return {request, loading}
}