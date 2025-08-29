# Claude Code Examples - Anthropic SDK Version

This version uses the standard **Anthropic SDK** (`@anthropic-ai/sdk`) with the `messages.create()` API.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   cd anthropic-sdk-version
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp ../.env.example .env
   # Edit .env and add your Anthropic API key
   ```

3. **Run examples:**
   ```bash
   # Run all examples
   npm run dev

   # Run specific example categories
   npm run examples:basic
   npm run examples:advanced
   npm run examples:streaming
   ```

## 📁 Project Structure

```
├── src/
│   ├── index.ts              # Basic examples (code generation, analysis, refactoring)
│   ├── advanced-examples.ts  # Advanced features (completion, tests, translation)
│   ├── streaming-example.ts  # Streaming responses and real-time feedback
│   └── run-examples.ts       # Main runner script
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 API Usage

This version uses the standard Anthropic SDK:

```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const response = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 1000,
  messages: [{
    role: 'user',
    content: 'Generate a TypeScript function...'
  }]
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

## 📚 API Methods Used

- `anthropic.messages.create()` - Standard message creation
- `anthropic.messages.stream()` - Streaming responses
- Manual prompt engineering for code-specific tasks

## 🔑 Environment Variables

Create a `.env` file with:

```env
ANTHROPIC_API_KEY=your_api_key_here
```

## 📋 Requirements

- Node.js 18+ 
- TypeScript 5+
- Anthropic API key