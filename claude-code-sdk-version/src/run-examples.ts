#!/usr/bin/env tsx

import { AdvancedClaudeCodeExamples } from './advanced-examples.js';
import { StreamingExample } from './streaming-example.js';

/**
 * Main runner script to demonstrate all Claude Code SDK examples
 */
async function runAllExamples() {
  console.log('🎯 Claude Code TypeScript SDK - Complete Examples');
  console.log('==================================================\n');

  const args = process.argv.slice(2);
  const exampleType = args[0] || 'all';

  try {
    switch (exampleType) {
      case 'basic':
        console.log('Running basic examples...\n');
        // Import and run basic examples from index.ts
        await import('./index.js');
        break;

      case 'advanced':
        console.log('Running advanced examples...\n');
        const advancedExamples = new AdvancedClaudeCodeExamples();
        await advancedExamples.runAllExamples();
        break;

      case 'streaming':
        console.log('Running streaming examples...\n');
        const streamingExamples = new StreamingExample();
        await streamingExamples.runAllStreamingExamples();
        break;

      case 'completion':
        console.log('Running code completion example...\n');
        const completionExample = new AdvancedClaudeCodeExamples();
        await completionExample.codeCompletion();
        break;

      case 'tests':
        console.log('Running test generation example...\n');
        const testExample = new AdvancedClaudeCodeExamples();
        await testExample.generateTests();
        break;

      case 'translate':
        console.log('Running code translation example...\n');
        const translateExample = new AdvancedClaudeCodeExamples();
        await translateExample.translateCode();
        break;

      case 'optimize':
        console.log('Running code optimization example...\n');
        const optimizeExample = new AdvancedClaudeCodeExamples();
        await optimizeExample.optimizeCode();
        break;

      case 'security':
        console.log('Running security analysis example...\n');
        const securityExample = new AdvancedClaudeCodeExamples();
        await securityExample.securityAnalysis();
        break;

      case 'all':
      default:
        console.log('Running all examples...\n');
        
        // Run basic examples
        console.log('🔹 BASIC EXAMPLES');
        console.log('==================\n');
        await import('./index.js');
        
        console.log('\n🔸 ADVANCED EXAMPLES');
        console.log('=====================\n');
        const allAdvanced = new AdvancedClaudeCodeExamples();
        await allAdvanced.runAllExamples();
        
        console.log('\n🌊 STREAMING EXAMPLES');
        console.log('======================\n');
        const allStreaming = new StreamingExample();
        await allStreaming.runAllStreamingExamples();
        break;
    }

    console.log('\n🎉 All examples completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Error running examples:', error);
    process.exit(1);
  }
}

// Show usage information
function showUsage() {
  console.log('Usage: npm run dev [example-type]');
  console.log('\nAvailable example types:');
  console.log('  basic      - Basic code generation, analysis, and refactoring');
  console.log('  advanced   - Advanced features like completion, tests, translation');
  console.log('  streaming  - Streaming responses and real-time feedback');
  console.log('  completion - Code completion and suggestions');
  console.log('  tests      - Test generation');
  console.log('  translate  - Code translation between languages');
  console.log('  optimize   - Code optimization');
  console.log('  security   - Security analysis');
  console.log('  all        - Run all examples (default)');
  console.log('\nExamples:');
  console.log('  npm run dev basic');
  console.log('  npm run dev streaming');
  console.log('  npm run dev security');
}

// Handle help flag
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  showUsage();
  process.exit(0);
}

// Run the examples
runAllExamples().catch(console.error);
