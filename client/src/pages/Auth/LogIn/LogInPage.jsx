import {useContext, useEffect,useState} from 'react'
import {useHttp} from '../../../hooks/http.hook'
import {useMessage} from '../../../hooks/message.hook'
import { Link } from 'react-router-dom'
import {LoginContext} from '../../../context/LoginContext'
import GoogleInput from '../../../components/UI/Input/GoogleInput/GoogleInput'
import Btn from '../../../components/UI/Btn/Btn'
import SmallLoader from '../../../components/UI/Loader/SmallLoader/SmallLoader'
import cl from './LogInPage.module.sass'

const LogInPage = () => {
	
	const auth = useContext(LoginContext)
	
	const message = useMessage()
	
	const {request, loading, error, clearError} = useHttp()
	
	const [form, setForm] = useState({
		email: '', password: ''
	})
	
	useEffect(() => {
		message(error)
		clearError()
	}, [error, message, clearError])
	
	const changeHandler = event => {  
		setForm({...form,  [event.target.name]: event.target.value})
	}
	
	const loginHandler = async () => {
		try{
			const data = await request('/api/auth/login', 'POST', {...form})
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
			<p className={cl.Title}>Войдите в личный кабинет</p>
			<div className={cl.Content}>
				<GoogleInput onChange={changeHandler} name="email" label="Email" type="email"/>
				<GoogleInput onChange={changeHandler} type="password" name="password" label="Пароль"/>
				<Btn onClick={() => loginHandler()}>{ loading ? <SmallLoader notext/> : "Войти в аккаунт" }</Btn>
				<span> Нет аккаунта? <Link to="/sign-in" className="amber-lighten-1-color">Зарегистрируйтесь</Link> </span>	
			</div>
		</div>
	)
}

export default LogInPage