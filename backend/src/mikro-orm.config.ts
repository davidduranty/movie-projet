import { Logger } from '@nestjs/common';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

const logger = new Logger('mikroORM')

const config = {
    ensureDatabase: true,
    autoLoadEntities: true,
    driver: PostgreSqlDriver,
    dbName: 'postgres', // Nom de ta base de données
    host: 'localhost',
    port: 5432,
    user: 'postgres', // Nom d'utilisateur de la base de données
    password: 'Tyranisus!1', // Mot de passe pour la base de données
    highlighter: new SqlHighlighter(),
    debug: true, // Optionnel : Activer les logs SQL pour débogage
    logger: logger.log.bind(logger),
}

export {config}
