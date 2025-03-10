SELECT t.name
FROM sys.columns c
JOIN sys.tables t ON t.object_id = c.object_id
WHERE c.name = 'CD_CLIENTE'
