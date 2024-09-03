const axios = require('axios');
const config = require('../config/config');

class ImageGenerationService {
  constructor() {
    this.client = axios.create({
      baseURL: config.huggingFaceModelUrl,
      headers: {
        Authorization: `Bearer ${config.huggingFaceToken}`,
        "Content-Type": "application/json",
      },
      responseType: 'arraybuffer',  // Ensure responseType is 'arraybuffer' for binary data
    });
  }

  async generateImage(prompt) {
    try {
      // Send POST request to the Hugging Face API with the prompt
      const response = await this.client.post('', { inputs: prompt });
      // Check for successful response
      if (response.status !== 200) {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    
      return response.data
    } catch (error) {
      // Log detailed error information
      console.error('Error details:', error.response ? error.response.data : error.message);
      throw new Error(`Error generating image: ${error.message}`);
    }
  }
}

module.exports = new ImageGenerationService();
