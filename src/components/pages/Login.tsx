import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {ClientData} from "../../models/ClientData";
import LoginData from "../../models/LoginData";
import {authAction, setOperationCode} from "../../redux/actions";
import LoginForm from "../forms/LoginForm";
import {useNavigate} from "react-router-dom";
import {COURSES_PATH} from "../../config/routes-config";
import {authService} from "../../config/service-config";
import {OperationCode} from "../../models/OperationCode";

const Login: React.FC = () => {
    const [isServerAvailable, setIsServerAvailable] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return <LoginForm submitFn={async function (loginData: LoginData): Promise<boolean> {
        const clientData = await authService.login(loginData);
        if (!!clientData) {
            dispatch(authAction(clientData as ClientData));
            dispatch(setOperationCode(OperationCode.OK));
            navigate(COURSES_PATH);
            return true;
        }
        return false;
    }}/>
}


export default Login;