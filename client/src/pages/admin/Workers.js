import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { message, Table } from "antd";
// import { BACKEND_URL } from "../../config";

const Workers = () => {
  const [workers, setWorkers] = useState([]);
  //getUsers
  const getWorkers = async () => {
    
    try {
      const res = await axios.get("/api/v1/admin/getAllWorkers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      if (res.data.success) {
        setWorkers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle account
  const handleAccountStatus = async (record, status) => {
    try {
      console.log(record)
      const res = await axios.post(
       `/api/v1/admin/changeAccountStatus`,
        {workerId: record._id, userId:record.userId, status:status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      console.log(res)
      if (res.data.success) {
        message.success(res.data.message);
         // Refresh workers list
        window.location.reload()
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      message.error("Something Went Wrong");
    }
  };
  

  useEffect(() => {
    getWorkers();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-3">All Workers</h1>
      <Table columns={columns} dataSource={workers} />
    </Layout>
  );
};

export default Workers;