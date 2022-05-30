import { useState } from 'react'
import { useQuest } from '../../../context/QuestProvider'
import { useHttp } from '../../../hooks/http.hook'
import GoogleInput from '../../../components/UI/Input/GoogleInput/GoogleInput'
import ThemesSelector from '../../../components/UI/ThemesSelector/ThemesSelector'
import Btn from '../../../components/UI/Btn/Btn'
import FileInput from '../../../components/UI/Input/FileInput/FileInput'
import cl from './QuestCreatePage.module.sass'

const QuestCreatePage = () => {

	const { createQuest, loading } = useQuest()

	const [form, setForm] = useState({
		banner: null,
		price: 0,
		title: '',
		description: '',
		startsIn: '',
		endsIn: '',
		themes: []
	})

	const changeHandler = e => {
		if(e.target.name === 'banner') {
			return setForm({...form,  [e.target.name]: e.target.files[0] })
		}

		setForm({...form,  [e.target.name]: e.target.value })
	}

	return (
		<div className={cl.Container}>
			<div className={cl.Content}>
				<div>
					<FileInput onChange={changeHandler}/>
				</div>
				<GoogleInput type="number" name="price" onChange={changeHandler} label="Цена"/>
				<GoogleInput type="text" name="title" onChange={changeHandler} label="Название квеста"/>
				<GoogleInput type="text" name="description" onChange={changeHandler} label="Описание квеста"/>
				<GoogleInput type="text" name="startsIn" onChange={changeHandler} label="Дата начала"/>
				<GoogleInput type="text" name="endsIn" onChange={changeHandler} label="Дата конца"/>
				<ThemesSelector form={form} setForm={setForm}/>
				<Btn onClick={() => createQuest(form)}>создать квест</Btn>
			</div>
		</div>
	)
}

export default QuestCreatePage