const axios = require('axios');
const { GROQ_API_KEY } = require('../config/config');

const SYSTEM_PROMPT = `
You are NEXUS AI, an intelligent analytics assistant.
The current dashboard shows this data:

Total Revenue: $2,847,293 (up 12.4%)
Active Users: 94,821 (up 8.7%)
Conversion Rate: 3.84% (down 0.3%)
Orders Today: 1,429 (up 23.1%)
Top product: ProMax Widget X at $847,200 revenue
Traffic: 42% organic, 28% direct, 18% social, 12% referral
Answer questions about this data concisely and insightfully.
Keep responses under 4 sentences. Be analytical and confident.
`;

const handleChat = async (req, res) => {
  const { messages, contextData } = req.body;

  if (GROQ_API_KEY === 'INSERT_GROQ_API_KEY_HERE') {
    return res.status(200).json({
      success: true,
      message: "Please add your Groq API key to the backend .env file to enable AI features."
    });
  }

  let dynamicSystemPrompt = SYSTEM_PROMPT;

  if (contextData && contextData.length > 0) {
    const headers = Object.keys(contextData[0]).join(', ');
    const rowCount = contextData.length;
    const dataSummary = JSON.stringify(contextData.slice(0, 10), null, 2);
    
    // Calculate basic stats for better AI context
    const numericKeys = Object.keys(contextData[0]).filter(k => !isNaN(parseFloat(contextData[0][k])));
    let statsSummary = "";
    numericKeys.forEach(key => {
      let sum = 0;
      contextData.forEach(row => { sum += parseFloat(row[key]) || 0; });
      statsSummary += `- Total ${key}: ${sum.toLocaleString()}\n`;
    });

    dynamicSystemPrompt = `
You are NEXUS AI, a high-level data scientist.
The user has loaded a dataset with ${rowCount} records.
COLUMNS: ${headers}

AGGREGATE INSIGHTS:
${statsSummary}

RAW DATA SAMPLE (First 10 rows):
${dataSummary}

Your task is to analyze this data and provide extremely accurate, data-driven answers. 
If a user asks about totals, averages, or specific trends, refer to the aggregate insights and raw sample provided.
Keep responses concise (max 4 sentences) but highly professional and precise.
`;
  }

  try {
    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: "llama-3.1-8b-instant",
      messages: [
        { role: 'system', content: dynamicSystemPrompt },
        ...messages
      ]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      }
    });

    const aiMessage = response.data.choices[0].message.content;
    
    res.status(200).json({
      success: true,
      message: aiMessage
    });
  } catch (error) {
    console.error('Groq API Error:', error.response ? error.response.data : error.message);
    res.status(500).json({
      success: false,
      message: "Connection error with Nexus AI — check backend logs."
    });
  }
};

module.exports = {
  handleChat
};
