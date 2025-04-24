// Version history
//
// 1.0.0 - Basic version that takes three parameters from the command line, performs a Word Error Rate (WER) calculation and saves the result into the flat file database.  

// Load required modules

const fs = require('fs');
const path = require('path');
const FlatDB = require('flat-db');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

try {
    // Check the command line parameters: none required

    var commandLine = null;

    if (process.argv.slice()[0].toLowerCase().indexOf("node.exe") != -1) {
        commandLine = process.argv.slice(2);
    }
    else {
        commandLine = process.argv.slice(1);
    }

    // Configure path to storage dir 

    FlatDB.configure({
        dir: '../../Data',
    });

    // Create the scoring DB schema

    const Scores = new FlatDB.Collection('scores', {
        dataset: '',
        key: '',
        service: '',
        duration: 0,
        wer: 0.0,
    });

    // Create the CSV object

    const csvWriter = createCsvWriter({
        path: '../../Data/scores.csv',
        header: [
            { id: 'dataset', title: 'Dataset' },
            { id: 'key', title: 'Key' },
            { id: 'service', title: 'Service' },
            { id: 'duration', title: 'Duration' },
            { id: 'wer', title: 'WER' }
        ]
    });

    // Load all of the stored results.

    var allResults = Scores.find().run();
    var csvResults = [];

    allResults.forEach(Result => {
        csvResults.push({
            dataset: Result.dataset,
            key: Result.key,
            service: Result.service,
            duration: Result.duration,
            wer: Result.wer,
        });
    });

    csvWriter.writeRecords(csvResults)       // returns a promise
        .then(() => {
            console.log('Scores saved to CSV');
        });
}
catch (error) {
    console.log(error.message);
}