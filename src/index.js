// Specificially importing dist/index.js allows rollup to find the correct files
import atemConnection from "atem-connection";

const { Atem } = atemConnection;

const atem = new Atem();

console.log(atem);
