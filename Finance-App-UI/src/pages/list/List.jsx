import { useEffect, useState } from "react";
import Datatable from "../../components/Datatable/Datatable";
import { Modal } from "../../components/Modal/Modal";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import "./List.scss";

const List = ({ path, data, labels }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="list">
      <SideBar />
      <div className="listContainer">
        <NavBar />
        <Datatable
          path={path}
          data={data}
          labels={labels}
          setModal={setShowModal}
        />
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

List.defaultProps = {
  data: [],
  labels: [],
};

export default List;
