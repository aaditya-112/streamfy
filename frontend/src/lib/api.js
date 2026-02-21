
import { axiosInstance } from "./axios";

export const getAuthUser = async ()=>{
    const res = await axiosInstance.get("/auth/me");
    return res.data;
};

export const completeOnboarding = async(userData)=>{
    const response = await axiosInstance.post("/auth/onboarding",userData);
    return response.data;
}