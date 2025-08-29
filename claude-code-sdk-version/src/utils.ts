import Anthropic from '@anthropic-ai/sdk';

/**
 * Utility functions for Claude Code SDK examples
 */

/**
 * Create a configured Claude Code instance with error handling
 */
export function createClaudeClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    throw new Error(
      'ANTHROPIC_API_KEY environment variable is required. ' +
      'Please set it in your .env file or environment.'
    );
  }

  return new Anthropic({
    apiKey,
    maxTokens: 4000,
    temperature: 0.1,
    timeout: 60000, // 60 seconds
    retries: 3,
  });
}

/**
 * Error handler with user-friendly messages
 */
export function handleClaudeError(error: any): void {
  if (error.code === 'INVALID_API_KEY') {
    console.error('❌ Invalid API key. Please check your ANTHROPIC_API_KEY.');
  } else if (error.code === 'RATE_LIMIT_EXCEEDED') {
    console.error('❌ Rate limit exceeded. Please wait before making more requests.');
  } else if (error.code === 'INSUFFICIENT_CREDITS') {
    console.error('❌ Insufficient credits. Please check your Anthropic account.');
  } else if (error.code === 'NETWORK_ERROR') {
    console.error('❌ Network error. Please check your internet connection.');
  } else if (error.code === 'TIMEOUT') {
    console.error('❌ Request timeout. The operation took too long to complete.');
  } else {
    console.error('❌ Unexpected error:', error.message || error);
  }
}

/**
 * Retry wrapper for Claude operations
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        break;
      }
      
      console.warn(`⚠️ Attempt ${attempt} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }
  
  throw lastError;
}

/**
 * Format code output with syntax highlighting (basic)
 */
export function formatCodeOutput(code: string, language: string): string {
  return `\`\`\`${language}\n${code}\n\`\`\``;
}

/**
 * Progress indicator for long-running operations
 */
export class ProgressIndicator {
  private interval: NodeJS.Timeout | null = null;
  private frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  private currentFrame = 0;

  start(message: string = 'Processing'): void {
    this.interval = setInterval(() => {
      process.stdout.write(`\r${this.frames[this.currentFrame]} ${message}...`);
      this.currentFrame = (this.currentFrame + 1) % this.frames.length;
    }, 100);
  }

  stop(finalMessage?: string): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    if (finalMessage) {
      process.stdout.write(`\r✅ ${finalMessage}\n`);
    } else {
      process.stdout.write('\r');
    }
  }
}

/**
 * Validate code input before sending to Claude
 */
export function validateCodeInput(code: string, language: string): boolean {
  if (!code || code.trim().length === 0) {
    console.error('❌ Code input cannot be empty');
    return false;
  }

  if (code.length > 100000) { // 100KB limit
    console.error('❌ Code input is too large (max 100KB)');
    return false;
  }

  const supportedLanguages = [
    'javascript', 'typescript', 'python', 'java', 'cpp', 'c',
    'csharp', 'go', 'rust', 'php', 'ruby', 'swift', 'kotlin',
    'scala', 'html', 'css', 'sql', 'bash', 'powershell'
  ];

  if (!supportedLanguages.includes(language.toLowerCase())) {
    console.warn(`⚠️ Language '${language}' may not be fully supported`);
  }

  return true;
}

/**
 * Safe JSON parsing with error handling
 */
export function safeJsonParse(jsonString: string): any {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('❌ Failed to parse JSON:', error);
    return null;
  }
}

/**
 * Estimate token count (rough approximation)
 */
export function estimateTokenCount(text: string): number {
  // Rough estimation: ~4 characters per token for English text
  // Code might have different ratios, but this gives a ballpark
  return Math.ceil(text.length / 4);
}

/**
 * Check if operation would exceed token limits
 */
export function checkTokenLimits(input: string, maxTokens: number = 4000): boolean {
  const estimatedTokens = estimateTokenCount(input);
  const safetyMargin = 0.8; // Use 80% of limit to leave room for response
  
  if (estimatedTokens > maxTokens * safetyMargin) {
    console.warn(`⚠️ Input may exceed token limit (estimated: ${estimatedTokens}, limit: ${maxTokens})`);
    return false;
  }
  
  return true;
}

/**
 * Create a summary of analysis results
 */
export function summarizeAnalysis(analysis: any): string {
  const summary = [];
  
  if (analysis.issues) {
    const criticalIssues = analysis.issues.filter((i: any) => i.severity === 'critical').length;
    const majorIssues = analysis.issues.filter((i: any) => i.severity === 'major').length;
    const minorIssues = analysis.issues.filter((i: any) => i.severity === 'minor').length;
    
    summary.push(`Issues: ${criticalIssues} critical, ${majorIssues} major, ${minorIssues} minor`);
  }
  
  if (analysis.suggestions) {
    summary.push(`Suggestions: ${analysis.suggestions.length}`);
  }
  
  if (analysis.securityScore) {
    summary.push(`Security Score: ${analysis.securityScore}/10`);
  }
  
  if (analysis.performanceScore) {
    summary.push(`Performance Score: ${analysis.performanceScore}/10`);
  }
  
  return summary.join(' | ');
}

export default {
  createClaudeClient,
  handleClaudeError,
  withRetry,
  formatCodeOutput,
  ProgressIndicator,
  validateCodeInput,
  safeJsonParse,
  estimateTokenCount,
  checkTokenLimits,
  summarizeAnalysis
};