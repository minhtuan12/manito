# Migration & Import Log

## Seed source

- Initial products and categories are seeded from captured YAMOPAD source references.
- All seeded product content includes EN and VI fields.

## Next steps

- Replace static `data/*.ts` seeds with Prisma + PostgreSQL models.
- Add import scripts to ingest source JSON/CSV and map to localized schema.
