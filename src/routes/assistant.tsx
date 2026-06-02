import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI 助手 · 产业金融工作台" },
      {
        name: "description",
        content: "基于产业金融知识资产的 AI 问答助手（占位演示）。",
      },
    ],
  }),
  component: AssistantPage,
});

const examples = [
  "汽车热管理企业的信审关注点是什么？",
  "客户经理拜访智能座舱企业应该问哪些问题？",
  "如何判断一家汽车电子企业是否适合重点营销？",
];

function AssistantPage() {
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  function handleSend() {
    if (!question.trim()) return;
    setSubmitted(question.trim());
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-6 py-10">
      <header className="space-y-2 border-b pb-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          AI 助手
        </p>
        <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
          <Sparkles className="h-5 w-5 text-primary" />
          产业金融 AI 助手
        </h1>
        <p className="text-sm text-muted-foreground">
          基于本工作台的行业研究、目标客户、营销手册与信审框架构建的智能问答能力（占位演示）。
        </p>
      </header>

      <Card className="border-border/70">
        <CardContent className="space-y-3 p-4">
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="请输入你想了解的产业金融问题，例如：这类企业适合推荐哪些银行产品？"
            className="min-h-[100px] resize-none border-0 shadow-none focus-visible:ring-0"
          />
          <div className="flex justify-end">
            <Button onClick={handleSend} size="sm">
              <Send className="h-4 w-4" /> 发送
            </Button>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          示例问题
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {examples.map((e) => (
            <button
              key={e}
              onClick={() => setQuestion(e)}
              className="rounded-md border bg-card p-4 text-left text-sm leading-relaxed text-foreground transition-colors hover:border-primary/40 hover:bg-muted/40"
            >
              {e}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          模拟回答
        </div>
        <Card className="border-dashed bg-muted/30">
          <CardContent className="space-y-3 p-5">
            {submitted ? (
              <>
                <p className="text-sm text-foreground">
                  <span className="font-medium">您的问题：</span>
                  {submitted}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  后续将接入基于知识资产的 AI 问答能力，结合行业研究、目标客户名单、营销手册与信审框架，为您生成结构化建议。
                </p>
              </>
            ) : (
              <p className="text-sm leading-relaxed text-muted-foreground">
                后续将接入基于知识资产的 AI 问答能力。请在上方输入问题或点击示例问题进行体验。
              </p>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
