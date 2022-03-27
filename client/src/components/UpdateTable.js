import React, {useContext, useState, useEffect, useCallback} from 'react'
import $ from 'jquery'
import {useHttp} from '../hooks/http.hook'
import {LoginContext} from '../context/LoginContext'
import {useNavigate} from 'react-router-dom'
import updated from '../images/updated.png'

export const UpdateTable = ({ table }) => { 
	var ColumnsWidth = 0  
	var ColumnsHeight = 0 
	var header_width = 0
	var column_num = 0
	var header_elems = [] 
	var column_content = []
	
	const $window = $(window)
	const auth = useContext(LoginContext) 
	const {request} = useHttp() 
	const {token} = useContext(LoginContext)
	const [table_] = useState(null)
	const navigate = useNavigate()
	
	$(document).ready ( function(){
		$('.updated-page').hide()
	});
	
	const updateTable = useCallback( async(new__thead, new__tbody, new__ttitle, new__desc) => {
		try{
			const fetched = await request(`/api/table/update/${table._id}`, "POST", {
				new_thead: new__thead,
				new_tbody: new__tbody,
				new_ttitle: new__ttitle,
				new_tdesc: new__desc,
				}, 
				{
				Authorization: `Bearer ${token}`
			})
			
			navigate('/tables')
			window.M.toast({ html: "Таблица обновлена" })
			
		} catch(e) {
			console.log(e)
		}
		
	}, [token, table._id, request])
	
	useEffect( () => {
		compileDefaultTable()
	}, [compileDefaultTable])
	
	function changeTableHeaders_pl(){
		header_width++
		try{
			var constructed_tr = `<th class="header-element-${header_width}"><textarea placeholder="Type..." class="textarea materialize-textarea"></textarea></th>`
				
			for(var i = 0; i  < header_width; i++){
				var constructed_td = `<td class="column-element-${header_width} father-tr_${i}"><textarea class="column-txt-element-${header_width} textarea materialize-textarea" placeholder="Type..."></textarea></td>`
				$(`#tr-${i}`).append(constructed_td)
			}
		} catch(e) {
			console.log(e)
		} finally { 
			return $('#header-tr').append(constructed_tr)
		}
	} 
	
	function changeTableHeaders_min(){
		try{
			var column_target = `.column-element-${header_width}`
			var header_target = `.header-element-${header_width}`
			var min = $(column_target).length

			$(column_target).remove()
			$(header_target).remove()
			
		} catch(e) {
			console.log(e)
		} finally {
			header_width--
		}
	}
	
	function compileDefaultTable(){ 
		var num = table.thead.length
		var $header = ''
		var $body = ''
		var tableTempo = 0
		var local_column_num = 0
		var $pre_body = ''

		try{
			for(var i = 0;i < num;i++){
				header_width++
				$header = $header.concat(`<th class="header-element-${header_width}" "><textarea placeholder="Type..." class="materialize-textarea">${table.thead[i]}</textarea></th>`)
			}
			for(var i = 0;i < table.tbody.length;i++){
				local_column_num++
				if(table.tbody[i] === undefined){
					return 
				}
				tableTempo++
				$body = $body.concat(`<td class="column-element-${local_column_num}"><textarea class="column-txt-element-${local_column_num} textarea materialize-textarea" placeholder="Type...">${table.tbody[i]}</textarea></td>`)
				if(tableTempo === header_width){
					local_column_num = 0
					ColumnsHeight++
					tableTempo = 0
					$pre_body = $pre_body.concat(`<tr id='tr-${ColumnsHeight}'>` + $body + `</tr>`)
					$body = ''
				}
			}
		} catch(e) {
			return window.M.toast({ html: "Что-то пошло не так. Попробуйте перезагрузить страницу" })
		} finally {
			$("#table-header").append("<tr id='header-tr'>" + $header + "</tr>")
			$body = $body.concat($pre_body)
			$("#table-body").append($body)
			ColumnsWidth = num
		}
	}

	function addTableColumn() {
		var local_column_num = 0
		column_num++
		ColumnsHeight++
		var num = header_width
		var $block = ''

		try{
			for(var i = 0; i < header_width;i++){
				local_column_num++
				$block = $block.concat(`<td class="column-element-${local_column_num} father-tr_${column_num}"><textarea class="column-txt-element-${local_column_num} textarea materialize-textarea" placeholder="Type..."></textarea></td>`)
			}
		} catch(e) {
			console.log(e)
			return window.M.toast({ html: "Что-то пошло не так. Попробуйте перезагрузить страницу" })
		} finally {
			$('#table-body').append(`<tr id="tr-${ColumnsHeight}">${$block}</tr>`)
		}
	}

	function removeTableColumn(){
		ColumnsHeight--
		if(column_num <= 1){
			return
		}
		try{
			var column_id = column_num
			var constructed_column_class = `#tr-${column_id}`
			for(var i = 0; i < header_width;i++){
				column_content.filter((el, i) => i !== column_content.length - 1)
			}
		} catch(e) {
			console.log(e)
			return window.M.toast({ html: "Что-то пошло не так. Попробуйте перезагрузить страницу" })
		} finally {
			$(constructed_column_class).remove()
			column_num--
		}
	}
	
	function CancelUpdate() {
		navigate('/tables')
	}
	
	function compileTable(){
		var global_column_step = 0
		var pre_step = 0
		var global_header_arr = []
		var global_element_arr = []
		try{
			$( "textarea" ).each(function( index ) {
				if(pre_step !== header_width){
					pre_step++
					return global_header_arr.push($(this).val())
				}
				$(this).attr('id', `table-element-${index }`)
				global_element_arr.push($(this).val())
			});
		} catch(e) {
			console.log(e)
		} finally {
			updateTable(global_header_arr, global_element_arr, $('#tname').val(), $('#tdesc').val())
		}
	}
	
	return(
		<>
			<div className="updated-page container register-main">
				<img src={updated}/>
				<p>Таблица успешно обновлена</p>
				<button className="create-btn waves-effect waves-component .waves-ripple">Вернутся обратно</button>
			</div>
			<div className="update-page" style={{ marginTop: "50px"}}>
				<div className="input-field titles-num-inner container">
					<input id="tname" type="text" className="validate" defaultValue={table.title}/>
					<label htmlFor="text" className="active">Введите новое название таблицы</label>
				</div>
				<div className="input-field titles-num-inner container">
					<input id="tdesc" type="text" className="validate" defaultValue={table.desc}/>
					<label htmlFor="text" className="active">Введите новое описание таблицы</label>
				</div>
				<div className="result-bar container">
					<div className="result-inner">
						<div className="result-grid">
							<div className="result grid-column-1">
								<table id="table" className="striped">
									<thead id="table-header">
									
									</thead>
									<tbody id="table-body">

									</tbody>
								</table>
							</div>	
							<div className="round-btn-inner-width grid-column-2">
								<div>
									<button id="round-btn-width-plus" className="waves-effect waves-light round-btn" onClick={changeTableHeaders_pl}>→</button>
									<button id="round-btn-width-minus" className="waves-effect waves-light round-btn" onClick={changeTableHeaders_min}>←</button>
								</div>
							</div>
						</div>
						<div className="round-btn-inner">
							<button id="round-btn-plus" className="waves-effect waves-light round-btn" onClick={addTableColumn}>↓</button>
							<button id="round-btn-minus" className="waves-effect waves-light round-btn" onClick={removeTableColumn}>↑</button>
						</div>
						<br/>
						<div style={{textAlign: "center",justifyContent: "center"}}>
							<button id="compile-btn" style={{ margin: "5px", maxWidth: "250px" }} className="component-bg waves-effect waves-light" onClick={compileTable}>Сохранить изменения</button>
							<button id="return-btn" style={{ margin: "5px", maxWidth: "250px" }} className="component-bg waves-effect waves-light" onClick={CancelUpdate}>Отменить изменения</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}