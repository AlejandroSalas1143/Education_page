let currentMatch = 0;
let totalMatches = 0;
let previo = null;
let siguiente = null;
let limpiar = null;


function createNavigationButtons() {
    const navigationContainer = document.getElementById('navigationContainer');
    // Verificar si los botones ya existen o ya han sido creados
    if (!previo && !siguiente && !limpiar && navigationContainer) {
        // Crear botón siguiente
        siguiente = document.createElement('button');
        siguiente.textContent = 'Siguiente';
        siguiente.id = 'siguiente';
        siguiente.addEventListener('click', () => navigateMatches(1));

        // Crear botón anterior
        previo = document.createElement('button');
        previo.textContent = 'Anterior';
        previo.id = 'previo';
        previo.addEventListener('click', () => navigateMatches(-1));

        // Crear botón limpiar
        limpiar = document.createElement('button');
        limpiar.textContent = 'X';
        limpiar.id = 'limpiar';
        limpiar.addEventListener('click', clearSearch);

        // Agregar botones al documento
        navigationContainer.appendChild(previo);
        navigationContainer.appendChild(siguiente);
        navigationContainer.appendChild(limpiar);
    }
}
function removeNavigationButtons() {
    // Remover botones del documento
    if (previo) {
        previo.remove();
        previo = null; // Reiniciar la variable
    }
    if (siguiente) {
        siguiente.remove();
        siguiente = null; // Reiniciar la variable
    }

    if (limpiar) {
        limpiar.remove();
        limpiar = null;
    }

    // Reiniciar contadores
    currentMatch = 0;
    totalMatches = 0;
}

function search() {
    totalMatches = 0;
    const searchText = document.getElementById('searchInput').value;

    // Restablecer resaltado anterior
    const elementsToSearch = document.querySelectorAll('.section:not(.diapos)');
    elementsToSearch.forEach(element => {
        const spans = element.querySelectorAll('span.highlight');
        spans.forEach(span => {
            span.outerHTML = span.innerHTML; // Eliminar los spans anteriores
        });
    });

    // Aplicar nuevo resaltado
    const regex = new RegExp(`(?<!<[^>]*)(${searchText})(?![^<]*>)`, 'gi');
    elementsToSearch.forEach(element => {
        const originalHTML = element.innerHTML;
        element.innerHTML = originalHTML.replace(regex, (match) => {
            totalMatches++; // Incrementar el contador de coincidencias
            return `<span class="highlight">${match}</span>`;
        });
    });

    // Mostrar o ocultar botones según el total de coincidencias
    if (totalMatches > 0) {
        if (!previo && !siguiente) {
            createNavigationButtons();
        }

        currentMatch = 0; // Reiniciar el contador de coincidencias
        const matches = document.querySelectorAll('.highlight');
        matches[currentMatch].classList.add('current-match');
        window.scrollTo({
            top: matches[currentMatch].offsetTop - 160,
            behavior: 'smooth'
        });
    } else {
        removeNavigationButtons();
    }
}

function navigateMatches(direction) {
    const matches = document.querySelectorAll('.highlight');

    if (matches.length === 0 || currentMatch < 0 || currentMatch >= totalMatches) {
        return; // No hay coincidencias o el índice actual está fuera de rango
    }

    if (currentMatch === totalMatches - 1 && direction === 1) {
        currentMatch = 0; // Volver al principio
    } else if (currentMatch === 0 && direction === -1) {
        currentMatch = totalMatches - 1; // Ir al final
    } else {
        currentMatch = (currentMatch + direction + totalMatches) % totalMatches;
    }

    matches.forEach(match => match.classList.remove('current-match'));

    // Incrementar o decrementar el contador según la dirección

    if (currentMatch >= 0 && currentMatch < totalMatches) {
        const currentMatchElement = matches[currentMatch];
        console.log(currentMatch, totalMatches, direction)
        if (currentMatchElement) {
            currentMatchElement.classList.add('current-match');

            // Scroll a la coincidencia actual
            window.scrollTo({
                top: currentMatchElement.offsetTop - 160,
                behavior: 'smooth'
            });
        }
    }
    
}

function clearSearch() {
    const elementsToClear = document.querySelectorAll('.section span.highlight');
    elementsToClear.forEach(element => {
        element.outerHTML = element.innerHTML; // Restaurar el contenido original
    });

    // Remover botones de navegación
    removeNavigationButtons();
    
    // Limpiar el campo de búsqueda
    document.getElementById('searchInput').value = '';
    // location.reload();
    initSlides();
}

