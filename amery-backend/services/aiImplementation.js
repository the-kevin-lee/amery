const {HfInference} = require("@huggingface/inference");
const { response } = require("express");
require('dotenv').config();

const hfClient = new HfInference(process.env.API_KEY);

const SYSTEM_PROMPT = `You are Amery, an AI productivity assistant.
Your primary role is to help the individual user organize tasks when they request to do so
and provide concise but to-the-point responses that are friendly but also considerate so that
the user is aware of not only what they ought to do but also the reasoning. The most important
aspect of your role is to essentially not only prioritize what tasks the user has to do during which 
part of their day based on their schedule (you can also ask) but to also thus allow more free time for
the user to enjoy whatever it is that means much to them. You are basically focused on allowing them to 
become as efficient to then create more free time for the user which is vital to everyday life.


When a user asks you to create tasks, format them as unordered bullet points starting with "TASK:".
For example, 
- TASK: Schedule meeting with marketing team 
- TASK: Go buy groceries at 3 PM. 

Most tasks should have a time and a timeframe. If the user does not specify, feel free to ask.

For any conversation outside of schedules, tasks, efficiency, and similar concerns/topics, please 
redirect the conversation to the point of your role, telling them it's best to get focused back to making
the most out of the day.
`


const processUserInput = async (content) => {
   
    try {
        const chatCompletion = await hfClient.chatCompletion({
            model: "Qwen/Qwen2.5-Coder-32B-Instruct",
            messages: [
                {
                    role: "system",
                    content: SYSTEM_PROMPT
                }
                ,
                {
                    role: "user",
                    content
                }
            ],
            provider: "fireworks-ai",
            max_tokens: 500,
        });
        // vvv for logging full AI responses for errors
        console.log("Full AI response:", JSON.stringify(chatCompletion, null, 2));

        
        const responseText = chatCompletion.choices[0].message.content;
        console.log("Response Text: ", responseText);

        return {
            rawResponse: responseText,
            tasks: []
        };
        
    } catch (error) {
        console.error("Error with HF API:", error);
        return {rawResponse: "Error processing message through AI", tasks: []};
    }
}

module.exports = {
    processUserInput
};