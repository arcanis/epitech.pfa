Observable
==========

Une classe observable peut émettre des objets, et d'autres objets peuvent s'abonner pour être notifié lors de l'émission de telles émissions.

.. js:function:: Titania.Utility.Behavior.Observable( )

   Constructeur du behavior, initialise les variables internes.

.. js:function:: Titania.Utility.Behavior.Observable.addObserver( callback )

   :param function callback: Fonction de rappel.

   Insère ``callback`` dans la liste des observateurs.

.. js:function:: Titania.Utility.Behavior.Observable.removeObserver( callback )

   :param function callback: Fonction de rappel.

   Retire une occurence de ``callback`` de la liste des observateurs.

.. js:function:: Titania.Utility.Behavior.Observable.notifyObservers( event )

   :param object event: Evènement.

   Appelle l'ensemble des observateurs en leur passant en paramètre ``event``.

   Par convention, les évènements pouvant être passés en paramètres sont dans des espaces de noms nommés ``Event``.
