document.addEventListener("DOMContentLoaded", function() {
  const btnBuscar = document.getElementById('btnBuscar');

  
  function buscarGalaxias(items) {
    let resultadosDiv = document.getElementById('contenedor');
    if (!resultadosDiv) { 
      console.error('El contenedor no se encontró en el DOM');
      return;
    }
    resultadosDiv.innerHTML = '';

    items.forEach(item => {
      if (item.links && item.links[0].href && item.data && item.data[0]) {
        let resultItem = document.createElement('div');
        resultItem.className = "card mb-4 shadow-sm";

        resultItem.innerHTML = `
          <img src="${item.links[0].href}" class="card-img-top" alt="${item.data[0].title}">
          <div class="card-body">
            <h5 class="card-title">${item.data[0].title}</h5>
            <p class="card-text">${item.data[0].description}</p>
            <p class="card-text"><small class="text-muted">${item.data[0].date_created}</small></p>
          </div>
        `;
        resultadosDiv.appendChild(resultItem);
      }
    });
  }

  
  btnBuscar.addEventListener('click', function() {
    let inputbuscar = document.getElementById('inputBuscar').value;
    let URL = `https://images-api.nasa.gov/search?q=${(inputbuscar)}`;

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        buscarGalaxias(data.collection.items);
      })
      .catch(error => {
        console.error('Problema con tu operación de fetch', error);
      });
  });
});