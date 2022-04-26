## MYSQLサーバーへの入り方
```console
$ docker exec -it db bash
$ mysql -u [ルートユーザー名] -p[パスワード]
```

## データベースの一覧
```console
$ show databases;
```

## データベースの選択
```console
$ use [データベース名];
```

## テーブルの一覧
```console
$ show tables;
```

## データの一覧の取得
```console
$ select * from [テーブル名];
```

## カラムの一覧の取得
```console
$ show columns from [テーブル名];
```
