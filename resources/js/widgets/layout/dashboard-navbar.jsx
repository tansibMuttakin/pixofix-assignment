import { useState, useEffect } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import useAuth from "../../Hooks/useAuth";
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Breadcrumbs,
    Input,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    Cog6ToothIcon,
    BellIcon,
    ClockIcon,
    CreditCardIcon,
    Bars3Icon,
} from "@heroicons/react/24/solid";
import { route } from "ziggy-js";

export function DashboardNavbar() {
    const [fixedNavbar, setFixedNavbar] = useState(true); // You can control this however you want
    const [openSidenav, setOpenSidenav] = useState(false);
    const [openConfigurator, setOpenConfigurator] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const channel = window.Echo.private(`admin-dashboard.${user?.id}`);
        console.log("channel", channel);

        channel.listen(".FileAction", (event) => {
            console.log("file Updated:", event);
        });

        return () => {
            window.Echo.leave("admin-dashboard");
        };
    }, []);

    // Use Inertia's usePage to get the current URL.
    const { url } = usePage();
    // url should be a string such as "/dashboard/overview"
    const pathname = url || "";
    const [layout, page] = pathname.split("/").filter((el) => el !== "");

    const handleLogout = () => {
        router.post(
            route("logout"),
            {},
            {
                onFinish: () => {
                    window.location.href = "/login"; // only after logout completes
                },
            }
        );
    };

    return (
        <Navbar
            color="transparent" // Set to transparent to let custom class take over
            className={`rounded-xl transition-all ${
                fixedNavbar
                    ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5 bg-gradient-to-br from-gray-800 to-gray-900"
                    : "px-0 py-1"
            }`}
            fullWidth
            blurred={false} // Set to false so it doesn't interfere with custom background
        >
            <div className="flex flex-col-reverse justify-end gap-6 md:flex-row md:items-center">
                <div className="flex items-center">
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        className="grid xl:hidden"
                        onClick={() => setOpenSidenav(!openSidenav)}
                    >
                        <Bars3Icon
                            strokeWidth={3}
                            className="h-6 w-6 text-blue-gray-500"
                        />
                    </IconButton>
                    <Link>
                        <Button
                            variant="text"
                            color="blue-gray"
                            className="hidden items-center gap-1 px-4 xl:flex normal-case"
                            onClick={handleLogout}
                        >
                            <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
                            Logout
                        </Button>
                        <IconButton
                            variant="text"
                            color="blue-gray"
                            className="grid xl:hidden"
                        >
                            <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
                        </IconButton>
                    </Link>
                </div>
            </div>
        </Navbar>
    );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
