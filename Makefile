DB_USER = root
DB_PASSWD = mysqlpasswd

init_db:
	mysql -u$(DB_USER) -p$(DB_PASSWD) < db_init.sql