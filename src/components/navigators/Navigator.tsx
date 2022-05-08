import { useMediaQuery } from "@mui/material";
import React from "react";
import { RouteType } from "../../models/RouteType";
import NavigatorDesktop from "./NavigatorDesktop";
import NavigatorMobile from "./NavigatorMobile";
const Navigator: React.FC<{items:RouteType[]}> = ({items}) => {
    const isLaptopOrDesktop = useMediaQuery('(min-width: 900px)');
    return <div style={isLaptopOrDesktop ? {marginTop: "5vw"} : {marginTop: "20vw"}}>
        {isLaptopOrDesktop ? <NavigatorDesktop items={items}/> : <NavigatorMobile items={items}/>}
    </div>
}
export default Navigator;