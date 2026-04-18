import styles from "./ProtocolSteps.module.css";

const steps = [
  {
    number: "01",
    title: "Intelligence",
    subtitle: "Discovery & threat mapping",
    description:
      "Deep reconnaissance of your digital footprint. Asset discovery, threat landscape analysis, and attack surface mapping.",
  },
  {
    number: "02",
    title: "Architecture",
    subtitle: "Engineering & infrastructure",
    description:
      "Proprietary systems engineered for resilience. Security-by-design architecture with continuous monitoring.",
  },
  {
    number: "03",
    title: "Interface",
    subtitle: "Delivery & reporting",
    description:
      "Quantified risk through the ARS framework. Actionable intelligence delivered with precision and discretion.",
  },
];

export default function ProtocolSteps() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>The Antanox Protocol</span>
          <h2 className={styles.title}>How We Work</h2>
        </div>

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div key={step.number} className={styles.step}>
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepSubtitle}>{step.subtitle}</p>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={styles.connector}>
                  <svg
                    width="100"
                    height="12"
                    viewBox="0 0 100 12"
                    fill="none"
                    className={styles.connectorSvg}
                  >
                    <path
                      d="M0 6H100"
                      stroke="var(--color-border-default)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <path
                      d="M90 1L100 6L90 11"
                      stroke="var(--color-border-default)"
                      strokeWidth="1"
                      fill="none"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
