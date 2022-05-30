import { useState, useEffect, useCallback, useContext } from 'react'
import cl from './OrderList.module.sass'
import { LoginContext } from '../../../context/LoginContext'
import { useOrder } from '../../../context/OrderProvider'
import OrderListItem from '../../../components/OrderList/OrderListItem'
import Loader from '../../../components/UI/Loader/Loader'

const OrderList = () => {

	const [orders, setOrders] = useState([])

	const { userId, userStatus } = useContext(LoginContext)

	const { getUserOrders, getAllOrders } = useOrder()

	const fetchOrders = useCallback( async () => {
		if(userStatus === 'admin') {
			let orders = await getAllOrders()

			return setOrders(orders)
		}
		let orders = await getUserOrders(userId)

		setOrders(orders)
	}, [getUserOrders, getAllOrders])

	useEffect(() => {
		fetchOrders()
	}, [])

	if(!orders) return <Loader/>

	return (
		<div className={cl.OrderList}>
			<table className="striped centered">
				<thead>
					<tr>
						<th> Квест </th> 
						<th> Код заказа </th>
						<th> Тип заказа </th>
						<th> Дата оформления </th>
						<th> Статус заказа </th>
						{
							userStatus === 'admin' &&
								<>
									<th> Номер телефона </th>
									<th> Email </th>
									<th> Имя </th>
								</>
						}
					</tr>
				</thead>
				<tbody>
					{
						orders.map((order) => 
							<OrderListItem defaultOrder={order} userStatus={userStatus} key={order._id}/>
						)
					}
				</tbody>
			</table>
		</div>
	)
}

export default OrderList