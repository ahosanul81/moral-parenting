import { useContext } from "react";
import { MpContext } from "../../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
    const navigate = useNavigate()
const {loginUser} = useContext(MpContext)
    const handleLogin = async(e)=> {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        
        try{
            const {user} = await loginUser(email, password)
            // console.log(user.email);

            if (user.email) {
                navigate('/')
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Logged in successfully",
                    showConfirmButton: false,
                    timer: 1000
                  });
            }
            
        }catch(error){
            console.log(error);
            
        }

    }
    return (
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800 mx-auto mt-5 border border-blue-300">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Login</h1>
                <p className="text-sm text-gray-600">Sign in to access your account</p>
            </div>
            <form onSubmit={handleLogin} noValidate="" action="" className="space-y-12">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                        <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label htmlFor="password" className="text-sm">Password</label>
                            <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-600">Forgot password?</a>
                        </div>
                        <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
                    </div>
                </div>
                <div className="space-y-2">
                    <div>
                        <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-teal-600 text-gray-50">Login</button>
                    </div>
                    <p className="px-6 text-sm text-center text-gray-600">Don't have an account yet?
                        <a rel="noopener noreferrer" href="#" className="hover:underline text-teal-600">Sign up</a>.
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;