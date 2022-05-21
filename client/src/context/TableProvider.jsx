import { useContext, useState, createContext, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import TableService from '../services/TableService'
import { LoginContext } from './LoginContext'

const TableContext = createContext()

export const useTable = () => {
	return useContext(TableContext)
}

export const TableProvider = ({ children }) => {

	// Func dependencies
	const navigate = useNavigate()
	const auth = useContext(LoginContext)
	const { request } = useHttp()
	const tableService = new TableService()

	// States
	const [table, setTable] = useState([])
	const [tableData, setTableData] = useState([])
	const [selectedCell, setSelectedCell] = useState([])
	const [textAlignment, setTextAlignment] = useState('start')
	const [update, setUpdate] = useState(false)
	const [publicStatus, setPublicStatus] = useState(false)
	const [owner, setOwner] = useState(null)
	const [comments, setComments] = useState([])

	const saveTable = useCallback( async () => {
		try {
			await request('/api/table/generate', 'POST',
				{
					title: tableData.title,
					description: tableData.description,
					public: publicStatus,
					table,
					textAlignment
				}, 
				{ 
			  Authorization: `Bearer ${auth.token}`
			})

			navigate('/tables')
		} catch (e) {
			console.log(e) 
		}
	}, [request, tableData, publicStatus, table, textAlignment, auth.token, navigate])

	const updateTable = async () => {
		try {
			await request(`/api/table/update/${tableData._id}`, 'POST', 
				{
					title: tableData.title,
					description: tableData.description,
					public: publicStatus,
					table, 
					textAlignment
				},
				{
				Authorization: `Bearer ${auth.token}`
			})

			navigate('/tables')
		} catch(e) {
			console.log(e)
		}
	}

	const getUser = useCallback( async (id) => {
		try {
			const response = await request('/api/auth/get-user-by-id', 'POST', {id}, {
				Authorization: `Bearer ${auth.token}`
			})

			return response
		} catch(e) {
			console.log(e)
		}
	}, [request, auth.token])

	const addComment = async (message) => {
		try {
			const response = await request('/api/table/add-comment', 'POST', {tableId: tableData._id, message}, {
				Authorization: `Bearer ${auth.token}`
			})

			setComments([...comments, response])
		} catch(e) {
			console.log(e)
		}
	}

	const addAnswerToComment = async (commentId, message) => {
		try {
			const response = await request('/api/table/add-answer', 'POST', {tableId: tableData._id, commentId, message} ,{
				Authorization: 	`Bearer ${auth.token}`
			}) 

			const newComments = comments 

			for(let i= 0; i < newComments.length; i++) {
				if(newComments[i].id === commentId) {
					newComments[i].answers.push(response)
				}
			}
			
			setComments(newComments)
		} catch(e) {
			console.log(e)
		}
	}

	const removeAnswer = async (commentId, answerId) => {
		try {
			const response = await request('/api/table/remove-answer', 'POST', {tableId: tableData._id, commentId, answerId} ,{
				Authorization: 	`Bearer ${auth.token}`
			}) 


			setComments(response)
			
		} catch(e) {
			console.log(e)
		}
	}

	const removeComment = async (commentId) => {
		try {
			await request('/api/table/remove-comment', 'POST', {tableId: tableData._id, commentId}, {
				Authorization: `Bearer ${auth.token}`
			})

			setComments(comments.filter(comment => comment.id !== commentId))
		} catch(e) {
			console.log(e)
		}
	}

	const addLikeToComment = async (commentId, status) => {
		try {
			await request('/api/table/add-like-to-comment', 'POST', {tableId: tableData._id, commentId, status}, {
				Authorization: `Bearer ${auth.token}`
			})
		} catch(e) {
			console.log(e)
		}
	}

	const addLikeToTable = async () => {
		try {
			await request('/api/table/set-like-status', 'POST', {tableId: tableData._id, likerId: auth.userId}, {
				Authorization: `Bearer ${auth.token}`
			})
		} catch(e) {
			console.log(e)
		}
	}

	const findCellById = (cellId) => {
		let cellVal = ''

		table.map((column) => {
			if(column.id === cellId) {
				return cellVal = column.header
			}

			column.body.map((cell) => {
				if(cell.id === cellId) {
					return cellVal = cell.value
				}

				return null
			})

			return null
		})

		return cellVal
	}

	const setSelectedCellValue = (value) => {
		const newCell = selectedCell 

		newCell.value = value

		setSelectedCell(newCell)
	}

	const setCellValue = (cellId, value) => {
		const newTable = []

		setSelectedCellValue(value)

		table.map((column) => {
			if(column.id === cellId) {
				column.header = value
			}

			column.body.map((cell) => {
				if(cell.id === cellId) {
					cell.value = value
				}

				return null
			})

			return newTable.push(column)
		})

		setTable(newTable)
	}

	const focusOnCell = (event, cellId, eventType) => {
		const cellVal = findCellById(cellId)

		setSelectedCell({
			value: cellVal,
			cellId,
			type: eventType
		})
	}

	const configTable = useCallback( async (defTable, defTableData) => {
		setTable(defTable)
		setTableData(defTableData)
		setTextAlignment(defTableData.textAlignment)
		setSelectedCell([])
		setPublicStatus(defTableData.public)
		setComments(defTableData.comments)
		const defOwner = await getUser(defTableData.ownerId)
		setOwner(defOwner)
	},
	[
		setTable,
		setTableData,
		setTextAlignment,
		setSelectedCell,
		setPublicStatus,
		setComments,
		setOwner,
		getUser
	])

	const setUpdateStatus = useCallback( (status) => {
		setUpdate(status)
	}, [setUpdate])

	const deconfigTable = useCallback(() => {
		setTable([])
		setTableData([])
		setTextAlignment('start')
		setSelectedCell([])
		setPublicStatus(false)
		setOwner([])
		setComments([])
	}, [setTable, setTableData, setTextAlignment, setSelectedCell, setPublicStatus, setOwner, setComments])

	const setCellFontWeight = (weight) => {
		setTable(tableService.setCellFontWeight(table, selectedCell.cellId, weight))
	}

	const setCellFontStyle = (style) => {
		setTable(tableService.setCellFontStyle(table, selectedCell.cellId, style))
	}

	const setCellFontDecoration = (decoration) => {
		setTable(tableService.setCellFontDecoration(table, selectedCell.cellId, decoration))
	}

	const setCellBackground = (color) => {
		setTable(tableService.setCellBackground(table, selectedCell.cellId, color))
	}

	const setTitle = (value) => {
		const newTableData = tableData
		newTableData.title = value
		setTableData(newTableData)
	}

	const setDesc = (value) => {
		const newTableData = tableData
		newTableData.description = value
		setTableData(newTableData)
	}

	const addColumn = () => {
		setTable([...table, tableService.createColumn(table)])
	}

	const removeColumn = () => {
		setTable(tableService.removeColumn(table))
	}

	const addColumnRow = () => {
		setTable(tableService.addColumnRow(table))
	}

	const removeColumnRow = () => {
		setTable(tableService.removeColumnRow(table))
	}

	const reload = () => {
		setTable(tableService.reload(table))
	}

	const value = {
		tableMethods: {
			setTableData,
			setTable,
			setTextAlignment,
			setTitle,
			setDesc,
			addColumn,
			removeColumn,
			addColumnRow,
			removeColumnRow,
			updateTable,
			saveTable,
			reload,
			focusOnCell,
			setCellValue,
			setCellFontWeight,
			setCellFontStyle,
			setCellFontDecoration,
			setCellBackground,
			configTable,
			deconfigTable,
			setUpdate,
			setPublicStatus,
			addAnswerToComment,
			removeAnswer,
			removeComment,
			getUser,
			addComment,
			addLikeToComment,
			addLikeToTable
		},
		table,
		tableData,
		selectedCell,
		textAlignment,
		update,
		publicStatus,
		owner,
		comments,
		
		configTable,
		deconfigTable,
		getUser,
		setUpdateStatus
	}

	return (
		<TableContext.Provider value={value}>
			{children}
		</TableContext.Provider>
	)
}