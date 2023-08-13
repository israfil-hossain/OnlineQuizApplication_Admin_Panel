import React from "react";
import { Route, Routes } from "react-router-dom";
import User from "./page/User";
import Dashboard from "./page/Dashboard";
import Activity from "./page/Activity";
import Category from "./page/Category";

import Signin from "./page/Signin";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import Quiz from "./page/Quiz";
import Results from "./page/Results";
import Study from "./page/Study";
import Slider from "./page/Slider";
import Questions from "./page/Questions";
import ViewResult from "./components/Result/ViewResult";
import Subscription from "./page/Subscription";





const App = () => {
  return (
    
      <Routes>
        
        {/* Dashboard */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute> } />

        <Route path="/login" element={<Signin /> } />

        {/* Study */}
        <Route path="/study" element={<ProtectedRoute><Study /></ProtectedRoute>} />

        {/* Slider  */}
        <Route path="/slider" element={<ProtectedRoute><Slider /></ProtectedRoute>} />


        {/* Category */}
        <Route path="/category" element={<ProtectedRoute><Category /></ProtectedRoute>} />

        {/* Quiz */}
        <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />

        {/* Questions */}
        <Route path="/questions" element={<ProtectedRoute><Questions /></ProtectedRoute>} />

         {/* Results */}
         <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
         <Route path="/results/viewresult/:id" element={<ProtectedRoute><ViewResult /></ProtectedRoute>} />
        

        {/* Users */}
        <Route path="/users" element={<ProtectedRoute><User/></ProtectedRoute>} />
        <Route path="/users/edit" element={<ProtectedRoute><User/></ProtectedRoute>} />
 
        {/* Activity */}
        <Route path="/activity" element={<ProtectedRoute><Activity/></ProtectedRoute>} />

        {/* Activity */}
        <Route path="/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />

        {/* Quiz */}
        {/* <Route path="/quiz" element={<Quiz/>} /> */}

        
      </Routes>
   
  );
};

export default App;
