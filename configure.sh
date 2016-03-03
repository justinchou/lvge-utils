
yum install gcc gcc-c++ libstdc++-devel -y

cd lib/SeedRandom/
node-gyp configure
sleep 2;

node-gyp build
sleep 2;

cp build/Release/SeedRandom.node ./
sleep 2;

cd ../../test
