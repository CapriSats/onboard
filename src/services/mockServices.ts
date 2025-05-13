import { simulateNetworkDelay, createSuccessResponse, handleApiError, Prerequisite } from './api';

// Mock types
export interface ProjectInfo {
  id: string;
  name: string;
  description: string;
  aiRecommendations: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  status: 'available' | 'unavailable' | 'coming_soon';
}

export interface GuidedStep {
  id: string;
  title: string;
  content: string;
  instructions: string;
  codeSnippet?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  isAI: boolean;
  timestamp: string;
}

// Mock data
const mockProjectInfo: ProjectInfo = {
  id: 'proj-123',
  name: 'AI Implementation Project',
  description: 'An enterprise-grade AI solution for improving customer service through natural language processing.',
  aiRecommendations: [
    'Consider implementing sentiment analysis for customer feedback',
    'Add document processing capabilities for automated form handling',
    'Integrate with existing CRM systems for a unified view'
  ]
};

const mockPrerequisites: Prerequisite[] = [
  {
    id: '1',
    label: 'API Access',
    description: 'Verify you have access to all required API endpoints',
    required: true,
    checked: false // Add the checked property to match the interface in api.ts
  },
  {
    id: '2',
    label: 'Data Preparation',
    description: 'Prepare and clean your data for AI model training',
    required: true,
    checked: false // Add the checked property to match the interface in api.ts
  },
  {
    id: '3',
    label: 'Infrastructure',
    description: 'Ensure your infrastructure can support the AI workload',
    required: true,
    checked: false // Add the checked property to match the interface in api.ts
  }
];

const mockServices: Service[] = [
  {
    id: '1',
    name: 'Natural Language Processing',
    description: 'Process and understand human language for insights and automation',
    status: 'available'
  },
  {
    id: '2',
    name: 'Computer Vision',
    description: 'Analyze and interpret visual information from images and videos',
    status: 'available'
  },
  {
    id: '3',
    name: 'Predictive Analytics',
    description: 'Use historical data to predict future outcomes',
    status: 'available'
  }
];

const mockGuidedSteps: Record<string, GuidedStep> = {
  's1': {
    id: 's1',
    title: 'S/C One - Natural Language Processing Setup',
    content: 'Set up the foundation for natural language processing capabilities in your application.',
    instructions: 'Configure API credentials and environment variables for NLP services.',
    codeSnippet: `
// Sample code for NLP integration
const nlpApi = new NLPService({
  apiKey: process.env.NLP_API_KEY,
  endpoint: process.env.NLP_ENDPOINT
});

// Initialize the service
await nlpApi.initialize();
    `
  },
  's2': {
    id: 's2',
    title: 'S/C Two - Computer Vision Integration',
    content: 'Integrate computer vision capabilities to analyze visual content in your application.',
    instructions: 'Set up image processing pipeline and configure detection parameters.',
    codeSnippet: `
// Sample code for CV integration
const visionProcessor = new VisionService({
  modelType: 'object-detection',
  confidence: 0.85
});

// Process an image
const results = await visionProcessor.analyze(imageData);
    `
  },
  's3': {
    id: 's3',
    title: 'S/C 3 - Predictive Analytics Configuration',
    content: 'Configure predictive analytics to forecast trends based on your data.',
    instructions: 'Set up data pipelines and configure prediction models.',
    codeSnippet: `
// Sample code for predictive analytics
const predictor = new PredictiveModel({
  dataSource: 'customer-interactions',
  algorithm: 'gradient-boosting',
  features: ['recency', 'frequency', 'monetary']
});

// Train and evaluate the model
await predictor.trainAndEvaluate();
    `
  },
  'ready': {
    id: 'ready',
    title: 'Ready to Deploy',
    content: 'Your AI implementation is ready to be deployed to production.',
    instructions: 'Review the configuration, run final tests, and proceed with deployment.'
  }
};

// Chat history for the AI assistant
const mockChatHistory: ChatMessage[] = [
  {
    id: 'msg1',
    text: 'Hi there! How can I help you with your AI platform setup today?',
    isAI: true,
    timestamp: new Date(Date.now() - 3600000).toISOString()
  }
];

// Mock API service functions
export const mockApiServices = {
  // Project information API
  getProjectInfo: async (): Promise<ProjectInfo> => {
    try {
      await simulateNetworkDelay(500, 1000);
      return createSuccessResponse(mockProjectInfo).data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  updateProjectDescription: async (description: string): Promise<ProjectInfo> => {
    try {
      await simulateNetworkDelay();
      const updatedProject = { 
        ...mockProjectInfo, 
        description 
      };
      return createSuccessResponse(updatedProject).data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Prerequisites API
  getPrerequisites: async (): Promise<Prerequisite[]> => {
    try {
      await simulateNetworkDelay();
      return createSuccessResponse(mockPrerequisites).data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  updatePrerequisite: async (id: string, checked: boolean): Promise<Prerequisite[]> => {
    try {
      await simulateNetworkDelay(200, 500);
      // In a real API, this would update on the server
      // Update the local mockPrerequisites array to reflect the change
      const updatedPrerequisites = mockPrerequisites.map(item => 
        item.id === id ? { ...item, checked } : item
      );
      // Update the mock data 
      mockPrerequisites.forEach((item, index) => {
        if (item.id === id) {
          mockPrerequisites[index] = { ...item, checked };
        }
      });
      return createSuccessResponse(mockPrerequisites).data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Services API
  getServices: async (): Promise<Service[]> => {
    try {
      await simulateNetworkDelay();
      return createSuccessResponse(mockServices).data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Guided steps API
  getGuidedStep: async (stepId: string): Promise<GuidedStep> => {
    try {
      await simulateNetworkDelay();
      const step = mockGuidedSteps[stepId];
      if (!step) {
        throw new Error(`Step ${stepId} not found`);
      }
      return createSuccessResponse(step).data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  getAllGuidedSteps: async (): Promise<GuidedStep[]> => {
    try {
      await simulateNetworkDelay();
      return createSuccessResponse(Object.values(mockGuidedSteps)).data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Chat assistant API
  getChatHistory: async (): Promise<ChatMessage[]> => {
    try {
      await simulateNetworkDelay(200, 600);
      return createSuccessResponse(mockChatHistory).data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  sendChatMessage: async (message: string): Promise<ChatMessage> => {
    try {
      await simulateNetworkDelay(800, 1500);
      
      // Generate a mock AI response based on the user's message
      let aiResponse = '';
      
      if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
        aiResponse = 'Hello! How can I assist you with the AI platform today?';
      } else if (message.toLowerCase().includes('help')) {
        aiResponse = 'I can help you with setting up the AI platform, configuring services, or troubleshooting issues. What specifically do you need help with?';
      } else if (message.toLowerCase().includes('api') || message.toLowerCase().includes('integration')) {
        aiResponse = 'For API integration, you\'ll need to configure the authentication credentials and endpoints. Would you like me to guide you through this process?';
      } else if (message.toLowerCase().includes('error') || message.toLowerCase().includes('problem')) {
        aiResponse = 'I\'m sorry to hear you\'re experiencing issues. Could you provide more details about the error you\'re seeing?';
      } else {
        aiResponse = 'Thanks for your question. I\'m here to help with the onboarding process. Is there anything specific about the AI platform you\'d like to know?';
      }
      
      // Create new message object
      const newMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        text: aiResponse,
        isAI: true,
        timestamp: new Date().toISOString()
      };

      // In a real API, this would update on the server
      mockChatHistory.push(newMessage);
      
      return createSuccessResponse(newMessage).data;
    } catch (error) {
      return handleApiError(error);
    }
  }
};

// Export a mock API specification for documentation
export const mockApiSpecification = {
  openapi: '3.0.0',
  info: {
    title: 'AI Platform Onboarding API',
    version: '1.0.0',
    description: 'API for AI Platform Onboarding Process',
  },
  paths: {
    '/api/project': {
      get: {
        summary: 'Get project information',
        responses: {
          '200': {
            description: 'Project information retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ProjectInfo'
                }
              }
            }
          }
        }
      },
      put: {
        summary: 'Update project description',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  description: {
                    type: 'string'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Project updated successfully'
          }
        }
      }
    },
    '/api/prerequisites': {
      get: {
        summary: 'Get prerequisites list',
        responses: {
          '200': {
            description: 'Prerequisites retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Prerequisite'
                  }
                }
              }
            }
          }
        }
      },
      put: {
        summary: 'Update prerequisite status',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  checked: {
                    type: 'boolean'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Prerequisite updated successfully'
          }
        }
      }
    },
    '/api/services': {
      get: {
        summary: 'Get available services',
        responses: {
          '200': {
            description: 'Services retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Service'
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/guided-steps': {
      get: {
        summary: 'Get all guided steps',
        responses: {
          '200': {
            description: 'Guided steps retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/GuidedStep'
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/guided-steps/{stepId}': {
      get: {
        summary: 'Get specific guided step',
        parameters: [
          {
            name: 'stepId',
            in: 'path',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Guided step retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/GuidedStep'
                }
              }
            }
          }
        }
      }
    },
    '/api/chat/history': {
      get: {
        summary: 'Get chat history',
        responses: {
          '200': {
            description: 'Chat history retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/ChatMessage'
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/chat/message': {
      post: {
        summary: 'Send a message to the chat assistant',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Message sent successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ChatMessage'
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      ProjectInfo: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          aiRecommendations: {
            type: 'array',
            items: { type: 'string' }
          }
        }
      },
      Prerequisite: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          label: { type: 'string' },
          description: { type: 'string' },
          required: { type: 'boolean' },
          checked: { type: 'boolean' }
        }
      },
      Service: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          status: { 
            type: 'string',
            enum: ['available', 'unavailable', 'coming_soon']
          }
        }
      },
      GuidedStep: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          content: { type: 'string' },
          instructions: { type: 'string' },
          codeSnippet: { type: 'string' }
        }
      },
      ChatMessage: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          text: { type: 'string' },
          isAI: { type: 'boolean' },
          timestamp: { type: 'string', format: 'date-time' }
        }
      }
    }
  }
};
