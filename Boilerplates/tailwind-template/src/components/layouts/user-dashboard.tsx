import { Outlet } from "react-router-dom";
import ProtectedRoute from './protected-route';

const UserDashboardLayout = () => {
  return (
    <ProtectedRoute allowedRoles={["admin", "responder"]}>
        {/* <Navigation /> */}
        <Outlet />
    </ProtectedRoute>
  )
}

export default UserDashboardLayout