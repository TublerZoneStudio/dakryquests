import { useState, useEffect } from 'react'
import cl from './Table.module.sass'
import Loader from '../UI/Loader/Loader'
import { useTable } from '../../context/TableProvider'
import TableDetails from './TableDetails/TableDetails'
import {useHttp} from '../../hooks/http.hook'

const Table = ({view = false}) => {

	const { loading } = useHttp()

	const { tableMethods, table, tableData, textAlignment } = useTable()

	const [data, setData] = useState()

	useEffect(() => {
		setData(tableData)
	}, [tableData])

	if(!data || !table || loading) {
		return <Loader/>
	}

	return (
		<>
			<div className={cl.table__container}>
				{
					table
						&&
						table.map((column) => {

							var bg = column.background

							if(bg === "transparent") {
								bg = "transparent"
							} else {
								bg = column.background
							}

							const styles = {
								textAlign: textAlignment,
								background: bg,
								fontWeight: 'bold'
							}

							return (
								<div key={column.id} className={cl.table_column}>
									<input
										disabled={view}
										style={styles} 
										className={cl.table_column__textarea} 
										defaultValue={column.header}
										onFocus={e => tableMethods.focusOnCell(e, column.id, "header")}
										onChange={e => tableMethods.setCellValue(column.id, e.target.value)}
									/>
									{
										column.body.map((cell) => {

											var bg = cell.background

											if(bg === "transparent") {
												bg = "transparent"
											} else {
												bg = cell.background
											}

											const styles = {
												textAlign: textAlignment,
												background: bg,
												fontWeight: cell.font_weight,
												fontStyle: cell.font_style,
												textDecoration: cell.text_decoration,
												resize: view ? "none" : "both"
											}

											return (
												<span key={cell.id}>
													<input
														disabled={view}
														style={styles}  
														className={cl.table_column__textarea} 
														defaultValue={cell.value}
														onFocus={e => tableMethods.focusOnCell(e, cell.id, "body")}
														onChange={e => tableMethods.setCellValue(cell.id, e.target.value)}
													/>
												</span>
											)
										})
									}
								</div>
							)
						})
				}
			</div>
			{
				view &&  
				<TableDetails/>
			}
		</>
	)
}

export default Table
