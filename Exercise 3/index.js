import http from 'http';
import ora from 'ora';
import validator from 'validator';

function timeout() {
    return new Promise((resolve, reject) => {
        const spinner = ora('Loading unicorns').start();
        try {
            setTimeout(() => {
                resolve(spinner.color = 'green');
                resolve(spinner.text = 'Loading stars');
                resolve(spinner.suffixText = 'Suffix Text');
                resolve(spinner.prefixText = 'Prefix Text');
                resolve(spinner.indent = 5);
            }, 5000);
        }
        catch(e) {
            reject(console.log("Some error!!"));
        }
    });
}

async function validatingDetails() {
    //isEmail()
    console.log("Is sowdesh@gmail.com an email: "+validator.isEmail('sowdesh@gmail.com'));
    console.log("Is sowdesh_gmail.com an email: "+validator.isEmail('sowdesh_gmail.com'));

    //equals()
    console.log("Are  Sowdesh and sowdesh equal: "+validator.equals('Sowdesh','sowdesh'));
    console.log("Are  Sowdesh and Sowdesh equal: "+validator.equals('Sowdesh','Sowdesh'));

    //isAlpha()
    console.log("Is A an alphabet: "+validator.isAlpha('A'));
    console.log("Is 7 an alphabet: "+validator.isAlpha('7'));

    //contains()
    console.log("Does 'StrIng' contains 'ing' ignoring case: "+validator.contains("StrIng","ing",{ignoreCase: true}));
    console.log("Does 'StrIng' contains 'ing' without ignoring case: "+validator.contains("StrIng","ing",{ignoreCase: false}));

    //isStrongPassword()
    console.log("Is Uhshs726$ a strong password: "+validator.isStrongPassword("Uhshs726$"));
    console.log("Is hshs726$ a strong password: "+validator.isStrongPassword("hshs726$"));

    let data = await timeout();
}
validatingDetails();


