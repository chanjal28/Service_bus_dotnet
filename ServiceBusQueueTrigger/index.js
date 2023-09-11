const azure = require("azure");
const serviceBusService = azure.createServiceBusService("Endpoint=sb://demo-ra2.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=g6C361f2fXJcxmvDXOHlFOVumRu8GvynE+ASbNZeQe0=");

module.exports = async function (context, req) {
  const queueName = "testqueue";
  const message = {
    body: "Hello, Azure Service Bus!",
  };

  serviceBusService.sendQueueMessage(queueName, message, function (error) {
    if (error) {
      context.log.error(`Error sending message to Service Bus: ${error}`);
      context.res = {
        status: 500,
        body: `Error sending message to Service Bus: ${error}`,
      };
    } else {
      context.log(`Message sent to Service Bus queue: ${queueName}`);
      context.res = {
        status: 200,
        body: "Message sent to Service Bus.",
      };
    }

    context.done();
  });
};
