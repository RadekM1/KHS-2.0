"use server";

import { executeQuery } from "../../connection-adapters/db";
import pool from "../../connection-adapters/pool";  

export const commentInsert = async (slug: string, user: string, comment:string) =>{
    const sqlConnection = await pool.connect();
    
    try{
        if (!slug || !user || !comment) {
            console.log('nebyl rozlišen parametr id článku nebo uživatel, srdíčko nebude uloženo')
            return {ok: false, message: 'chybí jedna z hodnot potřebných pro uložení komentáře (obsah komentáře, id uživatele, nebo id článku'}
        }
        const response = await executeQuery({
          sqlConnection,
          query:
            "INSERT INTO comments (article_slug, user_account, comment, created) VALUES ($1, $2, $3, NOW())",
          values: [slug, user, comment],
        });
        if (!(response.rowCount > 0)) {
            console.log(response)
            return {ok: false, message: 'komentář se nepodařilo uložit, zkuste znovu, případně kontaktujte podporu'}
        } 

        return {ok: true, message: 'komentář byl uložen'}
    }
    catch (error) {
        console.log("Blíže nespecifikovaný problém při uložení komentáře:", error);
        return {ok: false, message: 'komentář se nepodařilo uložit, zkuste znovu, případně kontaktujte podporu'}
      } finally {
        if (sqlConnection) sqlConnection.release();
      }
       
      }

