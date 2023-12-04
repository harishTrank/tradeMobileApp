import { useMutation } from "@tanstack/react-query";
import { addNewUserService } from "../../store/Services/User";


export const useAddNewUserService = () => {
    return useMutation((payload) => addNewUserService(payload));
};