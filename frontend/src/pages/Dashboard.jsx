import React, { useEffect } from "react";

import { Link } from "react-router-dom";

import Chart from "react-apexcharts";

import { useSelector } from "react-redux";

import StatusCard from "../components/status-card/StatusCard";

import Table from "../components/table/Table";

import Badge from "../components/badge/Badge";

import axios from "axios";
import { getToken } from "../config/Api";
import { useState } from "react";
import TableActivity from "../components/table/TableActivity";

const chartOptions = {
  series: [
    {
      name: "Pengguna Online",
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
    },
  ],
  options: {
    color: ["#6ab04c", "#2980b9"],
    chart: {
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    legend: {
      position: "top",
    },
    grid: {
      show: false,
    },
  },
};

const topCustomers = {
  head: ["Pengguna", "Tanggal"],
};

const renderCusomerHead = (item, index) => <th key={index}>{item}</th>;

const renderCusomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.username}</td>
    <td>{item.order}</td>
  </tr>
);

const latestOrders = {
  header: ["Pengguna", "Aktivitas", "Tanggal", "status"],
};

const orderStatus = {
  shipping: "primary",
  pending: "warning",
  paid: "success",
  refund: "danger",
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.price}</td>
    <td>{item.date}</td>
    <td>
      <Badge type={orderStatus[item.status]} content={item.status} />
    </td>
  </tr>
);

const Dashboard = () => {
  const [result, setResult] = useState([]);
  const [user, setUser] = useState([]);
  const [activity, setActivity] = useState([]);
  const themeReducer = useSelector((state) => state.ThemeReducer.mode);

  const token = getToken();

  useEffect(() => {
    localStorage.setItem("page", "Dashboard");
    axios
      .get("/api/dashboard/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setResult(res.data);
        setUser(res.data.allUser);
        setActivity(res.data.allActivity);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <StatusCard count={result} />
        </div>
        <div className="col-md-6">
          <div className="card full-height">
            <div className="card__header">
              <h3>Aktivitas Login</h3>
            </div>
            {/* chart */}
            <Chart
              options={
                themeReducer === "theme-mode-dark"
                  ? {
                      ...chartOptions.options,
                      theme: { mode: "dark" },
                    }
                  : {
                      ...chartOptions.options,
                      theme: { mode: "light" },
                    }
              }
              series={chartOptions.series}
              type="line"
              height="100%"
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card__header">
              <h3>Pengguna Baru</h3>
            </div>
            <div className="card__body">
              <Table
                headData={topCustomers.head}
                renderHead={(item, index) => renderCusomerHead(item, index)}
                user={user}
                renderBody={(item, index) => renderCusomerBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/user">Selengkapnya</Link>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card__header">
              <h3>Aktivitas Pengguna</h3>
            </div>
            <div className="card__body">
              <TableActivity
                headData={latestOrders.header}
                renderHead={(item, index) => renderOrderHead(item, index)}
                activity={activity}
                renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/aktivitas">Selengkapnya</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
