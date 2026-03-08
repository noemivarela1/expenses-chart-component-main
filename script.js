

async function cargarGrafico() {
    try {
        // 1. Obtener los datos del archivo local
        const respuesta = await fetch('data.json');
        const datos = await respuesta.json();

        const contenedor = document.getElementById('grafico');

        // 2. Calcular el valor máximo para que sea proporcional
        const maximo = Math.max(...datos.map(d => d.amount));
        const index = 0;
        // 3. Crear los divs dinámicamente
        datos.forEach(item => {
            const barra = document.createElement('div');
            barra.className = 'barra';
            if (item.amount === maximo) {
                barra.classList.add('maxima');
            }
            // Altura relativa al valor máximo
            const altura = (item.amount / maximo) * 100;
            barra.style.height = `${altura}%`;
            barra.setAttribute('tabindex', index);

            barra.innerHTML = `
            <span>$${item.amount}</span>
              <div class="etiqueta">${item.day}</div>
            `;

            contenedor.appendChild(barra);
        });
    } catch (error) {
        console.error("Error cargando el JSON:", error);
    }
}
