#!/bin/sh

version=$(git describe --abbrev=0)
dest="Assets/mooplay.$version.js"

`touch $dest`
`echo '' > $dest`

for file in `find Source -name *.js`
do
    `cat $file >> $dest`
done
