Listener
========

.. js:class:: Titania.Plugin.Core.Persistence.Server.Listener(server)

   :param server: Pointe vers le game du serveur.
   :type server: :doc:`Core.Game.Server`

.. js:attribute:: Core.Game.Server

   Un attribut sur le game du serveur.

.. js:function:: Titania.Plugin.Core.Persistence.Listener.prototype.export(id)

   :param id: L'id de la partie de l'user
   :type id: :doc:`int`

   Sauvegarder la partie en mémoire en DataBase avec l'id id

.. js:function:: Titania.Plugin.Core.Persistence.Listener.prototype.import(id)

   :param id: L'id de la partie de l'user
   :type id: :doc:`int`

   Charger en mémoire une partie sauvegarder en DataBase sous l'id id.
