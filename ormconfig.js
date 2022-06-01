module.exports = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'mohammad',
  password: '12345678',
  database: 'dare_devil_v1',
  entities: ['dist/**/*-entity{.ts,.js}', 'dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrationsTableName: 'migrations',
  migrationsRun: false,
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
  autoLoadEntities: true,
  cache: false
};
