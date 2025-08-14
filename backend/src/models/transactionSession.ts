import mysql from 'mysql2';

let connection: mysql.Connection | null = null;

export const iniciarTransaccion = (callback: (err: mysql.QueryError | null) => void) => {
    if (!connection){
        connection = mysql.createConnection({
            host: 'localhost',  // datos de la conexión
            user: 'root',
            password: 'Roberto@ldo1',
            database: 'ht3_transactions'
        });
    }
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
    console.log(`Usuario Guardado Temporalmente ${nombre}, ${apellido}`)
    connection.query(query, [nombre, apellido], callback);
};

// mostrar todos los usuarios
export const getUsers = (
    callback: (err: mysql.QueryError | null, results?: any) => void
) => {
    if (!connection) return callback(new Error('Transacción no iniciada') as mysql.QueryError);

    const query = 'SELECT * FROM users';
    console.log('Usuarios mostrados temporalmente');
    connection.query(query, callback);
};

// actualizar usuario por id
export const updateUser = (
    id: number,
    nombre: string,
    apellido: string,
    callback: (err: mysql.QueryError | null, results?: any) => void
) => {
    if (!connection) return callback(new Error('Transacción no iniciada') as mysql.QueryError);

    const query = 'UPDATE users SET nombre = ?, apellido = ? WHERE id = ?';
    console.log(`Usuario con id ${id} actualizado temporalmente`);
    connection.query(query, [nombre, apellido, id], callback);
};

// eliminar usuario por id
export const deleteUser = (
    id: number,
    callback: (err: mysql.QueryError | null, results?: any) => void
) => {
    if (!connection) return callback(new Error('Transacción no iniciada') as mysql.QueryError);

    const query = 'DELETE FROM users WHERE id = ?';
    console.log(`Usuario con id ${id} eliminado temporalmente`);
    connection.query(query, [id], callback);
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

// utiliza query, para cambiar el nivel de aislamiento
export const setIsolationLevel = (
    nivel: string,
    callback: (err: mysql.QueryError | null) => void
) => {
    if (!connection) {
        
        connection = mysql.createConnection({
            host: 'localhost',  // datos de la conexión
            user: 'root',
            password: 'Roberto@ldo1',
            database: 'ht3_transactions'
        });
        
        const query = `SET TRANSACTION ISOLATION LEVEL ${nivel}`;
        connection.query(query, (err) => {
            if (err) {
                console.error('Error al cambiar nivel de aislamiento:', err);
                return callback(err);
            }
        console.log(`Nivel de aislamiento cambiado a ${nivel}`);

        callback(null);
    });

    } else {
        return callback(new Error('Transacción iniciada') as mysql.QueryError);
    }
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
