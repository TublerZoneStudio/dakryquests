import cl from './ColorPicker.module.sass'

const ColorPicker = ({...props}) => {
	return (
		<div className={cl.Wrapper}>
			<input type="color" className={cl.ColorPicker} {...props}/>
		</div>
	)
}

export default ColorPicker