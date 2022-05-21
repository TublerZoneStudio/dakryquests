import cl from './Loader.module.sass'

const Loader = () => {
	return ( 
		<div className={cl.Inner}>
			<div className={cl.Content}>
				<div className={cl.Loader}>
				
				</div>
				<div className={cl.Text}>
					Загрузка
				</div>
			</div>
		</div>
	)
}

export default Loader