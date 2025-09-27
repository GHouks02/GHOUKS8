export interface PhotoEditingTool {
  name: string;
  website: string;
  pricing: 'Free' | 'Paid' | 'Freemium';
  description: string;
  easeOfUse: 'Beginner-Friendly' | 'Intermediate' | 'Professional';
  keyFeatures: string[];
}

export interface GroundingChunk {
  web: {
    uri: string;
    title: string;
  };
}