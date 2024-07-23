import { useEffect, useRef, useState } from "react";
import {
  SQLiteDBConnection,
  SQLiteConnection,
  CapacitorSQLite,
} from "@capacitor-community/sqlite";

const useSQLiteDB = (pharmacyname: string) => {
  const db = useRef<SQLiteDBConnection>();
  const sqlite = useRef<SQLiteConnection>();
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    const initializeDB = async () => {
      if (sqlite.current) return;

      sqlite.current = new SQLiteConnection(CapacitorSQLite);
      const ret = await sqlite.current.checkConnectionsConsistency();
      const isConn = (await sqlite.current.isConnection(pharmacyname, false))
        .result;

      if (ret.result && isConn) {
        db.current = await sqlite.current.retrieveConnection(pharmacyname, false);
      } else {
        db.current = await sqlite.current.createConnection(
          pharmacyname,
          false,
          "no-encryption",
          1,
          false
        );
      }

      await initializeTables();
      setInitialized(true);
    };

    initializeDB();
  }, [pharmacyname]);

  const performSQLAction = async (
    action: (db: SQLiteDBConnection | undefined) => Promise<void>,
    successCallback?: () => void,
    errorCallback?: (error: Error) => void
  ) => {
    try {
      await db.current?.open();
      await action(db.current);
      if (successCallback) successCallback();
    } catch (error) {
      if (errorCallback) errorCallback(error as Error);
    } finally {
      try {
        await db.current?.close();
      } catch {}
    }
  };

  const initializeTables = async () => {
    performSQLAction(async (db: SQLiteDBConnection | undefined) => {
      const queryCreateMedicinesTable = `
        CREATE TABLE IF NOT EXISTS medicines_${pharmacyname} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          type TEXT,
          quantity TEXT,
          expiry_date TEXT,
          batch_no TEXT,
          price REAL
        );
      `;

      const queryCreateGeneralItemsTable = `
        CREATE TABLE IF NOT EXISTS general_items_${pharmacyname} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          quantity TEXT,
          price REAL
        );
      `;

      const queryCreateUserTable = `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          pharmacy_name TEXT,
          email TEXT UNIQUE,
          phone_number TEXT UNIQUE,
          password TEXT
        );
      `;

      await db?.execute(queryCreateMedicinesTable);
      await db?.execute(queryCreateGeneralItemsTable);
      await db?.execute(queryCreateUserTable);

      console.log("Tables created successfully.");
    });
  };

  const registerUser = async (pharmacyName: string, email: string, phoneNumber: string, password: string, successCallback?: () => void, errorCallback?: (error: Error) => void) => {
    await performSQLAction(async (db) => {
      const query = `
        INSERT INTO users (pharmacy_name, email, phone_number, password)
        VALUES (?, ?, ?, ?)
      `;
      await db?.run(query, [pharmacyName, email, phoneNumber, password]);
    }, successCallback, errorCallback);
  };

  const validateLogin = async (emailOrPhone: string, password: string, successCallback?: (pharmacyName: string) => void, errorCallback?: (error: Error) => void) => {
    await performSQLAction(async (db) => {
      const query = `
        SELECT pharmacy_name FROM users
        WHERE (email = ? OR phone_number = ?) AND password = ?
      `;
      const result = await db?.query(query, [emailOrPhone, emailOrPhone, password]);

      const values = result?.values ?? [];

      if (values.length) {
        const pharmacyName = values[0].pharmacy_name;
        if (successCallback) successCallback(pharmacyName);
      } else {
        if (errorCallback) errorCallback(new Error('Invalid email/phone number or password.'));
      }
    }, undefined, errorCallback);
  };

  return { performSQLAction, initialized, registerUser, validateLogin };
};

export default useSQLiteDB;
