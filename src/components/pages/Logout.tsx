import React from "react";
import { useDispatch } from "react-redux";
import { emptyClientData } from "../../models/ClientData";
import { authAction } from "../../redux/actions";
import LogoutIcon from '@mui/icons-material/Logout';
const Logout: React.FC = () =>{

    const dispatch = useDispatch();

    return <LogoutIcon onClick={() => dispatch(authAction(emptyClientData))}/>
}
export default Logout;