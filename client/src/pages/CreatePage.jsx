import { useEffect } from 'react'
import { useTable } from '../context/TableProvider'
import Constructor from './Constructor/Constructor'
import Table from '../components/tableConstructor/Table'

const CreatePage = () => {

	const { tableMethods } = useTable() 

	useEffect(() => {
		tableMethods.deconfigTable()
	}, [])

	return <Constructor/>
}

export default CreatePage