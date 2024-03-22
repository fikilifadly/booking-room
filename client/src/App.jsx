import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
		element: <div>Hello</div>,
		children: [
			{
				path: "/",
				element: <div>Hello</div>,
			},
			{
				path: "/user",
				element: <div>Hello</div>,
			},
			{
				path: "/room",
				element: <div>Hello</div>,
			},
			{
				path: "/client",
				element: <div>Hello</div>,
			},
			{
				path: "/room-usage",
				element: <div>Hello</div>,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
