const fetchLibrary = () => {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      console.log(response);

      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 400) {
          throw new Error("Bad Request");
        }
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }
        if (response.status === 403) {
          throw new Error("Forbidden");
        }
        if (response.status === 404) {
          throw new Error("Not Found");
        }
        if (response.status === 500) {
          throw new Error("Server Error");
        }

        throw new Error("Generic Fetch Error");
      }
    })
    .then((library) => {
      console.log(library);

      const row = document.getElementById("booksRow");

      library.forEach((book) => {
        const col = document.createElement("div");
        col.classList.add("col-6");
        col.classList.add("col-md-4");
        col.classList.add("col-lg-2");
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
                <img src=${book.img} class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">${book.title}</p>
                    <h5 class="card-title">Price: ${book.price}€</h5>
                    <button id='remove' type="button"  class="btn btn-danger">Remove</button>    
                </div>`;

        col.appendChild(card);
        row.appendChild(col);
      });
    })
    .catch((error) => console.log(error));
};

window.onload = () => {
  fetchLibrary();
};
