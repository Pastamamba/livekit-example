LiveKit Configuration Guide
This guide will walk you through the steps required to generate a new API secret and key, and retrieve the server URL for your LiveKit setup.

Step-by-Step Instructions

Accessing LiveKit Cloud:

    Navigate to LiveKit Cloud Login.
    You can log in using your Git or Google credentials.

Retrieving the Server URL:

    Once logged in, your server URL will be displayed at the top of the page.
    Copy this URL and paste it into the .env.local file located in the livekit-whiteboard directory.

Generating API Key and Secret:

    In the sidebar, navigate to the Settings section.
    From there, select the Keys subsection.
    Click on the Add New Key button. A prompt will ask you for a name for the new key. Provide a suitable name and click Generate.
    After this, you'll be provided with both an API KEY and a SECRET KEY.

Updating Configuration:

Take the API KEY and SECRET KEY you've just generated and input them into the .env file located in the livekit-backend directory.
With these steps completed, you should now be able to join a room successfully.
