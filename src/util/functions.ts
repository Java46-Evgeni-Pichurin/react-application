import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN_PATH } from "../config/routes-config";
import { authService } from "../config/service-config";
import { emptyClientData } from "../models/ClientData";
import { RouteType } from "../models/RouteType";
import { authAction } from "../redux/actions";

export function range (minInclusive: number, maxExclusive: number): number[] {
 const res: number[] = [];
 for (let i = minInclusive; i < maxExclusive; i++) {
     res.push(i);
 }
 return res;
}
export function getMinMaxAvgByField(array: any[], field: string): {min: number, max: number, avg: number} {
    if (!array || array.length === 0 || !array[0][field] || typeof (array[0][field]) !== 'number') {
        return {min: 0, max:0, avg:0};
    }
   const resObj: {min: number, max: number, avg: number} =  array.reduce((res, cur) => ({min: res.min > cur[field] ? cur[field] : res.min,
max: res.max < cur[field] ? cur[field] : res.max, avg: res.avg + cur[field]}), {min: array[0][field],
     max: array[0][field], avg: 0});
   resObj.avg = Math.round(resObj.avg / array.length) ;
   return resObj; 

}
export function getRouteIndex(items: RouteType[], pathname: string): number {
    let index =  items.findIndex(item => item.path === pathname);
    if (index < 0) {
        index = 0;
    }
    return index;
}
export function getIsoDate(dateValue: Date): string {
    const day = dateValue.getDate() + 1;
    const month = dateValue.getMonth();
    const year = dateValue.getFullYear();
    const dateUTC = new Date(year, month, day);
    return dateUTC.toISOString().substring(0, 10);

}