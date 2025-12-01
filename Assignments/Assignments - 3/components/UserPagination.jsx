import React, { useEffect, useState } from "react";

const UserPagination = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=20")
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  }, []);

  const perPage = 5;
  const displayed = users.slice(page * perPage, page * perPage + perPage);

  return (
    <div>
      <ul>
        {displayed.map((u) => (
          <li key={u.id}>{u.firstName} {u.lastName}</li>
        ))}
      </ul>
      <button disabled={page === 0} onClick={() => setPage(page - 1)}>Prev</button>
      <button disabled={(page + 1) * perPage >= users.length} onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default UserPagination;
