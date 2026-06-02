import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI 助手 · 产业金融工作台" },
      {
        name: "description",
        content: "基于产业金融知识资产的智能问答助手（演示版）。",
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
    <div className="mx-auto max-w-4xl space-y-6 px-8 py-10">
      <header className="space-y-2 border-b border-border pb-6">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-px w-6 bg-[var(--gold)]" />
          知识资产 · 智能问答
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          产业金融 AI 助手
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          基于本工作台沉淀的产业研究、目标客群、营销手册与信审框架构建的智能问答能力，辅助客户经理与审批人员形成经营策略闭环（演示占位）。
        </p>
      </header>

      <div className="border border-border bg-card">
        <div className="border-b border-border bg-muted/40 px-5 py-2.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          提问输入
        </div>
        <div className="space-y-3 p-4">
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="请输入你想了解的产业金融问题，例如：这类企业适合推荐哪些银行产品？"
            className="min-h-[110px] resize-none rounded-sm border-border shadow-none focus-visible:ring-1"
          />
          <div className="flex justify-end">
            <Button onClick={handleSend} size="sm" className="rounded-sm">
              <Send className="h-4 w-4" /> 提交问题
            </Button>
          </div>
        </div>
      </div>

      <section className="space-y-3">
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          示例问题
        </div>
        <div className="grid gap-px bg-border md:grid-cols-3">
          {examples.map((e) => (
            <button
              key={e}
              onClick={() => setQuestion(e)}
              className="bg-card p-4 text-left text-sm leading-relaxed text-foreground transition-colors hover:bg-muted/40"
            >
              {e}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          模拟回答
        </div>
        <div className="border border-dashed border-border bg-muted/20 p-5">
          {submitted ? (
            <div className="space-y-3">
              <p className="text-sm text-foreground">
                <span className="font-medium">您的问题：</span>
                {submitted}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                后续将接入基于知识资产的 AI 问答能力，结合产业研究、目标客群、营销手册与信审框架，为客户经理与审批人员生成结构化的产业链机会判断、营销切入建议与风险识别要点。
              </p>
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-muted-foreground">
              后续将接入基于知识资产的 AI 问答能力。请在上方输入问题或点击示例问题进行体验。
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
