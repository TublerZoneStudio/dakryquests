import cl from './Loader.module.sass'

const Loader = () => {
	return (
		<div className={cl.loader__inner}>
			<div className={cl.loader}></div>
			Загрузка...
		</div>
	)
}	

export default Loader