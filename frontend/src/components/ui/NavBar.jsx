import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";

const items = [
  {
    label: "Home",
    key: "home",
    icon: <MailOutlined />,
  },
  {
    label: "Login",
    key: "login",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Events",
    key: "events",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Bookings",
    key: "bookings",
    icon: <AppstoreOutlined />,
  },
];
const NavBar = () => {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();
  const onClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default NavBar;
