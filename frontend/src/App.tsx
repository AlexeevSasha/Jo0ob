import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Dashboard, Main, Error404, Login, Register} from "./pages";
import {AuthProvider, UserProvider} from "./hooks/AuthProvider";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
     <BrowserRouter>
         <ToastContainer
             position="top-right"
             autoClose={4000}
             hideProgressBar={false}
             newestOnTop={false}
             closeOnClick
             rtl={false}
             pauseOnFocusLoss
             draggable
             pauseOnHover
         />
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
