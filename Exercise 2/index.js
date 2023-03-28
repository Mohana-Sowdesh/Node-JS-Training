let http = require('http');
let fs = require('fs');
let url = require('url');

http.createServer((req, res, err) => {
    if (req.url != '/favicon.ico') {
        fs.readFile("assets/color_ palette.json", 'UTF-8', (err, data) => {
            let colours = [];
            let randomColours = [];

            colours = JSON.parse(data);
            let i = 0;
            while (i < 5) {
                randomColours.push(colours[Math.floor(Math.random() * colours.length)]);
                i++;
            }

            fs.writeFile("assets/random_five_colours.json", JSON.stringify(randomColours), (err) => {
                if (err)
                    console.log("Error occurred!!");

                fs.readFile("assets/random_five_colours.json", 'UTF-8', (err, data) => {
                    if (err)
                        console.log("Error occurred!!");

                    console.log(JSON.parse(data));
                    res.write(JSON.stringify(randomColours));
                    res.end();
                })
            })
        });
    }
}).listen(4000);