import React from "react";
import  AuthContext , {useAuthContext} from "../contexts/AuthContext";

// export const useCheckAuth = () => {
//     const { auth, isLoading } = useAuthContext();
//     if (!isLoading) {
//         return !!auth.currentUser
//     } else {
//         return "loading"
//     }
//     return !!auth.currentUser;
// }