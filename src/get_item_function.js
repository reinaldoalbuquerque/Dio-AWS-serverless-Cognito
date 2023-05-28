const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    const params = {
      TableName: 'Items',
      Key: {
        id
      }
    };

    const result = await dynamodb.get(params).promise();

    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Item não encontrado' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao obter Item', error })
    };
  }
};
