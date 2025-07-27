import mysql from 'mysql2';

let connection: mysql.Connection | null = null;

export const iniciarTransaccion = (callback: (err: mysql.QueryError | null) => void) => {
    connection = mysql.createConnection({
        host: 'localhost',  // datos de la conexión
        user: 'root',
        password: 'Roberto@ldo1',
        database: 'ht3_transactions'
    });
    // inicia la transaction, palabra reservada
    connection.beginTransaction((err) => {
    if (err) {
        console.error('Error al iniciar transacción:', err);
        return callback(err);
    }
    console.log('Transacción iniciada correctamente');
    callback(null);
    });
};


// insertar usuario, espera, un nombre y un apellido, el id no porque es AI
export const insertarUsuario = ( 
    nombre: string,
    apellido: string,
    callback: (err: mysql.QueryError | null) => void
    ) => {
    if (!connection) return callback(new Error('Transacción no iniciada') as mysql.QueryError);

    const query = 'INSERT INTO users (nombre, apellido) VALUES (?, ?)';
    connection.query(query, [nombre, apellido], callback);
};

// usa palabra reservada commit para mandar todos los datos
export const commitTransaccion = (callback: (err: mysql.QueryError | null) => void) => {
    if (!connection) return callback(new Error('Transacción no iniciada') as mysql.QueryError);

    connection.commit((err) => {
        connection?.end();
        console.log('Commit finalizado correctamente');
        connection = null;
        callback(err);
    });
};

// utiliza rollback, para deshacer cada uno de los cambios que se hicieron
export const rollbackTransaccion = (callback: () => void) => {
    if (!connection) return callback();

    connection.rollback(() => {
        connection?.end();
        console.log('Rollback finalizado correctamente');
        connection = null;
        callback();
    });
};
