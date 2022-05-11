import React from "react";
import {getMinMaxAvgByField} from "../../util/functions";
import {Course} from "../../models/Course";
import {useSelector} from "react-redux";
import {StateType} from "../../redux/store";

const StatisticHours: React.FC = () => {
    const courses: Course[] = useSelector<StateType, Course[]>(state => state.courses);
    const statObj = getMinMaxAvgByField(courses, 'hours');
    return <div style={{fontSize: "1.5em", display: 'flex', justifyContent: 'space-evenly'}}>
        <label>min hours = {statObj.min}</label>
        <label>max hours = {statObj.max}</label>
        <label>avg hours = {statObj.avg}</label>
    </div>
}

export default StatisticHours;