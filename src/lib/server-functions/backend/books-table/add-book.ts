"use server";

import pool from "@/src/lib/connection-adapters/pool";
import { executeQuery } from "@/src/lib/connection-adapters/db";

export const bookInsert = async (
    name : string,
    creator: string,
    onStock: boolean,
    whoRented: string,
    release: string,
    description: string,
    isImage: boolean
) => {
    const sqlConnection = await pool.connect();
    try{

      let returnedId: number = 0

      if(isImage){
        const idResponse = await executeQuery({
          sqlConnection,
          query: "SELECT MAX(id) AS returnedId from books",
        });

         returnedId = idResponse.rows[0].returnedid ? idResponse.rows[0].returnedid + 1 : 1;
         
        if(!(Number.isInteger(returnedId))){
          return {ok:false, message:'Vrácená hodnota z databáze není celé číslo (integer)'}
      }
    }
      
        const bookImgUrl = isImage ? `https://storage.googleapis.com/khs-zlin/books/${returnedId}.jpg` : ''

        const result = await executeQuery({
            sqlConnection,
            query: `
                INSERT INTO books (name, creator, on_stock, member_rented, release, picture_url, description)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *;
            `,
            values: [
                name,
                creator,
                onStock,
                whoRented,
                release,
                bookImgUrl,
                description,
            ],
          });
    
          if (!(result.rowCount > 0)) {
            return {
                message: 'Nepodařilo se uložit knížku',
                ok: false, 
            }
          } 

          return {
            message: "Knížka uložena",
            ok: true,
            returnedId: returnedId
          };
        
    }catch (error) {
        console.log("Chyba při přidání knížky:", error);
        return {
          message: 'Nepodařilo se uložit knížku',
          ok: false, 
      }
      } finally {
        sqlConnection.release();
      }
}
