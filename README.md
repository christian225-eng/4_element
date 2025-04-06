# 4_element
Le code est conçu pour gérer un système de réservation dans une application web. Il permet à l'utilisateur de remplir un formulaire de réservation, de valider les informations saisies et d'afficher un récapitulatif avant la confirmation. Voici les principales fonctionnalités :

Gestion du bouton "Réserver" :

Lorsqu'un utilisateur clique sur le bouton "Réserver" dans l'en-tête, une modale s'ouvre. Cette modale contient un formulaire de réservation où l'utilisateur peut entrer ses informations.

Validation du formulaire de réservation :

Lors de la soumission du formulaire, le code empêche l'envoi par défaut et récupère les valeurs saisies par l'utilisateur.

Plusieurs validations sont effectuées sur ces valeurs :

Vérification de la validité du nom (doit être entre 2 et 50 caractères).

Validation des champs d'adresse, y compris le numéro de rue, le nom de la rue, le code postal et la ville.

Vérification du format de l'email et du numéro de téléphone.

S'assurer qu'un hôtel et un type de chambre ont été sélectionnés.

Vérification du nombre de personnes (doit être entre 1 et 2).

Validation des dates d'arrivée et de départ.

Affichage d'un récapitulatif :

Si toutes les informations sont valides, le code calcule le nombre de nuits, le prix total de la réservation et affiche ces informations dans un récapitulatif.

Ce récapitulatif inclut les détails de la réservation (nom, adresse, email, téléphone, hôtel, type de chambre, nombre de personnes, dates) et les options supplémentaires sélectionnées (petit-déjeuner, service chauffeur, visite guidée).

Le récapitulatif est affiché dans une autre modale pour que l'utilisateur puisse le consulter avant de confirmer.

Gestion de l'affichage des options :

Si l'utilisateur sélectionne l'option de petit-déjeuner, une section supplémentaire s'affiche pour permettre la saisie d'informations supplémentaires concernant le régime alimentaire.

Le code gère l'affichage ou le masquage de cette section en fonction de la sélection de l'utilisateur.
