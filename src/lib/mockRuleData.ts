import { RuleData } from './types';

const documentNames = [
  'ANOC',
  'EOC'
];

const chapterNames = {
  'ANOC': ['ANOC Cover Page'],
  'EOC': ['Chapter 1', 'Chapter 4', 'Chapter 5']
};

const sectionNames = {
  'ANOC Cover Page': ['Cover Page'],
  'Chapter 1': ['Section 1'],
  'Chapter 4': ['Section 1'],
  'Chapter 5': ['Section 2', 'Section 3', 'Section 4']
};

const subSectionNames = {
  'Cover Page': [''],
  'Section 1': ['1.1', 'Section 1.2', 'Section 1.3'],
  'Section 2': ['Section 2.1'],
  'Section 3': ['Section 3.1'],
  'Section 4': ['Section 4.1']
};

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
      
      // Generate data matching the DCM snapshot structure
      const dataStructure = [
        { doc: 'ANOC', chapter: 'ANOC Cover Page', section: 'Cover Page', subsection: '' },
        { doc: 'ANOC', chapter: 'ANOC Cover Page', section: 'Cover Page', subsection: '' },
        { doc: 'EOC', chapter: 'Chapter 1', section: 'Section 1', subsection: 'Section 1.2' },
        { doc: 'EOC', chapter: 'Chapter 1', section: 'Section 1', subsection: '1.1' },
        { doc: 'EOC', chapter: 'Chapter 4', section: 'Section 1', subsection: 'Section 1.3' },
        { doc: 'EOC', chapter: 'Chapter 5', section: 'Section 4', subsection: 'Section 4.1' },
        { doc: 'EOC', chapter: 'Chapter 4', section: 'Section 1', subsection: 'Section 1.2' },
        { doc: 'EOC', chapter: 'Chapter 5', section: 'Section 3', subsection: 'Section 3.1' },
        { doc: 'EOC', chapter: 'Chapter 5', section: 'Section 2', subsection: 'Section 2.1' },
        { doc: 'EOC', chapter: 'Chapter 4', section: 'Section 1', subsection: 'Section 1.1' }
      ];
      
      dataStructure.forEach((item, i) => {
        rules.push({
          id: `rule-${i + 1}`,
          ruleId: `R${String(i + 1).padStart(4, '0')}`,
          documentName: item.doc,
          cmsRegulated: Math.random() > 0.6, // Random boolean with 40% true chance
          chapterName: item.chapter,
          sectionName: item.section,
          subSectionName: item.subsection,
          rule: sampleRules[Math.floor(Math.random() * sampleRules.length)],
          richText: sampleRichText[Math.floor(Math.random() * sampleRichText.length)],
          translatedText: sampleTranslations[Math.floor(Math.random() * sampleTranslations.length)],
          createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
          lastModified: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
        });
      });
      
      // Add some additional random entries to fill the table
      for (let i = 10; i < 25; i++) {
        const doc = documentNames[Math.floor(Math.random() * documentNames.length)];
        const chapters = chapterNames[doc];
        const chapter = chapters[Math.floor(Math.random() * chapters.length)];
        const sections = sectionNames[chapter];
        const section = sections[Math.floor(Math.random() * sections.length)];
        const subsections = subSectionNames[section];
        const subsection = subsections[Math.floor(Math.random() * subsections.length)];
        
        rules.push({
          id: `rule-${i + 1}`,
          ruleId: `R${String(i + 1).padStart(4, '0')}`,
          documentName: doc,
          cmsRegulated: Math.random() > 0.6, // Random boolean with 40% true chance
          chapterName: chapter,
          sectionName: section,
          subSectionName: subsection,
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