import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Dashboard from "../features/dashboard/Dashboard";
import AssetPage from "../features/asset/AssetPage";
import Assignment from "../features/assignment/Assignment";
import ManageUser from "../features/manage_user/ManageUser";

function AppRouter() {
  const [assetTotal, setAssetTotal] = useState(0);
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={<Dashboard assetTotal={assetTotal} />}
      />
      <Route
        path="/asset"
        element={
          <AssetPage assetTotal={assetTotal} setAssetTotal={setAssetTotal} />
        }
      />
      <Route path="/assignment" element={<Assignment />} />
      <Route path="/manage-user" element={<ManageUser />} />
    </Routes>
  );
}

export default AppRouter;
