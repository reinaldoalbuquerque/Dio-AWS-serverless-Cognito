const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  try {
    const { id, price } = JSON.parse(event.body);

    const params = {
      TableName: 'Items',
      Item: {
        id,
        price
      }
    };

    await dynamodb.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Items adicionado com sucesso' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao criar Items', error })
    };
  }
};

