import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Btn from '../UI/Btn/Btn'
import RoundBtn from '../UI/RoundBtn/RoundBtn'
import { LoginContext } from '../../context/LoginContext'
import { useQuest } from '../../context/QuestProvider'
import cl from './QuestListItem.module.sass' 
import ThemesSelector from '../UI/ThemesSelector/ThemesSelector'

const QuestListItem = ({quest, update = false, setQuest = null, setQuestDef = null}) => {

	const navigate = useNavigate()

	const { userStatus } = useContext(LoginContext)

	const { deleteQuest, updateQuestData } = useQuest()

	if(update) {
		return (
			<div className={cl.QuestListItem} >
				<div className={cl.Banner}>
					<img src={`http://localhost:5000/${quest.banner}`} alt="none"/>
				</div>
				<div className={cl.Content}>
					<div className={cl.Header}>
						<div className={cl.Title}>
							<input name="title" onChange={setQuest} className={`${cl.UpdateInput} browser-default`} defaultValue={quest.title}/>
						</div>
						<span style={{fontFamily: 'Montserrat, sans-serif'}}><input name="description" onChange={setQuest} className={`${cl.UpdateInput} browser-default`} defaultValue={quest.description}/></span>
						<div style={{fontFamily: 'Montserrat, sans-serif'}}>
							<ThemesSelector form={quest} setForm={setQuestDef}/>
						</div>
					</div>
					<div className={cl.Body}>
						<div style={{display: 'flex'}}> Цена: <input name="price" onChange={setQuest} className={`${cl.UpdateInput} browser-default`} defaultValue={quest.price}/>грн.</div>
						<div style={{display: 'flex'}}> Начало: <input name="startsIn" onChange={setQuest} className={`${cl.UpdateInput} browser-default`} defaultValue={quest.startsIn}/></div>
						<div style={{display: 'flex'}}> Конец: <input name="endsIn" onChange={setQuest} className={`${cl.UpdateInput} browser-default`} defaultValue={quest.endsIn}/></div>
						<span> Статус: {!quest.status ? <span style={{color: "#FF4023"}}> Закрыт</span> : <span style={{color: "#54B44B"}}> Открыт </span> }</span>
					</div>
					<div style={{display: "flex", gap: "1rem"}}>
						<Btn onClick={() => updateQuestData(quest._id, quest)}>Сохранить изменения</Btn>
						<Btn>Отменить изменения</Btn>
					</div>
				</div>	
			</div>
		)
	}

	return (
		<div className={cl.QuestListItem} >
			<div className={cl.Banner}>
				<img src={`http://localhost:5000/${quest.banner}`} alt="none"/>
			</div>
			<div className={cl.Content}>
				<div className={cl.Header}>
					<div className={cl.Title}>
						<h2> {quest.title} </h2>
							{
								userStatus === 'admin' &&
								<span style={{display: "flex"}}>
									<RoundBtn onClick={() => navigate(`/quests/update/${quest._id}`)}>
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
											<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
											<path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
										</svg>
									</RoundBtn>
									<RoundBtn onClick={() => deleteQuest(quest._id)}>
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
											<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
										</svg>
									</RoundBtn>
								</span>
							}
					</div>
					<span style={{fontFamily: 'Montserrat, sans-serif'}}>{quest.description}</span>
					<div style={{fontFamily: 'Montserrat, sans-serif'}}>
						<ThemesSelector view={true} form={quest}/>
					</div>
				</div>
				<div className={cl.Body}>
					<span> Цена: {quest.price}грн. </span>
					<span> Начало: {quest.startsIn} </span>
					<span> Конец: {quest.endsIn} </span>
					<span> Статус: {!quest.status ? <span style={{color: "#FF4023"}}> Закрыт</span> : <span style={{color: "#54B44B"}}> Открыт </span> }</span>
				</div>
				<div className={cl.Footer}>
					<Btn onClick={() => navigate(`/quests/${quest._id}`)}>Подробнее</Btn>
				</div>
			</div>	
		</div>
	)
}

export default QuestListItem