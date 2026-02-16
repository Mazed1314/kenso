import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="bg-[#f8f9fa] min-h-screen flex flex-col justify-center items-center">
      <Outlet />
    </div>
  );
};

export default MainLayout;
