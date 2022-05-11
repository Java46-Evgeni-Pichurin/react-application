import { useLocation } from "react-router-dom";
import { RouteType } from "../models/RouteType";
import { getRouteIndex } from "./functions";

export function useLabel(items: RouteType[]) :number {
    const location = useLocation();
    return getRouteIndex(items, location.pathname);
}