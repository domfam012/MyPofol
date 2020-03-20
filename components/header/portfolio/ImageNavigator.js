// Header
const Header = props => {
    return (
        <header className="bg-header">
            <div className="container-fluid no-mw pofol">
                <nav className="navbar navbar-expand">
                    <h1>
                        <a className="navbar-brand" href="#">
                            <span>Website Logo</span>
                        </a>
                    </h1>
                    <a className="navbar-prev" href="#">
                        <span className="nav-prev-title">Website Name</span>
                        <span className="navbar-prev-icon"></span>
                    </a>
                    <div className="collapse navbar-collapse">
                        <div className="title">
                            <p>Project Name</p>
                        </div>
                        <div className="page-area slider">
                            <a className="item" href="#"><i className="fal fa-times"></i></a>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
