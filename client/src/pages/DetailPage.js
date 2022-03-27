import React, {useState, useCallback, useEffect, useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useParams} from 'react-router-dom'
import {LoginContext} from '../context/LoginContext'
import {Loader} from '../components/Loader'
import {TableCard} from '../components/TableCard'
import $ from 'jquery'

export const DetailPage = () => { 
	const {token} = useContext(LoginContext)
	const {request, loading} = useHttp()
	const [table, setTable] = useState(null)
	const tableId = useParams().id
	
	const getTable = useCallback( async() => {
		try{
			const fetched = await request(`/api/table/${tableId}`, "GET", null, {
				Authorization: `Bearer ${token}`
			})
			
			setTable(fetched)
		} catch(e) {
			console.log(e)
		}
		
	}, [token, tableId, request])
	
	useEffect( () => {
		getTable()
	}, [getTable])
	
	if( loading) {
		<Loader />
	}	
	
	function test() {
		var elem1 = ['header', 'header', 'header']
		var elem2 = ['body', 'body', 'body', 'body', 'body', 'body']
		
		var $header = ''
		var $body = ''
		var $pre_body = ''
		var tableTempo = 0
		
		try{
			for(var i = 0;i < elem1.length;i++){
				$header = $header.concat(`<th>${elem1[i]}</th>`)
			}
			
			for(var i = 0;i  < elem2.length; i++){
				if(elem2[i] === undefined){
					return
				}
				tableTempo++
				$body = $body.concat(`<td>${elem2[i]}</td>`)
				if(tableTempo === elem1.length){
					tableTempo = 0
					$pre_body = $pre_body.concat("<tr>" + $body + "</tr>")
					$body = ''
				}
			}
		} catch(e) {
			console.log(e)
		} finally {
			$body = $body.concat($pre_body)
			$("#table").append("<thead style='color: rgba(0,0,0,0.6);'><tr>" + $header + "</tr></thead>")
			$("#table").append("<tbody>" + $body  + "</tbody>")
		}	
	}
	return (
		<>
		  { !loading && table && <TableCard table={table} /> }
		</>
	)	
}