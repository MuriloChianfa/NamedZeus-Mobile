# Fix the Postgres image version
FROM postgres:13.3-alpine

# Adding SQLs scripts to entrypoint
COPY *.sql /docker-entrypoint-initdb.d/
RUN chmod 755 /docker-entrypoint-initdb.d/*.sql

# Expose default Postgres port
EXPOSE 5432
