// netlify-functions/bfhl.js

exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
      const fullName = 'aruna_sai'; 
      const dob = '23022004'; 
      const userId = `${fullName}_${dob}`;
      return {
        statusCode: 200,
        body: JSON.stringify({ user_id: userId }),
      };
    } else if (event.httpMethod === 'GET') {
      return {
        statusCode: 200,
        body: JSON.stringify({ is_success: true }),
      };
    } else {
      return {
        statusCode: 405,
        body: 'Method Not Allowed',
      };
    }
  };
  