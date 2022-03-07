#!/bin/bash
# Not tested on windows!
echo "Cloning WaveJS vanilla example ..."
git clone https://github.com/wave-studio/wavejs
cp -a -r ./wavejs/examples/vanilla/. ./
rm -rf ./wavejs
echo "Cloned! Run npm install or yarn to install packages."
