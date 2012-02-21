Pluggable
=========

Une classe pluggable notifie qui veut l'entendre de sa création, afin que les intéressés puissent y réagir.

Pour cela, lors de la construction d'une instance d'une classe pluggable, l'utilisateur aura la charge d'y passer en premier paramètre une instance de :doc:`/api/titania/core/Context`.

Ce behavior ne possède pas de fonction membre en tant que telle.

.. js:function:: Titania.Utility.Behavior.Pluggable( )

   Constructeur du behavior, initialise les variables interne.
