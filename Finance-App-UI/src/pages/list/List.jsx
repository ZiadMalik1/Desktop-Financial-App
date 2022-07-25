import Datatable from "../../components/Datatable/Datatable";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import "./List.scss";

const List = () => {
  return (
    <div className="list">
      <SideBar />
      <div className="listContainer">
        <NavBar />
        <Datatable />
      </div>
    </div>
  );
};

export default List;
