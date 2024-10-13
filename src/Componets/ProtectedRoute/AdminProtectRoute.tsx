
import { useSelector } from 'react-redux'
import { Navigate, Outlet} from 'react-router-dom';
import { UserState } from '../../redux/user/userslice';


export default function AdminProtectRoute() {
 
 const {currentUser} = useSelector((state: { user: UserState}) =>{

  return state.user;
 });

 



  return (currentUser?<Outlet/>:<Navigate to={'user/log-in'}/>);
}


