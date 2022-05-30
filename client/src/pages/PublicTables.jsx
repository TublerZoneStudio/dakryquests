import { useState, useEffect, useContext, useCallback, useRef } from 'react'
import {useHttp} from '../hooks/http.hook'
import {LoginContext} from '../context/LoginContext'
import Loader from '../components/UI/Loader/Loader'
import TableList from '../components/TableConstructor/TableList/TableList'
import PageTitle from '../components/UI/PageTitle/PageTitle'
import { useTable } from '../context/TableProvider'
import { useObserver } from '../hooks/observer.hook'
import SmallLoader from '../components/UI/Loader/SmallLoader/SmallLoader'
import no_results from '../images/no-results.png'

export const PublicTables = () => {
	
	const { tableMethods } = useTable()

	const [tables, setTables] = useState([])
	const [limit, setLimit] = useState(5)
	const [page, setPage] = useState(0)
	const [canLoad, setCanLoad] = useState(true)
	const [loading, setLoading] = useState(false)
	const obsElement = useRef()

	const fetchTables = async(limit, page) => {
		setLoading(true)
		try {
			const response = await tableMethods.getPublicTables(limit, page)
			if(!response.length) {
				return setCanLoad(false)
			} else {
				setTables([...tables, ...response])
			}
		} catch(e) {
			console.log(e)
		} finally {
			setLoading(false)
		}
	}

	useObserver(obsElement, canLoad, loading, () => {
		setPage(page + 1)
	})

	useEffect(() => {
		fetchTables(limit, page)
	}, [page])
	
	return (
		<>
			{
				tables.length
					?
					<>
						<PageTitle>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
								<path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
							</svg>
						</PageTitle>
						<TableList tables={tables}/>
					</>
					:
					<div style={{
							height: "100vh",
						 	display: "grid",
						 	alignItems: "center",
						 	justifyContent: "center"
						}}
					>
						<div style={{
							textAlign: "center",
							color: "#fff"
						}}
						>
							<img src={no_results} alt=""/>
							<p>
								Не найдена не одна таблица...
							</p>
						</div>
					</div>	
			}
			<div style={{display: "flex", justifyContent: "center"}} ref={obsElement}>
				{
					canLoad && <SmallLoader/>
				}
			</div>
		</>
	)
}

