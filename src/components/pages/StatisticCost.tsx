import React from "react";
import {getMinMaxAvgByField} from "../../util/functions";
import {Course} from "../../models/Course";
import {useSelector} from "react-redux";
import {StateType} from "../../redux/store";

const StatisticCost: React.FC = () => {
    const courses: Course[] = useSelector<StateType, Course[]>(state => state.courses);
    const statObj = getMinMaxAvgByField(courses, 'cost');
    return <div>{statObj.min == 0 ? <label style={{fontSize: "2em"}}>No Data</label> :
        <div style={{fontSize: "1.5em", display: 'flex', justifyContent: 'space-evenly'}}>
            <label>min cost = {statObj.min}</label>
            <label>max cost = {statObj.max}</label>
            <label>avg cost = {statObj.avg}</label>
        </div>}</div>
}
export default StatisticCost;