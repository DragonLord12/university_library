import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as UpstashClient, resend } from "@upstash/qstash";
import config from "./config";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

export const qstashClient = new UpstashClient({
  token: config.env.upstash.qstashToken
});

export const sendEmail = async ({ email, subject, message }: { email: string; subject: string; message: string; }) => {
  await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resendToken })
    },
    body: {
      from: "Nicholas Tooley <hello.nicholastooley.com>",
      to: [email],
      subject,
      html: message
    }
  }) 
}