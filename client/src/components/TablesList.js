import React, {useState, useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import 'materialize-css'
import no_results from '../images/no-results.png'
import $ from 'jquery'
import {Loader} from './Loader'

export const TablesList = ({ tables }) => {
	
	const navigate = useNavigate()
	
	$(document).ready(function() {
		$('.view-btn').click(function(e) {  
			var this_id = $(this).attr('id')
			navigate(`/detail/${this_id}`)
		});
		$('.update-btn').click(function(e) {  
			var this_id = $(this).attr('id')
			navigate(`/update/${this_id}`)
		});
		$('.delete-btn').click(function(e) {  
			var this_id = $(this).attr('id')
			navigate(`/delete/${this_id}`)
		});
		$('.create-btn').click(function(e) {  
			navigate(`/create`)
		});
	});
	
	if (!tables.length) {
		return(
			<div style={{ textAlign: "center", color: "#fff" }}className="container register-main">
				<img src={no_results}/>
				<p>У вас еще нет не одной таблицы :(</p>
				<button className="create-btn waves-effect waves-component .waves-ripple">Создать новую таблицу</button>
			</div>
		)
	}
	
	
	return(
		<>
			<div className="tl-title">
				<h2> Ваши таблицы </h2>
				<hr className="styled-hr"></hr>
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
								<button id={table._id} style={{marginRight: "5px"}} className="view-btn waves-effect waves-light card-header-btns">
									<svg style={{marginTop: "2px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
									  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path>
									  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
									</svg>
								</button>
								<button id={table._id} style={{marginRight: "5px"}} className="update-btn waves-effect waves-light card-header-btns">
									<svg id="svg" preserveAspectRatio="none" viewBox="0 0 100 100">
										<path d="M 0 79.2846 L 0 100 L 20.7154 100 L 81.8031 38.9081 L 61.0919 18.1969 L 0 79.2846 Z M 97.8208 22.8904 C 99.9764 20.7411 99.9764 17.2513 97.8208 15.102 L 84.898 2.1792 C 82.7487 0.0236 79.2589 0.0236 77.1096 2.1792 L 67.0016 12.2851 L 87.7149 32.9984 L 97.8208 22.8904 Z"></path>
									</svg>
								</button>
								<button id={table._id} className="delete-btn waves-effect waves-light card-header-btns">
									<svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" viewBox="0 0 24 24" ><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"></path></svg>
								</button>
							</div>
						</div>
						<div className="tcard-content">
							Дата создания: <strong>{table.date}</strong>
							<br/>
							ID таблицы: <strong>{table._id}</strong>
							<br/>
							Описание таблицы:
							<div className="table-desc">
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