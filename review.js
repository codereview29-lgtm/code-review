#!/usr/bin/env node

// Simple demonstration of bank policy review functionality
// This shows how the policy review system would work

console.log('🏦 Bank Policy Review Demo\n')

// Simulated policy violations from the example file
const policyViolations = [
  {
    rule: {
      id: 'BANK_002',
      name: 'Hardcoded Credentials',
      severity: 'critical',
      category: 'security'
    },
    lineNumber: 7,
    code: '  password: \'admin123\', // BANK_002: Hardcoded credentials detected',
    message: 'Hardcoded credentials detected - security risk',
    remediation: 'Use environment variables, secure vaults, or configuration management'
  },
  {
    rule: {
      id: 'BANK_001',
      name: 'Personal Data Exposure',
      severity: 'critical',
      category: 'data-protection'
    },
    lineNumber: 16,
    code: '  console.log(`Processing customer: ${customer.ssn}`) // BANK_001: Personal data exposure',
    message: 'Potential exposure of sensitive financial data detected',
    remediation: 'Use encryption, masking, or secure data handling practices'
  },
  {
    rule: {
      id: 'BANK_003',
      name: 'SQL Injection Risk',
      severity: 'high',
      category: 'security'
    },
    lineNumber: 29,
    code: '  const query = `SELECT * FROM users WHERE id = ${userId}` // BANK_003: SQL injection risk',
    message: 'Potential SQL injection vulnerability detected',
    remediation: 'Use parameterized queries or ORM libraries'
  },
  {
    rule: {
      id: 'BANK_006',
      name: 'Audit Trail Missing',
      severity: 'high',
      category: 'audit'
    },
    lineNumber: 48,
    code: 'function transferMoney(fromAccount: string, toAccount: string, amount: number) {',
    message: 'Financial operation detected without audit logging',
    remediation: 'Implement comprehensive audit logging for all financial operations'
  },
  {
    rule: {
      id: 'BANK_005',
      name: 'Missing Input Validation',
      severity: 'medium',
      category: 'security'
    },
    lineNumber: 40,
    code: '  const amount = req.body.amount // BANK_005: Missing input validation',
    message: 'User input used without validation',
    remediation: 'Implement proper input validation and sanitization'
  }
]

// Generate policy report
function generatePolicyReport(violations) {
  const summary = {
    total: violations.length,
    critical: violations.filter(v => v.rule.severity === 'critical').length,
    high: violations.filter(v => v.rule.severity === 'high').length,
    medium: violations.filter(v => v.rule.severity === 'medium').length,
    low: violations.filter(v => v.rule.severity === 'low').length,
    byCategory: {}
  }

  // Count by category
  violations.forEach(violation => {
    summary.byCategory[violation.rule.category] = (summary.byCategory[violation.rule.category] || 0) + 1
  })

  // Determine if passed (no critical or high violations)
  const passed = summary.critical === 0 && summary.high === 0

  // Generate recommendations
  const recommendations = []
  if (summary.critical > 0) {
    recommendations.push('🔴 CRITICAL: Address all critical security violations immediately')
  }
  if (summary.high > 0) {
    recommendations.push('🟠 HIGH: Review and fix high-priority security issues')
  }
  if (summary.medium > 0) {
    recommendations.push('🟡 MEDIUM: Consider addressing medium-priority issues')
  }

  // Add specific recommendations based on categories
  if (summary.byCategory['data-protection'] > 0) {
    recommendations.push('📊 Data Protection: Implement proper data handling and encryption')
  }
  if (summary.byCategory['audit'] > 0) {
    recommendations.push('📋 Audit: Add comprehensive audit logging for financial operations')
  }
  if (summary.byCategory['security'] > 0) {
    recommendations.push('🔒 Security: Review and fix security vulnerabilities')
  }

  return {
    violations,
    summary,
    passed,
    recommendations
  }
}

// Display results
const report = generatePolicyReport(policyViolations)

console.log('📊 Policy Review Results:')
console.log(`Total violations: ${report.summary.total}`)
console.log(`Critical: ${report.summary.critical}`)
console.log(`High: ${report.summary.high}`)
console.log(`Medium: ${report.summary.medium}`)
console.log(`Low: ${report.summary.low}`)
console.log(`Passed: ${report.passed ? '✅ YES' : '❌ NO'}\n`)

// Display violations by category
console.log('📋 Violations by Category:')
Object.entries(report.summary.byCategory).forEach(([category, count]) => {
  const emoji = getCategoryEmoji(category)
  console.log(`- ${emoji} ${category}: ${count}`)
})
console.log()

// Display detailed violations
console.log('🔍 Detailed Violations:')
report.violations.forEach((violation, index) => {
  const severityEmoji = getSeverityEmoji(violation.rule.severity)
  console.log(`${index + 1}. ${severityEmoji} ${violation.rule.name} (Line ${violation.lineNumber})`)
  console.log(`   Message: ${violation.message}`)
  console.log(`   Remediation: ${violation.remediation}`)
  console.log(`   Code: ${violation.code.trim()}`)
  console.log()
})

// Display recommendations
console.log('💡 Recommendations:')
report.recommendations.forEach(rec => {
  console.log(`- ${rec}`)
})
console.log()

// Display overall status
const status = report.passed ? '✅ PASSED' : '❌ FAILED'
console.log(`Overall Status: ${status}`)

if (!report.passed) {
  console.log('\n⚠️  This code would fail a bank policy review due to critical or high-priority violations.')
  console.log('Please address the violations above before proceeding.')
} else {
  console.log('\n✅ This code passes the bank policy review!')
}

// Helper functions
function getCategoryEmoji(category) {
  const emojiMap = {
    'security': '🔒',
    'compliance': '⚖️',
    'data-protection': '📊',
    'audit': '📋',
    'regulatory': '🏛️'
  }
  return emojiMap[category] || '📝'
}

function getSeverityEmoji(severity) {
  const emojiMap = {
    'critical': '🔴',
    'high': '🟠',
    'medium': '🟡',
    'low': '🟢'
  }
  return emojiMap[severity] || '⚪'
}

console.log('\n---')
console.log('This is a demonstration of the bank policy review feature.')
console.log('In a real implementation, this would be integrated with your code review system.')
console.log('The system would automatically scan pull requests and generate these reports.') 
