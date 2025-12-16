import React, { useMemo, useState } from "react";
import SearchInput from "../../components/common/SearchInput";
import AssignmentTable from "./components/AssignmentTable";
import { assetTypeOptions } from "../../data/options";
import AssignmentForm from "./components/AssignmentForm";
import SelectAssignment from "./components/SelectAssignment";
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";
import Button from "../../components/common/Button";

function Assignment() {
  const [onSelectedAsset, setOnselectedAsset] = useState([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterType, setFilterType] = useState(null);
  const navigate = useNavigate();

  const { data: usersData, isLoading: isUserloading } = useUsers();

  const userOptions = useMemo(() => {
    return (
      usersData?.data?.map((user) => ({
        label: user.fullname,
        value: user.id,
      })) ?? []
    );
  }, [usersData]);

  console.log("Selected asset on the Assignment page: ", onSelectedAsset);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setPage(1);
  };

  const handleSearchInput = (e) => {
    const trimmedKeyword = keyword.trim();
    handleSearch(trimmedKeyword);
  };

  return (
    <div className=" flex flex-col gap-4 font-poppins text-midnight ">
      <header className=" py-2">
        <p className="flex flex-row justify-start items-center gap-2 font-bold  text-2xl">
          <span className="cursor-pointer hover:bg-gray-200 rounded-lg p-1">
            <IoReturnUpBack size={25} onClick={() => navigate("..")} />
          </span>
          Asset assignement
        </p>
        <p className="text-xs font-light text-gray-600 pl-10">
          Easily assign assets to your team and keep track of who has what
        </p>
      </header>

      <div className="flex flex-row gap-4 ">
        <div className=" bg-white min-w-[65%] border border-zinc-300 shadow-sm rounded-xl ">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 p-4">
              <h2 className="font-bold capitalize">select assset to assign</h2>
              <SearchInput
                bg_color={"bg-[#f5f7f9]"}
                placeholder="Search by Name or Tag"
                onSearch={handleSearch}
                keyword={keyword}
                setKeyword={setKeyword}
                handleSearchInput={handleSearchInput}
              />
              <div className="flex flex-row gap-4 w-[50%]">
                <SelectAssignment
                  options={assetTypeOptions}
                  value={filterType}
                  onChange={(value) => setFilterType(value)}
                  placeholder="Filter by Type"
                />
                <Button
                  title="Clear"
                  onClick={() => {
                    setFilterType(null);
                    setPage(1);
                  }}
                />
              </div>
            </div>

            <div className=" ">
              <AssignmentTable
                page={page}
                setPage={setPage}
                keyword={searchKeyword}
                onSelectedAsset={onSelectedAsset}
                setOnselectedAsset={setOnselectedAsset}
                filterType={filterType}
              />
            </div>
          </div>
        </div>
        <div className="bg-white min-w-[33.5%] border border-zinc-300 shadow-sm rounded-xl p-4 space-y-2">
          <p className="font-bold capitalize">Assignmend Details</p>

          <AssignmentForm
            userOptions={userOptions}
            assets={onSelectedAsset}
            selectedAsset={setOnselectedAsset}
          />
        </div>
      </div>
    </div>
  );
}

export default Assignment;
