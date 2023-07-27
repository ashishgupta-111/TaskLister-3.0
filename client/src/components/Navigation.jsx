import { Link } from "react-router-dom"
const Navigation =()=>{
    return(
        <header>
        <div className="logo">TaskLister 3.O</div>
        <nav>
          <ul>
          <li>
              <Link className="nav_link" to="/">
                Wallet
              </Link>
            </li>
            <li>
              <Link className="nav_link" to="/view-all-Jobs">
                View All Jobs
              </Link>
            </li>
            <li>
              <Link className="nav_link" to="/create-Job">
                Create Job
              </Link>
            </li>
            <li>
              <Link className="nav_link" to="/view-Job">
                View Job
              </Link>
            </li>
            <li>
              <Link className="nav_link" to="/update-Job">
                Update Job
              </Link>
            </li>
            <li>
              <Link className="nav_link" to="/delete-Job">
                Delete Job
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    )
}

export default Navigation;