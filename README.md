
# Open Accuracy Testing

## A project for testing and scoring the accuracy of cloud based speech transcription services

#### <span style="color:green">There are currently <span style="color:blue">***6***</span> services being tested against <span style="color:blue">***35***</span> samples, grouped into <span style="color:blue">***4***</span> datasets.</span>

#### Synopis

*“Yet another article about automated transcription accuracy that put’s
the company writing it, on top”* you might say to yourself. And, yes,
technically you would be right. But we here at
[3Scribe](https://3scri.be) wanted to go a little further then just
writing a glorified press release so we decided to produce a testing
framework. An open source series of small Node and R based apps, that
will take a large number of outputs from multiple transcription services
and to score them on multiple metrics. Those scores will then be used to
automatically update a series of reports such as the values you see in
this README file. In the interests of transparency, all the test files,
transcripts and apps are available. We, and hopefully other voice
researchers, will continue to add more samples to the repository and if
you have samples you think should be part of the tests and would like to
be involved, please reach out to us. So, without further ado, here is
the current standings in the accuracy leader-board:

| DisplayName    | Samples |   WER |
|:---------------|--------:|------:|
| 3Scribe        |      34 |  8.95 |
| OpenAI Whisper |      34 |  9.67 |
| AWS Transcribe |      32 | 11.30 |
| Speechmatics   |      33 | 13.37 |
| Deepgram       |      34 | 16.12 |
| Google Cloud   |      34 | 19.19 |

Now I’m not sure if 3Scribe will be at the top of that leader-board when
you read this. But if we’re not, you can believe we’re working hard on
our engine to squeeze an extra few percentage points of accuracy out of
it and to get back on top. Because that’s what matters to us, delivering
the most accurate transcript. And if we are on top, then why not [create
an account](https://3scri.be/register) and try us out with 100 minutes
of free credit.

Eddie Gahan  
CEO, [3Scribe](https://3scri.be)

#### What it measures

Initially we’ll just be testing on a single metric, the global standard:
***Word Error Rate (WER)***. It has some faults but it’s an accepted
standard so we’ll run with it. One advantage is that we were able to use
open source Node packages in our scoring app that perform the
calculation so not only did we save ourselves the hassle of coding the
calculation but we can remove any bias from the process.

Word Error Rate is calculated by comparing a reference transcript, the
one that’s 100% accurate, to the test transcript, in this case the
outputs from the different engines. When comparing, three values are
sought:

1.  The number of **Substitutions**. When the test engine has replaced a
    word with an incorrect word i.e. *Goose* instead of *loose*. Or
    *They’re* instead of *Their*.
2.  The number of **Insertions**. When the test engine has added an
    additional word e.g. *Two more* instead of *Tomorrow*.
3.  The number of **Deletions**. When the test engine has removed a word
    that was specified in the reference e.g. *You need to go to home*
    instead of *You need to go to the home*.

We then add the three values up and divide them by the total number of
words in the reference transcript to get the WER.

Moving on from WER we want to add in extra metrics. We’re only testing
English transcription at the moment so adding datasets in other
languages is on the cards. This
[article](https://www.biometricupdate.com/202101/speaker-id-is-the-sleeper-biometric-function-speech-apps-need-to-nail)
recently made a very good point regarding speaker diarization so we’ll
be adding that in to our scoring app once we’ve uploaded all of the test
samples on hand. Number formats and punctation will also be on the list
but they can stray into the subjective realm. To Oxford comma or not
Oxford comma? That is the question. Breaking down the scores and
analysing the samples by accent, gender and race is also highly
important. There’s a horrible [hidden
bias](https://news.stanford.edu/2020/03/23/automated-speech-recognition-less-accurate-blacks/)
being built in to ASR systems and on-going monitoring to see how
companies are addressing it is a duty that we must all work to fulfill.

#### Who it tests

Ourselves obvs. But for the others, we’re picking companies that provide
an automated transcription service, are cloud based, have an accessible
API and are available for anyone to sign up to. That may raise a
question or two about why such-and-such company wasn’t tested but
there’s usually a good reason. For example:
[Descript](https://descript.com). They’re concentrating on building a
media editing product and buy in their transcript from a 3rd party.
Similarly, [HappyScribe](https://www.happyscribe.com/) also appear to
use an underlying service. [Verbit](https://verbit.ai) doesn’t offer a
public sign-up page and [Otter](https://otter.ai) doesn’t have a public
API. That still leaves us with the following companies:

- [3Scribe](https://3Scri.be)
- [AWS Transcribe](https://aws.amazon.com/transcribe/)
- [AssenblyAI](https://www.assemblyai.com/)
- [Speechmatics](https://speechmatics.com)
- [Microsoft Cognitive
  Services](https://azure.microsoft.com/en-us/services/cognitive-services/speech-to-text/)
- [Google Cloud](https://cloud.google.com/speech-to-text)
- [IBM Watson](https://www.ibm.com/ie-en/marketplace/speech-to-text)
- [Deepgram](https://deepgram.com/)
- [OpenAI Whisper](https://openai.com/index/whisper/)
- [ElevenLabs](https://elevenlabs.io/)
- [Oracle Cloud Infrastructure](https://www.oracle.com/cloud/)

<!-- end of list -->

so we’ve a good few we can test and if you’re a new start-up who wants
to be included in this testing please do reach out to us. You see, we’re
that confident about how accurate our engine is, that we’re quite happy
to add more and more services. We’re still pretty sure we’ll be at the
top, the test files, transcripts and scoring are all open for review and
we’re committed to making this as transparent a process as possible.

#### What samples it uses

There are some standard sets of data such as LibriVoice and ClearVoice
that are used to train speech to text services and we do include them in
our test sets. However, we’re not a great fan of them for scoring
because they’re just short, simple, clearly recorded samples and don’t
really tax a service too much. So, in addition to those sets, we’ve
tried to include samples that challenge; samples that have been used by
other writers in their articles measuring ASR accuracy; samples that are
used as tests to hire manual transcribers and samples that are of poor
quality such as phone call recordings. Currently we have 35 samples
grouped into 4 different datasets. We’ve stored the audio files in a
separate GitHub repo, to reduce the strain on the automated action
having to check them out, and that repo can be found
[here](https://github.com/3Scribe/OpenAccuracyTesting-Files). The repos
README.md file contains details about each of the datasets but here is a
quick summary:

| Name                | Description & Source                                                                                                      | Samples |        Duration (seconds) |
|:--------------------|:--------------------------------------------------------------------------------------------------------------------------|--------:|--------------------------:|
| **Magellan**        | Example call recordings created by the outsourcing company Magellan Solutions                                             |       4 | 21 minutes and 10 seconds |
|                     | **Source:<https://www.magellan-solutions.com/resources/sample-recordings/>**                                              |         |                           |
| **PopupPodcasting** | Two small clips used in a comparision article by the company PopupPodcasting                                              |       2 |  10 minutes and 2 seconds |
|                     | **Source:<https://popuppodcasting.ca/blog/automatic-transcription-services-compared>**                                    |         |                           |
| **Rev**             | Tests used by the transcription company Rev.com to test people applying for a manual transcriber position.                |       1 |  2 minutes and 37 seconds |
|                     | **Source:**                                                                                                               |         |                           |
| **VoiceLogic**      | A collection of recorded phone calls used to demonstrate the capabilities of a voice marketing company called VoiceLogic. |      28 | 18 minutes and 27 seconds |
|                     | **Source:<https://voicelogic.com/samples/>**                                                                              |         |                           |

#### Automation

In this repo you’ll see a number of sub-directories. One, *Transcripts*
contains the reference and test texts for each of the sample files we’re
using. The transcripts are stored in a simple JSON format as we need to
additional information such as speaker identification, duration, accents
etc. The README in the directory will contain more detailed information
about the structure. The second sub-directory, *Apps* contains the Node
and R files that perform the scoring and report building. When new
transcript files or changes to the R Markdown files are uploaded, a
GitHub action is triggered to score every transcript that has a
reference file, to store the results in a flat file database (in the
Data sub-directory) and to flatten the data into a .csv file for use in
the R files. Once the data is flattened, the action process any R
Markdown scripts to refresh stats reports in this repo. This very README
file is an example of one of those reports. Wherever you see statistics
in this text, such as the leader-board or the Datasets list, that
information is auto-generated. Checkout the README files in each of the
app folders for more information.

#### Future

The future is More. More samples, more languages, more services and more
metrics. This is very much a living project for us here at
[3Scribe](https://3scri.be) and we’re committed to continually adding
new data and features. We also will be inviting independent members of
the Voice community to come on board and help curate the sample sets but
if you think there’s samples that we should be using, or services we
should be testing then please reach out to us.

#### Attributions

**Test Files**

A Big Thanks to [VoiceLogic](https://www.voicelogic.com) and
[Descript](https://descript.com) for giving us the go ahead to use their
samples.

**Code Libraries**

It’s highly important to always give credit where credit is due,
especially when programming in Node. That NPM command makes life so much
easier so a shout out to the following packages that we use in the
scoring apps:

[Word-Error-Rate](https://github.com/ryanvolum/word-error-rate). No
point reinventing the wheel so if there’s an excellent library for
taking two texts and calculating the WER, let’s use that. As it’s
independent and open-source there’s no bias in us building our own.

[Flat-db](https://github.com/ndaidong/flat-db). A JSON based flat file
database that we use for storing the scores generated. As we’re going to
be constantly adding transcripts it helps to keep things ordered before
writing to:

[CSV-Writer](https://github.com/ryu1kn/csv-writer). Part of our process
is to use R to create the metrics seen in this very README file and
using CSV files as the data sources just makes things easier. That’s
why, after every scoring run we flatten the data and push it out to
scores.csv using this package.

**Bibliography**

[Speaker ID is the sleeper biometric function speech apps need to
nail](https://www.biometricupdate.com/202101/speaker-id-is-the-sleeper-biometric-function-speech-apps-need-to-nail).
Jim Nash, January 26th 2021.

[Stanford researchers find that automated speech recognition is more
likely to misinterpret black
speakers](https://news.stanford.edu/2020/03/23/automated-speech-recognition-less-accurate-blacks/).
Stanford News, March 23rd 2020.
