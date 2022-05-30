import { useState, useEffect, useCallback} from 'react'
import { Link } from 'react-router-dom'
import { useQuest } from '../../context/QuestProvider'
import { useOrder } from '../../context/OrderProvider'
import Btn from '../../components/UI/Btn/Btn'
import SmallLoader from '../../components/UI/Loader/SmallLoader/SmallLoader'

const OrderListItem = ({defaultOrder, userStatus}) => {

	const [quest, setQuest] = useState(null)
	const [customer, setCustomer] = useState(null)
	const [order, setOrder] = useState(null)

	const { getUserById, blockOrder, approveOrder } = useOrder()

	const { getQuestById } = useQuest()

	const fetchQuest = useCallback( async() => {
		let quest = await getQuestById(defaultOrder.questId)
		let customer = await getUserById(defaultOrder.customer)

		setQuest(quest)
		setCustomer(customer)
	}, [getQuestById, getUserById])

	const setAndBlockOrder = async(bool) => {
		setOrder({...order, blocked: bool})

		await blockOrder(order._id, bool)
	}

	const setAndApproveOrder = async(bool) => {
		setOrder({...order, status: bool})
		await approveOrder(order._id, bool)
	}

	useEffect(() => {
		fetchQuest()
		setOrder(defaultOrder)
	}, [fetchQuest])

	if(!order) return <tr><td><SmallLoader notext/></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>

	return (
		<tr key={order._id}>
			{
				!quest || !customer 
					?
				 	<><td><SmallLoader notext/></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></>
					:
					<>
						<td>
							<Link to={`/quests/${quest._id}`}> {quest.title} </Link>
						</td>
						<td>
							{ order.code }
						</td>
						<td>
							{ order.type }
						</td>
						<td>
							{order.date}
						</td>
						<td>
							{ 
								userStatus === 'admin' 
									? 
									order.blocked
										? 
											<div style={{display: "grid", gap: "5px"}}>
												<span style={{color: "#ff4023"}}> Заблокировано </span>
												<Btn style={{background: "#ff4023"}} onClick={() => setAndBlockOrder(false)}> Отмена </Btn> 
											</div>
										:
										order.status 
											?
											<div style={{display: "grid", gap: "5px"}}>
												<span style={{color: "#54b44b"}}> Одобрено </span>
												<Btn style={{background: "#ff4023"}} onClick={() => setAndApproveOrder(false)}> Отменить </Btn> 
											</div>
											: 
											<div style={{display: "grid", gap: "5px"}}>
												<Btn style={{background: "#54b44b"}} onClick={() => setAndApproveOrder(true)}> Одобрить </Btn> 
												<Btn style={{background: "#ff4023"}} onClick={() => setAndBlockOrder(true)}> Заблокировать </Btn> 
											</div>
									: 
										order.blocked 	
											?
											<span style={{color: "#ff4023"}}> Заблокировано </span>
											:
											order.status
												? 
												<span style={{color: "#54b44b"}}> Одобрено </span> 
												:
												<span style={{color: "#ff4023"}}> Ожидает одобрения </span> 
							}
						</td>
						{
							userStatus === 'admin' &&
								<>
									<td> +{order.number} </td>
									<td> {customer.email} </td>
									<td> {customer.nickname} </td>
								</>
						}
					</>
			}
		</tr>
	)
}

export default OrderListItem