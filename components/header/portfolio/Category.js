// Header
const Header = props => {
    return (
        <header className="bg-header">
            <div className="container-fluid no-mw pofol slider">
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
                            <a className="carousel-control-prev" href="#carouselProject" role="button"
                               data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselProject" role="button"
                               data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                            <p className="t-img">Image Name</p>
                        </div>
                        <div className="page-area slider">
                            <a className="item" href="#"><span className="page">1</span><span
                                className="pages">/50</span></a>
                            <a className="item _play" href="#"><i className="fal fa-play"></i><i className="fal fa-pause"></i></a>
                            <a className="item" href="#"><i className="fal fa-bars"></i></a>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
