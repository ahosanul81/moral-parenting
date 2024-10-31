import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
  })

const useAxiosSecure = ()=>{
    const navigate = useNavigate()

    useEffect(() => {
        axiosSecure.interceptors.request.use(function (config) {
          return config;
    
        }, function (error) {
          // Do something with request error
          return Promise.reject(error);
        });
    
        axiosSecure.interceptors.response.use(
          (response) => response,
          async (error) => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
              //   await logOutUser();
            //   navigate('/login')
            }
            return Promise.reject(error)
          }
        )
    
      }, [navigate])
    
      return axiosSecure;
    };
export default useAxiosSecure;