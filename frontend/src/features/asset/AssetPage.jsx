import React, { useState } from "react";
import { dashboardchartdata } from "../../model/SampleData";
import Button from "../../components/common/Button";
import { FaPlus } from "react-icons/fa6";
import ModalComponent from "../../components/common/ModalComponent";
import ManageAssetTable from "./components/ManageAssetTable";
import { useAssets } from "../../hooks/useAssets";
import SearchInput from "../../components/common/SearchInput";

function AssetPage() {
  const [open, setOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  // ✅ Define missing states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sort, setSort] = useState("asset_id");
  const [order, setOrder] = useState("asc");

  const handleAddOpen = () => {
    setModalMode("add");
    setSelectedAsset(null);
    setOpen(true);
  };

  const handleEditOpen = (asset) => {
    setModalMode("edit");
    setSelectedAsset(asset);
    setOpen(true);
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setPage(0); // reset to first page on new search
  };

  const handleClose = () => setOpen(false);

  // Fetch assets including backend search
  const { data: assetData, isLoading } = useAssets({
    page: page + 1, // backend expects 1-based page
    pageSize: rowsPerPage,
    sort,
    order,
    keyword: searchKeyword,
  });

  console.log(assetData?.data);

  return (
    <div className="flex flex-col gap-4 font-poppins text-midnight">
      <div className="flex flex-col bg-white shadow-sm rounded-md">
        <div className="flex flex-row justify-between items-center border-b border-gray-200 p-4">
          <p className="flex flex-row justify-center font-light text-sm items-center gap-3">
            {dashboardchartdata[0].name}s:
            <span className="font-bold text-[1.8rem]">
              {assetData?.total ?? 0}
            </span>
          </p>
          <div className="flex flex-row gap-2">
            <Button
              title={"Add asset"}
              icon={<FaPlus size={12} />}
              variant="primary"
              onClick={handleAddOpen}
            />
          </div>
        </div>
        <div className="p-4">
          <SearchInput onSearch={handleSearch} />
        </div>
      </div>
      <div className="flex">
        <ManageAssetTable
          data={assetData?.data || []}
          total={assetData?.total || 0}
          isLoading={isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          sort={sort}
          order={order}
          setSort={setSort}
          setOrder={setOrder}
          onEdit={handleEditOpen}
        />
      </div>
      <ModalComponent
        open={open}
        handleClose={handleClose}
        mode={modalMode}
        asset={selectedAsset}
      />
    </div>
  );
}

export default AssetPage;
