import cl from './Select.module.sass'
import { useState } from 'react'

const Select = ({type, desc, defaultValue, options, onChange, customStyles = null}) => {

	const [value, setValue] = useState(defaultValue)

	const [active, setActive] = useState(false)

	const callback = (value, option) => {
		onChange(value)
		setActive(false)
		setValue(option)
	}

	return (
		<>
			<button style={customStyles && customStyles} onClick={() => setActive(active ? false : true)} className={`${cl.Select} ${type === 'token_select' ? cl.TokenType : ''}`}>
				<div className={cl.SelectHeader}>
					{desc}: {defaultValue ? defaultValue : value}

					<svg className={active ? cl.Active : ''} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
					  <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
					</svg>
				</div>
			</button>
			<div className={`${cl.SelectBody} ${active ? cl.Active : ''}`}>
				{
					options.map((option, index) => {
						return (
							<button style={customStyles && customStyles} onClick={() => callback(option.value, option.option)} className={`${cl.Option} ${type === 'token_select' ? cl.TokenType : ''}`} key={index}> 
								{option.option}
							</button>
						)
					})
				}	
			</div>
		</>
	)
}

export default Select