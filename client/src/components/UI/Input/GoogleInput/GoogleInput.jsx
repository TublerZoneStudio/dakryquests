import { useRef } from 'react'
import cl from './GoogleInput.module.sass'

const GoogleInput = ({label, defVal, labelBg = '#23272a', ...props}) => {

	const value = useRef()
	const labelref = useRef()

	if(defVal) {
		value.current.value = defVal
	}

	const setBlurStatus = () => {
		if(value.current.value) {
			return labelref.current.classList.add(cl.Label_old);
		}

		return labelref.current.classList.remove(cl.Label_old);
	}

	return (
		<div className={cl.Wrapper}>
			<input ref={value} onBlur={() => setBlurStatus()} {...props} className="browser-default"/>
			<label ref={labelref} className={cl.Label} style={{background: labelBg}}>{label}</label>
			<div className={cl.Bar}></div>
		</div>
	)
}

export default GoogleInput