const cron = require('cron');
const https = require('https');

const backendUrl = 'https://chatmate-oszk.onrender.com'; // Replace with your actual backend URL

// Cron job to hit endpoint every 14 seconds to keep backend alive always
const job = new cron.CronJob('*/14 * * * * *', function () {
  console.log('Pinging backend to keep server alive');

  // Perform an HTTPS GET request to hit the backend API
  https.get(backendUrl, (res) => {
    if (res.statusCode === 200) {
      console.log('Server is alive');
    } else {
      console.error(`Failed to restart server with status code: ${res.statusCode}`);
    }
  }).on('error', (err) => {
    console.error('Error during ping:', err.message);
  });
});

// Start the cron job
job.start();

// Export the cron job for use in other parts of your application
module.exports = {
  job:job,
};
