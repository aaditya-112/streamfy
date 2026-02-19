import React from "react";
import { Routes , Route, Navigate} from "react-router";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import NotificationsPage from "./pages/NotificationPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import OnboardingPage from "./pages/OnbordingPage";
import  {Toaster} from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";

const App = () => {

  const {isLoading, authUser}= useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnboaded = authUser?.isOnboaded;

  if(isLoading) return <PageLoader/>;

  return (
    <div data-theme="forest" className="h-screen">
     
      
      <Routes>
        <Route path="/" element={isAuthenticated && isOnboaded ?(<HomePage/>) : (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>)}/>
        <Route path="/signup" element={!isAuthenticated ? <SignUpPage/>: <Navigate to="/"/>}/>
        <Route path="/login" element={!isAuthenticated ?<LoginPage/>: <Navigate to="/"/>}/>
        <Route path="/notifications" element={isAuthenticated ?<NotificationsPage/>:<Navigate to="/login"/>}/>
        <Route path="/call" element={isAuthenticated ?<CallPage/> :<Navigate to="/login"/>}/>
        <Route path="/chat" element={isAuthenticated ?<ChatPage/> :<Navigate to="/login"/>}/>
        <Route path="/onboarding" element={isAuthenticated ?<OnboardingPage/> :<Navigate to="/login"/>}/>
      </Routes>

      <Toaster/>
    </div>
  );
};

export default App;
