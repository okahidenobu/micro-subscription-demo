# micro-subscription-demo

```
docker-compose up -d --build
docker-compose exec node yarn install
docker-compose exec node yarn global add sequelize-cli
docker-compose exec node sequelize init
```

src/copyConfig.jsonの中身をコピーし、作成されたsrc/config/config.jsonに上書き

```
docker-compose exec node sequelize model:create --name User --attributes firstName:string,lastName:string
docker-compose exec node sequelize db:migrate --env development
```

でDBにデータが作成される

```
docker-compose exec node yarn start
```
でサーバーを起動
http://localhost:8092
 でgraphqlのIDEが利用できる
