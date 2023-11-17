import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import NavBar from "./ui/NavBar";

const { Header, Content, Footer } = Layout;

const WebLayout = () => {
  return (
    <Layout className="layout">
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <NavBar />
      </Header>
      <Content
        style={{
          padding: "0 50px",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default WebLayout;
