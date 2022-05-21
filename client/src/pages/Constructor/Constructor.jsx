import Table from '../../components/TableConstructor/Table'
import { useEffect } from 'react'
import ConstructorPanel from '../../components/TableConstructor/ConstructorPanel/ConstructorPanel'
import { useTable } from '../../context/TableProvider'

const Constructor = () => {

	const { deconfigTable } = useTable()

	useEffect(() => {
		return () => {
			deconfigTable()
		}
	}, [deconfigTable])

	return (
		<div>
			<ConstructorPanel/>
			<Table/>
		</div>
	)
}

export default Constructor

