import { GoogleGenerativeAI } from "@google/generative-ai";
import { task } from "@/Types/tasks.js";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_AI || "");
const model = genAi.getGenerativeModel(
  { model: "gemini-flash-latest" },
  { apiVersion: "v1beta" },
);

export const generateDailyFocus = async (tasks: task[]): Promise<string> => {
  if (tasks.length === 0) {
    return "You have no Task for today";
  }

  const taskList = tasks
    .map(
      (t, i) => `${i + 1}. 
    Title: ${t.title},
    Description: ${t.description},
    Priority: ${t.priority},
    Status: ${t.status}
    Due: ${new Date(t.due_date).toDateString()}
    `,
    )
    .join("\n\n");

  const prompt = `You are a Productivity assitance for a task management app.
    
    The User has the following pending or In-progress due today or overdue:${taskList}
    
    Generate a focused daily briefing for the user and include:
    - A one sentence motivational opener (keep it short genuine, not cheesy)
    - A prioritized list of what they should focus on today and why
    - A short closing note if any tasks are overdue

    Keep the tone professional and friendly. Be concise and actionable.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.log("Error generating daily focus", error);
    throw error;
  }
};
