import React from "react";
import { Routes , Route} from "react-router";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import NotificationsPage from "./pages/NotificationPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import OnboardingPage from "./pages/OnbordingPage";

import toast, {Toaster} from "react-hot-toast";

const App = () => {
  return (
    <div data-theme="forest" className="h-screen">
      <button className="btn btn-primary" onClick={()=>toast.success("hello world")}>create a toast</button>
      
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/notifications" element={<NotificationsPage/>}/>
        <Route path="/call" element={<CallPage/>}/>
        <Route path="/chat" element={<ChatPage/>}/>
        <Route path="/onboarding" element={<OnboardingPage/>}/>
      </Routes>

      <Toaster/>
    </div>
  );
};

export default App;
