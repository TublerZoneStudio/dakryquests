import cl from './RoundBtn.module.sass'

const RoundBtn = ({ children, ...props }) => {
	return (
		<button 
			className={`${cl.RoundBtn} waves-effect waves-light`}
			{...props}
		>
			{children}
		</button>
	)
}

export default RoundBtn