import { useMutation } from "@tanstack/react-query";
import { addNewUserService, editUserCase, permissionToggleApi, updateAdminTraderight, updateMarketTrade, userAccountLimitCreated } from "../../store/Services/User";


export const useAddNewUserService = () => {
    return useMutation((payload) => addNewUserService(payload));
};

export const usePermissionToggleApi = () => {
    return useMutation((payload) => permissionToggleApi(payload));
};

export const useUserAccountLimitCreated = () => {
    return useMutation((payload) => userAccountLimitCreated(payload));
};
export const useUpdateAdminTraderight = () => {
    return useMutation((payload) => updateAdminTraderight(payload));
};

export const useUpdateMarketTrade = () => {
    return useMutation((payload) => updateMarketTrade(payload));
};

export const useEditUserCase = () => {
    return useMutation((payload) => editUserCase(payload));
};

