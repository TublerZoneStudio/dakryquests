import cl from './Btn.module.sass'

const Btn = ({children, ...props}) => {
	return (
		<button
			className={`${cl.Btn} waves-effect waves-light`}
			{...props}
		>
			{children}
		</button>
	)
}

export default Btn