import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./layouts/Dashboard";
import Home from "./pages/Home";
import User from "./pages/User";
import Room from "./pages/Room";
import Client from "./pages/Client";
import RoomUsage from "./pages/RoomUsage";

const router = createBrowserRouter([
	{
		path: "/login",
		element: <div>Hello</div>,
		// loader: async () => {
		// 	if (!localStorage.access_token) {
		// 		return redirect("/login");
		// 	}
		// },
	},
	{
		loader: async () => {
			// if (!localStorage.access_token) {
			// 	return redirect("/login");
			// }
			console.log("masuk");
			return null;
		},
		element: <Dashboard />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/user",
				element: <User />,
			},
			{
				path: "/room",
				element: <Room />,
			},
			{
				path: "/client",
				element: <Client />,
			},
			{
				path: "/room-usage",
				element: <RoomUsage />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
