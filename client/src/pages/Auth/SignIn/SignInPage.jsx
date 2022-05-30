import { useEffect,useState, useContext } from 'react'
import {useHttp} from '../../../hooks/http.hook'
import {useMessage} from '../../../hooks/message.hook'
import { Link } from 'react-router-dom'
import { LoginContext } from '../../../context/LoginContext'
import GoogleInput from '../../../components/UI/Input/GoogleInput/GoogleInput'
import Btn from '../../../components/UI/Btn/Btn'
import SmallLoader from '../../../components/UI/Loader/SmallLoader/SmallLoader'
import cl from './SignInPage.module.sass'

const SignInPage = () => {

	const auth = useContext(LoginContext)
	
	const message = useMessage()
	
	const {loading, request, error, clearError} = useHttp()
	
	const [form, setForm] = useState({
		email: '', password: ''
	})
	
	useEffect(() => {
		message(error)
		clearError()
	}, [error, message, clearError])
	
	const changeHandler = event => {
		setForm({...form,  [event.target.name]: event.target.value })
	}
	
	const regHandler = async () => {
		try{
			const data = await request('/api/auth/register', 'POST', {...form})
			if(data.message) {
				return message(data.message)
			}
			auth.login(data.token, data.userId, data.status)
		} catch (e) {
			console.log(e)
		}
	}
	
	return(
		<div className={cl.Container}>
			<p className={cl.Title}>Создайте личный кабинет</p>
			<div className={cl.Content}>
				<GoogleInput onChange={changeHandler} name="email" label="Email" type="email"/>
				<GoogleInput onChange={changeHandler} name="nickname" label="Имя пользователя" type="text"/>
				<GoogleInput onChange={changeHandler} name="password" label="Пароль" type="password"/>
				<GoogleInput onChange={changeHandler} name="auth_token" label="Токен" type="text"/>
				<Btn onClick={regHandler} disabled={loading}>{ loading ? <SmallLoader notext/> : "Регистрация" }</Btn>
				<span>Уже есть аккаунт? <Link to="/" className="amber-lighten-1-color">Войдите</Link></span>
			</div>
		</div>
	)
}

export default SignInPage