import { Client, Account, Storage, TablesDB } from "appwrite";


export const client = new Client();

client.setEndpoint('https://nyc.cloud.appwrite.io/v1').setProject('692688a400090dfc3af7');

export const account = new Account(client);
export const tableDB = new TablesDB(client);
export const storage = new Storage(client);
export { ID } from "appwrite";
