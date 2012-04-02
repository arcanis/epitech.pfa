#!/bin/zsh
make && node build/titania.js | less > biome.out && cat biome.out| grep -v Done > biome.test
rm biome.out
#cd MapViewer && make
#./TitaniaBlockView ../biome.test
