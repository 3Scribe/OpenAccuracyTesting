// Version history
//
// 1.0.0 - Basic version that takes three parameters from the command line, performs a Word Error Rate (WER) calculation and saves the result into the flat file database.  The transcripts to be compared are simple text files with more detailed transcripts to be added as JSON files in later versions.
// 1.1.0 - Changed to accept basic JSON files.
// 2.0.0 - Added the collate function to gather all scores and output to a .csv for use with R scripts

// Load required modules

const fs = require('fs');
const path = require('path');
const FlatDB = require('flat-db');
const WERScore = require("word-error-rate");
const { rootCertificates } = require('tls');

const serviceList = ["3scribe", "assemblyai", "aws", "google", "ibm", "microsoft", "whisper", "speechmatics", "deepgram", "elevenlabs"];

try {
    // Check the command line parameters: 4 (Removing the first 2 if the app was invocated via 'node .' or first param if installed )
    // 
    // The application requires three paramters: 
    //      The transcription service that produced the output transcript
    //      The datasets the file belongs to
    //      The reference transcript location
    //      The output transcript from the service being tested

    var commandLine = null;
    var processList = [];

    if (process.argv.slice()[0].toLowerCase().indexOf("node") != -1) {
        commandLine = process.argv.slice(2);
    }
    else {
        commandLine = process.argv.slice(1);
    }

    // Correct amount of parameters

    if ((commandLine.length != 4 && commandLine.length != 1) || (commandLine.length == 1 && commandLine[0].toLowerCase() != "all")) {
        throw new Error("Invalid number of parameters");
    }

    // Create a list of files to be compared

    switch (commandLine.length) {

        case 1:
            // Request to score all of the transcripts stored in the transcriptions folder.  A sub-folder called Reference is used as the basis 

            if (fs.existsSync("../../Transcripts/Reference")) {

                // Get list of services that have a directory in the transcripts folder

                var serviceDirs = fs.readdirSync("../../Transcripts").filter(f => fs.statSync(path.join("../../Transcripts", f)).isDirectory());
                serviceDirs.splice(serviceDirs.indexOf("Reference"), 1);

                // Get a list of the Datasets sub-directories in the reference folder

                var datasetsDirs = fs.readdirSync("../../Transcripts/Reference").filter(f => fs.statSync(path.join("../../Transcripts/Reference", f)).isDirectory());

                datasetsDirs.map(datasets => {

                    // Get a list of each of the files in the datasets directory

                    var transcripts = fs.readdirSync(path.join("../../Transcripts/Reference", datasets)).filter(f => path.extname(f).toLowerCase() == ".json");

                    transcripts.map(reference => {

                        // For each file in the datasets directory, add a request to score to the array for each of the services, if and only if a service has a corresponding transcript.                            

                        serviceDirs.map(service => {
                            if (fs.existsSync(path.join("../../Transcripts", service, datasets, reference))) {
                                processList.push({
                                    dataset: datasets.toLowerCase(),
                                    keyName: path.parse(reference).name.toLowerCase(),
                                    service: service,
                                    referenceFile: path.join("../../Transcripts/Reference", datasets, reference),
                                    subjectFile: path.join("../../Transcripts", service, datasets, reference)
                                });                           
                            }
                        });
                    });
                });
            }
            else {
                console.log("No folder with reference transcripts found.");
                return;
            }

            break;

        case 4:
            // Single file with individual transcripts

            // Parameter 1 is the service name and must be part of this list (Lower case testing to make things easier)

            if (serviceList.indexOf(commandLine[0].toLowerCase()) == -1) {
                throw new Error("Service parameter is not a member of the current list: (3Scribe, AssemblyAI, AWS, Google, IBM, Microsoft, Deepgram, Speechmatics, Whisper, ElevenLabs)");
            }

            if (fs.existsSync(commandLine[2]) == false) {
                throw new Error("Reference transcript file does not exist");
            }

            if (fs.existsSync(commandLine[3]) == false) {
                throw new Error("Subject transcript file does not exist");
            }

            // Add to the list of files to be processed

            processList.push({
                dataset: commandLine[1].toLowerCase(),
                keyName: path.parse(commandLine[2]).name.toLowerCase(),
                service: commandLine[0].toLowerCase(),
                referenceFile: commandLine[2],
                subjectFile: commandLine[3]
            });
            break;
    }

    // Initialise the database object

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

    // Loop through the list of files to process and score each one

    while (processList.length > 0) {
        var targetFile = processList.pop();

        // Parameters are acceptable so load the reference and test transcripts and perform the WER scoring.

        var referenceData = JSON.parse(fs.readFileSync(targetFile.referenceFile, 'utf8'));
        var testData = JSON.parse(fs.readFileSync(targetFile.subjectFile, 'utf8'));

        var WER = WERScore.wordErrorRate(referenceData.Transcript.toLowerCase(), testData.Transcript.toLowerCase());

        // Store the result in the flat file database

        // Check to see if this combination of service, datasets and key has been saved before and update if it has.  Otherwise add a new row.

        var Results = Scores.find().matches("dataset", targetFile.dataset.toLowerCase()).matches("key", targetFile.keyName.toLowerCase()).matches("service", targetFile.service.toLowerCase()).run();

        // Add or update as necessary

        if (Results.length == 0) {
            Scores.add([{
                dataset: targetFile.dataset.toLowerCase(),
                key: targetFile.keyName.toLowerCase(),
                service: targetFile.service.toLowerCase(),
                duration: referenceData.Duration,
                wer: WER,
            }]);
        }
        else {
            Scores.update(Results[0]._id_, {
                dataset: targetFile.dataset.toLowerCase(),
                key: targetFile.keyName.toLowerCase(),
                service: targetFile.service.toLowerCase(),
                duration: referenceData.Duration,
                wer: WER,
            });
        }

        console.log(targetFile.service.toLowerCase() + "\t\t" + WER + "\t\t" + targetFile.keyName);
    }
}
catch (error) {
    console.log(error.message);
}