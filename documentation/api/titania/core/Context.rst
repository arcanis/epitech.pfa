Context
=======

Les contextes sont les conteneurs chargés d'enregistrer l'ensemble des informations liées aux plugins. Ils n'exposent qu'une API limitée mais pourtant suffisante pour la plupart des usages.

Les contextes agissent de paire avec le behavior :js:func:`Titania.Utility.Behavior.Pluggable()` et le modèle :js:class:`Titania.Utility.Model.Plugin`.

.. js:class:: Titania.Core.Context( )

   :returns: Une instance de :js:class:`Titania.Core.Context`.

.. js:class:: Titania.Core.Context.prototype.load( plugin )

   :param Titania.Utility.Model.Plugin plugin: Plugin à charger.

   Charge un plugin dans le contexte.

.. js:class:: Titania.Core.Context.prototype.register( pluggableClass, listenerClass )

   :param object pluggableClass: Classe dotée du behavior :js:func:`Titania.Utility.Behavior.Pluggable()`.
   :param object listenerClass: Classe devant être instanciée en réaction.

   Enregistre une classe pour être instanciée à chaque fois qu'un objet de la lasse pluggableClass est instancié.

   Lors de l'instanciation de la classe contenu dans le paramètre ``listenerClass``, l'instance du contexte sera passé en premier paramètre, et l'instance de la classe surveillée en second.

.. js:class:: Titania.Core.Context.prototype.construct( pluggable )

   :param object pluggable: Objet en cours de construction.

   Active les gestionnaires des plugins concernés par le type de l'objet pluggable.

   Vous ne devriez pas avoir à utiliser cette méthode, elle est utilisée en interne par le behavior :js:func:`Titania.Utility.Behavior.Pluggable()`.
