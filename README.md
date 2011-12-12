Participants
============
- nison_m
- greine_f
- vinet_a
- plenar_d
- lauxer_c

Dépendances
===========
- A cloner
    - jsdoc3
- Paquets node
    - jshint
    - uglify-js

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
> echo 'jsdoc $@' >> /usr/bin/jsdoc
> chmod 755 /usr/bin/jsdoc
^D
$> jsdoc --help
```

Installer un paquet node
========================
```
$> sudo npm install -g <paquet>
```
