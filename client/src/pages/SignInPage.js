import React, {useEffect,useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import logo from '../images/lotus.png';
import { BrowserRouter, Navigate, Route, Routes, Link } from 'react-router-dom';

export const SignInPage = () => {
	
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
			message(data.message)
		} catch (e) {
			
		}
	}
	
	return(
		<div className="register-main">
		
			<div style={{marginTop: "100px"}} className="logo-inner">
				<h1 style={{ fontFamily: "Bunya", color: "#fff"}}>DQ</h1>
			</div>
			<div className="card">
				<div className="card-content">
					<span className="card-title">Создайте личный кабинет</span>
					<div>
						<div className="holder">
							<div className="input-holder">
								<input className="input" type="email" name="email" placeholder=" " onChange={changeHandler}/>
								<div className="placeholder">Почта</div>
							</div>
						</div>
						<div className="holder">
							<div className="input-holder">
								<input className="input" type="text" name="nickname" placeholder=" " onChange={changeHandler}/>
								<div className="placeholder">Имя пользователя</div>
							</div>
						</div>
						<div className="holder">
							<div className="input-holder">
								<input className="input" type="password" name="password" placeholder=" " onChange={changeHandler}/>
								<div className="placeholder">Пароль</div>
							</div>
						</div>
						<div className="holder">
							<div className="input-holder">
								<input className="input" type="password" name="auth_token" placeholder=" " onChange={changeHandler}/>
								<div className="placeholder">Введите ваш токен</div>
							</div>
						</div>
						<div className="holder">
							<label>
								<input type="checkbox" />
								<span>Запомнить меня</span>
								</label>
						</div>
						<div className="holder">
							<label>
								<input type="checkbox" />
								<span>Я согласен/а <a href="#" className="amber-lighten-1-color">с правилами пользования сервисом</a></span>
							</label>
						</div>		
						<div className="holder">
							<div className="card-buttons">
								<button className="component-bg waves-effect waves-light" onClick={regHandler} disabled={loading}>Регистрация</button>
							</div>
						</div>
						<div className="holder">
							Уже есть аккаунт? <Link to="/" className="amber-lighten-1-color">Войдите</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}