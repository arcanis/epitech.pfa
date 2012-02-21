Plugin
======

Classe de base dont héritent les plugins.

.. js:class:: Titania.Utility.Model.Plugin( )

   :returns: Une instance de plugin.

.. js:function:: Titania.Utility.Model.Plugin.prototype.inject( context )

   :param Titania.Core.Context context: Contexte de chargement.

   Méthode pure appelée lorsque le plugin est chargé dans un contexte.

   Les classes dérivées doivent réimplémenter cette méthode, sans quoi le plugin refusera de se charger.
