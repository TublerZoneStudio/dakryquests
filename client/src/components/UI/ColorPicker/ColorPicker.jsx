import cl from './ColorPicker.module.sass'

const ColorPicker = ({...props}) => {
	return (
		<input type="color" className={cl.ColorPicker} {...props}/>
	)
}

export default ColorPicker