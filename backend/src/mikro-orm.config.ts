import { Migrator } from '@mikro-orm/migrations';
import { MikroORM } from '@mikro-orm/postgresql'; // ou un autre pilote selon ta base de données

export default {
    entities: ['./dist/entities'], // Spécifie le chemin vers tes entités compilées (en JS) après la transpilation
    entitiesTs: ['./src/entities'], // path to your TS entities (source), relative to `baseDir`
    dbName: 'movie', // Nom de ta base de données
    type: 'postgresql', // Type de base de données que tu utilises
    user: 'david-d', // Nom d'utilisateur de la base de données
    password: 'Tyranisus!1', // Mot de passe pour la base de données
    debug: true, // Optionnel : Activer les logs SQL pour débogage
    extensions: [Migrator],
} as Parameters<typeof MikroORM.init>[0];
