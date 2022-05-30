import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useQuest } from '../../../context/QuestProvider'
import QuestListItem from '../../../components/QuestList/QuestListItem'

const UpdateQuest = () => {

	const [quest, setQuest] = useState([])
	const {id} = useParams()
	const { getQuestById } = useQuest()

	const fetchQuest = useCallback( async () => {
		let quest = await getQuestById(id)
		setQuest(quest)
	}, [getQuestById, setQuest])

	const changeHandler = e => {
		if(e.target.name === 'banner') {
			return setQuest({...quest,  [e.target.name]: e.target.files[0] })
		}

		setQuest({...quest,  [e.target.name]: e.target.value })
	}

	useEffect(() => {
		fetchQuest()
	}, [fetchQuest])

	if(!quest) return <h1> loading... </h1>

	return <QuestListItem update="true" quest={quest} setQuest={changeHandler} setQuestDef={setQuest}/>
}

export default UpdateQuest