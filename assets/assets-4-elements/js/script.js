document.addEventListener('DOMContentLoaded', function () {
    // 1. Gestion du bouton "Réserver" du header
    const headerReserveBtn = document.querySelector('header .btn-success');

    // Vérifie si le bouton "Réserver" existe
    if (headerReserveBtn) {
        headerReserveBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const reservationModal = new bootstrap.Modal(document.getElementById('reservationModal'));
            reservationModal.show(); // Affiche la modale de réservation
        });
    }
    // 2. Validation du formulaire
    let formulaire = document.getElementById("form-reservation");
    if (formulaire) {
        formulaire.addEventListener("submit", function (e) {
            e.preventDefault(); // Empêche l'envoi normal du formulaire

            // Récupération des valeurs des champs du formulaire
            const name = document.getElementById("firstname").value.trim();
            const streetNumber = document.getElementById("street-number").value.trim();
            const street = document.getElementById("street").value.trim();
            const postalCode = document.getElementById("postal-code").value.trim();
            const city = document.getElementById("city").value.trim();
            const email = document.getElementById("email").value.trim();
            const tel = document.getElementById("phone").value.trim();
            const hotel = document.getElementById("hotel");
            const chambre = document.getElementById("chambre");
            const personne = document.getElementById("nbPersonne");
            const dateArrivee = document.getElementById("date-arrivee").value;
            const dateDepart = document.getElementById("date-depart").value;
            const chauffeur = document.getElementById("chauffeur");
            const guide = document.getElementById("guide");
            const ptitDej = document.getElementById("ptitDej");

            // Réinitialisation des messages d'erreur
            const errorMessages = document.querySelectorAll(".error-message");
            for (let i = 0; i < errorMessages.length; i++) {
                errorMessages[i].textContent = ""; // Vide chaque message d'erreur
            }

            let validation = true; // Indicateur de validation
            const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/; // Regex pour valider l'email
            const telRegex = /^[0-9\s-/]{10,14}$/; // Regex pour valider le numéro de téléphone

            // Validation des champs
            if (name.length < 2 || name.length > 50) {
                document.getElementById("firstname-error").textContent = "Nom invalide (2-50 caractères)";
                validation = false; // Marque la validation comme échouée
            }
            if (!/^\d+$/.test(streetNumber)) {
                document.getElementById("street-number-error").textContent = "Numéro de rue invalide";
                validation = false;
            }
            if (street.length === 0 || street.length > 150) {
                document.getElementById("street-error").textContent = "Nom de rue invalide";
                validation = false;
            }
            if (!/^\d{5}$/.test(postalCode)) {
                document.getElementById("postal-code-error").textContent = "Code postal invalide";
                validation = false;
            }
            if (city.length === 0 || city.length > 100) {
                document.getElementById("city-error").textContent = "Ville invalide";
                validation = false;
            }
            if (!emailRegex.test(email)) {
                document.getElementById("email-error").textContent = "Email invalide";
                validation = false;
            }
            if (!telRegex.test(tel)) {
                document.getElementById("phone-error").textContent = "Téléphone invalide";
                validation = false;
            }
            if (hotel.value === "") {
                document.getElementById("hotel-error").textContent = "Veuillez sélectionner un hôtel";
                validation = false;
            }
            if (chambre.value === "") {
                document.getElementById("chambre-error").textContent = "Veuillez sélectionner un type de chambre";
                validation = false;
            }
            if (personne.value <= 0 || personne.value > 2) {
                document.getElementById("nbPersonne-error").textContent = "Nombre de personnes invalide (1-2)";
                validation = false;
            }
            if (!dateArrivee) {
                document.getElementById("date-arrivee-error").textContent = "Date d'arrivée requise";
                validation = false;
            }
            if (!dateDepart) {
                document.getElementById("date-depart-error").textContent = "Date de départ requise";
                validation = false;
            }

            // Si validation OK, affichage du récapitulatif
            const recap = document.getElementById("valide");
            if (validation) {
                const arrivee = new Date(dateArrivee); // Convertit la date d'arrivée en objet Date
                const depart = new Date(dateDepart); // Convertit la date de départ en objet Date
                const uneNuit = 24 * 60 * 60 * 1000; // Millisecondes dans une nuit
                const nuits = Math.round((depart - arrivee) / uneNuit); // Calcul du nombre de nuits

                let prixChambre = chambre.value === "igloo" ? 500 : 850; // Prix de la chambre selon le type
                let prixTotal = prixChambre * nuits; // Prix total de la chambre

                // Ajout des options supplémentaires au prix total
                if (chauffeur.checked) prixTotal += 11 * nuits; // Coût du service chauffeur
                if (ptitDej.checked) prixTotal += 15 * personne.value * nuits; // Coût du petit-déjeuner
                if (guide.checked) prixTotal += 20; // Coût de la visite guidée

                document.getElementById("total").textContent = prixTotal; // Affiche le prix total

                const dateArriveeForm = arrivee.toLocaleDateString("fr-FR"); // Formate la date d'arrivée
                const dateDepartForm = depart.toLocaleDateString("fr-FR"); // Formate la date de départ

                // Construction du contenu récapitulatif
                recap.innerHTML = `
                    <div class="border p-3 rounded">
                        <h5 class="mb-3">Récapitulatif de réservation</h5>
                        <p><strong>Nom complet :</strong> ${name}</p>
                        <p><strong>Adresse :</strong> ${streetNumber} ${street}, ${postalCode} ${city}</p>
                        <p><strong>Email :</strong> ${email}</p>
                        <p><strong>Téléphone :</strong> ${tel}</p>
                        <p><strong>Hôtel :</strong> ${hotel.value}</p>
                        <p><strong>Chambre :</strong> ${chambre.value}</p>
                        <p><strong>Nombre de personnes :</strong> ${personne.value}</p>
                        <p><strong>Dates :</strong> ${dateArriveeForm} au ${dateDepartForm}</p>
                        ${ptitDej.checked ? '<p><strong>Option :</strong> Petit-déjeuner inclus</p>' : ''}
                        ${chauffeur.checked ? '<p><strong>Option :</strong> Service chauffeur</p>' : ''}
                        ${guide.checked ? '<p><strong>Option :</strong> Visite guidée</p>' : ''}
                        <h5 class="mt-3">Total : ${prixTotal}€</h5>
                    </div>
                `;

                // Affichage de la modale de récapitulatif
                const recapModal = new bootstrap.Modal(document.getElementById('recapModal'));
                recapModal.show();

            } else {
                recap.innerHTML = ""; // Vide le récapitulatif si validation échoue
            }
        });
    }

    // 3. Gestion du régime alimentaire (affichage/masquage)
    function toggleDietSection() {
        const dietSection = document.getElementById("diet-section");
        const ptiDej = document.getElementById("ptitDej");

        if (ptiDej && dietSection) {
            // Affiche ou masque la section de régime alimentaire selon l'option sélectionnée
            if (ptiDej.checked) {
                dietSection.classList.remove("d-none");
            } else {
                dietSection.classList.add("d-none");
            }
        }
    }

    const ptitDejCheckbox = document.getElementById("ptitDej");
    if (ptitDejCheckbox) {
        ptitDejCheckbox.addEventListener("change", toggleDietSection); // Écoute les changements sur la case à cocher
        // Initialisation au chargement
        toggleDietSection(); // Affiche ou masque la section de régime alimentaire au chargement
    }
});
