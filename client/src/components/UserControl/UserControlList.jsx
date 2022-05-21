import UserControlItem from './UserControlItem/UserControlItem'

const UserControlList = ({users}) => {
	return (
		<>
			{
				users.map((user) => 
					<UserControlItem key={user._id} user={user}/> 
				)
			}
		</>
	)
}

export default UserControlList