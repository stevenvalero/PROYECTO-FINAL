const MAX_PARTICIPANTES = 10; // Número máximo de participantes
let participantes = [];

// Función para calcular los puntos de un participante
function calcularPuntos(experiencia) {
    return experiencia === 'Avanzado' ? 10 : 0; // Bonificación para avanzados
}

// Evento para registrar un nuevo participante
document.getElementById("registrar").addEventListener('click', () => {
    const nombre = document.getElementById("nombre").value.trim();
    const experiencia = document.getElementById("experiencia").value.trim();
    const platillo = document.getElementById("platillo").value.trim();
    const tiempoPreparacion = document.getElementById("tiempoPreparacion").value.trim();

    // Validar si todas las casillas están rellenas
    if (!nombre || !experiencia || !platillo || !tiempoPreparacion) {
        alert("Por favor, rellena todas las casillas antes de registrar al participante.");
        return; // Detener el registro
    }

    // Convertir el tiempo de preparación a número
    const tiempoPreparacionNumerico = parseInt(tiempoPreparacion, 10);

    // Validar tiempo de preparación y nivel de experiencia
    if (tiempoPreparacionNumerico > 60 && experiencia === "Principiante") {
        alert("Los principiantes no pueden seleccionar platillos que requieran más de 60 minutos.");
        return;
    }

    // Validar límite de participantes
    if (participantes.length >= MAX_PARTICIPANTES) {
        alert("Se ha alcanzado el número máximo de participantes.");
        return;
    }

    // Crear y agregar participante
    participantes.push({
        nombre,
        experiencia,
        platillo,
        tiempoPreparacion: tiempoPreparacionNumerico,
        puntos: calcularPuntos(experiencia),
    });

    mostrarReporte();
    limpiarFormulario();
});

// Función para mostrar el reporte de participantes
function mostrarReporte() {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = ''; // Limpiar resultados anteriores
    participantes.forEach(participante => {
        resultadoDiv.innerHTML += `
            <p>
                Nombre: ${participante.nombre}, Nivel: ${participante.experiencia}, 
                Platillo: ${participante.platillo}, Puntos: ${participante.puntos}
            </p>`;
    });
}

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById("nombre").value = '';
    document.getElementById("experiencia").value = '';
    document.getElementById("platillo").value = '';
    document.getElementById("tiempoPreparacion").value = '';
}
