import {useContext, useEffect,useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import { Link } from 'react-router-dom'
import Loader from '../components/UI/Loader/Loader'
import {LoginContext} from '../context/LoginContext'

export const LogInPage = () => {
	
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
			auth.login(data.token, data.userId, data.status)
		} catch (e) {
			console.log(e)
		}
	}

	if(loading) return <Loader/>
	
	return(
		<div className="main">
			<div className="logo-inner">
				<h1 style={{ fontFamily: "Bunya", color: "#fff"}}>DQ</h1>
			</div>
			<div className="card">
				<div className="card-content">
					<span className="card-title">Войдите в личный кабинет</span>
					<div className="holder-inner">
						<div className="holder">
							<div className="input-holder">
								<input className="input" type="email" name="email" placeholder=" " onChange={changeHandler}/>
								<div className="placeholder">Почта</div>
							</div>
						</div>
						<div className="holder">
							<div className="input-holder">
								<input className="input" type="password" name="password" placeholder=" " onChange={changeHandler}/>
								<div className="placeholder">Пароль</div>
							</div>
						</div>	
						<div className="holder">
							<div className="card-buttons">
								<button className="component-bg waves-effect waves-light" onClick={loginHandler}>Войти</button>
							</div>
						</div>	
						<div className="holder">
							Нет аккаунта? <Link to="/sign-in" className="amber-lighten-1-color">Зарегистрируйтесь</Link>
						</div>						
					</div>
				</div>
			</div>
		</div>
	)
}