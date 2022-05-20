import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Dashboard, Main, Error404, Login, Register, Statistics, AllJob, AddJob, Profile} from "./pages";
import {AuthProvider, UserProvider} from "./hooks/AuthProvider";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Layout} from "./components/";



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
                 <Route element={<Layout/>} >
                     <Route path='/dashboard' element={<Dashboard/>}/>
                     <Route path='/stats' element={<Statistics/>}/>
                     <Route path='/all-jobs' element={<AllJob/>}/>
                     <Route path='/add-job' element={<AddJob/>}/>
                     <Route path='/profile' element={<Profile/>}/>
                 </Route>
             </Route>
             <Route path='*' element={<Error404/>}/>
         </Routes>

     </BrowserRouter>
  );
}

export default App;
