//Importing file access modules
const fileAccess = require('./modules/fileAccess');

//Declaring variables
const noOfRandomColors = 5;
var colours = [];
var randomFiveColours = [];
    
var i = 0;
var randomNumber = 0;

//Storing file paths in a variable
const sourcePath = "./assets/color_ palette.json";
const destinationPath = "./assets/random_five_colours.json";
var fileAccessResponse = "";

//Function to geenrate random five colours
function generateFiveRandomColors() {
    try {
        //Reading from color_palette.json file
        fileAccessResponse = fileAccess.readFromFile(sourcePath);

        //Checks for errors
        if(fileAccessResponse.length==0) {
            throw new Error("Cannot read file!!");
        }
        else {
            //Parsing json file data to variable colours
            colours = JSON.parse(fileAccessResponse);
        }
    }
    catch(e) {
        console.log(e);
    }

    //Code for selecting random five colours and pushing into randomNumber array
    while(i < noOfRandomColors)
    {
        randomNumber = Math.floor(Math.random() * colours.length);
        randomFiveColours.push(colours[randomNumber]);
        colours.splice(randomNumber,1);
        i++;
    }

    //Function call for writing random five colours to a file 
    writeRandomColorsToFile(randomFiveColours);
}

//Function to write to a file
function writeRandomColorsToFile(randomFiveColours) {
    //Checks if array length is 5 and not zero
    if(Array.isArray(randomFiveColours) &&  randomFiveColours.length>0 && randomFiveColours.length == 5) {
        fileAccess.writeToFile(destinationPath, randomFiveColours);
    }
    else {
       throw new Error("5 colours not chosen!!");
    }
    readRandomColorsFile();
}

//Function to read the file
function readRandomColorsFile() {
    fileAccessResponse = fileAccess.readFromFile(destinationPath);
    console.log(JSON.parse(fileAccessResponse));
}

generateFiveRandomColors();

