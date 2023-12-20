import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
//import { Link } from "react-router-dom";
const Users = () => {
  const [Users, setUsers] = useState([]);

  //getall Users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/get-users");
      setUsers(data.users);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 ">
            <h1 className="text-center">All Users List</h1>
            <div className="d-flex flex-wrap">
              {Users?.map((u) => (
                <div className="card m-2" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h3 className="card-title">
                      {u.role === 1 ? "Admin" : "User"}
                    </h3>
                    <h5 className="card-title">{u.name}</h5>
                    <p className="card-text">{u.email}</p>
                    <p className="card-text">{u.phone}</p>
                    <p className="card-text">{u.adress}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
