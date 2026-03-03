
import { axiosInstance } from "./axios";

export const getAuthUser = async ()=>{
    try {
        const res = await axiosInstance.get("/auth/me");
    return res.data;
    } catch (error) {
        console.log("error in getAuthUser:", error);
        return null;
    }
};

export const completeOnboarding = async(userData)=>{
    const response = await axiosInstance.post("/auth/onboarding",userData);
    return response.data;
}

export const login =async(loginData)=>{
    const response = await axiosInstance.post("/auth/login",loginData);
    return response.data;
}

export const logout =async()=>{
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
}

export async function getUserFriends() {
    const response = await axiosInstance.get("/users/friends");
    console.log(response);
    return response.data;

}

export const getRecommendedUsers=async()=>{
    const response = await axiosInstance.get("/users");
    return response.data;
}

export const getOutgoingFriendReqs=async()=>{
    const response =await axiosInstance.get("/users/outgoing-friend-request");
    return response.data;
}

export const sendFriendRequest=async(userId)=>{
    const response = await axiosInstance.post(`/users/friend-request/${userId}`);
    return response.data;
}

export const acceptFriendRequest=async(requestId)=> {
    const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
    return response.data;
}
export const getFriendRequests= async()=>{
    const response = await axiosInstance.get("/users/friend-requests");
    // console.log(response);
    return response.data;
}