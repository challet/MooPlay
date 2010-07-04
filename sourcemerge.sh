#!/bin/sh

version=$(git describe --abbrev=0)
dest="Assets/mooplay.$version.js"

`touch $dest`
`echo '' > $dest`

for file in `cat package.yml | sed -n -e 's/^files: \[\([a-zA-Z0-9/., ]*\)\]$/\1/p' | awk -F ", " '{for(i=1;i<=NF;i++) print $i }'`
do
    `cat Source/$file >> $dest`
done
