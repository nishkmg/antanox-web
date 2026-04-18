"use client";

import { useState } from "react";
import Toggle from "@/components/ui/Toggle";
import Card from "@/components/ui/Card";
import styles from "./ArchitectureToggle.module.css";

const uiViewServices = [
  {
    title: "Design",
    description: "Strategic digital architecture aligned with business objectives and risk tolerance.",
  },
  {
    title: "Develop",
    description: "Full-stack implementation with security integrated at every layer.",
  },
  {
    title: "Secure",
    description: "Continuous monitoring through Antanox Pulse with quantified risk assessment.",
  },
];

const technicalViewServices = [
  {
    title: "digital_architecture",
    code: `client_requirements → [analysis_engine]
  └─ system_design → [architecture_doc]
  └─ dev_pipeline → [next.js | node | pg]
  └─ delivery → [branded_handoff]`,
    stack: "['Next.js', 'TypeScript', 'PostgreSQL']",
    quality: "{ lighthouse: 100, coverage: '>80%' }",
  },
  {
    title: "security_intelligence",
    code: `asset_discovery → [pulse_scanner]
  └─ threat_mapping → [mitre_attack]
  └─ risk_quantification → [ars_score]
  └─ continuous_monitoring → [real_time_alerts]`,
    stack: "['Python', 'Go', 'Elasticsearch']",
    quality: "{ vectors: 5, coverage: '100%' }",
  },
  {
    title: "wealth_interface",
    code: `data_ingestion → [market_feeds]
  └─ portfolio_engine → [xirr_calc]
  └─ analytics → [performance_metrics]
  └─ visualization → [custom_charts]`,
    stack: "['React', 'Node.js', 'Redis']",
    quality: "{ latency: '<50ms', uptime: '99.9%' }",
  },
];

export default function ArchitectureToggle() {
  const [showTechnical, setShowTechnical] = useState(false);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Technical Excellence</span>
          <h2 className={styles.title}>Proof, Not Pitch</h2>

          <div className={styles.toggle}>
            <span className={showTechnical ? styles.toggleLabelInactive : styles.toggleLabelActive}>
              UI View
            </span>
            <Toggle checked={showTechnical} onChange={(e) => setShowTechnical(e.target.checked)} />
            <span className={showTechnical ? styles.toggleLabelActive : styles.toggleLabelInactive}>
              Technical Blueprint
            </span>
          </div>
        </div>

        <div className={styles.grid}>
          {showTechnical
            ? technicalViewServices.map((service) => (
                <Card key={service.title} className={styles.codeCard}>
                  <div className={styles.codeHeader}>
                    <span className={styles.codeTitle}>{service.title}</span>
                  </div>
                  <pre className={styles.codeBlock}>
                    <code>{service.code}</code>
                  </pre>
                  <div className={styles.codeMeta}>
                    <span>stack: {service.stack}</span>
                    <span>quality: {service.quality}</span>
                  </div>
                </Card>
              ))
            : uiViewServices.map((service, index) => (
                <Card key={service.title} interactive className={styles.serviceCard}>
                  <span className={styles.serviceNumber}>0{index + 1}</span>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDescription}>{service.description}</p>
                </Card>
              ))}
        </div>
      </div>
    </section>
  );
}
