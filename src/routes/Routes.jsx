import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Calculators from "@/pages/Calculators";
import Mechanics from "@/pages/Mechanics";
import Look from "@/pages/Look";
import Lab from "@/pages/Lab";
import Mortgage from "@/components/calculators/Mortgage";
import CompoundInterest from "@/components/calculators/CompoundInterest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/calculators",
        element: <Calculators />,
        children: [
          {
            path: ":id",
            element: <Mortgage />,
          },
          {
            path: ":id",
            element: <CompoundInterest />,
          },
        ],
      },
      {
        path: "/mechanics",
        element: <Mechanics />,
      },
      {
        path: "/look",
        element: <Look />,
      },
      {
        path: "/lab",
        element: <Lab />,
      },
    ],
  },
]);

export default router;
