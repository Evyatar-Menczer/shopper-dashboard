"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const data_1 = require("./data");
const db = new sqlite3_1.default.Database(":memory:", (err) => __awaiter(void 0, void 0, void 0, function* () {
    if (err) {
        console.error(err.message);
        return;
    }
    yield createTable(db);
}));
const createTable = (db) => __awaiter(void 0, void 0, void 0, function* () {
    const categoriesToInsert = Object.keys(data_1.categories).join(", ");
    db.run(`CREATE TABLE sales_data (${categoriesToInsert})`, (err) => {
        if (err) {
            console.error(err.message);
        }
        else {
            console.log("Table created");
            insertData(categoriesToInsert);
        }
    });
});
const insertData = (categories) => {
    const insert = db.prepare(`INSERT INTO sales_data (${categories}) VALUES (?, ?, ?, ?, ?)`);
    data_1.rawData.forEach((item) => {
        insert.run([...Object.values(item)], (err) => {
            if (err) {
                console.error(err.message);
            }
        });
    });
    insert.finalize(() => {
        console.log("Data inserted");
    });
};
exports.default = db;
