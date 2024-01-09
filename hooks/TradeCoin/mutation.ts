import { useMutation } from "@tanstack/react-query";
import { addTradeCoin, buySellTradeCoin, deleteTradeCoin, postBrkSettings, postTradeMarginSettings } from "../../store/Services/TradeCoin";

export const useAddTradeCoin = () => {
    return useMutation((payload) => addTradeCoin(payload));
};

export const useDeleteTradeCoin = () => {
    return useMutation((payload) => deleteTradeCoin(payload));
};

export const useBuySellTradeCoin = () => {
    return useMutation((payload) => buySellTradeCoin(payload));
};

export const usePostBrkSettings = () => {
    return useMutation((payload) => postBrkSettings(payload));
};

export const usePostTradeMarginSettings = () => {
    return useMutation((payload) => postTradeMarginSettings(payload));
};
