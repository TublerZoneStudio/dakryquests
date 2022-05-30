import cl from './DeleteQuest.module.sass'
import { useNavigate } from 'react-router-dom'
import rocket from '../../../images/rocket.png'

const DeleteQuest = () => {

	const navigate = useNavigate()

	return (
		<div className={cl.DeleteQuestContainer}>
			<div style={{textAlign: "center"}}>
				<img src={rocket} alt=""/>
				<br/>
				<p> Квест уcпешно удален! </p>
				<button className={`${cl.WaveBtn} waves-effect waves-light`} onClick={() => navigate('/quests')}>
					Вернутся обратно
				</button>
			</div>
		</div>
	)
}

export default DeleteQuest