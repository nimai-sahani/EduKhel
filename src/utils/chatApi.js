// import OpenAI from "openai";

// const client = new OpenAI({
//   apiKey: import.meta.env.VITE_OPENAI_API_KEY, // .env file me rakho
//   dangerouslyAllowBrowser: true, // client-side se test karne ke liye
// });

// export async function askEduBot(message) {
//   try {
//     const response = await client.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "system", content: "You are EduBot, a friendly AI guide for learning and games." },
//                  { role: "user", content: message }],
//     });

//     return response.choices[0].message.content;
//   } catch (error) {
//     console.error("EduBot error:", error);
//     return "⚠️ Sorry, I’m having trouble connecting right now.";
//   }
// }
