import { useContext, createContext, useState, useCallback } from 'react'
import { LoginContext } from './LoginContext'
import { useNavigate } from 'react-router-dom'
import { useRequest } from '../hooks/request.hook'
import axios from 'axios'

const OrderContext = createContext()

export const useOrder = () => {
	return useContext(OrderContext)
}

export const OrderProvider = ({children}) => {

	const navigate = useNavigate()

	const { request } = useRequest()

	const { token, userId } = useContext(LoginContext)

	const createOrder = useCallback( async(questId, form) => {
		const formData = new FormData()
		formData.append('questId', questId)
		formData.append('customer', userId)
		formData.append('type', form.status)
		formData.append('number', form.number)
		const response = await axios.post('/api/order/create', formData, {
			headers: {
				'Authorization': `Bearer ${token}`
			},
			withCredentials: true
		})

		navigate(`/orders/${userId}`)
		window.M.toast({ html: "Заявка успешно отправлена на рассмотрение "})
	}, [token, axios, userId, navigate, window.M.toast])

	const getUserOrders = useCallback( async(id) => {
		const response = await request('/api/order/get-user-orders', {id}, {
			'Authorization' : `Bearer ${token}`
		})

		return response
	}, [axios, token])

	const getUserById = useCallback( async(id) => {
		const response = await request('post', '/api/auth/get-user-by-id', {id}, {
			Authorization : `Bearer ${token}`
		})

		return response
	}, [axios, token])

	const getAllOrders = useCallback( async() => {
		const response = await request('get', '/api/order/get-all', null, {
			'Authorization' : `Bearer ${token}`
		})

		return response
	}, [axios, token])

	const blockOrder = async(id, bool) => {
		const response = await request('post', '/api/order/block-order', {id, bool}, {
			'Authorization': `Bearer ${token}`
		})

		window.M.toast({ html: response.message })
	}

	const approveOrder = useCallback( async(id, bool) => {
		const response = await request('post', '/api/order/approve-order', {id, bool}, {
			'Authorization' : `Bearer ${token}`
		})

		window.M.toast({ html: response.message })
	}, [axios, token])

	const value = {
		createOrder,
		getUserOrders,
		getUserById,
		blockOrder,
		approveOrder,
		getAllOrders
	}

	return (
		<OrderContext.Provider value={value}>
			{children}
		</OrderContext.Provider>
	)
}
