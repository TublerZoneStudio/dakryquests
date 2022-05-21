import BillboardMessage from './BillboardMessage/BillboardMessage'

const BillboardMesages = ({messages, deleteFunc}) => {
	return (
		<>
			{
				messages.map((message) => 
					<BillboardMessage key={message._id} message={message} deleteFunc={deleteFunc}/>
				)
			}
		</>
	)
}

export default BillboardMesages