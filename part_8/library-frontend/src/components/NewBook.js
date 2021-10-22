import { useMutation, useSubscription } from "@apollo/client";
import React, { useState } from "react";
import { BOOK_ADDED, CREATE_BOOK, GET_BOOKS } from "../queries";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuhtor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      console.log(set.map((p) => p.id));
      console.log(object.id);
      set.map((p) => p.id).includes(object.id);
    };

    const dataInStore = props.client.readQuery({ query: GET_BOOKS });
    console.log("dataInStore: ", dataInStore);
    console.log(!includedIn(dataInStore.allBooks, addedBook));
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      console.log("add------------------");
      props.client.writeQuery({
        query: GET_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      props.setError(error.message);
      setTimeout(() => props.setError(""), 3000);
    },
    update: (store, response) => {
      updateCacheWith(response.data.addBook);
    },
  });

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      updateCacheWith(addedBook);
      props.setError(`${addedBook.title} added`);
      setTimeout(() => props.setError(""), 3000);
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    createBook({
      variables: {
        title,
        author,
        published: Number(published),
        genres,
      },
    });
    setTitle("");
    setPublished("");
    setAuhtor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
