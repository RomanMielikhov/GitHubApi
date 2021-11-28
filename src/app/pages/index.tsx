import { memo } from "react";
import { Routes, Route } from "react-router-dom";
import Users from "./Users";
import UserInfo from "./UserInfo";

const Pages = memo(() => {
  return (
    <Routes>
      <Route path="*" element={<Users />} />
      <Route path="user-info/:login" element={<UserInfo />} />
    </Routes>
  );
});
export default Pages;
