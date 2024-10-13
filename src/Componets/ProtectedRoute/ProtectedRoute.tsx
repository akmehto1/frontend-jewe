
import { useSelector } from 'react-redux'
import { Navigate, Outlet} from 'react-router-dom';
import { UserState } from '../../redux/user/userslice';


export default function UserProtectRoute() {
 
 const {currentUser} = useSelector((state: { user: UserState}) =>{
  
  return state.user;
 });


 console.log("protected");
 console.log(currentUser);
 



  return (currentUser?<Outlet/>:<Navigate to={'user/log-in'}/>);
}


