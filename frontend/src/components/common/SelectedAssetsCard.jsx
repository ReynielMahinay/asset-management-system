import { IoClose } from "react-icons/io5";

function SelectedAssetsCard({ id, name, tag, brand, type, handleRemoveAsset }) {
  return (
    <div className="flex flex-row font-poppins justify-between items-center hover:border-blue-500 border-zinc-300 hover:border-2 border rounded-[10px] h-[60px] px-3 gap-4">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="">
          <h1 className="font-bold">{name}</h1>
          <p className="font-light  text-xs">{type}</p>
        </div>
        <div>
          <p className="font-semibold">{tag}</p>
          <p className="font-light text-xs">{brand}</p>
        </div>
      </div>

      <div className="hover:bg-zinc-200 p-1 rounded-lg">
        <IoClose
          className="cursor-pointer"
          onClick={() => handleRemoveAsset(id)}
        />
      </div>
    </div>
  );
}

export default SelectedAssetsCard;
