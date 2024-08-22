import {config} from "dotenv"

config ()

export const PORT = process.env.PORT
export const HOST_MYSQL = process.env.HOST_MYSQL
export const DBNAME_MYSQL = process.env.DBNAME_MYSQL
export const USER_MYSQL = process.env.USER_MYSQL
export const PASSWORD_MYSQL = process.env.PASSWORD_MYSQL
export const PORT_MYSQL = process.env.PORT_MYSQL
export const ACCOUNT_SECRET = process.env.ACCOUNT_SECRET
export const USER_GMAIL_ACCOUNT = process.env.USER_GMAIL_ACCOUNT
export const PASSWORD_GMAIL_ACCOUNT = process.env.PASSWORD_GMAIL_ACCOUNT