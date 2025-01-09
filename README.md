# Geospatial AI App

## Overview
This project involves building a geospatial application powered by AI using technologies like NextJS, DuckDB, and DeckGL. The application integrates geospatial processing capabilities with natural language commands interpreted by a Large Language Model (LLM).

## Project Goals
1. **Geospatial Analysis**: Perform advanced spatial operations like point-in-polygon, buffering, and nearest neighbors.
2. **Interactive Visualization**: Display geospatial data and query results on a map interface using DeckGL.
3. **AI-Driven Commands**: Use an LLM to interpret natural language commands for geospatial operations.

## Assignment Structure

### 1. Setup and Understanding
- Set up a NextJS project with TypeScript.
- Familiarize yourself with:
  - DeckGL and its layer types.
  - DuckDB’s Spatial extension capabilities.
- Create an account for an LLM API. Use the provided GPT-4o-mini API key or alternatives like Claude, Gemini, or Ollama.

### 2. Backend Implementation
- **Database**: Implement DuckDB with the Spatial extension.
- **Geospatial Operations**: Create basic operations such as:
  - Point-in-polygon queries.
  - Buffer generation.
  - Nearest neighbor calculations.
- **API Development**: Develop endpoints to handle these geospatial operations.
- **Data Processing**: Implement sample geospatial data processing tasks.

### 3. Frontend Development
- Build an interactive map interface using DeckGL and React.
- Create a chat interface for natural language commands.
- Integrate LLM for processing geospatial queries.
- Visualize query results on the map.

### 4. Testing and Debugging
Implement and test sample queries such as:
- "Show all points within 5km of this location."
- "Add a buffer of 10km around these features."
- "Calculate the nearest neighbors for these points."

## Technical Requirements

### Technologies
- **Frontend**: NextJS, DeckGL, React.
- **Backend**: DuckDB with Spatial extension.
- **Data Format**: GeoJSON.

### Sample Data
The application will work with datasets containing:
- Point geometries.
- Polygon geometries.
- Linestring geometries.

## Evaluation Criteria

### 1. Code Quality
- Well-structured and clean code.
- Proper error handling.

### 2. Functionality
- Accurate implementation of geospatial operations.
- Reliable AI-driven command processing.
- Smooth and responsive visualization performance.

### 3. Technical Decisions
- Effective use of DeckGL layers.
- Optimized DuckDB queries.
- Robust state management.
- Thoughtful LLM integration.

## Submission Guidelines
1. Submit your code via a public Git repository.
2. Include any sample data used for testing.
3. Prepare for a technical discussion about your implementation choices.

## Setup Instructions

### Prerequisites
- Node.js and npm installed.
- DuckDB with the Spatial extension.
- An API key for an LLM (e.g., GPT-4o-mini).

### Steps
1. Clone the repository.
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Set up the DuckDB database with sample geospatial data.
   ```sql
   CREATE TABLE points (id INTEGER, geometry GEOMETRY);
   CREATE TABLE polygons (id INTEGER, geometry GEOMETRY);
   -- Insert sample data here
   ```
4. Configure the LLM API key in the `.env` file.
   ```env
   LLM_API_KEY=your-api-key
   ```
5. Start the development server.
   ```bash
   npm run dev
   ```
6. Access the application at `http://localhost:3000`.

## Usage Instructions
1. Use the map interface to explore geospatial data.
2. Enter natural language commands in the chat interface.
3. View the query results visualized on the map.

## Sample Commands
- "Show all points within 5km of this location."
- "Buffer these features by 10km."
- "Find the nearest neighbors for these points."

## License
This project is licensed under the MIT License. See the LICENSE file for details.
