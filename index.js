
const express = require('express');
const axios = require('axios');
const fs = require('fs');

const app = express();
const port = 8081;

function consultar(callback) {
    axios.get('https://gist.githubusercontent.com/josejbocanegra/c6c2c82a091b880d0f6062b0a90cce88/raw/abb6016942f7db2797846988b039005c6ea62c2f/categories.json')
        .then(function (response) {
            let prods = response;
            console.log(response.data);
            callback(prods);
        })
        .catch(function (error) {
            console.log(error);
        });
}


function escribir(callback) {
    consultar(prods => {
        let cantProd = prods.data.length;
        let card = `<!doctype html>
        <html lang="en">
          <head>
            <!-- Required meta tags -->
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        
            <!-- Bootstrap CSS -->
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        
            <title>Hello, world!</title>
          </head>
          <body>
        <div class="accordion" id="accordionExample">`;
        for (let i = 0; i < cantProd; i++) {
            card += `<div class="card">
            <div class="card-header" id="headingOne">
      <h2 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapseOne">
          ${prods.data[i].name}
        </button>
      </h2>
    </div>
            `;
            for (let j = 0; j < prods.data[i].products.length; j++) {
                card+=`<div id="collapse${i}" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="card-body">
                <div class="card" style="width: 18rem;">
                <img src="${prods.data[i].products[j].image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${prods.data[i].products[j].name} [$${prods.data[i].products[j].price}]</h5>
                  <p class="card-text">${prods.data[i].products[j].description}</p>
                  <a href="#" class="btn btn-primary">Add to car</a>
                </div>
              </div>
                </div>
              </div>`
            }
            card += `</div>`;
        }
        card += `
        </div>
        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
      </body>
    </html>`
        fs.writeFile("prueba.html", card, _ => {
            console.log("Okay, ahi vamos");
            fs.readFile("prueba.html", (err, data) => {
                callback(data);
            });
        });
    });
}

app.get("/", (req, res) => {
    escribir(data => {
        res.send(data.toString())
    });
});

app.listen(port, () => console.log(`Example app listening on ${port}`));
