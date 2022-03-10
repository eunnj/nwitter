import React, {useState} from "react";
import { HashRouter as Router , Route, Routes} from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import {Navigate} from "react-router-dom";


const AppRouter = ({isLoggedin})=>{
    return(
        <Router>
            {isLoggedin&&<Navigation/>}
            <Routes>
                {isLoggedin ? (
                <>
                <Route exact path="/" element ={<Home/>}></Route>
                <Route exact path="/profile" element ={<Profile/>}></Route>
                </>
                ):(
                <>
                <Route exact path="/" element ={<Auth/>}></Route>
                <Route path="*" element ={<Navigate replace to="/"/>}></Route>
                </>
                )}
            </Routes>
        </Router>
    )
}

export default AppRouter;