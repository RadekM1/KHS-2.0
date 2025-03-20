"use server";

import { executeQuery } from "../../connection-adapters/db";
import pool from "../../connection-adapters/pool";  

export const heartInsert = async (slug: string, user: string) =>{
    const sqlConnection = await pool.connect();
    
    try{
        if (!slug || !user) {
            console.log('nebyl rozlišen parametr id článku nebo uživatel, srdíčko nebude uloženo')
            return
        }

        const response = await executeQuery({
          sqlConnection,
          query:
            "INSERT INTO hearts (user_account_heart, article_slug_heart) VALUES ($1, $2)",
          values: [user, slug],
        });

        if (!(response.rowCount > 0)) {
            console.log('nepodařilo se uložit srdíčko', response)
            return
        } 
    }
    catch (error) {
        console.log("Blíže nespecifikovaný problém při uložení srdíčka:", error);
      } finally {
        if (sqlConnection) sqlConnection.release();
      }
       
      }

