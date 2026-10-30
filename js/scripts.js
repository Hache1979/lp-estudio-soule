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

    if (contactForm && successMessage) {


        contactForm.addEventListener("submit", function (event) {


            // Evitar recarga de página
            event.preventDefault();

            event.stopPropagation();



            // ==========================================
            // VALIDACIÓN
            // ==========================================

            if (!contactForm.checkValidity()) {

                contactForm.classList.add("was-validated");

                return;

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