import { RuleData } from './types';

const documentNames = [
  'Employee Handbook',
  'Safety Guidelines', 
  'Quality Standards',
  'Compliance Manual',
  'Operations Procedures'
];

const chapters = [
  'Introduction',
  'General Policies',
  'Specific Requirements',
  'Implementation Guidelines',
  'Enforcement Procedures'
];

const sections = [
  'Overview',
  'Definitions', 
  'Requirements',
  'Procedures',
  'Exceptions',
  'Penalties'
];

const subSections = [
  'Basic Requirements',
  'Advanced Criteria',
  'Special Cases',
  'Emergency Procedures',
  'Reporting Guidelines'
];

const sampleRules = [
  'All employees must complete safety training within 30 days of employment',
  'Equipment inspections must be conducted weekly by certified personnel',
  'Documentation must be submitted within 48 hours of completion',
  'Emergency protocols must be followed without exception',
  'Quality checks are required before product release',
  'Compliance audits shall be conducted quarterly',
  'Training records must be maintained for minimum 5 years',
  'Incident reports must be filed within 24 hours',
  'Access controls must be reviewed monthly',
  'Data backup procedures must be executed daily'
];

const sampleRichText = [
  '<p>This requirement ensures <strong>compliance</strong> with industry standards and <em>regulatory guidelines</em>.</p>',
  '<p>The procedure involves multiple steps:<br/>1. Initial assessment<br/>2. Documentation review<br/>3. Final approval</p>',
  '<p>Special attention must be paid to <u>critical safety measures</u> during this process.</p>',
  '<p><strong>Note:</strong> Exceptions require <em>management approval</em> and proper documentation.</p>',
  '<p>Regular monitoring ensures <strong>continuous compliance</strong> with established protocols.</p>'
];

const sampleTranslations = [
  'Todos los empleados deben completar el entrenamiento de seguridad dentro de 30 días del empleo',
  'Les inspections d\'équipement doivent être effectuées hebdomadairement par du personnel certifié',
  'Die Dokumentation muss innerhalb von 48 Stunden nach Fertigstellung eingereicht werden',
  '緊急プロトコルは例外なく従わなければならない',
  'Kontrole kvalitete su potrebne pre puštanja proizvoda'
];

export function generateMockRuleData(): Promise<RuleData[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const rules: RuleData[] = [];
      
      for (let i = 0; i < 50; i++) {
        const docName = documentNames[Math.floor(Math.random() * documentNames.length)];
        const chapter = chapters[Math.floor(Math.random() * chapters.length)];
        const section = sections[Math.floor(Math.random() * sections.length)];
        const subSection = subSections[Math.floor(Math.random() * subSections.length)];
        
        rules.push({
          id: `rule-${i + 1}`,
          ruleId: `R${String(i + 1).padStart(4, '0')}`,
          documentName: docName,
          chapterName: chapter,
          sectionName: section,
          subSectionName: subSection,
          rule: sampleRules[Math.floor(Math.random() * sampleRules.length)],
          richText: sampleRichText[Math.floor(Math.random() * sampleRichText.length)],
          translatedText: sampleTranslations[Math.floor(Math.random() * sampleTranslations.length)],
          createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
          lastModified: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
        });
      }
      
      resolve(rules);
    }, 300); // Simulate API delay
  });
}