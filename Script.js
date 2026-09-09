"use strict";


/* =========================================================
   MENU MOBILE
========================================================= */

const menuButton =
    document.getElementById("menuButton");

const navLinks =
    document.getElementById("navLinks");


function closeMenu() {

    navLinks.classList.remove("active");

    menuButton.textContent = "☰";

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    menuButton.setAttribute(
        "aria-label",
        "Abrir menu"
    );
}


function toggleMenu() {

    const isOpen =
        navLinks.classList.toggle("active");

    menuButton.textContent =
        isOpen ? "✕" : "☰";

    menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuButton.setAttribute(
        "aria-label",
        isOpen
            ? "Fechar menu"
            : "Abrir menu"
    );
}


menuButton.addEventListener(
    "click",
    toggleMenu
);


/* =========================================================
   FECHA MENU AO CLICAR EM UM LINK
========================================================= */

document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


/* =========================================================
   FECHA MENU COM ESC
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            navLinks.classList.contains("active")
        ) {

            closeMenu();

            menuButton.focus();
        }

    }
);


/* =========================================================
   EXERCÍCIO DE IDEIA
========================================================= */

const ideaInput =
    document.getElementById("ideaInput");

const saveIdea =
    document.getElementById("saveIdea");

const exerciseResult =
    document.getElementById("exerciseResult");


function showResult(
    message,
    success = false
) {

    exerciseResult.textContent =
        message;

    exerciseResult.classList.toggle(
        "success",
        success
    );

    exerciseResult.style.display =
        "block";
}


saveIdea.addEventListener(
    "click",
    () => {

        const idea =
            ideaInput.value.trim();


        if (!idea) {

            showResult(
                "🌷 Escreva pelo menos uma frase sobre sua ideia para começar."
            );

            ideaInput.focus();

            return;
        }


        try {

            localStorage.setItem(
                "minhaIdeiaDeLivro",
                idea
            );

            showResult(
                "✨ Perfeito! Sua ideia foi guardada neste navegador. Agora transforme essa pequena ideia no primeiro capítulo.",
                true
            );

        } catch (error) {

            showResult(
                "⚠️ Não foi possível guardar sua ideia neste navegador."
            );

            console.error(
                "Erro ao salvar ideia:",
                error
            );
        }

    }
);


/* =========================================================
   RECUPERA IDEIA SALVA
========================================================= */

try {

    const savedIdea =
        localStorage.getItem(
            "minhaIdeiaDeLivro"
        );

    if (savedIdea) {

        ideaInput.value =
            savedIdea;
    }

} catch (error) {

    console.error(
        "Erro ao recuperar ideia:",
        error
    );
}


/* =========================================================
   ANIMAÇÃO DOS CARDS
========================================================= */

const cards =
    document.querySelectorAll(
        ".step-card"
    );


const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (
    "IntersectionObserver" in window &&
    !prefersReducedMotion
) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    cards.forEach(card => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(25px)";

        card.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

        observer.observe(card);

    });

} else {

    cards.forEach(card => {

        card.style.opacity = "1";

        card.style.transform =
            "translateY(0)";

    });
}


/* =========================================================
   FECHA MENU SE A JANELA FICAR MAIOR
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 850 &&
            navLinks.classList.contains("active")
        ) {

            closeMenu();

        }

    }
);
