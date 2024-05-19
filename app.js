const express = require("express");
const fs = require("fs");

const app = express();

app.set("view engine", "ejs");
app.set("trust proxy", 1);

console.clear();

setInterval(() => {
    const keyFile = fs.readFileSync("keys.json");
    let keyData = JSON.parse(keyFile);

    for (let key in keyData) {
        keyData[key].curCons = 0;
    }
    fs.writeFile("keys.json", JSON.stringify(keyData, null, 4), (err) => {});
}, 300 * 1000);


const routes = fs.readdirSync("./routes/").filter(f => f.endsWith(".js"));
routes.forEach(file => {
    const route = require(`./routes/${file}`);
    const name = file.substring(0, file.length - 3).toLowerCase();

    try {
        if (name === "index") app.use("/", route);
        app.use(`/${name}`, route);
    } catch (err) {
        console.error(err.stack);
    }

});
app.listen(80, async () => {
    console.log("Cyrus API Made By iSholvedx");
});

process.on('uncaughtException', err => console.error(err.stack));
process.on('unhandledRejection', err => console.error(err.stack));
