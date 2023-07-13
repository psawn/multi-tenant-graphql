import fs from "fs";
import path from "path";

const authPath = path.join(__dirname, "/auth.graphql");

const authDefs = fs.readFileSync(authPath, "utf8");

export const typeDefs = [authDefs];