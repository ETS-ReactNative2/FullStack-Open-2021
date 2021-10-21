import React from "react";
import { useQuery } from "@apollo/client";
import { CURRENT_USER, GET_BOOKS } from "../queries";

const Recommendation = (props) => {
  const result = useQuery(GET_BOOKS);
  const currentUser = useQuery(CURRENT_USER);

  if (!props.show) {
    return null;
  }
  if (result.loading || currentUser.loading) return <div>loading...</div>;
  const filter = currentUser?.data?.me?.favoriteGenre || "all";

  return (
    <div>
      <h2>recommendations</h2>
      {filter && (
        <p>
          in genre <strong>{filter}</strong>
        </p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks
            .filter((book) =>
              filter === "all" ? true : book.genres.includes(filter)
            )
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendation;
