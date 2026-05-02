const axios = require('axios');
const { GROQ_API_KEY } = require('../config/config');

const generateDashboardConfig = async (req, res) => {
  try {
    const { csvData, headers } = req.body;

    if (!csvData || !headers) {
      return res.status(400).json({ success: false, error: 'CSV data and headers are required.' });
    }

    if (GROQ_API_KEY === 'INSERT_GROQ_API_KEY_HERE') {
      return res.status(200).json({
        success: false,
        error: "Please add your Groq API key to the backend .env file to enable AI features."
      });
    }

    const prompt = `
You are a senior data scientist and UI/UX expert.
The user has uploaded a CSV file.
Here are the headers: ${headers.join(', ')}
Here are the first 5 rows of data:
${JSON.stringify(csvData)}

Based on this data, construct an analytics dashboard configuration.
Return ONLY a strictly valid JSON object representing the dashboard widgets.
Do NOT wrap the JSON in markdown code blocks.
Do NOT include any explanatory text.

The JSON MUST follow this exact schema:
{
  "dashboardTitle": "A catchy title based on the data",
  "widgets": [
    {
      "id": "unique-id",
      "type": "bar", // or "line", "doughnut", "radar", "polarArea", "kpi"
      "title": "Widget Title",
      "xAxisField": "Exact Header Name for X axis (if chart)",
      "yAxisField": "Exact Header Name for Y axis (if chart)",
      "valueField": "Exact Header Name for value (if kpi)",
      "description": "Short description of what this shows"
    }
  ]
}

Make sure to include at least 8 widgets (a mix of KPIs and Charts: bar, line, doughnut, radar, polarArea).
Focus on diversity of visualization.
`;

    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: "llama-3.1-8b-instant",
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      response_format: { type: 'json_object' }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      }
    });

    const completionText = response.data.choices[0].message.content;
    const config = JSON.parse(completionText || '{}');

    res.status(200).json({
      success: true,
      data: config
    });
  } catch (error) {
    console.error('Groq Generation Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ success: false, error: 'Failed to generate dashboard configuration' });
  }
};

module.exports = {
  generateDashboardConfig
};
