import * as SQLite from 'expo-sqlite';


export function getDbConnection() {
    const cx = SQLite.openDatabase('dbContatos.db');
    return cx;
}

export async function createTable() {
    return new Promise((resolve, reject) => {
        const query = `CREATE TABLE IF NOT EXISTS tbContatos
        (
            id text not null primary key,
            nome text not null,
            email text not null,
            senha          
        )`;

        let dbCx = getDbConnection();        
        
        dbCx.transaction(tx => {
            tx.executeSql(query);
            resolve(true); 
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};




export function obtemTodosContatos() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbContatos';
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            id: registros.rows.item(n).id,
                            nome: registros.rows.item(n).nome,
                            email: registros.rows.item(n).email,
                            senha: registros.rows.item(n).senha
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export function adicionaContato(contato) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tbContatos (id, nome , email, senha) values (?,?,?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [contato.id, contato.nome, contato.email, contato.senha],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}


export function alteraContato(contato) {
    console.log('começando o método alteraContato');
    return new Promise((resolve, reject) => {
        let query = 'update tbContatos set nome=?, email=?, senha=? where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [contato.nome, contato.email, contato.senha, contato.id],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function getTotal() {
    console.log('começando o método getTotal');
    return new Promise((resolve, reject) => {
        let query = 'SELECT Count(*) as contagem FROM tbContatos';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query,[],
                (tx, registros) => {

                    if(registros.rows.length>0)
                    {
                        retorno =  registros.rows.item(0).contagem                 
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve(0);
            }
        )
    }
    );
}




export function excluiContato(id) {
    console.log('Apagando contato ' + id);
    return new Promise((resolve, reject) => {
        let query = 'delete from tbContatos where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [id],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}


export function excluiTodosContatos() {
    console.log("Apagando todos os contatos...");
    return new Promise((resolve, reject) => {
        let query = 'delete from tbContatos';
        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            tx.executeSql(query, [],
                (tx, resultado) => resolve(resultado.rowsAffected > 0)
            );
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    }
    );
}
