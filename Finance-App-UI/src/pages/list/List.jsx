import Datatable from "../../components/Datatable/Datatable";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import "./List.scss";

const List = ({ path, data, labels }) => {
  return (
    <div className="list">
      <SideBar />
      <div className="listContainer">
        <NavBar />
        <Datatable path={path} data={data} labels={labels}/>
      </div>
    </div>
  );
};

List.defaultProps = {
  data: [],
  labels: []
}

export default List;
