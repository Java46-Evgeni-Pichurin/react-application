import {ReactNode} from "react";

export type RouteType = {
    path: string;
    label: string;
    element: ReactNode;
    authenticated?: boolean;// if true route item may be shown only if a client is auth
    user?: boolean;
    administrator?: boolean;
    //TODO additional property
}