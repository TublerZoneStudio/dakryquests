import cl from './PageTitle.module.sass'

const PageTitle = ({children}) => {
	return (
		<div className={cl.PageTitleContainer}>
			<div>
				{children}
				<hr/>
			</div>
		</div>	
	)
}

export default PageTitle