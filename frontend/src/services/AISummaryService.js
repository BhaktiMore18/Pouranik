class AISummaryService {
  constructor() {
    this.apiKey = import.meta.env.REACT_APP_AI_API_KEY;
    this.apiEndpoint = import.meta.env.REACT_APP_AI_API_ENDPOINT || 'https://api.openai.com/v1/chat/completions';
    this.processingDelay = 2000;

    // Fallback summaries in case API fails
    this.mockSummaries = {
      "default": {
        summary: "This book explores fundamental concepts and ideas that challenge conventional thinking, offering readers new perspectives on life and knowledge.",
        keyThemes: ["Personal Development", "Critical Thinking", "Life Philosophy"],
        pros: [
          "Presents innovative approaches to problem-solving",
          "Offers practical insights for daily life",
          "Well-structured and easy to follow"
        ],
        cons: [
          "Some concepts may be too abstract for beginners",
          "Could benefit from more real-world examples"
        ],
        recommendation: "Worth Considering",
        confidence: "Medium",
        targetAudience: "Readers interested in personal development and critical thinking"
      }
    };
  }

  async generateSummary(bookInfo) {
    await this.delay(this.processingDelay);

    try {
      if (!this.apiKey) {
        throw new Error('AI API key not configured');
      }

      const summary = await this.processBookWithAI(bookInfo);
      return {
        success: true,
        data: summary,
        generatedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('AI Summary generation failed:', error);
      return {
        success: false,
        error: error.message,
        fallback: this.generateFallbackSummary(bookInfo)
      };
    }
  }

  async processBookWithAI(bookInfo) {
    // Create a comprehensive prompt for the AI
    const prompt = this.createPrompt(bookInfo);

    const response = await fetch(this.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a professional book reviewer and literary analyst. Provide honest, insightful book analysis based on the information provided. Your response should be in JSON format with the following structure:
            {
              "summary": "2-3 sentence summary of the book",
              "keyThemes": ["theme1", "theme2", "theme3"],
              "pros": ["positive aspect 1", "positive aspect 2", "positive aspect 3"],
              "cons": ["potential drawback 1", "potential drawback 2"],
              "recommendation": "Highly Recommended|Recommended|Worth Considering|Not Recommended",
              "confidence": "High|Medium|Low",
              "targetAudience": "Description of ideal readers for this book"
            }`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 800,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`AI API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from AI service');
    }

    // Parse the JSON response
    try {
      const parsedResponse = JSON.parse(aiResponse);
      return this.validateAndFormatResponse(parsedResponse, bookInfo);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // If JSON parsing fails, generate a fallback
      return this.generateFallbackSummary(bookInfo);
    }
  }

  createPrompt(bookInfo) {
    const { title, authors, description, categories, pageCount, averageRating, publishedDate } = bookInfo;

    let prompt = `Please analyze this book and provide a comprehensive review:\n\n`;

    prompt += `Title: ${title || 'Unknown'}\n`;
    if (authors && authors.length > 0) {
      prompt += `Author(s): ${authors.join(', ')}\n`;
    }
    if (categories && categories.length > 0) {
      prompt += `Categories: ${categories.join(', ')}\n`;
    }
    if (pageCount) {
      prompt += `Page Count: ${pageCount}\n`;
    }
    if (averageRating) {
      prompt += `Average Rating: ${averageRating}/5\n`;
    }
    if (publishedDate) {
      prompt += `Published: ${publishedDate}\n`;
    }
    if (description) {
      prompt += `\nDescription: ${description}\n`;
    }

    prompt += `\nBased on this information, provide an honest analysis of whether this book is worth reading. Consider the book's strengths, potential weaknesses, target audience, and overall value to readers.`;

    return prompt;
  }

  validateAndFormatResponse(response, bookInfo) {
    // Ensure all required fields are present with defaults
    return {
      summary: response.summary || this.generateGenericSummary(bookInfo),
      keyThemes: Array.isArray(response.keyThemes) ? response.keyThemes.slice(0, 5) : this.extractThemes(bookInfo.categories),
      pros: Array.isArray(response.pros) ? response.pros.slice(0, 4) : this.getDefaultPros(bookInfo),
      cons: Array.isArray(response.cons) ? response.cons.slice(0, 3) : this.getDefaultCons(bookInfo),
      recommendation: this.validateRecommendation(response.recommendation),
      confidence: this.validateConfidence(response.confidence),
      targetAudience: response.targetAudience || this.generateTargetAudience(bookInfo)
    };
  }

  generateFallbackSummary(bookInfo) {
    const { categories, averageRating } = bookInfo;

    return {
      summary: this.generateGenericSummary(bookInfo),
      keyThemes: this.extractThemes(categories),
      pros: this.getDefaultPros(bookInfo),
      cons: this.getDefaultCons(bookInfo),
      recommendation: this.assessRecommendation(averageRating),
      confidence: "Medium",
      targetAudience: this.generateTargetAudience(bookInfo)
    };
  }

  generateGenericSummary(bookInfo) {
    const { title, categories, description } = bookInfo;

    if (description && description.length > 100) {
      // Extract first 2 sentences from description
      const sentences = description.split(/[.!?]+/).filter(s => s.trim().length > 0);
      return sentences.slice(0, 2).join('. ') + '.';
    }

    const category = categories && categories.length > 0 ? categories[0] : 'general interest';
    return `${title} is a ${category.toLowerCase()} book that offers readers valuable insights and perspectives on its subject matter.`;
  }

  extractThemes(categories) {
    const themes = [];

    if (categories && categories.length > 0) {
      themes.push(...categories.slice(0, 3));
    }

    // Add some default themes if not enough categories
    const defaultThemes = ["Knowledge", "Learning", "Insights"];
    themes.push(...defaultThemes);

    return [...new Set(themes)].slice(0, 4);
  }

  getDefaultPros(bookInfo) {
    const pros = ["Provides comprehensive coverage of the main topic"];

    if (bookInfo.averageRating && bookInfo.averageRating > 4) {
      pros.push("Highly rated by readers");
    }

    if (bookInfo.pageCount && bookInfo.pageCount > 300) {
      pros.push("In-depth exploration of the subject");
    } else if (bookInfo.pageCount && bookInfo.pageCount < 200) {
      pros.push("Concise and easy to read");
    }

    pros.push("Well-structured content");

    return pros.slice(0, 3);
  }

  getDefaultCons(bookInfo) {
    const cons = [];

    if (bookInfo.pageCount && bookInfo.pageCount > 500) {
      cons.push("Quite lengthy, may require significant time investment");
    }

    if (bookInfo.averageRating && bookInfo.averageRating < 3.5) {
      cons.push("Mixed reviews from readers");
    }

    cons.push("May not appeal to all reading preferences");

    return cons.slice(0, 2);
  }

  assessRecommendation(averageRating) {
    if (averageRating) {
      if (averageRating >= 4.5) return "Highly Recommended";
      if (averageRating >= 4.0) return "Recommended";
      if (averageRating >= 3.5) return "Worth Considering";
      return "Not Recommended";
    }

    return "Worth Considering";
  }

  generateTargetAudience(bookInfo) {
    const { categories } = bookInfo;

    if (categories && categories.length > 0) {
      const category = categories[0].toLowerCase();

      if (category.includes('business')) {
        return "Business professionals, entrepreneurs, and management students";
      } else if (category.includes('self') || category.includes('help')) {
        return "Individuals seeking personal development and self-improvement";
      } else if (category.includes('fiction')) {
        return "Fiction lovers and general readers looking for engaging storytelling";
      } else if (category.includes('history')) {
        return "History enthusiasts and students of historical events";
      } else if (category.includes('science')) {
        return "Science enthusiasts and students seeking to understand complex concepts";
      }
    }

    return "General readers interested in expanding their knowledge and perspectives";
  }

  validateRecommendation(recommendation) {
    const validRecommendations = ["Highly Recommended", "Recommended", "Worth Considering", "Not Recommended"];
    return validRecommendations.includes(recommendation) ? recommendation : "Worth Considering";
  }

  validateConfidence(confidence) {
    const validConfidences = ["High", "Medium", "Low"];
    return validConfidences.includes(confidence) ? confidence : "Medium";
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export function to match your existing component's import
export const generateBookSummary = async (bookInfo) => {
  const service = new AISummaryService();
  const result = await service.generateSummary(bookInfo);

  if (result.success) {
    return result.data;
  } else {
    // If AI fails, return fallback but still throw error for UI handling
    if (result.fallback) {
      return result.fallback;
    }
    throw new Error(result.error);
  }
};

export default new AISummaryService();