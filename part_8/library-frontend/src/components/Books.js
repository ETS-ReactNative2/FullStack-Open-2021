import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries";
import FilterButton from "./FilterButton";

const Books = (props) => {
  const [filter, setFilter] = useState("all");
  const [getBooks, result] = useLazyQuery(GET_BOOKS);
  useEffect(() => getBooks(), []); // eslint-disable-line

  if (!props.show) {
    return null;
  }

  if (result.loading) return <div>loading...</div>;
  const allGenres = [
    ...new Set(result.data.allBooks.flatMap((book) => book.genres)),
  ];
  return (
    <div>
      <h2>books</h2>
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
      <FilterButton key="all" genre="all" setFilter={setFilter} />
      {allGenres.map((genre) => (
        <FilterButton key={genre} genre={genre} setFilter={setFilter} />
      ))}
    </div>
  );
};

export default Books;
