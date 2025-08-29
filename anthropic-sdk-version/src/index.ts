import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function main() {
  // Initialize the Anthropic client
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  console.log('🚀 Claude Code TypeScript SDK Example\n');

  try {
    // Example 1: Basic code generation
    await basicCodeGeneration(anthropic);
    
    // Example 2: Code analysis and review
    await codeAnalysis(anthropic);
    
    // Example 3: Code refactoring
    await codeRefactoring(anthropic);
    
    // Example 4: Working with files
    await fileOperations(anthropic);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

async function basicCodeGeneration(anthropic: Anthropic) {
  console.log('📝 Example 1: Basic Code Generation');
  console.log('=====================================\n');

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1000,
    messages: [{
      role: 'user',
      content: 'Create a TypeScript function that calculates the factorial of a number. Please provide only the code without explanation.'
    }]
  });

  console.log('Generated code:');
  console.log('```typescript');
  console.log(response.content[0].type === 'text' ? response.content[0].text : 'No text response');
  console.log('```\n');
  console.log('\n' + '='.repeat(50) + '\n');
}

async function codeAnalysis(anthropic: Anthropic) {
  console.log('🔍 Example 2: Code Analysis');
  console.log('============================\n');

  const codeToAnalyze = `
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}
`;

  const analysis = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1000,
    messages: [{
      role: 'user',
      content: `Please analyze this JavaScript code for performance, readability, and potential bugs:\n\n${codeToAnalyze}\n\nProvide a structured analysis with specific issues and suggestions.`
    }]
  });

  console.log('Code analysis results:');
  const analysisText = analysis.content[0].type === 'text' ? analysis.content[0].text : 'No analysis available';
  console.log(analysisText);
  console.log('\n' + '='.repeat(50) + '\n');
}

async function codeRefactoring(anthropic: Anthropic) {
  console.log('🔧 Example 3: Code Refactoring');
  console.log('===============================\n');

  const originalCode = `
class UserManager {
  constructor() {
    this.users = [];
  }
  
  addUser(name, email, age) {
    this.users.push({ name: name, email: email, age: age });
  }
  
  getUser(email) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === email) {
        return this.users[i];
      }
    }
    return null;
  }
}
`;

  const refactored = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1000,
    messages: [{
      role: 'user',
      content: `Please refactor this JavaScript code to use modern ES2022 features and best practices:\n\n${originalCode}\n\nProvide the refactored code and explain the changes made.`
    }]
  });

  console.log('Original code:');
  console.log('```javascript');
  console.log(originalCode);
  console.log('```\n');

  console.log('Refactored code and analysis:');
  const refactoredText = refactored.content[0].type === 'text' ? refactored.content[0].text : 'No refactoring available';
  console.log(refactoredText);
  console.log('\n' + '='.repeat(50) + '\n');
}

async function fileOperations(anthropic: Anthropic) {
  console.log('📁 Example 4: File Operations');
  console.log('==============================\n');

  // Example: Generate documentation for utility functions
  const utilityCode = `
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
`;

  const docs = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1000,
    messages: [{
      role: 'user',
      content: `Please generate comprehensive documentation for these TypeScript utility functions:\n\n${utilityCode}\n\nInclude usage examples and JSDoc comments.`
    }]
  });

  console.log('Generated documentation:');
  const docsText = docs.content[0].type === 'text' ? docs.content[0].text : 'No documentation available';
  console.log(docsText);

  console.log('\n' + '='.repeat(50) + '\n');
}

// Run the examples
main().catch(console.error);