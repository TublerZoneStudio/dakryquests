import { useContext, useEffect, useCallback } from 'react'
import {useHttp} from '../hooks/http.hook'
import {LoginContext} from '../context/LoginContext'
import {useParams} from 'react-router-dom'
import Loader from '../components/UI/Loader/Loader'
import Table from '../components/TableConstructor/Table'
import { useTable } from '../context/TableProvider'

const TableView = () => {
	const {token} = useContext(LoginContext)

	const {request, loading} = useHttp()

	const tableId = useParams().id

	const { configTable, deconfigTable } = useTable()

	const getTable = useCallback( async () => {
		try{
			const table = await request(`/api/table/${tableId}`, "GET", null, {
				Authorization: `Bearer ${token}`
			})

			configTable(table.table, table)
		} catch(e) {
			console.log(e)
		}
	}, [request, token, tableId, configTable])

	useEffect(() => {
		getTable()

		return () => {
			deconfigTable()
		}
	}, [getTable, deconfigTable])

	if(loading){
		return <Loader/>
	}

	return (
		<Table view/>
	)
}

export default TableView

