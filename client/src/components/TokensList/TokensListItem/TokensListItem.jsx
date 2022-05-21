import cl from './TokensListItem.module.sass'
import Select from '../../UI/Select/Select'

const TokensListItem = ({ token, deleteFunc, update }) => {

	const preUpdate = (value) => {
		update(token._id, value)
	}
	
	return(
		<li className={`${cl.Item} li`}><div className="token-inner">{token.token}</div>
			<div className="dot-inner"><div className={token.status ? "dot green" : "dot red"}></div></div>
			<div>
				<Select 
					type="token_select"
					desc="Статус токена" 
					defaultValue={token.token_type}
					options={
						[
							{value: "admin", option: "Admin"},
							{value: "employee", option: "Employee"},
							{value: "participant", option: "Participant"}
						]
					}
					onChange={preUpdate}
				/>
			</div>
			<div>
				<button onClick={() => deleteFunc(token._id)} style={{ background: "transparent", border: "none" }} className="li-redact-btn">
					<svg className="component-color" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
					  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
					  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
					</svg>
				</button>
			</div>
		</li>
	)
}

export default TokensListItem