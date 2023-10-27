# Docker based Live Compiler

### Getting started

Just copy the source:

```bash
docker run -d -p 27017:27017 --name=mongo-db mongo:7.0.2
docker exec -i mongo-db bash -c 'mongosh compiler --quiet --eval "db.codes.find({}, {_id:0}).toArray();"' > codes.json
docker exec -i mongo-db bash -c 'mongosh compiler --quiet --eval "JSON.stringify(db.codes.find({}, {_id:0}).toArray(), null, 4);"' > codes.json
docker exec -i mongo-db bash -c 'mongoimport -d compiler -c codes --jsonArray' < codes.json

git clone -b live-compiler https://github.com/asmryz/online-compiler.git
```

Then run the following commands one by one:

```bash
cd online-compiler
npm i
```

You can start the dev server by running

```shell
npm run dev
```

This will fire up an Express server with live Webpack compilation and HMR.
Edit away!!

### Production

The process is pretty simple. First build the project:

```shell
npm run build
```

Then start the server with

```shell
npm start
```

That's all there is to it.
