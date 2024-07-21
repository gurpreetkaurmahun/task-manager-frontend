import { Link } from "react-router-dom"

function HeaderComponent(){

    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
        <div className="container-fluid">
            <div className="row">
                <nav className="navbar navbar-dark navbar-expand-lg bg-l">
                    <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="/">My Tasks App</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5 px-2">
                                Todos
                            </li>
                        </ul>
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-item fs-5">
                            User
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
    )
}

export default HeaderComponent