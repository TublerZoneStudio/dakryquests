import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useOrder } from '../../context/OrderProvider'
import { useQuest } from '../../context/QuestProvider'
import ReactPhoneInput from "react-phone-input-2"
import 'react-phone-input-2/lib/material.css'
import Btn from '../../components/UI/Btn/Btn'
import Select from '../../components/UI/Select/Select'
import Loader from '../../components/UI/Loader/Loader'
import cl from './OrderPage.module.sass'

const OrderPage = () => {

	const [quest, setQuest] = useState(null)
	const [form, setForm] = useState(null)
	const [accept, setAccept] = useState(false)

	const {id} = useParams()
	const { getQuestById } = useQuest()
	const { createOrder } = useOrder()

	const changeHander = e => {
		setForm({...form, [e.target.name]: e.target.value})
	}

	const setStatus = status => {
		setForm({...form, "status": status})
	}

	const setNumber = value => {
		setForm({...form, "number": value})
	}

	const fetchQuest = useCallback( async() => {
		let quest = await getQuestById(id) 
		setQuest(quest)
	}, [getQuestById])

	useEffect(() => {
		fetchQuest()
	}, [fetchQuest])

	if(!quest) return <Loader/>

	return (
		<div className={cl.OrderPage}>
			<div className={cl.Content}>
				<div className={cl.Header}>
					<div className={cl.Title}>
						Оформление заявки об участии в частном мероприятии - <Link to={`/quests/${quest._id}`}> {quest.title} </Link>
					</div>
				</div>
				<div className={cl.Body}>
					<div className={cl.BlockTitle}>
						Контактная информация
					</div>
					<ReactPhoneInput
			          disableAreaCodes
			          placeholder="Номер телефона контактного лица"
			          onChange={value => setNumber(value)}
			          inputStyle={{
			            fontSize: "13px",
			            paddingLeft: "64px",
			            borderRadius: "5px",
			            boxSizing: "border-box"
			          }}
			          buttonStyle={{ borderRadius: "5px 0 0 5px" }}
			          dropdownStyle={{ width: "300px" }}
			        />
			        <div>
				        <Select 
							type="default" 
							desc="Статус"
							defaultValue={form ? form.status : "Не выбрано"}
							customStyles={{background: "transparent", border: "1px solid #23272a"}}
							options={
								[
									{value: "Простой", option: 'Простой'},
									{value: "VIP", option: 'VIP'}
								]
							}
							onChange={setStatus}
						/>
					</div>
					<label>
				      	<input type="checkbox" onChange={e => setAccept(e.target.checked)}/>
				       	<span>Я согласен с правилами пользования сервисом</span>
				    </label>
				    <Btn disabled={!accept} onClick={() => createOrder(quest._id, form)}>Готово</Btn>
				</div>
			</div>
		</div>
	)
}

export default OrderPage