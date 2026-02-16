import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="bg-zinc-800 text-gray-100 min-h-screen flex flex-col justify-center items-center">
      <Outlet />
    </div>
  );
};

export default MainLayout;
