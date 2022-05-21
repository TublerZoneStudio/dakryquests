import cl from './TableBtn.module.sass'

const TableBtn = ({children, ...props}) => {

	return (
		<button className={cl.TableBtn} {...props}> {children} </button>
	)
}

export default TableBtn