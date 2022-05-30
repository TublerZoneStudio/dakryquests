import { useState, useEffect, useCallback } from 'react'
import { useQuest } from '../../../context/QuestProvider'
import { useParams } from 'react-router-dom'
import QuestDetails from '../../../components/QuestList/QuestDetails/QuestDetails'
import Loader from '../../../components/UI/Loader/Loader'

const QuestDetailsPage = () => {

	const [quest, setQuest] = useState()

	const {id} = useParams()

	const { getQuestById } = useQuest()

	const fetchQuest = useCallback( async() => {
		let quest = await getQuestById(id).then(setQuest)
	}, [getQuestById])

	useEffect(() => {
		fetchQuest()
	}, [fetchQuest])

	if(!quest) return <Loader/>

	return <QuestDetails quest={quest}/>
}

export default QuestDetailsPage 