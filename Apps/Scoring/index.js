// Version history
//
// 1.0.0 - Basic version that takes three parameters from the command line, performs a Word Error Rate (WER) calculation and saves the result into the flat file database.  The transcripts to be compared are simple text files with more detailed transcripts to be added as JSON files in later versions.

// Load required modules

const fs = require('fs');
const path = require('path');
const FlatDB = require('flat-db');
const WERScore = require("word-error-rate");

try {
    // Check the command line parameters: 3 (Removing the first 2 as they are the 'node .' part of the invocation)
    // 
    // The application requires three paramters: 
    //      The transcription service that produced the output transcript
    //      The reference transcript location
    //      The output transcript from the service being tested

    var commandLine = process.argv.slice(2);

    // Correct amount of parameters

    if (commandLine.length != 3) {
        throw new Error("Invalid number of parameters");
    }

    // Parameter 1 is the service name and must be part of this list (Lower case testing to make things easier)

    if (["3scribe", "assemblyai", "aws", "google", "ibm", "microsoft", "revai", "speechmatics"].indexOf(commandLine[0].toLowerCase()) == -1) {
        throw new Error("Service parameter is not a member of the current list: (3Scribe, AssemblyAI, AWS, Google, IBM, Microsoft, RevAI, Speechmatics)");
    }

    if (fs.existsSync(commandLine[1]) == false) {
        throw new Error("Reference transcript file does not exist");
    }

    if (fs.existsSync(commandLine[2]) == false) {
        throw new Error("Subject transcript file does not exist");
    }

    // Parameters are acceptable so load the reference and test transcripts and perform the WER scoring.

    var keyName = path.parse(commandLine[1].toLowerCase()).name;

    var referenceTranscript = fs.readFileSync(commandLine[1], 'utf8');
    var testTranscript = fs.readFileSync(commandLine[2], 'utf8');

    var WER = WERScore.wordErrorRate(referenceTranscript, testTranscript);

    // Store the result in the flat file database

    // Configure path to storage dir 

    FlatDB.configure({
        dir: '../../Data',
    });

    // Create the scoring DB schema

    const Scores = new FlatDB.Collection('scores', {
        corpus: '',
        key: '',
        service: '',
        wer: 0.0,
    });

    var Results = Scores.find().matches("filename", "").matches("service", commandLine[0].toLowerCase()).run();

    // Add or update as necessary

    if (Results.length == 0) {
        Scores.add([{
            corpus: '',
            key: keyName,
            service: commandLine[0].toLowerCase(),
            wer: WER,
        }]);
    }
    else {
        Scores.update(Results[0]._id_, {
            corpus: '',
            key: keyName,
            service: commandLine[0].toLowerCase(),
            wer: WER,
        });
    }

    console.log("Score updated");
}
catch (error) {
    console.log(error.message);
}