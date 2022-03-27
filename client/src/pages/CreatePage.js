import React, {useContext, useState, useEffect} from 'react'
import $ from 'jquery'
import {useHttp} from '../hooks/http.hook'
import {LoginContext} from '../context/LoginContext'
import {useNavigate} from 'react-router-dom'

export const CreatePage = () => { 
	var ColumnsWidth = 0  
	var ColumnsHeight = 0 
	var header_width = 0
	var column_num = 0
	var global_column_num = 0
	var header_elems = [] 
	var column_content = []
	
	const $window = $(window)
	const auth = useContext(LoginContext) 
	const {request} = useHttp()
	const [table, setTable] = useState('') 
	const navigate = useNavigate()

	$(document).ready ( function(){
		$('.round-btn').hide()
		$('#compile-btn').hide()
		$('#decompile-btn').hide()
		$('.result').hide()
	});
	
	const pressHandler = async (header_arr, column_arr) => {
		var table_title = $('#tname').val()
		var table_desc = $('#tdesc').val()
		try {
			const data = await request('/api/table/generate', 'POST', {thead: header_arr, tbody: column_arr, ttitle: table_title, tdesc: table_desc}, { 
			  Authorization: `Bearer ${auth.token}`
			})
			
			navigate(`/detail/${data.table._id}`)
		} catch (e) {
			auth.logout()
			navigate('/')
			window.M.toast({ html: "Срок вашего нахождения на платформе истек. Авторизуйтесь снова" }) 
		}
	} 
	
	function changeTableHeaders_pl(){
		header_width++
		try{
			var constructed_tr = `<th class="header-element-${header_width} "><textarea placeholder="Type..." class="textarea materialize-textarea"></textarea></th>`
				
			for(var i = 1; i  < ColumnsHeight; i++){
				global_column_num++
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
			
			global_column_num -= min
			
		} catch(e) {
			console.log(e)
		} finally {
			header_width--
		}
	}
	
	function addTableHeaders(){ 
		var num = $('#titles-num').val()
		ColumnsHeight++
		var $block = ''
		var $block1 = ''
		
		if(num === ''){
			return $('#titles-num').addClass('invalid'), window.M.toast({ html: "Заполните все поля!" })
		} 
		
		if($('#tname').val() === ''){
			return $('#tname').addClass('invalid'), window.M.toast({ html: "Заполните все поля!" })
		}
		
		if($('#tdesc').val() === ''){
			return $('#tdesc').addClass('invalid'), window.M.toast({ html: "Заполните все поля!" })
		}
		
		
		if(num > 30){
			return $('#titles-num').addClass('invalid'), window.M.toast({ html: "Максимальное допустимое кол-во столбцов - 30" })
		}

		
		try{
			for(var i = 1;i < num;i++){
				header_width++
				$block = $block.concat(`<th class="header-element-${i} "><textarea placeholder="Type..." class="materialize-textarea"></textarea></th>`)
			}
			addTableColumn()
		} catch(e) {
			return window.M.toast({ html: "Что-то пошло не так. Попробуйте перезагрузить страницу" })
		} finally {
			$('.result').show()
			$("#table-header").append("<tr id='header-tr'>" + $block + "</tr>")
			$("#headers-creator").hide()
			$('.titles-num-inner').hide()
			$('.round-btn').show()
			$('#compile-btn').show()
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
				global_column_num++
				$block = $block.concat(`<td class="column-element-${local_column_num} father-tr_${column_num}"><textarea class="column-txt-element-${local_column_num} textarea materialize-textarea" placeholder="Type..."></textarea></td>`)
			}
		} catch(e) {
			console.log(e)
			return window.M.toast({ html: "Что-то пошло не так. Попробуйте перезагрузить страницу" })
		} finally {
			$('#table-body').append(`<tr id="tr-${column_num}">${$block}</tr>`)
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
				global_column_num--
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
			pressHandler(global_header_arr, global_element_arr)
		}
	}
	
	function decompileTable(header_arr, column_arr){
		var $header = ''
		var $body = ''
		var $pre_body = ''
		var tableTempo = 0
		try{
			for(var i = 0;i < header_arr.length;i++){
				$header = $header.concat(`<th>${header_arr[i]}</th>`)
			}
			
			for(var i = 0;i  < column_arr.length; i++){
				if(column_arr[i] === undefined){
					return
				}
				tableTempo++
				$body = $body.concat(`<td>${column_arr[i]}</td>`)
				if(tableTempo === header_arr.length){
					tableTempo = 0
					$pre_body = $pre_body.concat("<tr>" + $body + "</tr>")
					$body = ''
				}
			}
		} catch(e) {
			console.log(e)
		} finally {
			$("#table").html()
			$body = $body.concat($pre_body)
			$("#table").append("<thead style='color: rgba(0,0,0,0.6);'><tr>" + $header + "</tr></thead>")
			$("#table").append("<tbody>" + $body  + "</tbody>")
		}
	}
	
	return(
		<div>
			<div className="result-bar pre main container">
				<div className="input-field titles-num-inner col s12">
					<input id="tname" type="text" className="validate"/>
					<label htmlFor="text">Введите название таблицы</label>
				</div>
				<div className="input-field titles-num-inner col s12">
					<input id="tdesc" type="text" className="validate"/>
					<label htmlFor="text">Введите описание таблицы</label>
				</div>
				<div className="input-field titles-num-inner col s12">
					<input id="titles-num" type="number" className="validate" maxLength="2" max="100"/>
					<label htmlFor="number">Введите кол-во верхних столбцов</label>
				</div>
				<button type="submit" id="headers-creator" className="component-bg waves-effect waves-light" onClick={addTableHeaders}>Создать таблицу</button>
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
					<button id="compile-btn" className="component-bg waves-effect waves-light" onClick={compileTable}>Сохранить таблицу</button>
				</div>
			</div>
		</div>
	)
}