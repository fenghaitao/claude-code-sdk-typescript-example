import { ClaudeCode } from '@anthropic-ai/claude-code';
import dotenv from 'dotenv';

dotenv.config();

export class AdvancedClaudeCodeExamples {
  private claudeCode: ClaudeCode;

  constructor() {
    this.claudeCode = new ClaudeCode({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  /**
   * Example: Code completion and suggestions
   */
  async codeCompletion() {
    console.log('🔮 Code Completion Example');
    console.log('===========================\n');

    const partialCode = `
function processUserData(users) {
  const validUsers = users.filter(user => 
    user.email && 
    user.email.includes('@') &&
    // Complete this function...
`;

    const completion = await this.claudeCode.query({
      prompt: `Complete this JavaScript code:\n\n${partialCode}\n\nProvide the completion and explain your approach.`,
      language: 'javascript',
      code: partialCode,
      maxTokens: 1000
    });

    console.log('Code completion suggestion:');
    console.log('```javascript');
    console.log(completion.code || completion.text || 'No completion available');
    console.log('```');
  }

  /**
   * Example: Test generation
   */
  async generateTests() {
    console.log('🧪 Test Generation Example');
    console.log('===========================\n');

    const functionToTest = `
export class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  }

  factorial(n: number): number {
    if (n < 0) throw new Error('Negative number');
    if (n === 0 || n === 1) return 1;
    return n * this.factorial(n - 1);
  }
}
`;

    const tests = await this.claudeCode.query({
      prompt: `Generate comprehensive Jest tests for this TypeScript class:\n\n${functionToTest}\n\nInclude tests for edge cases, error conditions, and normal operations.`,
      language: 'typescript',
      code: functionToTest,
      maxTokens: 1500
    });

    console.log('Generated tests:');
    console.log(tests.code || tests.text || 'No tests generated');
  }

  /**
   * Example: Code translation between languages
   */
  async translateCode() {
    console.log('🔄 Code Translation Example');
    console.log('============================\n');

    const pythonCode = `
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

def fibonacci_optimized(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci_optimized(n-1, memo) + fibonacci_optimized(n-2, memo)
    return memo[n]

# Example usage
print(fibonacci_optimized(10))
`;

    const translation = await this.claudeCode.query({
      prompt: `Translate this Python code to TypeScript with proper type annotations:\n\n${pythonCode}\n\nPreserve the logic and add comprehensive type annotations.`,
      language: 'python',
      code: pythonCode,
      targetLanguage: 'typescript',
      maxTokens: 1500
    });

    console.log('Original Python code:');
    console.log('```python');
    console.log(pythonCode);
    console.log('```\n');

    console.log('Translated TypeScript code:');
    console.log(translation.code || translation.text || 'No translation available');
  }

  /**
   * Example: Code optimization
   */
  async optimizeCode() {
    console.log('⚡ Code Optimization Example');
    console.log('=============================\n');

    const inefficientCode = `
function findDuplicates(arr) {
  const duplicates = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j] && !duplicates.includes(arr[i])) {
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
}

function processLargeDataset(data) {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const processed = {
      id: item.id,
      name: item.name.toUpperCase(),
      category: item.category,
      price: item.price * 1.1,
      inStock: item.quantity > 0
    };
    result.push(processed);
  }
  return result;
}
`;

    const optimization = await this.claudeCode.query({
      prompt: `Optimize this JavaScript code for better performance and memory usage:\n\n${inefficientCode}\n\nTarget O(n) complexity where possible and explain the optimizations made.`,
      language: 'javascript',
      code: inefficientCode,
      maxTokens: 1500
    });

    console.log('Original code:');
    console.log('```javascript');
    console.log(inefficientCode);
    console.log('```\n');

    console.log('Optimized code and analysis:');
    console.log(optimization.code || optimization.text || 'No optimization available');
  }

  /**
   * Example: Security analysis
   */
  async securityAnalysis() {
    console.log('🔒 Security Analysis Example');
    console.log('=============================\n');

    const vulnerableCode = `
const express = require('express');
const app = express();

app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const query = \`SELECT * FROM users WHERE id = \${userId}\`;
  
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Database error');
      return;
    }
    res.json(results[0]);
  });
});

app.post('/upload', (req, res) => {
  const file = req.files.upload;
  const filename = req.body.filename || file.name;
  
  file.mv(\`./uploads/\${filename}\`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('File uploaded!');
  });
});
`;

    const securityReport = await this.claudeCode.query({
      prompt: `Analyze this Express.js code for security vulnerabilities including SQL injection, path traversal, XSS, and CSRF:\n\n${vulnerableCode}\n\nProvide detailed analysis with severity levels and suggested fixes.`,
      language: 'javascript',
      code: vulnerableCode,
      maxTokens: 1500
    });

    console.log('Security analysis results:');
    console.log(securityReport.analysis || securityReport.text || 'No security analysis available');
  }

  /**
   * Run all advanced examples
   */
  async runAllExamples() {
    try {
      await this.codeCompletion();
      console.log('\n' + '='.repeat(60) + '\n');
      
      await this.generateTests();
      console.log('\n' + '='.repeat(60) + '\n');
      
      await this.translateCode();
      console.log('\n' + '='.repeat(60) + '\n');
      
      await this.optimizeCode();
      console.log('\n' + '='.repeat(60) + '\n');
      
      await this.securityAnalysis();
      
    } catch (error) {
      console.error('❌ Error in advanced examples:', error);
    }
  }
}

// Export for use in other files
export default AdvancedClaudeCodeExamples;