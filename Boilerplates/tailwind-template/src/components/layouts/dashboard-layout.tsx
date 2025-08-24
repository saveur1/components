import { Outlet } from 'react-router-dom'
import ProtectedRoute from './protected-route';

const AdminLayout = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
        <div className="w-full pb-4">
            <Outlet />
        </div>
    </ProtectedRoute>
  )
}

export default AdminLayout
