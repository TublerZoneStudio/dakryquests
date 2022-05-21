import {useEffect, useState} from 'react'
import cl from './ConstructorPanel.module.sass'
import RoundBtn from '../../UI/RoundBtn/RoundBtn'
import Select from '../../UI/Select/Select'
import ColorPicker from '../../UI/ColorPicker/ColorPicker'
import { useTable } from '../../../context/TableProvider'

const ConstructorPanel = () => {

	const { tableMethods, tableData, selectedCell, update, publicStatus } = useTable()

	const [data, setData] = useState()

	const [active, setActive] = useState(false)
	const [color, setColor] = useState(null)

	const changeActive = () => {
		if(active) {
			return setActive(false)
		}	

		setActive(true)
	}

	useEffect(() => {
		setData(tableData)
	}, [tableData])

	return (
		<div className={cl.Panel}>
			<div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
				<div style={{display: "flex", alignItems: "center"}}>
					<RoundBtn onClick={update ? () => tableMethods.updateTable() : () => tableMethods.saveTable()}>
						{
							update
								?
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
									<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
									<path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
								</svg>
								:
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
									<path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
								</svg>
						}
					</RoundBtn>
					<RoundBtn onClick={() => changeActive()}>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
							<path d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
						</svg>
					</RoundBtn>
					<RoundBtn onClick={() => tableMethods.reload()}>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
						  <path d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
						  <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
						</svg>
					</RoundBtn>
					<RoundBtn onClick={() => tableMethods.setTextAlignment('start')}>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
							<path d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
						</svg>
					</RoundBtn>
					<RoundBtn onClick={() => tableMethods.setTextAlignment('center')}>
						<svg className={cl.RoundBtn__strafe} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
							<path d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
						</svg>
					</RoundBtn>
					<RoundBtn onClick={() => tableMethods.setTextAlignment('end')}>
						<svg className={cl.RoundBtn__strafe} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
							<path d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
						</svg>
					</RoundBtn>
				</div>
				<div style={{display: "flex", alignItems: "center"}}>
					<RoundBtn onClick={() => tableMethods.addColumn()}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
							<path d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
						</svg>
					</RoundBtn>
					<RoundBtn onClick={() => tableMethods.removeColumn()}>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
						  <path d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
						</svg>
					</RoundBtn>
					<RoundBtn onClick={() => tableMethods.addColumnRow()}>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
							<path d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
						</svg>
					</RoundBtn>
					<RoundBtn onClick={() => tableMethods.removeColumnRow()}>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
						  <path d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
						</svg>
					</RoundBtn>
				</div>
			</div>
			<div className={active ? cl.Active : cl.Inactive}>
				<div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
					{ 
						selectedCell
							? selectedCell.value ? <div className={cl.selectedElement}> { selectedCell.value } </div> : <div className={cl.selectedElement}> Ячейка пуста </div>
							: <div className={cl.selectedElement}> Не выбрана не одна ячейка </div>
					} 
					{ 
						selectedCell && selectedCell.type === "body" &&
							<div className={cl.Toolbar}>
								<RoundBtn onClick={() => tableMethods.setCellFontWeight('bold')}>
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
										<path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
									</svg>
								</RoundBtn>
								<RoundBtn onClick={() => tableMethods.setCellFontStyle("italic")}>
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
										<path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
									</svg>
								</RoundBtn>
								<RoundBtn onClick={() => tableMethods.setCellFontDecoration("line-through")}>
									<svg className={cl.RoundBtn__strafe} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
										<path d="M6.333 5.686c0 .31.083.581.27.814H5.166a2.776 2.776 0 0 1-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.18.602-2.18 1.607zm2.194 7.478c-2.153 0-3.589-1.107-3.705-2.81h1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.675 0-.827-.547-1.374-1.914-1.675L8.046 8.5H1v-1h14v1h-3.504c.468.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967z"/>
									</svg>
								</RoundBtn>
								<RoundBtn onClick={() => tableMethods.setCellFontDecoration("underline")}>
									<svg className={cl.RoundBtn__strafe} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
										<path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136zM12.5 15h-9v-1h9v1z"/>
									</svg>
								</RoundBtn>
							</div>
					}
					{
						selectedCell &&
							<div className={cl.Toolbar}>
								<ColorPicker onChange={e => setColor(e.target.value)}/>
								<RoundBtn onClick={() => tableMethods.setCellBackground(color)}>
									<svg className={cl.RoundBtn__strafe} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
										<path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z"/>
									</svg>
								</RoundBtn>
								<RoundBtn onClick={() => tableMethods.setCellBackground("transparent")}>
									<svg className={cl.RoundBtn__strafe} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
										<path d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"/>
						  				<path d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z"/>
									</svg>
								</RoundBtn>
							</div>
						}
				</div>
				<div className={cl.table__details}>
					<div className={cl.table__title}>
						<input className={`${cl.details__input} browser-default`} onChange={e => tableMethods.setTitle(e.target.value)} type="text" defaultValue={data && data.title} placeholder="Введите название таблицы"/>
					</div>
					<div className={cl.table__description}>
						<input className={`${cl.details__input} browser-default`} onChange={e => tableMethods.setDesc(e.target.value)} type="text" defaultValue={data && data.description} placeholder="Введите описание таблицы"/>
					</div>
					<div className={cl.table__status}>
						<Select 
							type="default" 
							desc="Статус таблицы"
							defaultValue={publicStatus ? 'Публичная' : 'Приватная'}
							options={
								[
									{value: true, option: 'Публичная'},
									{value: false, option: 'Приватная'}
								]
							}
							onChange={tableMethods.setPublicStatus}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ConstructorPanel