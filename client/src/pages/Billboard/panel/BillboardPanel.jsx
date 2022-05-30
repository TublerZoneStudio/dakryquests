import {useState} from 'react'
import cl from './BillboardPanel.module.sass'
import Btn from '../../../components/UI/Btn/Btn'
import GoogleInput from '../../../components/UI/Input/GoogleInput/GoogleInput'

const BillboardPanel = ({createBillboardMessage}) => {

	const [title, setTitle] = useState(null)
	const [description, setDescription] = useState(null)

	const CreateBillboardMessage = () => {
		createBillboardMessage(title, description)
		setTitle('')
		setDescription('')
	}

	return (
		<div className={cl.BillboardPanel}>
			<div className={cl.PanelIconInner}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
				  <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z"/>
				  <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z"/>
				</svg>
			</div>
			<div className={cl.InputInner}>
				<div>
					<GoogleInput type="text" onChange={e => setTitle(e.target.value)} label="Введите заголовок объявления" defVal={title}/>
				</div>
				<div>
					<GoogleInput type="text" onChange={e => setDescription(e.target.value)} label="Введите описание объявления" defVal={description}/>
				</div>
				<Btn 
					onClick={() => CreateBillboardMessage()}
				>
					Создать сообщение
				</Btn>
			</div>
		</div>
	)
}

export default BillboardPanel