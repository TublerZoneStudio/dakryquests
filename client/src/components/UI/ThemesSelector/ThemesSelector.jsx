import { useState } from 'react'
import cl from './ThemesSelector.module.sass'
const randomId = require('random-id')

const ThemesSelector = ({view = false, form = null, setForm = null}) => {

	const checkLength = () => {
		if(form.themes.length >= 3) {
			return true 
		}

		return false
	}

	const addTheme = () => {

		const check = checkLength() 

		if(check){
			return window.M.toast({ html: "Максимальное кол.во тематик - 6"}) 
		}

		const theme = {
			id: randomId(30, 'aA0'),
			selector: ''
		}
		setForm({...form, 'themes': [...form.themes, theme]})
	}

	const removeTheme = (themeId) => {
		setForm({...form, 'themes': form.themes.filter(theme => theme.id !== themeId)})
	}

	const changeThemeSelector = (selector, themeId) => {
		const newThemes = form.themes
		for(let i = 0;i < form.themes.length;i++) {
			if(newThemes[i].id === themeId){
				newThemes[i].selector = selector
			}
		}
		setForm({...form, 'themes': newThemes})
	}

	if(!form.themes) return <p> loading </p>

	if(view) {
		return (
			<div className={cl.ViewSelectors}>
				{
					form.themes.map((theme) => {
						return (
							<div className={`${cl.Selector} waves-effect waves-light`} key={theme.id}>
								{theme.selector}
							</div>
						)
					})
				}
			</div>
		)
	}

	return (
		<div className={cl.ThemesSelectorInner}>
			<div className={cl.SelectorsInner}>
				{
					form.themes.map((theme) => {
						return (
							<div className={cl.Selector} key={theme.id}>
								<input onChange={e => changeThemeSelector(e.target.value, theme.id)} defaultValue={theme.selector} type="text" className="browser-default"/>
								<button onClick={() => removeTheme(theme.id)} className={cl.RemoveBtn}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
										<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
									</svg>
								</button>
							</div>
						)
					})
				}
				{
					form.themes.length !== 3 && <button onClick={() => addTheme()} className={cl.MiniBtn}>+</button>
				}
			</div>
		</div>
	)
}

export default ThemesSelector