import {Container, Dropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

export const Navbar = () => {

    const {userDetails, logout} = useAuth()

    const privateOption = () => {
        if (userDetails == null) {
            return (
                <>
                    <Link className={"nav-link fs-5 mx-2"} to={"/sign-in"}>Sign In</Link>
                    <Link className={"nav-link fs-5 mx-2"} to={"/sign-up"}>Sign Up</Link>
                </>
            )
        } else if (userDetails.role === "ADMIN" || userDetails.role === "USER") {
            return (
                (<>
                    <Link className={"nav-link fs-5 ms-2 me-5"} to={"/orders"}>Orders</Link>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Profile
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item
                                className={"text-decoration-none bg-light"}>
                                <Link to={"/settings"}>
                                    Setting
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => logout()}
                                className={"text-decoration-none bg-light"}>
                                Log out
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </>)
            )
        } else return <></>
    }


    return (
        <>
            <Container fluid className={"bg-gradient bg-primary"}>
                <Container className={"text-white py-2 d-flex justify-content-between align-items-center"}>
                    <div>
                        <Link className={"nav-link fs-2"} to={"/"}>App</Link>
                    </div>
                    <div className={"d-flex"}>
                        <Link className={"nav-link fs-5 mx-2"} to={"/catalogs"}>Catalogs</Link>
                        <Link className={"nav-link fs-5 mx-2"} to={"/products"}>Products</Link>

                        {
                            !!userDetails && userDetails.role === "USER" && (
                                <Link className={"nav-link fs-5 ms-2 me-1"} to={"/favorites"}>Favorites</Link>
                            )
                        }
                        {privateOption()}
                    </div>
                </Container>
            </Container>
        </>
    )
}