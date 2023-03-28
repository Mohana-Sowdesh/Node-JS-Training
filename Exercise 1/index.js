let fs = require('fs');

fs.readFile("assets/color_ palette.json",'UTF-8',(err,data) => {
    let colours = [];
    let randomFiveColours = [];

    colours = JSON.parse(data);
    let i = 0;
    while(i<5)
    {
        randomFiveColours.push(colours[Math.floor(Math.random() * colours.length)]);
        i++;
    }

    fs.writeFile("./assets/random_five_colours.json", JSON.stringify(randomFiveColours),(err) => {
        if(err)
            console.log("Error occurred!!");

        fs.readFile("./assets/random_five_colours.json",'UTF-8',(err,data) => {
            if(err)
                console.log("Error occurred!!");
            console.log(JSON.parse(data));
        })
    })
});

