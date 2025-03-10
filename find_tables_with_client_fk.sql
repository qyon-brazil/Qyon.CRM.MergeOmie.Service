SELECT
    ConstraintName = fk.name,
    TableName = t.name,
    ColumnName = c.name
FROM
    sys.foreign_keys fk
INNER JOIN
    sys.foreign_key_columns fkc ON fkc.constraint_object_id = fk.object_id
INNER JOIN
    sys.tables t ON fk.parent_object_id = t.object_id
INNER JOIN
    sys.columns c ON fkc.parent_object_id = c.object_id AND fkc.parent_column_id = c.column_id
INNER JOIN
    sys.tables tref ON fk.referenced_object_id = tref.object_id
INNER JOIN
    sys.columns cref ON fkc.referenced_object_id = cref.object_id AND fkc.referenced_column_id = cref.column_id
WHERE
    tref.Name = 'CLIENTE'
    AND cref.Name = 'CD_CLIENTE'
