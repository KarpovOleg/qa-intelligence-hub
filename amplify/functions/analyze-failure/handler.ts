import type { Schema } from "../../data/resource";

export const handler: Schema["analyzeFailure"]["functionHandler"] = async (event) => {
  const log = event.arguments.errorLog || "";

  // CloudWatch logs
  console.log("Analyzing log:", log);

  let insight = "AI Analysis: General framework error detected.";

  if (log.includes('Timeout')) {
    insight = "AI Analysis: Target element was not found within the timeout period. Suggest increasing 'actionTimeout' or checking if the page loaded correctly.";
  } else if (log.includes('Target closed')) {
    insight = "AI Analysis: The browser context was destroyed. This usually indicates a crash or a navigation conflict.";
  }

  return insight;
};
