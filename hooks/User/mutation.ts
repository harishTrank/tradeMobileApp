import { useMutation } from "@tanstack/react-query";
import { addNewUserService, permissionToggleApi } from "../../store/Services/User";


export const useAddNewUserService = () => {
    return useMutation((payload) => addNewUserService(payload));
};

export const usePermissionToggleApi = () => {
    return useMutation((payload) => permissionToggleApi(payload));
};

