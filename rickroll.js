require('dotenv').config();

// set up twilio REST client
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
const twilioClient = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// sends text to number
const sendText = (to, from, body) => {
  twilioClient.messages.create({ to, from, body })
    .then(console.log)
    .catch(console.error);
}

// texts art installation using Twilio #
const rickroll = () => {
  const messageBody = 'rickroll';
  const { INSTALLATION_PHONE_NUMBER, TWILIO_NUMBER } = process.env;
  sendText(INSTALLATION_PHONE_NUMBER, TWILIO_NUMBER, messageBody);
}

const randomTime = () => {
  // number of ms in 24 hours
  const maxTime = 86400000
      , currentTime = Date.now()
      , randomDelay = Math.floor(Math.random() * maxTime)
      , scheduledTime = currentTime + randomDelay;
  
  // create a new Date object to get the scheduled time's hour
  // accounts for timezone by subtracting 6
  const scheduledHour = new Date(scheduledTime).getHours() - 6; 

  if (scheduledHour < 10 || scheduledHour > 19) {
    // generate a different delay if scheduledHour is too early or late
    return randomTime();
  } else {
    // nasty date formatting with epoch time
    // const scheduledDate = new Date(scheduledTime).toLocaleDateString('en-US', { timeZone: 'America/Denver', hour12: true, hour: 'numeric', minute: 'numeric'  });
    // const scheduledHourMinute = scheduledDate.split(',')[1];
    // const messageBody = `Rickrolling Provo tomorrow at${scheduledHourMinute}`;
    // send myself text with the scheduled time
    const { PERSONAL_NUMBER, TWILIO_NUMBER } = process.env;
    sendText(PERSONAL_NUMBER, TWILIO_NUMBER, messageBody);
    return randomDelay;
  }
}

// recursive calls itself after a random timeout
const dispatchRickroll = () => {
  rickroll();
  setTimeout(dispatchRickroll, randomTime());
}

// start recursive call 1s after running script
setTimeout(dispatchRickroll, 1000);