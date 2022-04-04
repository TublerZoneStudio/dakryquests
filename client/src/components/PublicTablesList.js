import React, {useState, useEffect, useContext, useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {LoginContext} from '../context/LoginContext'
import {Loader} from '../components/Loader'
import $ from 'jquery'

export const PublicTablesList = ({ tables }) => {
	
	const navigate = useNavigate()
	
	const {loading, request} = useHttp()
	
	const {token} = useContext(LoginContext)
	
	const nicknameArr = []
	
	const fetchNickname = useCallback( async (_id) => {
		try{
			const fetched = await request('/api/table/fetch-name', 'POST', {id: _id}, {
				Authorization: `Bearer ${token}`
			})
			
			return fetched
		} catch(e) { 
			console.log(e)
		}
	}, [token, request])
	
	$(document).ready(function() {
		$('.view-btn').click(function(e) {  
			var this_id = $(this).attr('id')
			navigate(`/detail/${this_id}`)
		})
	})
	

	return (
		<>
			<div className="tl-title">
				<h2> Information </h2>
				<hr style={{ width: "350px"}} className="styled-hr"></hr>
			</div>
			<section className="food-menu">
				<ul>
				{ tables.map((table) => {
					
					var sliced_desc = table.desc.slice(0,35);
					
					if (sliced_desc.length < table.desc.length) {
						sliced_desc += '...';
					}
					
					return (
					<li key={table._id}>
					  <div id={table._id} className="card waves-effect waves-brown waves-ripple">
						<div className="tcard-header">
							<div className="title-inner">
								<h5>{table.title}</h5>
							</div>
							<div>
								<button id={table._id} className="view-btn waves-effect waves-light card-header-btns">
									<svg style={{marginTop: "2px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
									  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path>
									  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
									</svg>
								</button>
							</div>
						</div>
						<div className="tcard-content">
							Дата создания: <strong>{table.date}</strong>
							<br/>
							ID таблицы: <strong>{table._id}</strong>
							<br/>
							Имя пользователя: <strong>{table.owner_nickname}</strong>
							<br/>
							Описание таблицы:
							<div className="table-desc" >
								<strong>
									{sliced_desc}
								</strong>
							</div>
						</div>
					  </div>
					</li>
					)
				})}
					
				</ul>
			</section>
		</>
	)
}