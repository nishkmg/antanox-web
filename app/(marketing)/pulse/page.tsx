import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Footer from "@/components/marketing/Footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Antanox Pulse — Security Intelligence",
  description:
    "Continuous multi-vector surveillance of your digital assets. Every finding mapped to MITRE ATT&CK. Every risk quantified by the Antanox Risk Score.",
};

export default function PulsePage() {
  return (
    <main className={styles.main}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.label}>Security Intelligence</span>
          <h1 className={styles.heroTitle}>
            Security Intelligence,
            <br />
            Not Security Theater.
          </h1>
          <div className={styles.heroGauge}>
            <div className={styles.gaugeRing}>
              <svg viewBox="0 0 200 200" className={styles.gaugeSvg}>
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="var(--color-surface-3)"
                  strokeWidth="12"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="var(--color-cobalt)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray="502"
                  strokeDashoffset="125"
                  className={styles.gaugeProgress}
                />
              </svg>
              <div className={styles.gaugeCenter}>
                <span className={styles.gaugeValue}>487</span>
                <span className={styles.gaugeLabel}>ARS</span>
              </div>
            </div>
            <Badge variant="medium">Elevated</Badge>
          </div>
          <Link href="/inquiry">
            <Button size="lg">Request a Demonstration</Button>
          </Link>
        </div>
      </section>

      {/* Problem */}
      <section className={styles.problem}>
        <div className={styles.container}>
          <div className={styles.problemGrid}>
            <Card className={styles.problemCard}>
              <h2 className={styles.problemTitle}>
                Traditional scanners give you data.
              </h2>
              <ul className={styles.problemList}>
                <li>Point-in-time snapshots</li>
                <li>Surface-level vulnerability counts</li>
                <li>No context or business impact</li>
                <li>Alert fatigue without prioritization</li>
              </ul>
            </Card>
            <Card className={styles.problemCardHighlight}>
              <h2 className={styles.problemTitle}>
                Pulse gives you intelligence.
              </h2>
              <ul className={styles.problemList}>
                <li>Continuous multi-vector surveillance</li>
                <li>MITRE ATT&CK framework mapping</li>
                <li> ARS risk quantification (0–1000)</li>
                <li>Actionable remediation guidance</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.howItWorks}>
        <div className={styles.container}>
          <span className={styles.sectionLabel}>How Pulse Works</span>
          <h2 className={styles.sectionTitle}>The Intelligence Pipeline</h2>

          <div className={styles.pipeline}>
            {[
              { step: "01", name: "Ingestion", desc: "Asset discovery across all vectors" },
              { step: "02", name: "Normalization", desc: "Data standardized to common format" },
              { step: "03", name: "Correlation", desc: "Cross-reference threat intelligence" },
              { step: "04", name: "ARS Scoring", desc: "Quantified risk calculation" },
              { step: "05", name: "Report", desc: "Prioritized findings with remediation" },
            ].map((item, index) => (
              <div key={item.step} className={styles.pipelineStep}>
                <span className={styles.pipelineStepNumber}>{item.step}</span>
                <span className={styles.pipelineStepName}>{item.name}</span>
                <span className={styles.pipelineStepDesc}>{item.desc}</span>
                {index < 4 && <div className={styles.pipelineConnector} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARS Score */}
      <section className={styles.ars}>
        <div className={styles.container}>
          <span className={styles.sectionLabel}>The Antanox Risk Score</span>
          <h2 className={styles.sectionTitle}>Quantified Risk. Not Just Numbers.</h2>

          <div className={styles.arsBands}>
            {[
              { range: "0–200", band: "Nominal", color: "nominal", desc: "Minimal risk. Maintain current posture." },
              { range: "201–400", band: "Low", color: "low", desc: "Minor vulnerabilities. Schedule remediation." },
              { range: "401–600", band: "Medium", color: "medium", desc: "Moderate risk. Prioritize within 30 days." },
              { range: "601–800", band: "High", color: "high", desc: "Significant exposure. Immediate attention required." },
              { range: "801–1000", band: "Critical", color: "critical", desc: "Active threat. Emergency response activated." },
            ].map((band) => (
              <div key={band.range} className={styles.arsBand}>
                <span className={`${styles.arsRange} ${styles[`ars${band.color}`]}`}>{band.range}</span>
                <span className={`${styles.arsBandName} ${styles[`ars${band.color}`]}`}>{band.band}</span>
                <span className={styles.arsBandDesc}>{band.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>See Pulse in action.</h2>
          <p className={styles.ctaText}>
            Request a personalized demonstration with an Antanox principal.
          </p>
          <Link href="/inquiry">
            <Button size="lg">Request a Demonstration →</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
