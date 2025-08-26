import { RuleData } from './types';
import draftCY2026 from '@/assets/documents/DRAFT_CY2026_1_HMO_MAPD_ISNP_CSNP_EOC_FINAL.pdf';

/**
 * Parse the draft CY2026 PDF document and extract rule data
 * Since we can't directly parse PDF content in the browser, we'll simulate
 * extracting structured data that would typically come from a PDF parser
 */
export async function parseDraftCY2026(): Promise<RuleData[]> {
  // Simulate loading and parsing the PDF document
  // In a real implementation, this would use a PDF parsing library
  // or server-side extraction service
  
  // Generate realistic rule data based on CY2026 structure
  const ruleData: RuleData[] = [];
  
  // CY2026 typically contains chapters for different plan types and benefits
  const chapters = [
    'Introduction and Definitions',
    'Covered Services',
    'Prior Authorization and Utilization Management',
    'Provider Network',
    'Prescription Drug Benefits',
    'Appeals and Grievances',
    'Member Rights and Responsibilities',
    'Quality Improvement',
    'Financial Information',
    'Additional Benefits'
  ];
  
  const sections = [
    'Eligibility Requirements',
    'Benefit Coverage',
    'Cost Sharing',
    'Exclusions and Limitations',
    'Authorization Procedures',
    'Provider Requirements',
    'Member Responsibilities',
    'Claims Processing',
    'Quality Standards',
    'Compliance Requirements'
  ];
  
  const serviceGroups = [
    'Medical Services',
    'Prescription Drugs',
    'Preventive Care',
    'Emergency Services',
    'Specialty Care',
    'Mental Health',
    'Substance Abuse',
    'Durable Medical Equipment',
    'Home Health',
    'Skilled Nursing'
  ];
  
  let ruleCounter = 1;
  
  chapters.forEach((chapter, chapterIndex) => {
    sections.forEach((section, sectionIndex) => {
      serviceGroups.forEach((serviceGroup, serviceIndex) => {
        // Create 2-3 rules per combination to simulate real document density
        const rulesInSection = Math.floor(Math.random() * 3) + 2;
        
        for (let i = 0; i < rulesInSection; i++) {
          const ruleId = `CY2026-${String(ruleCounter).padStart(4, '0')}`;
          const subsections = [
            'General Provisions',
            'Specific Requirements',
            'Implementation Guidelines',
            'Monitoring and Reporting',
            'Exceptions and Waivers'
          ];
          
          const rule: RuleData = {
            id: `rule-${ruleCounter}`,
            ruleId: ruleId,
            effectiveDate: '2026-01-01',
            version: '1.0',
            templateName: `CY2026 HMO MAPD Template ${chapterIndex + 1}`,
            cmsRegulated: Math.random() > 0.3, // 70% are CMS regulated
            chapterName: chapter,
            sectionName: section,
            subsectionName: subsections[i % subsections.length],
            serviceGroup: serviceGroup,
            rule: generateRuleText(chapter, section, serviceGroup, i),
            isTabular: Math.random() > 0.7, // 30% are tabular
            english: generateEnglishText(chapter, section, serviceGroup, i),
            englishStatus: Math.random() > 0.1 ? 'approved' : 'pending',
            spanish: generateSpanishText(chapter, section, serviceGroup, i),
            spanishStatus: Math.random() > 0.2 ? 'approved' : 'pending',
            createdAt: new Date('2024-01-15'),
            lastModified: new Date(2024, 0, 15 + Math.floor(Math.random() * 100))
          };
          
          ruleData.push(rule);
          ruleCounter++;
        }
      });
    });
  });
  
  // Sort by rule ID for consistent ordering
  return ruleData.sort((a, b) => a.ruleId.localeCompare(b.ruleId));
}

function generateRuleText(chapter: string, section: string, serviceGroup: string, index: number): string {
  const ruleTemplates = [
    `Members must meet eligibility requirements for ${serviceGroup.toLowerCase()} as defined in ${chapter}.`,
    `Prior authorization is required for ${serviceGroup.toLowerCase()} services exceeding standard limits.`,
    `Cost sharing for ${serviceGroup.toLowerCase()} follows the benefit schedule outlined in this section.`,
    `Network providers must comply with ${serviceGroup.toLowerCase()} quality standards and reporting requirements.`,
    `Appeals for ${serviceGroup.toLowerCase()} denials must be submitted within 60 calendar days.`
  ];
  
  return ruleTemplates[index % ruleTemplates.length];
}

function generateEnglishText(chapter: string, section: string, serviceGroup: string, index: number): string {
  const englishTemplates = [
    `Coverage for ${serviceGroup.toLowerCase()} is available to all eligible members who meet the criteria specified in ${section}.`,
    `${serviceGroup} benefits include necessary and appropriate services as determined by medical necessity criteria.`,
    `Members have access to ${serviceGroup.toLowerCase()} through our network of qualified providers.`,
    `Cost sharing amounts for ${serviceGroup.toLowerCase()} are listed in the Summary of Benefits and Coverage.`,
    `Prior authorization requirements for ${serviceGroup.toLowerCase()} help ensure appropriate utilization of services.`
  ];
  
  return englishTemplates[index % englishTemplates.length];
}

function generateSpanishText(chapter: string, section: string, serviceGroup: string, index: number): string {
  const spanishTemplates = [
    `La cobertura para ${serviceGroup.toLowerCase()} está disponible para todos los miembros elegibles que cumplan con los criterios especificados.`,
    `Los beneficios de ${serviceGroup.toLowerCase()} incluyen servicios necesarios y apropiados según los criterios de necesidad médica.`,
    `Los miembros tienen acceso a ${serviceGroup.toLowerCase()} a través de nuestra red de proveedores calificados.`,
    `Los montos de participación en costos para ${serviceGroup.toLowerCase()} se enumeran en el Resumen de Beneficios y Cobertura.`,
    `Los requisitos de autorización previa para ${serviceGroup.toLowerCase()} ayudan a garantizar el uso apropiado de los servicios.`
  ];
  
  return spanishTemplates[index % spanishTemplates.length];
}