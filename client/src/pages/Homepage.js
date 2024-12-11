import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row, Col } from "antd"; // Import Col for proper grid layout
import WorkerList from "../components/WorkerList";

const HomePage = () => {
  const [workers, setWorkers] = useState([]);

  // Fetch worker data from the API
  const getUserData = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllWorkers", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (res.data.success) {
        setWorkers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h1 className="text-center">Home Page</h1>
      <Row gutter={[16, 16]}>
        {workers && workers.length > 0 ? (
          workers.map((worker) => (
            <Col span={8} key={worker._id}> {/* Use Col to make each card responsive */}
              <WorkerList worker={worker} />
            </Col>
          ))
        ) : (
          <p>No workers found</p>
        )}
      </Row>
    </Layout>
  );
};

export default HomePage;
