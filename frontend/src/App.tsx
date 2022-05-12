import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Dashboard, Main, Error404, Login, Register} from "./pages";



function App() {
  return (
     <BrowserRouter>
         <Routes>
             <Route path='/login' element={<Login/>}/>
             <Route path='/register' element={<Register/>}/>
             <Route path='/' element={<Main/>}/>
             <Route path='/dashboard' element={<Dashboard/>}/>
             <Route path='*' element={<Error404/>}/>
         </Routes>
     </BrowserRouter>
  );
}

export default App;
