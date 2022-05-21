const randomId = require('random-id')

export default class TableService {

	nullTable = () => {
		const table = {
		    id: randomId(30, 'aA0'),
		    header: '',
		    background: 'transparent',
		    body: [
		        {
		            value: '',
		            id: randomId(30, 'aA0'),
		            background: "transparent",
		            font_weight: "normal",
		            font_style: "normal",
		            text_decoration: "none"
		        }
		    ]
		}

		return table
	}

	createColumn = (table) => {
		if(!table.length || !table) {
			return this.nullTable()
		}

		const bodyArr = []

		for(let i = 0; i < table[0].body.length;i++) {
			bodyArr.push({
				value : '',
				id : randomId(30, 'aA0'),
				background: "transparent",
				font_weight: "normal",
				font_style: "normal",
		        text_decoration: "none"
			})
		}
		const column = {
			id: randomId(30, 'aA0'),
			header : '',
			background: "transparent",
			body : [
				...bodyArr
			]
		}

		return column
	}

	removeColumn = (table) => {
		if(!table.length) {
			return []
		}
		const target = table.pop()

		return table.filter(column => column.id !== target.id)
	}

	addColumnRow = (table) => {
		if(!table.length) {
			return []
		}

		const newTable = []

		table.map((column) => {
			column.body.push({
				value : '',
				id : randomId(30, 'aA0'),
				background: "transparent",
				font_weight: "normal",
				font_style: "normal",
		        text_decoration: "none"
			})

			return newTable.push(column)
		})

		return newTable
	}

	removeColumnRow = (table) => {
		if(!table.length) {
			return []
		}
		const newTable = []

		table.map((column) => {
			const target = column.body.pop()

			column.body.filter(element => element.id !== target.id)

			return newTable.push(column)
		})

		return newTable
	}

	reload = (table) => {
		const newTable = []

		table.map((column) => {
			//Делаем хеадер елемента пустой строкой
			column.header = ''
			//Id елемента изменяем для того, чтобы реакт перерендерил весь массив, и проставил новые ключи
			column.id = randomId(30, 'aA0')

			column.background = 'transparent'

			column.body.map((element) => {
				element.value = ''
				element.id = randomId(30, 'aA0')
				element.background = 'transparent'
				element.font_weight = "normal"
				element.font_style = 'normal'
		        return element.text_decoration = 'none'
			})

			return newTable.push(column)
		})

		return newTable
	}


	setColumnElement = (table, elemId, value) => {
		table.map((column) => {
			if(column.id === elemId) {
				column.header = value
			}
			column.body.map((element) => {
				if(element.id === elemId) {
					element.value = value
				}

				return null
			})

			return null
		})

		return table
	}

	setCellBackground = (table, elemId, color) => {
		//Создаем новый массив, и по ходу темпа цикла заливаем в него измененные елементы.
		const newTable = []
		table.map((column) => {
			if(column.id === elemId) {
				column.background = color
			}
			column.body.map((element) => {
				if(element.id === elemId) {
					return element.background = color
				}

				return null
			})
			return newTable.push(column) 
		})

		return newTable
	}

	setCellFontStyle = (table, elemId, style) => {
		const newTable = []

		table.map((column) => {
			column.body.map((element) => {
				if(element.id === elemId) {
					if(element.font_style === style) {
						return element.font_style = "normal"
					}

					return element.font_style = style
				}

				return null
			})

			return newTable.push(column)
		})

		return newTable
	}

	setCellFontDecoration = (table, elemId, decorator) => {
		const newTable = []
		table.map((column) => {
			column.body.map((element) => {
				if(element.id === elemId) {
					if(element.text_decoration == decorator) {
						return element.text_decoration = "none"
					}

					return element.text_decoration = decorator
				}
			})

			return newTable.push(column)
		})

		return newTable
	}

	setCellFontWeight = (table, elemId, weight) => {
		const newTable = []

		table.map((column) => {
			column.body.map((element) => {
				if(element.id === elemId) {
					if(element.font_weight == weight) {
						return element.font_weight = "normal"
					}

					return element.font_weight = weight
				}
			})

			return newTable.push(column)
		})

		return newTable
	}
}