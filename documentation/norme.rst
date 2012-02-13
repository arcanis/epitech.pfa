Norme
=====

Hiérachie des fichiers
----------------------

- Les fichiers contenant des classes doivent avoir le nom de la classe suffixée de l'extension '.js'.
- La hiérarchie des dossiers doit correspondre à la hiérarchie des espaces de nom.

Nommage des classes, propriétés et variables
--------------------------------------------

- Chaque classe doit être nommée via la syntaxe de JS.Class, même si cela implique une redondance à la lecture du code.
- Les propriétés privées doivent être préfixées du symbole '_' (underscore).

Espaces & Indentation
---------------------

- Les tabulations doivent être utilisées pour indenter, et les espaces pour aligner.
- Chaque jeton lexical doit être séparé de ses voisins par des espaces, à l'exception des identifiants.
- Les lignes de codes participant à la même tâche doivent être regroupées en blocs. Chaque bloc doit être séparé des autres par un retour à la ligne.
- Les lignes vides doivent être indentées.
- Nous ne nous restreignons pas à 80 colonnes. Si une ligne est particulièrement longue, qu'il en soit ainsi.

Fonctionnalités du Javascript
-----------------------------

- Les objets ayant pour but d'être utilisés en tant que tables de hash doivent être instancié via un appel à Object.create( null ).
- Nous codons en Javascript 5eme édition. Par conséquent, l'utilisation des fonctions telles que Function.prototype.bind est encouragé.
