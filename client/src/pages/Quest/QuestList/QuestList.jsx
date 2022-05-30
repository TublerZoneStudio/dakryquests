import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useQuest } from '../../../context/QuestProvider'
import { useHttp } from '../../../hooks/http.hook'
import QuestListItem from '../../../components/QuestList/QuestListItem'
import Select from '../../../components/UI/Select/Select'
import Loader from '../../../components/UI/Loader/Loader'
import { useObserver } from '../../../hooks/observer.hook'
import SmallLoader from '../../../components/UI/Loader/SmallLoader/SmallLoader'
import cl from './QuestList.module.sass'

const QuestList = () => {

	const { getQuests } = useQuest()

	const [quests, setQuests] = useState([])
	const [sort, setSort] = useState('title')
	const [searchQuery, setSearchQuery] = useState('')
	const [page, setPage] = useState(-1)
	const [limit, setLimit] = useState(5)
	const [loading, setLoading] = useState(false)
	const [canLoad, setCanLoad] = useState(true)
	const obsElement = useRef()

	const searchedQuests = useMemo(() => {
		switch(sort) {
			case 'title':
				return quests.filter(quest => quest.title.toLowerCase().includes(searchQuery))
			case 'description':
				return quests.filter(quest => quest.description.toLowerCase().includes(searchQuery))
			case 'price':
				return quests.filter(quest => quest.price > searchQuery)
		}
	}, [searchQuery, quests, sort])

	const defineSort = sort => {
		switch(sort) {
			case 'title':
				return 'названию'
			case 'description':
				return 'описанию'
			case 'price':
				return 'цене'
		}
	}

	const fetchPosts = async (limit, page) => {
		setLoading(true)
		try {
			const response = await getQuests(limit, page)
			if(!response.length) {
				setCanLoad(false)
			} else {
				setQuests([...quests, ...response])
			}
		} catch(e) {
			window.M.toast({ html: "Произошла непредвиденная ошибка" })
		} finally {
			setLoading(false)
		}
	}

	useObserver(obsElement, canLoad, loading, () => {
		setPage(page + 1)
	})

	useEffect(() => {
		fetchPosts(limit, page)
	}, [page])


	if(!quests) return <Loader/>

	return (
		<div className={cl.QuestList}>
			<div className={cl.FilterBar}>
				<div style={{width: "100%"}}>
					<Select 
						type="default" 
						desc="Поиск по"
						defaultValue={defineSort(sort)}
						options={
							[
								{value: 'title', option: 'По названию'},
								{value: 'description', option: 'По описанию'},
								{value: 'price', option: 'По цене'},
							]
						}
						onChange={setSort}
					/>
				</div>
				<input className={`${cl.FilterInput} browser-default`} placeholder="Введите что-нибудь" onChange={e => setSearchQuery(e.target.value)}/>
			</div>
			{
				searchedQuests && searchedQuests.map((quest) => {
					return (
						<QuestListItem quest={quest} key={quest._id}/>
					)
				})
			}
			<div style={{display: "flex", justifyContent: "center"}} ref={obsElement}>
			{
				canLoad 
					?	
					<SmallLoader/>
					:
					<p> Квестов больше нет </p>
			}
			</div>
		</div>
	)
}

export default QuestList