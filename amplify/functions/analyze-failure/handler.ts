import {
  BedrockRuntimeClient,
  ConverseCommand,
  type ContentBlock,
} from "@aws-sdk/client-bedrock-runtime";
import type { Schema } from "../../data/resource";

const region = process.env.AWS_REGION ?? process.env.AWS_DEFAULT_REGION ?? "ap-southeast-2";
const modelId = process.env.BEDROCK_MODEL_ID?.trim();
const bedrockClient = modelId ? new BedrockRuntimeClient({ region }) : null;

const fallbackInsight = (log: string): string => {
  if (log.includes("Timeout")) {
    return "AI Analysis: Target element was not found within the timeout period. Suggest increasing actionTimeout or checking whether the page finished loading before interacting.";
  }

  if (log.includes("Target closed")) {
    return "AI Analysis: The browser context was destroyed. This usually points to a crash, an unexpected navigation, or the page closing before the interaction finished.";
  }

  return "AI Analysis: General framework error detected. Review the stack trace and recent UI changes to separate test fragility from an application regression.";
};

const extractText = (content: ContentBlock[] | undefined): string | null => {
  if (!content) {
    return null;
  }

  const text = content
    .flatMap((block) => ("text" in block ? [block.text] : []))
    .join("\n")
    .trim();

  return text.length > 0 ? text : null;
};

const formatInsight = (insight: string): string =>
  insight.startsWith("AI Analysis:") ? insight : `AI Analysis: ${insight}`;

export const handler: Schema["analyzeFailure"]["functionHandler"] = async (event) => {
  const log = event.arguments.errorLog?.trim() ?? "";

  if (!log) {
    return "AI Analysis: No error log was provided for analysis.";
  }

  console.log("Analyzing log", {
    region,
    hasModelId: Boolean(modelId),
  });

  if (!bedrockClient || !modelId) {
    console.warn("BEDROCK_MODEL_ID is not configured. Using heuristic fallback.");
    return fallbackInsight(log);
  }

  try {
    const response = await bedrockClient.send(
      new ConverseCommand({
        modelId,
        system: [
          {
            text: "You are a senior QA engineer analyzing Playwright test failures. Explain the most likely root cause and give one or two concise next steps. Keep the response under 80 words and return plain text only.",
          },
        ],
        messages: [
          {
            role: "user",
            content: [
              {
                text: [
                  "Analyze this Playwright failure log.",
                  "Prioritize whether it looks like a selector issue, timing issue, navigation issue, test-data issue, or a genuine application regression.",
                  "",
                  log,
                ].join("\n"),
              },
            ],
          },
        ],
        inferenceConfig: {
          maxTokens: 300,
          temperature: 0.2,
        },
      }),
    );

    const insight = extractText(response.output?.message?.content);

    if (!insight) {
      console.warn("Bedrock returned no text content. Using heuristic fallback.");
      return fallbackInsight(log);
    }

    return formatInsight(insight);
  } catch (error) {
    console.error("Bedrock analysis failed. Using heuristic fallback.", error);
    return fallbackInsight(log);
  }
};
