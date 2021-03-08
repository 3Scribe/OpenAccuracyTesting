
# Open Accuracy Testing

## A project for testing and scoring the accuracy of cloud based speech transcription services

#### <span style="color:green">There are currently <span style="color:blue">***8***</span> services being tested against <span style="color:blue">***12***</span> samples, grouped into <span style="color:blue">***1***</span> corpus.</span>

#### Synopis

#### What it measures

#### Who it tests

  - [3Scribe](https://3scri.be)
  - [AWS Transcribe](https://aws.amazon.com/transcribe/)
  - [AssenblyAI](https://www.assemblyai.com/)
  - [Speechmatics](https://speechmatics.com)
  - [RevAI](https://www.rev.ai/)
  - [Microsoft Cognitive
    Services](https://azure.microsoft.com/en-us/services/cognitive-services/speech-to-text/)
  - [Google Cloud](https://cloud.google.com/speech-to-text)
  - [IBM Watson](https://www.ibm.com/ie-en/marketplace/speech-to-text)

<!-- end of list -->

#### What samples it uses

There are some standard sets of data such as LibriVoice and ClearVoice
that are used to train speech to text services and we do include them in
our test sets. However, we’re not a great fan of them for scoring
because they’re just short, simple, clearly recorded samples and don’t
really tax a service too much. So, in addition to those sets, we’ve
tried to include samples that challenge, samples that have been used by
other writers in their articles measuring ASR accuracy, samples that are
used as tests to hire manual transcribers and samples that are of poor
quality such as phone call recordings. Currently we have 12 samples
grouped into 1 different corpus. We’ve stored the audio files in a
separate GitHub repo, to reduce the strain on the automated action
having to check them out, and the repo can be found
[https://github.com/3Scribe/OpenAccuracyTestFiles](here). The repos
README.md file contains details about each of the corpus but here is a
quick summary:

| Name      | Description                                                                                                                                                                                                                            | Source                            | Samples |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------- | ------: |
| **RCast** | A collection of recorded phone calls used to demonstrate the capabilities of a voice marketing company called VoiceLogic. N.B. This corpus will be renamed to VoiceLogic once samples that showcase their other services are imported. | <https://voicelogic.com/samples/> |      12 |

#### Automation

#### Future

#### Attributions

| DisplayName    | Samples |  WER |
| :------------- | ------: | ---: |
| 3Scribe        |      12 | 12.1 |
| AWS Transcribe |      12 | 14.9 |
| AssenblyAI     |      12 | 19.9 |
| Speechmatics   |      12 | 21.9 |
| RevAI          |      12 | 24.6 |

<https://github.com/ndaidong/flat-db>

<https://github.com/ryanvolum/word-error-rate>

<https://github.com/ryu1kn/csv-writer>
