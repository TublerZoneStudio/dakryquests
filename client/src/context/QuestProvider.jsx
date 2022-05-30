import { useContext, createContext, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from './LoginContext'
import { useHttp } from '../hooks/http.hook'
import { useRequest } from '../hooks/request.hook'
import axios from 'axios'

const QuestContext = createContext()

export const useQuest = () => {
	return useContext(QuestContext)
}

export const QuestProvider = ({children}) => {

	const navigate = useNavigate()

	const { request, loading } = useRequest()

	const { auth, token, userId } = useContext(LoginContext)

	const createQuest = useCallback( async (form) => {
		const formData = new FormData()
		formData.append('banner',form.banner)
		formData.append('price',form.price)
		formData.append('title',form.title)
		formData.append('description',form.description)
		formData.append('startsIn', form.startsIn)
		formData.append('endsIn', form.endsIn)
		formData.append('themes', JSON.stringify(form.themes))

		await request('post', '/api/quest/create', formData, {
	        "Authorization": `Bearer ${token}`,
	        "Content-Type": "multipart/form-data",
	    }) 

		navigate('/quests')
	}, [axios, navigate, token, request])

	const deleteQuest = useCallback( async (questId) => {
		await request('post', '/api/quest/delete', {questId}, {
			"Authorization": `Bearer ${token}`
		})

		await request('post', '/api/order/delete-by-questid', {questId}, {
			'Authorization': `Bearer ${token}`
		})

		navigate(`/quests/delete/${questId}`)
	}, [axios, token, navigate, request])

	const getQuestById = useCallback( async(questId) => {
		const response = await request('post', '/api/quest/get-by-id', {questId}, {
			"Authorization": `Bearer ${token}`
		})

		return response
	}, [axios, token, request])

	const updateQuestData = useCallback( async(questId, questData) => {
		const response = await request('post', '/api/quest/update-quest-data', {questId, questData}, {
			"Authorization" : `Bearer ${token}`
		})

		navigate(`/quests`)
		window.M.toast({ html: "Данные квеста успешно обновлены."})
	}, [axios, token, navigate, window.M.toast, request])

	const addFeedbackToQuest = useCallback( async(questId, feedback) => {
		const response = await request('post', '/api/quest/add-feedback', {questId, feedback}, {
			'Authorization' : `Bearer ${token}`
		})

		return response
	}, [token, axios])

	const getUserById = useCallback( async(userId) => {
		const response = await request('post', '/api/auth/get-user-by-id', {id: userId}, {
			"Authorization" : `Bearer ${token}`
		})

		return response
	}, [axios, token, request])

	const getQuests = useCallback( async(limit, page) => {
		const response = await request('get', '/api/quest/quests', null, {
			"Authorization" : `Bearer ${token}`
		}, {
			limit,
			page
		})

		return response
	}, [axios, token, request])

	const value = {
		getUserById,
		createQuest,
		getQuests,
		deleteQuest,
		getQuestById,
		updateQuestData,
		addFeedbackToQuest,
		loading
	}

	return (
		<QuestContext.Provider value={value}>
			{children}
		</QuestContext.Provider>
	)
}