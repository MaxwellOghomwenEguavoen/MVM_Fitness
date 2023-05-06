import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { fetchUserId } from "../utils/fetchUser";

const Dashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("auth-token");

    const [link, setLink] = useState("dashboard");
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        phone: ""
    });
    useEffect(() => {
        async function fetchUserData() {
            const userId = await fetchUserId(token);
            await axios.get(`http://localhost:8000/api/user/${userId._id}`).then((res) => {
                setUserData({
                    username: res.data.username,
                    email: res.data.email,
                    phone: res.data.phone
                })
            });
        }
        const checkUser = () => {
            if (!token) {
                navigate("/");
            }
        };
        fetchUserData();
        checkUser();

    }, [token]);
    return (
        <>
            <Header />
            <div className='dashboard'>

                {/* Sidebar */}
                <div className="sidebar_dashboard">
                    <h2 style={{ marginBottom: "30px" }}>Howdy, <span style={{ color: "#646464" }}> {userData.username}</span></h2>
                    <button onClick={() => setLink("dashboard")} className={link === "dashboard" ? "sidebar_dashboard_links_active" : "sidebar_dashboard_links"}>
                        <p>My Dashboard</p>
                    </button>
                    <button onClick={() => setLink("favourite")} className={link === "favourite" ? "sidebar_dashboard_links_active" : "sidebar_dashboard_links"}>
                        <p>Favourites</p>
                    </button>

                </div>
                {/* Main Content */}
                {link === "dashboard" && (
                    <div className="mainContent_dashboard">
                        <h2 style={{ color: "#646464" }}>DASHBOARD</h2>
                        <div className="dashboard_details">
                            <p><strong>Username:</strong> {userData.username}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                            <p><strong>Phone:</strong> {userData.phone}</p>
                        </div>
                    </div>
                )}
                {link === "favourite" && (
                    <div className="mainContent_dashboard">
                        <h2 style={{ color: "#646464" }}>FAVOURITE</h2>
                    </div>
                )}
            </div>
        </>
    );
};

export default Dashboard;
