Xtrabackup from Percona
=======================

```docker
version: '3.8'

services:
  web:
    container_name: play-web
    build:
      context: .
      target: development
    # ==========================================
    # For "target: development" both "php-fpm"
    # and "nginx" have to be started explicitly.
    # ==========================================
    command: ["/bin/bash", "-c", "php-fpm -D && nginx -g \"daemon off;\""]
    ports:
      - '8088:80'
      # ==================================
      # Opens Xdebug on port 9999 locally.
      # ==================================
      - '9999:9003'
    volumes:
      - ./:/var/www/html
  db:
    container_name: play-mysql
    # =========================================================
    # MySQL v5.7.28 is not compatible with Apple Silicon.
    # Debian has to be specified explicitly, instead of Oracle.
    # =========================================================
    image: mysql:8.0.33-debian
    platform: linux/x86_64
    ports:
      - '3306:3306'
    volumes:
      # ============================
      # Stores actual database data.
      # ============================
      - .docker/mysql/lib:/var/lib/mysql
      # =====================================
      # To fix "lower_case_table_names" issue
      # =====================================
      - .docker/mysql/conf.d/my.cnf:/etc/mysql/my.cnf
      # ===============================================
      # Provisioning works only on the first iteration.
      # ===============================================
      - .docker/mysql/initdb.d:/docker-entrypoint-initdb.d
    environment:
      MYSQL_ROOT_PASSWORD: test
      MYSQL_DATABASE: test
      MYSQL_USER: test
      MYSQL_PASSWORD: test
  # =============================================================
  # Necessary to migrate existing database to a new RDS instance,
  # which will be restored from a previously prepared backup.
  # =============================================================
  backup:
    container_name: play-mysql-backup
    # ================================================================
    # XtraBackup v2.4.* is compatible with MySQL versions 5.6 and 5.7,
    # to use XtraBackup with MySQL 8.0, v8.0.* should be used instead.
    # https://www.tencentcloud.com/document/product/236/31910#prerequisites
    # ================================================================
    image: percona/percona-xtrabackup:8.0.33
    platform: linux/x86_64
    # =================================
    # Both "tty" as well as "command"
    # make sure container doesn't exit.
    # =================================
    tty: true
    command: /bin/bash
    volumes:
      - .docker/mysql/backup:/backup
      # ========================================
      # Requires access to local database files.
      # ========================================
      - .docker/mysql/lib:/var/lib/mysql
    depends_on:
      - db
```
