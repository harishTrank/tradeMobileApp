import { useMutation } from "@tanstack/react-query";
import { changePassword, loginApiCall, mobileLogout } from "../../store/Services/Auth";


export const useloginApiCall = () => {
    return useMutation((payload) => loginApiCall(payload));
};

export const useMobileLogout = () => {
    return useMutation((payload) => mobileLogout(payload));
};

export const useChangePassword = () => {
    return useMutation((payload) => changePassword(payload));
};


