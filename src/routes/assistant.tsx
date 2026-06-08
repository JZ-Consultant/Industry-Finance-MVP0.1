import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BuildingStatusBanner } from "@/components/workbench/ModuleStatusBadge";
import { FutureStructureCards } from "@/components/workbench/FutureStructureCards";
import { ModulePageHeader } from "@/components/workbench/ModulePageHeader";
import { getModuleById } from "@/config/workbenchModules";

const moduleDef = getModuleById("assistant")!;

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "产业金融AI助手 · 产业金融知识资产工作台" },
      {
        name: "description",
        content: moduleDef.description,
      },
    ],
  }),
  component: AssistantPage,
});

const examples = [
  "请为某动力电池企业生成客户画像与拜访提纲。",
  "结合信审评估标准，列出该企业的授信关注点。",
  "基于客群营销指引，输出一份综合金融方案建议。",
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
      <ModulePageHeader
        eyebrow={moduleDef.eyebrow}
        title="产业金融AI助手"
        subtitle="基于目标企业名单、客群营销指引、信审评估标准、企业尽调模板与领先同业成功案例等知识资产，生成客户画像、拜访提纲、授信关注点和综合金融方案。"
      />

      <BuildingStatusBanner />

      <section className="space-y-4">
        <div className="border-b border-border pb-2">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            联动能力（规划中）
          </h2>
        </div>
        <FutureStructureCards items={moduleDef.futureStructure} />
      </section>

      <div className="border border-border bg-card">
        <div className="border-b border-border bg-muted/40 px-5 py-2.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          提问输入
        </div>
        <div className="space-y-3 p-4">
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="请输入产业金融相关问题，例如：请结合该企业所属客群输出拜访提纲与授信关注点。"
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
        <div className="grid gap-3 md:grid-cols-3">
          {examples.map((example) => (
            <button
              key={example}
              onClick={() => setQuestion(example)}
              className="rounded-sm border border-border bg-card p-4 text-left text-sm leading-relaxed text-foreground transition-colors hover:bg-muted/40"
            >
              {example}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          模拟回答
        </div>
        <div className="rounded-sm border border-dashed border-border bg-muted/20 p-5">
          {submitted ? (
            <div className="space-y-3">
              <p className="text-sm text-foreground">
                <span className="font-medium">您的问题：</span>
                {submitted}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                后续将接入 AI
                问答能力，联动目标企业名单、客群营销指引、信审评估标准、企业尽调模板与同业成功案例，为客户经理与审批人员生成结构化的客户画像、拜访提纲、授信关注点和综合金融方案。
              </p>
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-muted-foreground">
              演示占位：请在上方输入问题或点击示例问题体验交互流程。
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
