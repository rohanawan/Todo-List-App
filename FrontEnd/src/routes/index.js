import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AppRoutes from "./app-routes";
import {APP_PREFIX_PATH } from "../config/app-config";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const AllRoutes = () => {
    return (
        <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        >
        </ToastContainer>
        <BrowserRouter>
            <Routes>
                <Route path={`${APP_PREFIX_PATH}/*`} element={<AppRoutes />}/>
            </Routes>
        </BrowserRouter>
        </>
    );
};

export default AllRoutes;