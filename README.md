# ChatGPT Deno Application

This is a simple Deno chatbot application that utilizes the OpenAI GPT-3.5 API. The purpose of this application is to provide a kind chatbot experience for users.

## Features

- Automatically loads OpenAI API key from a file.
- Provides a command-line interface for user interaction.
- Responds to user input using OpenAI GPT-3.5 API.
- Allows users to quit, exit, or clear the conversation.
- Gracefully handles user interruption (Ctrl+C).

### Prerequisites

To use this application, you'll need:

- Deno runtime
- OpenAI API key

## Usage

1. Clone or download the repository.
2. Set the OpenAI API key in the .chatgpt.env file located in your home directory.
3. Run the application using deno run --allow-net --allow-env --allow-read ./your_file_name.ts.
4. Interact with the chatbot by typing your input after the prompt 🤖 Please enter input >>>.
5. To quit or exit the application, type quit or exit.
6. To clear the conversation log, type clear.

## Notes

This application uses two modules: llm.ts and deps.ts. The llm.ts module provides the Message and completeChat functions, while the deps.ts module provides module loading and path resolution functionality.
