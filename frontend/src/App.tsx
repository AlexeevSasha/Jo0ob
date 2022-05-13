import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Dashboard, Main, Error404, Login, Register} from "./pages";
import {AuthProvider, UserProvider} from "./hooks/AuthProvider";



function App() {
  return (
     <BrowserRouter>
         <Routes>
             <Route  element={<UserProvider/>}>
                 <Route path='/login' element={<Login/>}/>
                 <Route path='/register' element={<Register/>}/>
                 <Route path='/' element={<Main/>}/>
             </Route>
             <Route  element={<AuthProvider/>}>
                 <Route path='/dashboard' element={<Dashboard/>}/>
             </Route>
             <Route path='*' element={<Error404/>}/>
         </Routes>
     </BrowserRouter>
  );
}

export default App;
