import "./App.css";
import Movies from "./components/Movies";
import { BASE_URL } from "./constants/constants";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");
  const [production_date, setProduction_date] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((movies) => {
        setMovies(movies);
        console.log(movies);
      });
  }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify({
        id: uuid(),
        name: name,
        director: director,
        genre: genre,
        production_date: production_date,
        description: description,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMovies((movies) => [...movies, data]);
        setName("");
        setDirector("");
        setGenre("");
        setProduction_date("");
        setDescription("");
      })
      .catch((err) => {
        console.log("error");
      });
  };

  function handelCancel() {
    setName("");
    setDirector("");
    setGenre("");
    setProduction_date("");
    setDescription("");
  }

  return (
    <div className="App">
      <header className="App-header"></header>
      <form className="text-white w-100">
        <div className="row  col-12 d-flex">
          <div className="col-6">
            <div className="d-flex align-items-center justify-content-end">
              <label for="description">توضیحات</label>
              <span className="yellow-icon mx-2"></span>
            </div>
            <div>
              <textarea
                className="form-control description  border border-light rounded p-2"
                rows="4"
                placeholder="توضیحات درباره فیلم"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="col-3 d-flex flex-column">
            <div className="d-flex align-items-center justify-content-end">
              <label for="description">ژانر فیلم</label>
              <span className="yellow-icon mx-2"></span>
            </div>
            <select
              className="border border-light rounded p-2 text-secondary"
              id="custom-select"
              name="relationship"
              required
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="" disabled selected hidden>
                وحشت ، هیجانی
              </option>
              <option value="وحشت">وحشت</option>
              <option value="هیجانی">هیجانی</option>
            </select>
          </div>

          <div className="col-3 d-flex flex-column">
            <div className="d-flex align-items-center justify-content-end">
              <label for="description"> نام فیلم</label>
              <span className="yellow-icon mx-2"></span>
            </div>
            <input
              className="border border-light rounded p-2"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="نام فیلم را بنویسید"
            />
          </div>
        </div>
        <div className="row col-12 d-flex">
          <div className="col-6 mt-3">
            <button
              type="button"
              className="border-secondary border text-secondary p-2 px-3 mx-2 cancel rounded"
              onClick={handelCancel}
            >
              انصراف
            </button>
            <button
              type="submit"
              className="border-secondary border text-secondary bg-warning p-2 px-4 mx-2 rounded"
              onClick={handleSubmit}
            >
              ذخیره
            </button>
          </div>
          <div className="col-3 d-flex flex-column">
            <div className="d-flex align-items-center justify-content-end">
              <label for="description">کارگردان</label>
              <span className="yellow-icon mx-2"></span>
            </div>
            <input
              className="border border-light rounded p-2"
              type="text"
              value={director}
              placeholder="نام کارگردان را وارد کنید"
              onChange={(e) => setDirector(e.target.value)}
            />
          </div>
          <div className="col-3 d-flex flex-column">
            <div className="d-flex align-items-center justify-content-end">
              <label for="description">سال تولید</label>
              <span className="yellow-icon mx-2"></span>
            </div>
            <input
              className="border border-light rounded p-2"
              type="text"
              value={production_date}
              placeholder="سال ساخت فیلم را وارد کنید"
              onChange={(e) => setProduction_date(e.target.value)}
            />
          </div>
        </div>
      </form>
      <div className="container-fluid list-container text-light">
        <div className="list d-flex justify-content-end align-items-center">
          <div>لیست فیلم</div>
          <span className="yellow-icon-large mx-2"></span>
        </div>
        <Movies
          movies={movies}
          setMovies={setMovies}
          setLoading={setLoading}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
