import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import img from "../nlp.jpeg"
const url = process.env.REACT_APP_BACKEND+"/api/user/login";
const theme = createTheme();
export default function MainPage() {
  

  return (
   <>
       
       
    
        <Typography variant="h3"><b>What is Natural Language Programming</b></Typography>  
        <Typography>
        Natural language processing (NLP) refers to the branch of computer science—and more specifically, the branch of artificial intelligence or AI—concerned with giving computers the ability to understand text and spoken words in much the same way human beings can.

NLP combines computational linguistics—rule-based modeling of human language—with statistical, machine learning, and deep learning models. Together, these technologies enable computers to process human language in the form of text or voice data and to ‘understand’ its full meaning, complete with the speaker or writer’s intent and sentiment.

NLP drives computer programs that translate text from one language to another, respond to spoken commands, and summarize large volumes of text rapidly—even in real time. There’s a good chance you’ve interacted with NLP in the form of voice-operated GPS systems, digital assistants, speech-to-text dictation software, customer service chatbots, and other consumer conveniences. But NLP also plays a growing role in enterprise solutions that help streamline business operations, increase employee productivity, and simplify mission-critical business processes.

            </Typography>
            <Typography>
            <b>Speech recognition,</b> <br/>also called speech-to-text, is the task of reliably converting voice data into text data. Speech recognition is required for any application that follows voice commands or answers spoken questions. What makes speech recognition especially challenging is the way people talk—quickly, slurring words together, with varying emphasis and intonation, in different accents, and often using incorrect grammar.
            <br/><b>Part of speech tagging,</b> <br/> also called grammatical tagging, is the process of determining the part of speech of a particular word or piece of text based on its use and context. Part of speech identifies ‘make’ as a verb in ‘I can make a paper plane,’ and as a noun in ‘What make of car do you own?’
            <img src={img} width="400px"/>
            <br/><b>Word sense disambiguation</b> <br/> is the selection of the meaning of a word with multiple meanings  through a process of semantic analysis that determine the word that makes the most sense in the given context. For example, word sense disambiguation helps distinguish the meaning of the verb 'make' in ‘make the grade’ (achieve) vs. ‘make a bet’ (place).
            <br/><b>Named entity recognition,</b> <br/> or NEM, identifies words or phrases as useful entities. NEM identifies ‘Kentucky’ as a location or ‘Fred’ as a man's name.
            <br/><b>Co-reference resolution</b> <br/> is the task of identifying if and when two words refer to the same entity. The most common example is determining the person or object to which a certain pronoun refers (e.g., ‘she’ = ‘Mary’),  but it can also involve identifying a metaphor or an idiom in the text  (e.g., an instance in which 'bear' isn't an animal but a large hairy person).
            <br/><b>Sentiment analysis </b> <br/>attempts to extract subjective qualities—attitudes, emotions, sarcasm, confusion, suspicion—from text.
            <br/><b>Natural language generation </b> <br/>is sometimes described as the opposite of speech recognition or speech-to-text; it's the task of putting structured information into human language. 
            </Typography>
            </>
     
    
  );
}