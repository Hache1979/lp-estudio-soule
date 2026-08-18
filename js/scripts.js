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

    const formHeader = document.querySelector(
        ".landing-form-header"
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

                    mostrarExito();

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


        function mostrarExito() {


            // ==========================================
            // LIMPIAR FORMULARIO
            // ==========================================

            contactForm.reset();



            // ==========================================
            // OCULTAR HEADER
            // ==========================================

            if (formHeader) {

                formHeader.style.display = "none";

            }



            // ==========================================
            // OCULTAR FORMULARIO
            // ==========================================

            contactForm.style.display = "none";



            // ==========================================
            // MOSTRAR SUCCESS
            // ==========================================

            successMessage.style.display = "block";

            successMessage.style.visibility = "visible";

            successMessage.style.opacity = "1";



            // Asegurar visibilidad del contenido

            const successIcon =
                successMessage.querySelector(
                    ".landing-success-icon"
                );

            const successTitle =
                successMessage.querySelector("h3");

            const successText =
                successMessage.querySelector("p");



            if (successIcon) {

                successIcon.style.display = "flex";

                successIcon.style.visibility = "visible";

                successIcon.style.opacity = "1";

            }


            if (successTitle) {

                successTitle.style.display = "block";

                successTitle.style.visibility = "visible";

                successTitle.style.opacity = "1";

            }


            if (successText) {

                successText.style.display = "block";

                successText.style.visibility = "visible";

                successText.style.opacity = "1";

            }


        }

    }

});