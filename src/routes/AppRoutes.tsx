import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import CreateBatch from "../pages/Dashboard/CreateBatch";
import UpdateBatch from "../pages/Dashboard/UpdateBatch";
import BatchDetails from "../pages/Dashboard/BatchDetails";
import Login from "../pages/Login/Login";

import ProtectedRoute from "./ProtectedRoute";
import { uiEndpoint } from "../utils/endpoints";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path={uiEndpoint.bashborad} element={<Dashboard />} />

            <Route path={uiEndpoint.createBatch} element={<CreateBatch />} />

            <Route path={uiEndpoint.updateBatch} element={<UpdateBatch />} />

            <Route path={uiEndpoint.batchDetails} element={<BatchDetails />} />
          </Route>
        </Route>

        {/* Default */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
