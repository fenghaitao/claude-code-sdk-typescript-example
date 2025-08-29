import { query } from '@anthropic-ai/claude-code';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Utility function to collect complete response from Claude Code SDK
async function getCompleteResponse(queryResult: any): Promise<string> {
  let completeResponse = '';
  let hasStartedResponse = false;
  
  for await (const message of queryResult.sdkMessages) {
    if (message.type === 'assistant' && message.message?.content) {
      for (const block of message.message.content) {
        // Collect text content
        if (block.type === 'text' && block.text) {
          const text = block.text.trim();
          if (text) {
            completeResponse += text + '\n';
            hasStartedResponse = true;
          }
        }
        
        // Collect tool_use content with code
        if (block.type === 'tool_use' && block.input?.content) {
          completeResponse += block.input.content + '\n';
          hasStartedResponse = true;
        }
      }
    }
    
    // Check if we have a result message indicating completion
    if (message.type === 'result' && hasStartedResponse) {
      break;
    }
  }
  
  return completeResponse.trim();
}

async function main() {
  console.log('🚀 Claude Code TypeScript SDK Example\n');

  try {
    // Example 1: Basic code generation
    await basicCodeGeneration();
    
    // Example 2: Code analysis and review
    await codeAnalysis();
    
    // Example 3: Code refactoring
    await codeRefactoring();
    
    // Example 4: Working with files
    await fileOperations();
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

async function basicCodeGeneration() {
  console.log('📝 Example 1: Basic Code Generation');
  console.log('=====================================\n');

  const queryResult = query({
    prompt: 'Create a TypeScript function that calculates the factorial of a number. Please provide only the code without explanation.'
  });

  console.log('Generated code:');
  console.log('```typescript');
  
  // Get the complete response
  const response = await getCompleteResponse(queryResult);
  
  if (response) {
    console.log(response);
  } else {
    console.log('(No code generated)');
  }
  
  console.log('```\n');
  console.log('\n' + '='.repeat(50) + '\n');
}

async function codeAnalysis() {
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

  const queryResult = query({
    prompt: `Please analyze this JavaScript code for performance, readability, and potential bugs:\n\n${codeToAnalyze}\n\nProvide a structured analysis with specific issues and suggestions.`
  });

  console.log('Code analysis results:');
  
  // Get the complete response
  const response = await getCompleteResponse(queryResult);
  
  if (response) {
    console.log(response);
  } else {
    console.log('(No analysis generated)');
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
}

async function codeRefactoring() {
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

  const queryResult = query({
    prompt: `Please refactor this JavaScript code to use modern ES2022 features and best practices:\n\n${originalCode}\n\nProvide the refactored code and explain the changes made.`
  });

  console.log('Original code:');
  console.log('```javascript');
  console.log(originalCode);
  console.log('```\n');

  console.log('Refactored code and analysis:');
  
  // Get the complete response
  const response = await getCompleteResponse(queryResult);
  
  if (response) {
    console.log(response);
  } else {
    console.log('(No refactoring generated)');
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
}

async function fileOperations() {
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

  const queryResult = query({
    prompt: `Please generate comprehensive documentation for these TypeScript utility functions:\n\n${utilityCode}\n\nInclude usage examples and JSDoc comments.`
  });

  console.log('Generated documentation:');
  
  // Get the complete response
  const response = await getCompleteResponse(queryResult);
  
  if (response) {
    console.log(response);
  } else {
    console.log('(No documentation generated)');
  }

  console.log('\n' + '='.repeat(50) + '\n');
}

// Run the examples
main().catch(console.error);
