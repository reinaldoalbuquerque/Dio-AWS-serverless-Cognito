const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;
    const { price } = JSON.parse(event.body);

    const params = {
      TableName: 'Items',
      Key: {
        id
      },
      UpdateExpression: 'set price = :price',
      ExpressionAttributeValues: {
        ':price': price
      },
      ReturnValues: 'ALL_NEW'
    };

    const result = await dynamodb.update(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao atualizar Item', error })
    };
  }
};
