import Login  from '../../pages/login/Login';
import Home from '../../pages/home/Home';
import Single from '../../pages/single/Single';
import New from '../../pages/new/New';
import List from '../../pages/list/List';
import { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import './App.css';
import '../../style/dark.scss'
import { stockInputs, assetInputs } from '../../formSource';
import { DarkModeContext } from '../../context/darkModeContext';

function App() {
 
  const {darkMode} = useContext(DarkModeContext)

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path='/'> 
            <Route index element={<Home />}> </Route>
            <Route path="login" element={<Login/>} />
            <Route path="stocks">
              <Route index element={<List/>}/>
              <Route path=":userId" element={<Single/>}/>
              <Route path="new" element={<New inputs = {stockInputs} title="Add New Stock"/>}/> 
            </Route>
            <Route path="assets">
              <Route index element={<List/>}/>
              <Route path=":prodId" element={<Single/>}/>
              <Route path="new" element={<New inputs = {assetInputs} title="Add New Asset"/>}/> 
            </Route>
          </Route>
        </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;