import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Example demonstrating streaming responses from Claude Code SDK
 */
export class StreamingExample {
  private anthropic: Anthropic;

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  /**
   * Example: Streaming code generation
   */
  async streamCodeGeneration() {
    console.log('🌊 Streaming Code Generation Example');
    console.log('=====================================\n');

    const prompt = `
Create a comprehensive TypeScript class for managing a todo list application.
The class should include:
- Add, remove, update todo items
- Mark items as complete/incomplete
- Filter todos by status
- Search functionality
- Data persistence methods
- Input validation
- Error handling
`;

    console.log('Generating code (streaming)...\n');
    console.log('```typescript');

    try {
      const stream = await this.anthropic.messages.stream({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      let fullCode = '';
      
      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text') {
          process.stdout.write(chunk.delta.text);
          fullCode += chunk.delta.text;
        }
      }

      console.log('\n```\n');
      console.log('✅ Code generation completed!');
      console.log(`📊 Total characters generated: ${fullCode.length}`);

    } catch (error) {
      console.error('❌ Streaming error:', error);
    }
  }

  /**
   * Example: Streaming code analysis with real-time feedback
   */
  async streamCodeAnalysis() {
    console.log('🔍 Streaming Code Analysis Example');
    console.log('===================================\n');

    const codeToAnalyze = `
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(\`/api/users/\${userId}\`);
      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <img src={user.avatar} alt="User avatar" />
    </div>
  );
}

export default UserProfile;
`;

    console.log('Analyzing code (streaming)...\n');

    try {
      const stream = await this.anthropic.messages.stream({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1500,
        messages: [{
          role: 'user',
          content: `Analyze this React code for performance, accessibility, best practices, and security issues:\n\n${codeToAnalyze}\n\nProvide detailed analysis with specific recommendations.`
        }]
      });

      let analysisText = '';

      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text') {
          process.stdout.write(chunk.delta.text);
          analysisText += chunk.delta.text;
        }
      }

      console.log('\n\n✅ Analysis completed!');

    } catch (error) {
      console.error('❌ Streaming analysis error:', error);
    }
  }

  /**
   * Example: Real-time code refactoring with progress updates
   */
  async streamCodeRefactoring() {
    console.log('🔧 Streaming Code Refactoring Example');
    console.log('======================================\n');

    const legacyCode = `
var UserService = function() {
  this.users = [];
};

UserService.prototype.addUser = function(name, email, age) {
  var user = {
    id: Math.random().toString(36).substr(2, 9),
    name: name,
    email: email,
    age: age,
    createdAt: new Date()
  };
  this.users.push(user);
  return user;
};

UserService.prototype.findUser = function(email) {
  for (var i = 0; i < this.users.length; i++) {
    if (this.users[i].email === email) {
      return this.users[i];
    }
  }
  return null;
};

UserService.prototype.updateUser = function(id, updates) {
  for (var i = 0; i < this.users.length; i++) {
    if (this.users[i].id === id) {
      for (var key in updates) {
        this.users[i][key] = updates[key];
      }
      return this.users[i];
    }
  }
  return null;
};

UserService.prototype.deleteUser = function(id) {
  for (var i = 0; i < this.users.length; i++) {
    if (this.users[i].id === id) {
      return this.users.splice(i, 1)[0];
    }
  }
  return null;
};
`;

    console.log('Refactoring legacy code to modern TypeScript (streaming)...\n');

    try {
      const stream = await this.anthropic.messages.stream({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: `Refactor this legacy JavaScript code to modern TypeScript with classes, type annotations, and modern syntax:\n\n${legacyCode}\n\nExplain the changes as you make them.`
        }]
      });

      let refactoredCode = '';

      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text') {
          process.stdout.write(chunk.delta.text);
          refactoredCode += chunk.delta.text;
        }
      }

      console.log('\n\n✅ Refactoring completed!');

    } catch (error) {
      console.error('❌ Streaming refactoring error:', error);
    }
  }

  /**
   * Run all streaming examples
   */
  async runAllStreamingExamples() {
    try {
      await this.streamCodeGeneration();
      console.log('\n' + '='.repeat(60) + '\n');
      
      await this.streamCodeAnalysis();
      console.log('\n' + '='.repeat(60) + '\n');
      
      await this.streamCodeRefactoring();
      
    } catch (error) {
      console.error('❌ Error in streaming examples:', error);
    }
  }
}

export default StreamingExample;