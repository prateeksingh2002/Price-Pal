// const express = require('express')
// const app = express()
// let temp = 0;
// let runPy = new Promise(function(success, nosuccess) {

//     const { spawn } = require('child_process');
//     const pyprog = spawn('python', ['./PricePrediction.py', temp ]);

//     pyprog.stdout.on('data', function(data) {

//         success(data);
//     });

//     pyprog.stderr.on('data', (data) => {

//         nosuccess(data);
//     });
// });

// app.get('/prediction/:input', async(req, res) => {
    
//     res.write('welcome\n');
//     temp = req.params.input;
//     console.log(temp);
//     // runPy.then(function(fromRunpy) {
//     //     console.log(fromRunpy.toString());
//     //     res.end(fromRunpy);
//     // }).catch(function(err) {

//     // });
// })

// app.listen(9000, () => console.log('Application listening on port 9000!'))


const express = require('express')
const app = express()

const { spawn } = require('child_process');

app.get('/prediction/:input', async (req, res) => {
    // Get the input from the query parameter
    const userInput = req.params.input;

    console.log(userInput)
    

    // Spawn the Python process with the argument
    const pyprog =spawn('python', ['./PricePrediction.py', userInput]);

    pyprog.stdout.on('data', function(data) {
        const output = data.toString();
        console.log(output);
        
    });

    pyprog.stderr.on('data', (data) => {
        const error = data.toString();
        console.error(error);
        res.status(500).send(error);
    });
})

app.listen(8000, () => console.log('Application listening on port 9000!'))








