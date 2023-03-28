import http from 'http';
import ora from 'ora';

http.createServer((req, res, err) => {
    res.write("Sirius... A CDW Company...");

    const spinner = ora('Loading unicorns').start();

    setTimeout(() => {
        spinner.color = 'green';
        spinner.text = 'Loading stars';
        spinner.suffixText = 'Suffix Text';
        spinner.prefixText = 'Prefix Text';
        spinner.indent = 5;
    }, 5000);

    res.end();
}).listen(4000);
