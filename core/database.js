const fs = require("fs")
const { Pool } = require("pg")
class Database{
    pgConnection()
    {
        let json_env = JSON.parse(fs.readFileSync(__dirname + "/../.env"));
        let postgres_config = json_env.database.postgres ;
        let pool = new Pool(postgres_config);
        return pool;
    }

    pgQuery(sql,args,callback)
    {
        let promise = new Promise((resolve,reject) => {
            return this.pgConnection().query(sql,args,(err,res) => {
                if(callback != undefined) callback(err,res)
                if(err) return reject(err)
                return resolve(res)
            });
        }) 

        return promise
    }
}

exports.Database = new Database()