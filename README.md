# M_Banking_Ionic1_Firebase3
##	app.js
###1.LES ROUTES

	AngularUI Router

Utilisons le framework de routing UI-Router qui offre une approche différente par rapport à ngRoute. Celui-ci permet de modifier les vues de votre application en fonction de l’état de celle-ci et non pas de l’URL.

Le gestionnaire d’état $stateProvider d’UI-Router est similaire au routeur d’AngularJS mais se concentre uniquement sur l’état de l’application. Un état peut être une URL, mais peut aussi être un moment ou une étape lors de la visite d’une page.


•	Les états qui offrent des choses en commun peuvent être hiérarchisés à travers une relation parent / enfant 

•	La possibilité de nommer ses vues afin d’en avoir plusieurs sur un même template : ce sont les vues multiples

•	Grâce à la directive ui-sref, nos URLs sont générées dynamiquement et peuvent être changées facilement à un seul endroit de notre application

•	La possibilité de passer des paramètres à nos états facilement avec $stateParams

Redirection :

	$state.go()

###2.	Les Controleurs : 

	•	loginController  
	
le controlleur de l’authentification qui permet de vérifier l email et le mot de passe qui sont enregistré dans FIREBASE 

	•	signupController 

le controlleur qui permet l’inscription choisir le nom , l’email et le mot de passe  un email de vérification est envoyer par l email pour verifier le compte 
exemple des messages d’erreur.

le controlleur qui permet de restaurer le mot de passe un email est envoyer pour choisir un autre mot de passe.

	•	introController 

permet de connait les utilisateurs courent qui en fait l’inscrit sinon il retourne NULL   

	•	dashboardController 

representer une référence qu’on va l’utiliser pour lire et ecrire les données dans Firebase

	•	reclamationController  

envoyer une reclamation ;les messages sont enregistrées dans firebase chaque messages avec l email de l’utilisateur associer

	•	mapController 

definir votre position actuel API Google 

	•	appController 

vérifier si l’etat de l’utilisateur est changé

















