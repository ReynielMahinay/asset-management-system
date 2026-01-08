import { useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import Breadcrumbs from "../common/Breadcrumbs";
import UserProfileNav from "../common/UserProfileNav";
import ModalView from "../modals/ModalView";
import useAuth from "../../hooks/useAuth";
import UserProfileView from "../userProfile/UserProfileView";

const NavBar = () => {
  const { user } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="bg-[#ffffff] px-4 py-2 flex flex-row justify-between items-center text-midnight border-b border-gray-200">
      <div>
        <h1 className="capitalize font-open-sans font-semibold text-[.8rem] ">
          <Breadcrumbs />
        </h1>
      </div>
      <div className="flex flex-row gap-2 justify-center items-center ">
        <IoIosNotifications size={24} />
        <UserProfileNav setModalOpen={setModalOpen} data={user} />
      </div>
      <ModalView
        open={modalOpen}
        close={setModalOpen}
        ViewComponent={UserProfileView}
        data={user}
        customWidht="500px"
      />
    </div>
  );
};

export default NavBar;
