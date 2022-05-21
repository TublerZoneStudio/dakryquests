import TableItem from '../TableItem/TableItem'
import no_results from '../../../images/no-results.png'
import cl from './TableList.module.sass'

const TableList = ({tables}) => {
	if(!tables.length) {
		return (
			<div className={cl.noResult}>
				<div className={cl.Content}>
					<img src={no_results} alt=""/>
					<p>
						Не найдена не одна таблица...
					</p>
				</div>
			</div>	
		)
	}

	return (
		<div className={cl.TableList}>
			{
				tables.map((table) => 
					<TableItem key={table._id} table={table}/>
				)
			}
		</div>
	)
}

export default TableList