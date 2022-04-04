import React, {useEffect} from 'react'
import $ from 'jquery'

export const TableCard = ({ table }) => {

	useEffect( () => {
		decompileTable()
	}, [decompileTable])
	
	function decompileTable() {
		var elem1 = table.thead
		var elem2 = table.tbody
		
		var $header = ''
		var $body = ''
		var $pre_body = ''
		var tableTempo = 0
		
		try{
			for(var i = 0;i < elem1.length;i++){			
				$header = $header.concat(`<th id="a">${elem1[i]}</th>`)
			}
			
			for(var i = 0;i  < elem2.length; i++){
				if(elem2[i] === undefined){
					return
				}
				tableTempo++
				$body = $body.concat(`<td id="a">${elem2[i]}</td>`)
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
			$("#table").append("<thead style='color: #ffffff;'><tr>" + $header + "</tr></thead>")
			$("#table").append("<tbody style='color: #ffffff;'>" + $body  + "</tbody>")
			$("#decompile-btn").hide()
		}	
	}
	
	return (
		<>
			<div className="container main">
			<div className="tl-title">
				<h3> {table.title} </h3>
				<hr className="styled-hr"/>
			</div>
				<div className="result res-brder">
					<table id="table" className="striped ">
					
					</table>
				</div>
				<div style={{ color: "var(--rcolor)", padding: "15px"}}>
					{table.desc} 
				</div>
			</div>
		</>
	)
}