/*!
 * Estudio Soulé
 * Custom scripts
 */

window.addEventListener("DOMContentLoaded", function () {


    // ==========================================
    // NAVBAR SHRINK
    // ==========================================

    const navbarCollapsible = document.querySelector("#mainNav");


    function navbarShrink() {

        if (!navbarCollapsible) {
            return;
        }

        if (window.scrollY === 0) {

            navbarCollapsible.classList.remove("navbar-shrink");

        } else {

            navbarCollapsible.classList.add("navbar-shrink");

        }

    }


    navbarShrink();

    document.addEventListener("scroll", navbarShrink);



    // ==========================================
    // NAVBAR LOGO / COLORS
    // ==========================================

    const navbarLogo = document.querySelector("#navbarLogo");
    const wiseName = document.querySelector(".wise");


    function updateNavbarLogo() {

        if (!navbarLogo) {
            return;
        }

        const isMobile = window.innerWidth < 992;
        const scrolled = window.scrollY > 50;


        if (isMobile || scrolled) {

            navbarLogo.src = "assets/logo/isologo-color.svg";


            if (wiseName) {
                wiseName.style.color = "#123B5D";
            }


        } else {

            navbarLogo.src = "assets/logo/isologo-blanco.svg";


            if (wiseName) {
                wiseName.style.color = "#ffffff";
            }


        }

    }


    updateNavbarLogo();


    window.addEventListener("scroll", updateNavbarLogo);

    window.addEventListener("resize", updateNavbarLogo);



    // ==========================================
    // CONTACT FORM
    // ==========================================

    const contactForm = document.getElementById("contactForm");

    const successMessage = document.getElementById(
        "submitSuccessMessage"
    );

    const phoneInput = document.getElementById("phone");



    // ==========================================
    // TELÉFONO
    // ==========================================

    // Deja solo los dígitos y quita +54, el 9 de celular, el 0 y el 15
    // (ej: "+54 9 11 4873-6162" o "011 15 4873-6162" → "1148736162")
    function normalizarTelefono(valor) {

        let numero = valor.replace(/\D/g, "");

        if (numero.length > 11 && numero.startsWith("54")) {
            numero = numero.slice(2);
        }

        if (numero.length === 11 && numero.startsWith("9")) {
            numero = numero.slice(1);
        }

        if (numero.startsWith("0")) {
            numero = numero.slice(1);
        }

        // 15 después del código de área (2, 3 o 4 dígitos)
        if (numero.length === 12) {

            for (const largoArea of [2, 3, 4]) {

                if (numero.substr(largoArea, 2) === "15") {
                    numero = numero.slice(0, largoArea) + numero.slice(largoArea + 2);
                    break;
                }

            }

        }

        return numero;

    }


    // Válido: 10 dígitos con código de área (11, 2xx o 3xx)
    function validarTelefono() {

        const numero = normalizarTelefono(phoneInput.value);

        const esValido = /^(11\d{8}|[23]\d{9})$/.test(numero);

        phoneInput.setCustomValidity(esValido ? "" : "Teléfono inválido");

        return numero;

    }


    if (phoneInput) {
        phoneInput.addEventListener("input", validarTelefono);
    }


    if (contactForm && successMessage) {


        contactForm.addEventListener("submit", function (event) {


            // Evitar recarga de página
            event.preventDefault();

            event.stopPropagation();



            // ==========================================
            // VALIDACIÓN
            // ==========================================

            const telefono = phoneInput ? validarTelefono() : "";

            if (!contactForm.checkValidity()) {

                contactForm.classList.add("was-validated");

                return;

            }


            // Enviar el número limpio
            if (phoneInput) {
                phoneInput.value = telefono;
            }


            // ==========================================
            // ENVÍO A FORMSPREE
            // ==========================================

            const submitButton = document.getElementById("submitButton");

            submitButton.disabled = true;

            submitButton.textContent = "Enviando...";


            fetch("https://formspree.io/f/mrpzynyv", {

                method: "POST",

                body: new FormData(contactForm),

                headers: { "Accept": "application/json" }

            })

                .then(function (response) {

                    if (response.ok) {

                        contactForm.reset();

                        // Redirigir a la página de gracias recién cuando
                        // Google Ads registró la conversión (máx. 1,5 s)
                        let redirigido = false;

                        function irAGracias() {

                            if (redirigido) {
                                return;
                            }

                            redirigido = true;

                            window.location.href = "/landing/gracias.html";

                        }

                        setTimeout(irAGracias, 1500);

                        if (typeof gtag === "function") {

                            gtag('event', 'conversion', {
                                'send_to': 'AW-18430708679/TueXCKK0we4cEMeXudRE',
                                'value': 1.0,
                                'currency': 'ARS',
                                'event_callback': irAGracias
                            });

                        } else {

                            irAGracias();

                        }

                    } else {

                        submitButton.disabled = false;

                        submitButton.textContent = "Quiero que me contacten";

                        alert("Hubo un problema al enviar el formulario. Por favor intentá de nuevo.");

                    }

                })

                .catch(function () {

                    submitButton.disabled = false;

                    submitButton.textContent = "Quiero que me contacten";

                    alert("Hubo un problema al enviar el formulario. Por favor intentá de nuevo.");

                });


        });

    }

});