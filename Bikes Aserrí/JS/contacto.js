document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); 

            // Obtener los datos del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Crear un objeto con los datos
            const contacto = {
                name: name,
                email: email,
                message: message
            };

            // Guardar el contacto en localStorage
            let contactos = JSON.parse(localStorage.getItem('contactos')) || [];
            contactos.push(contacto);
            localStorage.setItem('contactos', JSON.stringify(contactos));

            // Simulación de un mensaje de éxito
            alert('Mensaje enviado con éxito. ¡Gracias por contactarnos!');

            // Limpiar el formulario
            contactForm.reset();
        });
    } else {
        console.error("Element 'contact-form' not found in the DOM.");
    }


    const messagesContainer = document.getElementById('messages');
    if (messagesContainer) {
        // Recuperar los mensajes de localStorage
        let contactos = JSON.parse(localStorage.getItem('contactos')) || [];

        // Comprobar si hay mensajes
        if (contactos.length === 0) {
            messagesContainer.innerHTML = '<p>No hay mensajes enviados.</p>';
        }else {

            // Mostrar los mensajes en el contenedor
            contactos.forEach((contacto, index) => {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message');

                messageDiv.innerHTML = `
                    <h3>${contacto.name}</h3>
                    <p><strong>Correo:</strong> ${contacto.email}</p>
                    <p><strong>Mensaje:</strong> ${contacto.message}</p>
                    <button class="delete-button" data-index="${index}">Eliminar</button>
                    <hr>
                `;
                // Agregar el mensaje al contenedor
                messagesContainer.appendChild(messageDiv);
            });

            // Handle message deletion
            document.querySelectorAll('.delete-button').forEach(button => {
                button.addEventListener('click', function () {
                    const index = this.getAttribute('data-index');
                    eliminarMensaje(index);
                });
            });
        }
    } else {
        console.error("Element 'messages' not found in the DOM.");
    }
});

// Función para eliminar un mensaje
function eliminarMensaje(index) {
    let contactos = JSON.parse(localStorage.getItem('contactos')) || [];

    // Eliminar el mensaje del array
    contactos.splice(index, 1);

    // Guardar el nuevo array en localStorage
    localStorage.setItem('contactos', JSON.stringify(contactos));

    // Recargar los mensajes
    location.reload(); 
}