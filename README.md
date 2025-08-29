# Claude Code TypeScript SDK Examples

This repository provides **two complete implementations** demonstrating different approaches to working with Claude for code-related tasks:

## 🔀 Two Versions Available

### 1. **Anthropic SDK Version** (`anthropic-sdk-version/`)
Uses the standard **Anthropic SDK** (`@anthropic-ai/sdk`) with `messages.create()` API
- ✅ **Stable and well-documented**
- ✅ **Full control over prompts and responses**
- ✅ **Works with all Claude models**
- ⚠️ **Requires manual prompt engineering for code tasks**

### 2. **Claude Code SDK Version** (`claude-code-sdk-version/`)
Uses the specialized **Claude Code SDK** (`@anthropic-ai/claude-code`) with `query()` API
- ✅ **Optimized specifically for code tasks**
- ✅ **Built-in file system and terminal access**
- ✅ **Async generator streaming pattern**
- ⚠️ **Requires valid Anthropic API key to run**
- ⚠️ **Newer SDK, limited documentation**

## 🚀 Quick Start

Choose the version you want to explore:

### Option A: Anthropic SDK Version
```bash
cd anthropic-sdk-version
npm install
cp ../.env.example .env
# Edit .env and add your API key
npm run dev
```

### Option B: Claude Code SDK Version
```bash
cd claude-code-sdk-version
npm install
cp ../.env.example .env
# Edit .env and add your REAL Anthropic API key from https://console.anthropic.com/
npm run dev
```

**⚠️ Note:** The Claude Code SDK requires a valid API key and will not work without proper authentication.

## 📊 Comparison

| Feature | Anthropic SDK | Claude Code SDK |
|---------|---------------|-----------------|
| **API Style** | `messages.create()` | `query()` |
| **Code Focus** | General purpose | Code-specific |
| **Prompt Engineering** | Manual | Built-in |
| **Response Parsing** | Manual | Structured |
| **Streaming** | `messages.stream()` | `queryStream()` |
| **Language Support** | All via prompts | Native parameters |
| **Documentation** | Extensive | Limited |

## 🎯 Examples Included (Both Versions)

### Basic Examples
- **Code Generation**: Generate TypeScript functions from natural language
- **Code Analysis**: Analyze code for performance, readability, and bugs
- **Code Refactoring**: Modernize and improve existing code
- **File Operations**: Work with utility functions and documentation

### Advanced Examples
- **Code Completion**: Get intelligent code suggestions
- **Test Generation**: Automatically generate comprehensive test suites
- **Code Translation**: Convert code between programming languages
- **Code Optimization**: Improve performance and reduce complexity
- **Security Analysis**: Identify vulnerabilities and security issues

### Streaming Examples
- **Real-time Code Generation**: Live code generation with progress
- **Streaming Analysis**: Live code analysis with immediate feedback
- **Streaming Refactoring**: Real-time code transformation

## 🔧 API Comparison

### Anthropic SDK Approach
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
    content: 'Generate a TypeScript function that calculates factorial'
  }]
});
```

### Claude Code SDK Approach
```typescript
import { query } from '@anthropic-ai/claude-code';

const queryResult = query({
  prompt: 'Generate a TypeScript function that calculates factorial'
});

// Collect complete response from all messages
const response = await getCompleteResponse(queryResult);
console.log(response);
```

## 📁 Project Structure

```
├── anthropic-sdk-version/          # Standard Anthropic SDK implementation
│   ├── src/
│   │   ├── index.ts               # Basic examples
│   │   ├── advanced-examples.ts   # Advanced features
│   │   ├── streaming-example.ts   # Streaming responses
│   │   └── run-examples.ts        # Runner script
│   ├── package.json               # Anthropic SDK dependencies
│   └── README.md                  # Version-specific docs
├── claude-code-sdk-version/        # Claude Code SDK implementation
│   ├── src/
│   │   ├── index.ts               # Basic examples
│   │   ├── advanced-examples.ts   # Advanced features
│   │   ├── streaming-example.ts   # Streaming responses
│   │   └── run-examples.ts        # Runner script
│   ├── package.json               # Claude Code SDK dependencies
│   └── README.md                  # Version-specific docs
├── .env.example                    # Environment template
├── .gitignore                      # Git ignore rules
└── README.md                       # This file
```

## 🔑 Environment Setup

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Add your Anthropic API key:**
   ```env
   ANTHROPIC_API_KEY=your_api_key_here
   ```

## 🎮 Running Examples

Both versions support the same npm scripts:

```bash
# Run all examples
npm run dev

# Run specific categories
npm run examples:basic      # Basic code operations
npm run examples:advanced   # Advanced features
npm run examples:streaming  # Streaming responses

# Run specific advanced features
npm run examples:completion # Code completion
npm run examples:tests      # Test generation
npm run examples:translate  # Code translation
npm run examples:optimize   # Code optimization
npm run examples:security   # Security analysis
```

## 🤔 Which Version Should I Use?

### Choose **Anthropic SDK** if:
- You want maximum control over prompts and responses
- You're building a production application
- You need extensive documentation and community support
- You want to work with non-code tasks as well

### Choose **Claude Code SDK** if:
- You're focused specifically on code-related tasks
- You want simplified APIs for common code operations
- You prefer structured responses over manual parsing
- You're prototyping or experimenting with code AI

## 📋 Requirements

- Node.js 18+
- TypeScript 5+
- Anthropic API key

## 🤝 Contributing

Feel free to extend either version with additional use cases or improvements!

## 📄 License

MIT License - feel free to use these examples in your own projects.