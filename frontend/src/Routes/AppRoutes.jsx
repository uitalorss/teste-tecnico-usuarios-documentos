import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Login } from "../Pages/Login"
import { SignUp } from "../Pages/SignUp"
import { ProtectedRouteDashboard } from "./ProtectedRouteDashboard"
import { ProtectedRouteUpdate } from "./ProtectedRouteUpdate"


export const AppRoutes = () => {
    const routesForPublic = [
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/signup",
            element: <SignUp />
        },
    ]

    const routesForAuthenticated = [
        {
            path: "/user",
            element: <ProtectedRouteDashboard />
        },
        {
            path: "/user/update",
            element: <ProtectedRouteUpdate />
        }
    ]

    const router = createBrowserRouter([
        ...routesForPublic,
        ...routesForAuthenticated
    ])

    return <RouterProvider router={router} />
}