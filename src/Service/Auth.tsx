/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "../Config/config";


export const signup = async (formData:any) => {
  try {
    const response = await fetch(`${config.apiBaseUrl}sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',  // This allows cookies to be sent with the request
      body: JSON.stringify(formData),  // Ensure the form data is sent as a JSON string
    });
    const data = await response.json();  // Parse the response data
    console.log(data);

    if (!response.ok) {
      throw new Error(`Signup failed! -----: ${data.message}`);
    }

   
    return data;  // Return the response data
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;  // Propagate the error for handling in the component
  }
};




