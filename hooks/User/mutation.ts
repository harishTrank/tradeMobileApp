import { useMutation } from "@tanstack/react-query";
import { addNewUserService, permissionToggleApi, userAccountLimitCreated } from "../../store/Services/User";


export const useAddNewUserService = () => {
    return useMutation((payload) => addNewUserService(payload));
};

export const usePermissionToggleApi = () => {
    return useMutation((payload) => permissionToggleApi(payload));
};

export const useUserAccountLimitCreated = () => {
    return useMutation((payload) => userAccountLimitCreated(payload));
};