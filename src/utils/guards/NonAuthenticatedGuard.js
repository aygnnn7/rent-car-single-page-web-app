import { Navigate } from "react-router-dom";
import { getLoggedUser } from "../http-utils/user-requests";

export function NonAuthenticatedGuard({ children}){
    const user = getLoggedUser();

    if(user){
        return <Navigate to="/cars-list" />;
    }

    return children;
}