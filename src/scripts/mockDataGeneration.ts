import fs from "fs";
import path from "path";
import { parse } from "json2csv";

interface Post {
  id: string;
  postType: string;
  likes: number;
  shares: number;
  comments: number;
  createdAt: string;
}

const postTypes = ["carousel", "reels", "static_image", "video"];

// Helper function to generate a random number within a range
function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to generate a random date within the past year
function getRandomDate(): string {
  const start = new Date();
  const end = new Date();
  start.setFullYear(start.getFullYear() - 1); // One year ago
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate.toISOString();
}

// Function to generate mock data
function generateMockData(numPosts: number): Post[] {
  const data: Post[] = [];
  for (let i = 0; i < numPosts; i++) {
    const post: Post = {
      id: `post_${i + 1}`,
      postType: postTypes[getRandomNumber(0, postTypes.length - 1)],
      likes: getRandomNumber(10, 500),
      shares: getRandomNumber(1, 100),
      comments: getRandomNumber(0, 50),
      createdAt: getRandomDate(),
    };
    data.push(post);
  }
  return data;
}

// Save data to JSON file
function saveToJSON(data: Post[], fileName: string): void {
  fs.writeFileSync(fileName, JSON.stringify(data, null, 2), "utf-8");
  console.log(`Mock data saved to JSON file: ${fileName}`);
}

// Save data to CSV file
function saveToCSV(data: Post[], fileName: string): void {
  try {
    const csv = parse(data);
    fs.writeFileSync(fileName, csv, "utf-8");
    console.log(`Mock data saved to CSV file: ${fileName}`);
  } catch (error) {
    console.error("Error generating CSV file:", error);
  }
}

// Main function to generate data and save to files
function GenerateAndSave() {
  const numPosts = 100; 
  const mockData = generateMockData(numPosts);

  // Define file names
  const jsonFileName = path.join(__dirname, "mock_social_media_data.json");
  const csvFileName = path.join(__dirname, "mock_social_media_data.csv");

  saveToJSON(mockData, jsonFileName);
  saveToCSV(mockData, csvFileName);
}

GenerateAndSave();