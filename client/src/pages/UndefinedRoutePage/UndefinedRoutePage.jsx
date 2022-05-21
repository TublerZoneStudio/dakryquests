import undefinedroute from '../../images/undefined-route.png'
import cl from './UndefinedRoutePage.module.sass'

const UndefinedRoutePage = () => {
	return (
		<div className={cl.Undefined}>
			<div className={cl.Content}>
				<img src={undefinedroute} alt=""/>
				<p>Вы перешли на неизвестую страницу</p>
			</div>
		</div>
	)
}

export default UndefinedRoutePage