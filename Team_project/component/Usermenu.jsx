import React from "react";
import { Dropdown, Menu } from "antd";
import { Navigate, useNavigate } from "react-router-dom";

const UserMenu = () => {

 const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item>Your Profile</Menu.Item>
      <Menu.Item>Settings</Menu.Item>
      <Menu.Item onClick={handleLogout}>Sign out</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        <span className="sr-only">Open user menu</span>
        <img
          alt=""
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          className="h-8 w-8 rounded-full"
        />
      </button>
    </Dropdown>
  );
};

export default UserMenu;
