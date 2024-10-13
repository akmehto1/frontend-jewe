/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { signOutUserStart, UserState } from "../../../redux/user/userslice";
import config from "../../../Config/config";


export default function FilterPage() {
  const [data, setData] = useState<any[]>([]);  // Set generic type for data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  
  
  // Fetch current user from Redux state
  const { currentUser } = useSelector((state: { user: UserState }) => state.user);

  const [searchQuery, setSearchQuery] = useState({
    searchTerm: "",
    sort: "created_at",   // Sort by created_at field initially
    order: "desc",        // Descending order by default
    date: "",             // No date filter initially
    page: 0,              // Default page
    limit: 10,            // Default limit
    filter: "",           // Default filter

  });

  const handleSearchQueryChange = (e: any) => {
    const { name, value } = e.target;
    setSearchQuery(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const urlParams = new URLSearchParams();

      // Add non-empty values to the query params
      if (searchQuery.searchTerm) urlParams.set('search', searchQuery.searchTerm);
      if (searchQuery.sort) urlParams.set('sort', searchQuery.sort);
      if (searchQuery.order) urlParams.set('order', searchQuery.order);
      if (searchQuery.date) urlParams.set('day', searchQuery.date);  // Date filter as 'day'
      if (searchQuery.page !== null) urlParams.set('page', String(searchQuery.page));
      if (searchQuery.limit) urlParams.set('limit', String(searchQuery.limit));
      if (searchQuery.filter) urlParams.set('filter', searchQuery.filter);

      // Fetch the data based on the constructed query
      const response = await fetch(`${config.apiBaseUrl}admin/all-user-data?${urlParams.toString()}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setData(result.users); // Store the fetched data
      navigate(`?${urlParams.toString()}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Redirect to login if no current user or if the user is not an admin
  if (!currentUser) {
    dispatch(signOutUserStart());
    return <Navigate to="/admin/log-in" />;
  }

  if (currentUser.role !== "admin") {
    dispatch(signOutUserStart());
    return <Navigate to="/unauthorized" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="">Here u can search</h1>
      <div className=" d-flex flex-row align-items-center mb-3">
        <form  className="d-flex flex-row align-items-center" onSubmit={handleSearch}>
          <input
            type="text"
            name="searchTerm"
            value={searchQuery.searchTerm}
            onChange={handleSearchQueryChange}
            className="form-control me-2"
            placeholder="Search..."
          />
          <input
            type="date"
            name="date"
            value={searchQuery.date}
            onChange={handleSearchQueryChange}
            className="form-control me-2"
          />
          <div className="dropdown ml-4">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sort by
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSearchQuery(prev => ({ ...prev, sort: "created_at" }))}
                >
                  Created At
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSearchQuery(prev => ({ ...prev, sort: "name" }))}
                >
                  Name
                </button>
              </li>
            </ul>
          </div>
          <button type="submit" className="btn btn-primary">Search</button>
        </form>
      </div>

      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            <th>Name</th>
            <th>Referred by</th>
            <th>Status</th>
            <th>Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={5}>Loading...</td></tr>
          ) : data.length > 0 ? (
            data.map((user, index) => (
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={user.avatarUrl || "https://mdbootstrap.com/img/new/avatars/8.jpg"}
                      alt={user.name}
                      style={{ width: "45px", height: "45px" }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{user.firstName}</p>
                      <p className="text-muted mb-0">{user.lastName}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="fw-normal mb-1">{user.referredBy?user.referredBy.userRefferalId:'null'}</p>
                </td>
                <td>
                  <span className={`badge ${user.status === 'Active' ? 'badge-success' : 'badge-warning'} rounded-pill d-inline`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.level}</td>
                <td>
                  <button type="button" className="btn btn-link btn-sm btn-rounded">
                    More details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={5}>No data found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
