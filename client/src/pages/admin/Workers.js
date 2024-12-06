import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";

const Workers = () => {
  const [workers, setWorkers] = useState([]);

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
      console.error(error);
      message.error("Failed to fetch workers");
    }
  };

  const handleApprove = async (workerId) => {
    try {
      const res = await axios.post(
        `/api/v1/admin/approveWorker`,
        { workerId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setWorkers((prev) =>
          prev.map((worker) =>
            worker.id === workerId ? { ...worker, status: "approved" } : worker
          )
        );
        message.success("Worker approved successfully");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to approve worker");
    }
  };

  const handleReject = async (workerId) => {
    try {
      const res = await axios.post(
        `/api/v1/admin/rejectWorker`,
        { workerId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setWorkers((prev) =>
          prev.map((worker) =>
            worker.id === workerId ? { ...worker, status: "rejected" } : worker
          )
        );
        message.success("Worker rejected successfully");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to reject worker");
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
      title: "Phone",
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
              onClick={() => handleApprove(record.id)}
            >
              Approve
            </button>
          ) : (
            <button
              className="btn btn-danger"
              onClick={() => handleReject(record.id)}
            >
              Reject
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-3">All Workers</h1>
      <Table columns={columns} dataSource={workers} rowKey="id" />
    </Layout>
  );
};

export default Workers;
