Avant-propos
============

Ce repository contient le code source d'un projet réalisé en troisième année en tant que projet libre. Il consistait à la base à créer un minecraft-like en webgl.
Notre groupe, composé de cinq personnes, n'a pas si bien fonctionné que cela, et j'ai finalement été en grande partie seul à travailler dessus.

En conséquent, le projet n'est pas fini, et n'a pas rempli mes espérances.

Merci d'avoir lu : )

Utilisation
===========

La branche develop contient le code le plus à jour (il s'agit d'une réécriture totale de la branche master. J'ai a plusieures reprises réécrit le code à partir de zéro, afin d'adapter la conception aux nouvelles problématiques découvertes au fil du développement).

Un `make` est nécessaire : il sert à résoudre les dépendances, compresser les fichiers, et les concaténer.

Le fichier généré est à la fois client et serveur (car le serveur est censé pouvoir être lancé en client, graçe à l'abstraction d'un grand nombre de composants). Ainsi, `node build/titania.js` lancera un serveur tandis qu'ouvrir `build/index.html` dans un navigateur ouvrira un client.

Pour d'autres questions, contactez-moi. Si vous souhaitez reprendre le projet, contactez-moi également afin que nous en discutions (il est possible que je sois également intéressé, et je pourrais également faire circuler l'information dans mon entourage).

Participants
============
- nison_m
- plenar_d
- greine_f
- vinet_a
- lauxer_c

Dépendances
===========
- A cloner
    - jsdoc3
- Paquets node
    - jshint
    - uglify-js
    - js.class

Installer jsdoc3
================
```
$> sudo -s
> mkdir /usr/src/jsdoc3
> cd /usr/src/jsdoc3
> git init
> git remote add origin git@github.com:micmath/jsdoc
> git pull -u origin master
> chmod 755 jsdoc
> echo '#!/usr/bin/env bash' > /usr/bin/jsdoc
> echo '/usr/src/jsdoc3/jsdoc $@' >> /usr/bin/jsdoc
> chmod 755 /usr/bin/jsdoc
^D
$> jsdoc --help
$> cd /path/to/titania
$> make documentation
```

Installer un paquet node
========================
```
$> sudo npm install -g <paquet>
```
