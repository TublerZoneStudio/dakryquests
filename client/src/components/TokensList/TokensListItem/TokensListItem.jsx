import cl from './TokensListItem.module.sass'
import Select from '../../UI/Select/Select'
import RoundBtn from '../../UI/RoundBtn/RoundBtn'

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
				<RoundBtn onClick={() => deleteFunc(token._id)}>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
						<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
					</svg>
				</RoundBtn>
			</div>
		</li>
	)
}

export default TokensListItem