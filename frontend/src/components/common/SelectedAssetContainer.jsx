import SelectedAssetsCard from "./SelectedAssetsCard";
function SelectedAssetContainer() {
  return (
    <div className="flex flex-col gap-2">
      <p className="capitalize font-poppins font-bold ">selected asset</p>
      <div>
        <SelectedAssetsCard />
      </div>
    </div>
  );
}

export default SelectedAssetContainer;
