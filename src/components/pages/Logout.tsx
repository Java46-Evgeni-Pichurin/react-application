import {Button} from "@mui/material";
import React from "react";
import {useDispatch} from "react-redux";
import {emptyClientData} from "../../models/ClientData";
import {authAction} from "../../redux/actions";
import {useNavigate} from "react-router-dom";
import {authService} from "../../config/service-config";
import {LOGIN_PATH} from "../../config/routes-config";

const Logout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function onLogout() {
        if (await authService.logout()) {
            dispatch(authAction(emptyClientData));
            navigate(LOGIN_PATH);
        }
    }

    return <Button onClick={onLogout}>Logout</Button>
}
export default Logout;