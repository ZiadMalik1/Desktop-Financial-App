import { GrMoney } from "react-icons/gr";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import Service from "../../service/useAPI/Service";
import "./New.scss";

const service = new Service();

function submitNewValue(e) {
  e.preventDefault();
  alert("Form Was Submitted");

  var label = document.getElementById("Stock Label").value;
  var shares = document.getElementById("Share Amount").value;

  var Asset = new Object();
  Asset.label = label;
  Asset.shares = parseFloat(shares);
  Asset.initialPrice = parseFloat(10.83);

  service.post("assets", Asset);
}

const New = ({ inputs, title }) => {
  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <NavBar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <GrMoney className="iconImg" />
          </div>
          <div className="right">
            <form action="" onSubmit={submitNewValue} className="form-stock">
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.label}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <button>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
