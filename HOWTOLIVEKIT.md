Introduction
Welcome to the LiveKit Video Room project! This project allows users to join video rooms, view active rooms, and interact with other participants. It's built using the LiveKit SDK, which provides real-time audio and video capabilities.

Getting Started
Before diving into the code, you need to set up your LiveKit credentials. Here's a step-by-step guide:

    Visit LiveKit Cloud and log in. https://cloud.livekit.io/login
    Once logged in, you'll see your LiveKit Server URL at the top of the page. Make a note of this.
    Navigate to the Settings tab.
    Click on Add New Key and provide a name for the key.
    Once the key is generated, you'll see two pieces of information: API Key and Secret Key.
    Copy the API Key and Secret Key.
    Configuration

Frontend:
In the root directory of the frontend, locate the .env.local file.
Set the NEXT_PUBLIC_LIVEKIT_URL variable to your LiveKit Server URL.
NEXT_PUBLIC_LIVEKIT_URL=your_livekit_server_url_here

Backend:
In the root directory of the backend, locate the .env file.
Set the following variables:
SERVER_PORT=5000
LIVEKIT_API_KEY=your_api_key_here
LIVEKIT_API_SECRET=your_secret_key_here
LIVEKIT_SERVER=your_livekit_server_url_here
Replace your_api_key_here, your_secret_key_here, and your_livekit_server_url_here with the values you noted from the LiveKit Cloud dashboard.

How the Code Works
Frontend:
ActiveRooms Component: This component fetches and displays a list of currently active rooms. It provides a refresh button to update the list manually.

    VideoRoom Component: This is the main component where users join the video room. It provides video and audio controls, displays participants, and allows users to interact in real-time.

Backend:
    generateUserToken: This function generates a token for a user to join a specific room. It requires a username and room name as parameters.

Conclusion
With the configurations set and a basic understanding of the components, you're now ready to run the project and explore the world of real-time video communication. Happy coding!
