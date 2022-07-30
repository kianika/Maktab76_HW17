import React from "react";
import Movie from "./Movie";

function Movies({ movies, setMovies, setLoading, loading }) {
  const handleDelete = (id) => {
    fetch(`http://localhost:3004/movies/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))

      // Do some stuff...

      .catch((err) => console.log(err));

    const movieList = movies.filter((movie) => movie.id !== id);
    setLoading(!loading);
    //setMovies("");
    //setMovies(movieList);
    // check for error response
    /*      if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
      
            console.log('Delete successful');
        })
        .catch(error => {
            setMessage(error);
            console.error('There was an error!', error);
        }); */
  };
  const index = movies.length;
  return (
    <div className="table-container d-flex align-items-center justify-content-center">
      <table className="table table-borderless text-light mt-3">
        <tr className="first-row">
          <th className="col py-3">حذف</th>
          <th className="col">توضیحات</th>
          <th className="col">سال ساخت</th>
          <th className="col">ژانر فیلم</th>
          <th className="col">کارگردان</th>
          <th className="col">نام فیلم</th>
          <th className="col">ردیف</th>
        </tr>
        <tbody>
          {movies.map((movie, index) => {
            return (
              <Movie
                key={movie.id}
                {...movie}
                handleDelete={handleDelete}
                index={index}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default Movies;
