Plugin
======

Class qui herite de Titania.Utility.Model.Plugin.

.. js:class:: Titania.Plugin.Core.Persistence.Plugin( )

   :returns: Une instance de plugin.

.. js:function:: Titania.Plugin.Core.Persistence.Plugin.prototype.inject( context )

   :param Titania.Core.Context context: Contexte de chargement.

   Méthode pure appelée lorsque le plugin est chargé dans un contexte.

   Les classes dérivées doivent réimplémenter cette méthode, sans quoi le plugin refusera de se charger.
