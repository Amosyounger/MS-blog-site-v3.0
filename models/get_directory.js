var mysql      = require('mysql'),
    sqlOptions = require('./sql_options').options,
    
    getSqlStr = 'SELECT id, title, LEFT(publish_date, 10) AS date, tag, subtag, abstract ' +
                'FROM papers_table ' +
                'ORDER BY publish_date DESC',
    
    connection, 
    client;

var sqlQuery = function(request, callbackFunc) {
    client = mysql.createConnection(sqlOptions.connection);

    client.connect(function(err) {
        if (err) { return err; }
    });
    
    client.query(getSqlStr, function(err, results, fields) {
        if (err) { return err; }
        else {
            callbackFunc(results);
        }

        client.end(function(err) {
            if (err) { return err; }
        })
    })
};

module.exports.sqlQuery = sqlQuery;