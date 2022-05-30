import TokensListItem from './TokensListItem/TokensListItem'

const TokensList = ({tokens, deleteFunc, update, loading}) => {

	const preDeleteFunc = (tokenId) => {
		deleteFunc(tokens, tokenId)
	}

	return(
		<>
			{
				tokens.map((token) => 
					<TokensListItem
						key={token._id} 
						token={token}
						deleteFunc={preDeleteFunc}
						update={update}
					/>
				)
			}
		</>
	)
}

export default TokensList