# Claude Code Examples - Claude Code SDK Version

This version uses the specialized **Claude Code SDK** (`@anthropic-ai/claude-code`) with the `query()` API designed specifically for code-related tasks.

## ⚠️ Important: API Key Required

The Claude Code SDK requires a valid Anthropic API key to function. Without it, the examples will fail with authentication errors.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   cd claude-code-sdk-version
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env
   # Edit .env and add your REAL Anthropic API key
   ```

3. **Get an API key:**
   - Visit https://console.anthropic.com/
   - Create an account and get your API key
   - Replace `your_anthropic_api_key_here` in `.env` with your actual key

4. **Run examples:**
   ```bash
   # Run all examples (requires valid API key)
   npm run dev

   # Run specific example categories
   npm run examples:basic
   npm run examples:advanced
   npm run examples:streaming
   ```

## 🔧 API Usage

This version uses the Claude Code SDK's `query()` function:

```typescript
import { query } from '@anthropic-ai/claude-code';

const queryResult = query({
  prompt: 'Create a TypeScript function that calculates factorial'
});

// Collect complete response from all messages
async function getCompleteResponse(queryResult: any): Promise<string> {
  let completeResponse = '';
  let hasStartedResponse = false;
  
  for await (const message of queryResult.sdkMessages) {
    if (message.type === 'assistant' && message.message?.content) {
      for (const block of message.message.content) {
        if (block.type === 'text' && block.text) {
          completeResponse += block.text + '\n';
          hasStartedResponse = true;
        }
        if (block.type === 'tool_use' && block.input?.content) {
          completeResponse += block.input.content + '\n';
          hasStartedResponse = true;
        }
      }
    }
    if (message.type === 'result' && hasStartedResponse) {
      break;
    }
  }
  
  return completeResponse.trim();
}

const response = await getCompleteResponse(queryResult);
console.log(response);
```

## 📚 Key Differences from Anthropic SDK

### Claude Code SDK Features:
- **Built-in code understanding**: Optimized for code-related tasks
- **File system access**: Can read and modify files in your project
- **Terminal integration**: Can run commands and see outputs
- **Async generator pattern**: Streams responses through `sdkMessages`
- **Tool integration**: Built-in tools for code analysis, editing, etc.

### API Pattern:
```typescript
// Claude Code SDK uses async generators with complete response collection
const queryResult = query({ prompt: 'Your request' });
const response = await getCompleteResponse(queryResult);
console.log(response);
```

vs.

```typescript
// Standard Anthropic SDK uses promises
const response = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  messages: [{ role: 'user', content: 'Your request' }]
});
```

## 🎯 Examples Included

### Basic Examples (`src/index.ts`)
- **Code Generation**: Generate TypeScript functions from natural language prompts
- **Code Analysis**: Analyze code for performance, readability, and bugs
- **Code Refactoring**: Modernize and improve existing code
- **File Operations**: Work with utility functions and documentation

### Advanced Examples (`src/advanced-examples.ts`)
- **Code Completion**: Get intelligent code suggestions and completions
- **Test Generation**: Automatically generate comprehensive test suites
- **Code Translation**: Convert code between different programming languages
- **Code Optimization**: Improve performance and reduce complexity
- **Security Analysis**: Identify vulnerabilities and security issues

### Streaming Examples (`src/streaming-example.ts`)
- **Streaming Code Generation**: Real-time code generation with progress updates
- **Streaming Analysis**: Live code analysis with immediate feedback
- **Streaming Refactoring**: Real-time code transformation with change tracking

## 🔑 Environment Variables

Create a `.env` file with your actual API key:

```env
ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
```

## 🚨 Troubleshooting

### "Claude Code process exited with code 1"
This error typically means:
- No API key is set
- Invalid API key
- Network connectivity issues
- Insufficient API credits

### "No API key found"
- Ensure your `.env` file has the correct `ANTHROPIC_API_KEY`
- Make sure you're using a real API key from https://console.anthropic.com/
- Check that the `.env` file is in the correct directory

## 📋 Requirements

- Node.js 18+
- TypeScript 5+
- **Valid Anthropic API key** (required!)
- Internet connection for API calls

## 💡 Note

This version demonstrates the Claude Code SDK's unique capabilities for code-focused AI interactions. It's particularly powerful for:
- Understanding entire codebases
- Making file modifications
- Running and analyzing code
- Integrated development workflows

The trade-off is that it requires proper authentication and network access to function.