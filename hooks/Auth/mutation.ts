import { useMutation } from "@tanstack/react-query";
import { changePassword, loginApiCall } from "../../store/Services/Auth";


export const useloginApiCall = () => {
    return useMutation((payload) => loginApiCall(payload));
};

export const useChangePassword = () => {
    return useMutation((payload) => changePassword(payload));
};

