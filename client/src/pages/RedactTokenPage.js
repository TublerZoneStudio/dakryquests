import React, {useState, useEffect, useContext, useCallback} from 'react'
import {useHttp} from '../hooks/http.hook'
import {LoginContext} from '../context/LoginContext'
import {useNavigate} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import $ from 'jquery'

export const RedactTokenPage = () => { 

	const navigate = useNavigate()
	
	const [token, setToken] = useState([])

	const {request} = useHttp() 
	
	const tokenId = useParams().id
	
	const auth = useContext(LoginContext)
	

	const fetchToken = async () => {
		try {
			const token_ = await request(`/api/token/gettoken/${tokenId}`, 'GET', null)
			setToken(token_)
		} catch (e) {
			console.log(e)
		}
	} 
	
	useEffect(() => {
		fetchToken()
	}, [])
	
	const updateToken = async () => {
		var token_type = $('#type').text()
		
		try {
			const tok = await request(`/api/token/updatetoken/${tokenId}`, 'POST', {type: token_type}, {
				Authorization: `Bearer ${auth.token}` 
			})
			
			return navigate('/tokencreate')
		} catch (e) {
			console.log(e)
		}
	} 


	var selectBtn = document.getElementsByClassName('dropdown'),
		dropdownMenu = document.getElementsByClassName('dropdownMenu');

	for (var i = 0; i < selectBtn.length; i++) {
		selectBtn[i].onclick = function() {
			if(this.className.indexOf('active') > -1){
				for (j = 0; j < selectBtn.length; j++) {
					removeClass(selectBtn[j], 'active')
				}
			} else {
				addClass(this, 'active');            
			}               
		};
	}
	for (var i = 0; i < dropdownMenu.length; i++) {
		var child = dropdownMenu[i].children;    
		for (var j = 0; j < child.length; j++) {
			child[j].onclick = function() {
				var text = this.innerHTML;
				this.parentNode.previousElementSibling.children[0].innerHTML = text;
				toggleClass(this.parentNode, 'showMenu');
			};
		}
	}

	window.addEventListener('click', function(event){
		for (var i = 0; i < selectBtn.length; i++) {
			if (event.target != selectBtn[i].children[0]){
				removeClass(selectBtn[i], 'active');
			}
		}
	});




	function toggleClass(el, classToToggle) {
		var classN = el.className;
		if(classN.indexOf(classToToggle) > -1){
			el.className =  classN.replace(" " + classToToggle, '');
		} else {		
			el.className = classN + " " + classToToggle;
		}
	}
	function addClass(el, classToToggle) {
		var classN = el.className
		if(classN.indexOf(classToToggle) < 1){
			el.className = classN + " " + classToToggle;
		}
	}
	function removeClass(el, classToToggle) {
		var classN = el.className;
		if(classN.indexOf(classToToggle) > -1){
			el.className =  classN.replace(" " + classToToggle, '');
		}
	}
	
	return(
		<div style={{padding: "10px"}} className="container">
			<div style={{color: "#fff", textAlign: "center"}}>
				<h5>Тип токена</h5>
			</div>
			<div className="dropholder">
			  <div className="dropdown">
				<p id="type">{token.token_type}</p>
			  </div>
			  <ul className="dropdownMenu">
				<li>participant</li>
				<li>employee</li>
				<li>admin</li>
			  </ul>
			  	<div style={{textAlign: "center",justifyContent: "center"}}>
					<button id="compile-btn" style={{ margin: "5px", maxWidth: "250px" }} className="component-bg waves-effect waves-light" onClick={updateToken}>Сохранить изменения</button>
					<button id="return-btn" style={{ margin: "5px", maxWidth: "250px" }} className="component-bg waves-effect waves-light" onClick={() => navigate('/tokencreate')}>Отменить изменения</button>
				</div>
			</div>
		</div>
	)
}