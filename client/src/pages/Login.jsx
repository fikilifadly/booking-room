import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../stores/userSlice";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const { loading, errorMessage, access_token } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		const data = {
			email: e.target.email.value,
			password: e.target.password.value,
		};

		dispatch(loginUser(data)).then((res) => {
			if (res.payload) navigate("/");
		});
	};

	console.log(access_token, loading, errorMessage);

	return (
		<>
			<div className="w-full h-screen bg-[#101828] mx-auto flex justify-center items-center">
				<div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
					<div className="flex flex-col gap-4">
						<div className="px-6 py-4">
							<h1 className="mt-3 text-2xl font-medium text-center text-gray-600 dark:text-gray-200">Login</h1>

							<form onSubmit={onSubmitHandler}>
								<div className="w-full mt-4">
									<input
										className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
										type="email"
										name="email"
										placeholder="Email Address"
										aria-label="Email Address"
									/>
								</div>

								<div className="w-full mt-4">
									<input
										className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
										type="password"
										name="password"
										placeholder="Password"
										aria-label="Password"
									/>
								</div>

								<div className="flex items-center justify-center mt-4">
									<button className="btn bg-green-600 text-white px-10">submit</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<ToastContainer autoClose={1500} />
		</>
	);
};

export default Login;
