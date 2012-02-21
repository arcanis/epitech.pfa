Class
=====

.. js:class:: Titania.Utility.Tool.Class( definition )

   :param object definition: Définition de la classe à créer.
   :returns: La classe créée.

   Créer une nouvelle classe, à partir des informations fournies dans le paramètre ``definition``.

   - ``name`` contient le nom de la classe.

   - ``path`` contient l'emplacement de la classe dans l'arborescence de l'API.

   - ``parent`` contient la classe dont hérite la nouvelle classe, si nécessaire.

   - ``include`` contient un tableau de behaviors.

   - ``methods`` contient la table des méthodes de la classe.

   Si la propriété ``name`` est indiquée, la classe créée aura une méthode magique nommé ``toString`` qui renverra le nom de la classe, ou le chemin complet si la propriété ``path`` est également indiquée.
