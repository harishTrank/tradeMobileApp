import { useQuery } from "@tanstack/react-query";
import { loginHistory } from "../../store/Services/Auth";

export const useLoginHistory = (payload: any) =>
  useQuery(["loginHistory", payload], () => loginHistory(payload));
