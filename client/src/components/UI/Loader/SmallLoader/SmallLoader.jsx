import cl from './SmallLoader.module.sass'

const SmallLoader = ({notext}) => {
	return (
		<div className={cl.loader__inner}>
			<div className={cl.loader}></div>
			{ !notext && <span> Загрузка... </span> }
		</div>
	)
}	

export default SmallLoader